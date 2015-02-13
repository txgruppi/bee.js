export default class Bee {
  constructor(checkBits = null) {
    this._listeners = {};
    this._bitListeners = {};

    if (checkBit) {
      this.checkBits = checkBits;
    }
  }

  on(topic, callback) {
    let listeners = this._listeners;

    if (typeof topic === 'number' && topic !== Infinity && !isNaN(topic)) {
      listeners = this._bitListeners;
    }

    if (!listeners[topic]) {
      listeners[topic] = [];
    }

    listeners[topic].push(callback);
  }

  off(topic, callback = null) {
    if (typeof topic !== 'number' || topic === Infinity || isNaN(topic)) {
      if (!this._listeners[topic]) {
        return;
      }

      if (!callback) {
        this._listeners[topic] = [];
        return;
      }

      this._listeners[topic] = this._listeners[topic].filter(
        (fn) => fn !== callback
      );

      return;
    }

    let keys = Object.keys(this._bitListeners), i, l;

    for (i = 0, l = keys.length; i < l; i++) {
      let key = +keys[i];

      if (!this.checkBits(key, topic)) {
        continue;
      }

      if (!callback) {
        this._bitListeners[key] = [];
        continue;
      }

      this._bitListeners[i] = this._bitListeners[i].filter(
        (fn) => fn !== callback
      );
    }
  }

  emit(topic, ...args) {
    if (typeof topic !== 'number' || topic === Infinity || isNaN(topic)) {
      if (!this._listeners[topic]) {
        return;
      }

      this._listeners[topic].forEach(
        (fn) => fn(...args)
      );

      return;
    }

    let keys = Object.keys(this._bitListeners), i, l;

    for (i = 0, l = keys.length; i < l; i++) {
      let key = +keys[i];

      if (!this.checkBits(key, topic)) {
        continue;
      }

      this._bitListeners[key].forEach(
        (fn) => fn(...args)
      );
    }
  }

  checkBits(key, topic) {
    return (key & topic) !== 0;
  }
}
