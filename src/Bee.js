import Event from './Event';

export default class Bee {
  constructor() {
    this._listeners = {};
    this._bitListeners = {};
  }

  /**
   * @param  {String|Numeric} topic
   * @param  {Function}       callback
   * @return {void}
   */
  on(topic, callback) {
    if (typeof callback !== 'function') {
      return;
    }

    let listeners = this._listeners;

    if (this._isBitmask(topic)) {
      listeners = this._bitListeners;
    }

    if (!listeners[topic]) {
      listeners[topic] = [];
    }

    listeners[topic].push(callback);
  }

  /**
   * @see {@link on}
   */
  addEventListener(topic, callback) {
    this.on(topic, callback);
  }

  /**
   * @param  {String|Numeric} topic
   * @param  {Function}       callback
   * @return {void}
   */
  off(topic, callback = null) {
    if (!this._isBitmask(topic)) {
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

      if (!this._checkBits(key, topic)) {
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

  /**
   * @see {@link off}
   */
  removeEventListener(topic, callback = null) {
    this.off(topic, callback);
  }

  /**
   * @param  {String|Numeric} topic
   * @param  {...*}           args
   * @return {void}
   */
  emit(topic, ...args) {
    if (!this._isBitmask(topic)) {
      if (!this._listeners[topic]) {
        return;
      }

      let event = new Event(topic);
      let i, l;
      for (i = 0, l = this._listeners[topic].length && !event.isStopped(); i < l; i++) {
        this._listeners[topic](event, ...args);
      }

      return;
    }

    let keys = Object.keys(this._bitListeners), i, l;

    for (i = 0, l = keys.length; i < l; i++) {
      let key = +keys[i];

      if (!this._checkBits(key, topic)) {
        continue;
      }

      let event = new Event(key, topic);
      let i, l;
      for (i = 0, l = this._bitListeners[key].length && !event.isStopped(); i < l; i++) {
        this._bitListeners[key](event, ...args);
      }
    }
  }

  /**
   * @private
   * @param  {Numeric} bitmask
   * @return {Boolean}
   */
  _isBitmask(bitmask) {
    return bitmask !== 0
      && typeof bitmask === 'number'
      && bitmask !== Infinity
      && !isNaN(bitmask);
  }

  /**
   * @private
   * @param  {Numeric} key
   * @param  {Numeric} topic
   * @return {Boolean}
   */
  _checkBits(key, topic) {
    return (key & topic) !== 0;
  }
}
