const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../assets/homepage.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '../assets/homepage.css'), 'utf8');

function createHarness(reducedMotion = false) {
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  const frames = new Map();
  const windowListeners = new Map();
  const documentListeners = new Map();
  const scrollCalls = [];

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

  const rail = new Target();
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
  const document = {
    hidden: false,
    querySelector: selector => selector === '.crew-rail' ? rail : null,
    querySelectorAll: selector => selector === '[data-crew-direction]' ? [button] : [],
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
  function pointerDown(pointerId = 1) {
    button.dispatch('pointerdown', { isPrimary: true, button: 0, pointerId, timeStamp: now });
  }
  function pointerClick(pointerId = 1) {
    let prevented = false;
    button.dispatch('click', {
      detail: 1, pointerId, timeStamp: now,
      preventDefault() { prevented = true; }
    });
    return prevented;
  }
  return { rail, button, document, scrollCalls, advance, frame, dispatchWindow, dispatchDocument, pointerDown, pointerClick, frames };
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
