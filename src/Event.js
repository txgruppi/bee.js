export default class Event {
  constructor(topic, realTopic = null) {
    this._topic = topic;
    this._realTopic = realTopic;
    this._stopped = false;
  }

  getTopic() {
    return this._topic;
  }

  getRealTopic() {
    return this._realTopic;
  }

  stop() {
    this._stopped = true;
  }

  isStopped() {
    return this._stopped;
  }

  stopImmediatePropagation() {
    this.stop();
  }

  stopPropagation() {
    this.stop();
  }
}
