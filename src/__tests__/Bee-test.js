/**
 * @author Andrey K. Vital <andreykvital@gmail.com>
 */
jest.autoMockOff();

describe('Bee', () => {
  var Bee = require('../Bee');
  var eventEmitter;

  beforeEach(() => {
    eventEmitter = new Bee();
  });

  it('initializes without any listeners or bitListeners', () => {
    expect(eventEmitter._listeners).toEqual({});
    expect(eventEmitter._bitListeners).toEqual({});
  });

  it('is able to listen to a topic through `.on`', () => {
    eventEmitter.on('foo', () => {});
    eventEmitter.on('bar', () => {});
    eventEmitter.on('baz', () => {});

    // ...a couple of invalid listeners!
    eventEmitter.on('null', null);
    eventEmitter.on('false', false);
    eventEmitter.on('1', 1);
    eventEmitter.on('undefined', undefined);

    var A = 1 << 0;
    var B = 1 << 1;
    var C = 1 << 2;

    eventEmitter.on(A | B | C, () => {});

    expect(Object.keys(eventEmitter._listeners)).toEqual(['foo', 'bar', 'baz']);
    expect(Object.keys(eventEmitter._bitListeners).shift()).toEqual(
      String(A | B | C)
    );
  });
});
