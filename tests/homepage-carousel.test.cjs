const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../assets/homepage.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '../assets/homepage.css'), 'utf8');

function createHarness(reducedMotion = false, rootCount = 1) {
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  const frames = new Map();
  const windowListeners = new Map();
  const documentListeners = new Map();

  class Target {
    constructor() { this.listeners = new Map(); }
    addEventListener(type, listener) {
      const list = this.listeners.get(type) || [];
      list.push(listener);
      this.listeners.set(type, list);
    }
    dispatch(type, event = {}) {
      event.type = type;
      event.target ||= this;
      for (const listener of this.listeners.get(type) || []) listener(event);
      return event;
    }
  }

  const carousels = Array.from({ length: rootCount }, () => {
    const rail = new Target();
    const scrollCalls = [];
    rail.style = { scrollSnapType: '', scrollBehavior: '' };
    rail.scrollLeft = 0;
    rail.scrollWidth = 1180;
    rail.clientWidth = 440;
    rail.clientLeft = 0;
    rail.getBoundingClientRect = () => ({ left: 0 });
    const cards = Array.from({ length: 5 }, (_, index) => ({
      offsetWidth: 220,
      getBoundingClientRect: () => ({ left: index * 240 - rail.scrollLeft })
    }));
    rail.querySelector = selector => selector === '.crew-card' ? cards[0] : null;
    rail.querySelectorAll = selector => selector === '.crew-card' ? cards : [];
    rail.scrollBy = ({ left, behavior }) => {
      scrollCalls.push({ left, behavior });
      rail.scrollLeft = Math.max(0, Math.min(rail.scrollLeft + left, rail.scrollWidth - rail.clientWidth));
    };
    const button = new Target();
    button.dataset = { crewDirection: '1' };
    button.setPointerCapture = () => {};
    const root = new Target();
    root.querySelector = selector => selector === '.crew-rail' ? rail : null;
    root.querySelectorAll = selector => selector === '[data-crew-direction]' ? [button] : [];
    return { root, rail, button, scrollCalls };
  });
  const document = {
    hidden: false,
    querySelectorAll: selector => selector === '[data-crew-carousel]' ? carousels.map(carousel => carousel.root) : [],
    addEventListener(type, listener) {
      const list = documentListeners.get(type) || [];
      list.push(listener);
      documentListeners.set(type, list);
    }
  };
  const window = {
    matchMedia: () => ({ matches: reducedMotion }),
    addEventListener(type, listener) {
      const list = windowListeners.get(type) || [];
      list.push(listener);
      windowListeners.set(type, list);
    },
    setTimeout(callback, delay) {
      const id = nextId++;
      timers.set(id, { callback, due: now + delay });
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    requestAnimationFrame(callback) {
      const id = nextId++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame(id) { frames.delete(id); }
  };
  const context = {
    document, window,
    performance: { now: () => now },
    getComputedStyle: () => ({ gap: '20px' })
  };
  vm.runInNewContext(source, context);

  function advance(ms) {
    const target = now + ms;
    while (true) {
      const due = [...timers.entries()].filter(([, timer]) => timer.due <= target).sort((a, b) => a[1].due - b[1].due)[0];
      if (!due) break;
      timers.delete(due[0]);
      now = due[1].due;
      due[1].callback();
    }
    now = target;
  }
  function frame(ms = 16) {
    now += ms;
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(callback => callback(now));
  }
  function dispatchWindow(type, event = {}) {
    event.type = type;
    for (const listener of windowListeners.get(type) || []) listener(event);
  }
  function dispatchDocument(type, event = {}) {
    event.type = type;
    for (const listener of documentListeners.get(type) || []) listener(event);
  }
  function pointerDown(pointerId = 1, carouselIndex = 0) {
    carousels[carouselIndex].button.dispatch('pointerdown', { isPrimary: true, button: 0, pointerId, timeStamp: now });
  }
  function pointerClick(pointerId = 1, carouselIndex = 0) {
    let prevented = false;
    carousels[carouselIndex].button.dispatch('click', {
      detail: 1, pointerId, timeStamp: now,
      preventDefault() { prevented = true; }
    });
    return prevented;
  }
  return { ...carousels[0], carousels, rail: carousels[0].rail, button: carousels[0].button, scrollCalls: carousels[0].scrollCalls, document, advance, frame, dispatchWindow, dispatchDocument, pointerDown, pointerClick, frames };
}

test('a brief pointer click advances one card once', () => {
  const h = createHarness();
  h.pointerDown(11);
  h.advance(120);
  h.dispatchWindow('pointerup', { pointerId: 11, timeStamp: 120 });
  h.pointerClick(11);
  assert.equal(h.scrollCalls.length, 1);
  assert.equal(h.scrollCalls[0].left, 240);
  assert.equal(h.scrollCalls[0].behavior, 'smooth');
});

test('a held press stops at the exact fractional position and suppresses its click', () => {
  const h = createHarness();
  h.pointerDown(12);
  h.advance(250);
  h.frame(16);
  for (let i = 0; i < 3; i++) h.frame(50);
  const beforeRelease = h.rail.scrollLeft;
  assert.ok(beforeRelease > 0);
  assert.notEqual(beforeRelease % 240, 0, 'test position is between card snap points');
  h.dispatchWindow('pointerup', { pointerId: 12, timeStamp: 416 });
  assert.equal(h.rail.scrollLeft, beforeRelease, 'release preserves scrollLeft exactly');
  assert.equal(h.rail.style.scrollSnapType, '');
  assert.equal(h.rail.style.scrollBehavior, '');
  assert.equal(h.frames.size, 0);
  h.frame(100);
  assert.equal(h.rail.scrollLeft, beforeRelease, 'no later frame moves the rail');
  assert.equal(h.pointerClick(12), true);
  assert.equal(h.scrollCalls.length, 0);
  assert.match(styles, /\.crew-rail\{[^}]*scroll-snap-type:none;/, 'the rail keeps snap disabled after release');
});

test('pointer cancel, blur and hidden page preserve the current position and stop animation', () => {
  const stops = [
    h => h.dispatchWindow('pointercancel', { pointerId: 13 }),
    h => h.dispatchWindow('blur'),
    h => { h.document.hidden = true; h.dispatchDocument('visibilitychange'); }
  ];
  for (const stop of stops) {
    const h = createHarness();
    h.pointerDown(13);
    h.advance(250);
    h.frame(16);
    h.frame(50);
    h.frame(50);
    const beforeStop = h.rail.scrollLeft;
    assert.ok(beforeStop > 0);
    stop(h);
    assert.equal(h.rail.scrollLeft, beforeStop, 'cancellation preserves scrollLeft exactly');
    assert.equal(h.rail.style.scrollSnapType, '');
    assert.equal(h.rail.style.scrollBehavior, '');
    assert.equal(h.frames.size, 0);
    h.frame(100);
    assert.equal(h.rail.scrollLeft, beforeStop, 'no later frame moves the rail');
  }
});

test('two carousel roots keep scrolling and held-click suppression independent', () => {
  const h = createHarness(false, 2);
  h.pointerDown(21, 0);
  h.advance(250);
  h.frame(16);
  h.frame(50);
  const firstBeforeOtherClick = h.carousels[0].rail.scrollLeft;
  assert.ok(firstBeforeOtherClick > 0);

  h.pointerClick(22, 1);
  assert.equal(h.carousels[1].scrollCalls.length, 1, 'the second rail responds while the first is held');
  assert.equal(h.carousels[1].rail.scrollLeft, 240);
  h.frame(50);
  assert.ok(h.carousels[0].rail.scrollLeft > firstBeforeOtherClick);

  const beforeRelease = h.carousels[0].rail.scrollLeft;
  h.dispatchWindow('pointerup', { pointerId: 21, timeStamp: 366 });
  assert.equal(h.carousels[0].rail.scrollLeft, beforeRelease);
  assert.equal(h.pointerClick(21, 0), true, 'only the held rail suppresses its release click');
  assert.equal(h.carousels[0].scrollCalls.length, 0);
  assert.equal(h.carousels[1].scrollCalls.length, 1);
});

test('reduced motion uses discrete held steps and instant click movement', () => {
  const held = createHarness(true);
  held.pointerDown(31);
  held.advance(250);
  held.frame(16);
  assert.equal(held.rail.scrollLeft, 0, 'no movement before the reduced-motion step delay');
  held.frame(720);
  assert.equal(held.rail.scrollLeft, 240, 'a held reduced-motion step moves one card');
  held.dispatchWindow('pointerup', { pointerId: 31, timeStamp: 986 });
  assert.equal(held.pointerClick(31), true);

  const click = createHarness(true);
  click.pointerClick(32);
  assert.equal(click.scrollCalls[0].behavior, 'instant');
});
