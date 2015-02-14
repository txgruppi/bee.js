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

  it('fires listeners when the emitted topic matches', () => {
    var onABC      = jest.genMockFunction();
    var onAnything = jest.genMockFunction();

    var A = 1 << 0, // 1
        B = 1 << 1, // 2
        C = 1 << 2; // 4

    eventEmitter.on('foo', onAnything);
    eventEmitter.on('bar', onAnything);
    eventEmitter.on('baz', onAnything);
    eventEmitter.on(A | B | C, onABC);

    eventEmitter.emit(A | B | C);
    eventEmitter.emit(A | B);
    eventEmitter.emit(A);
    eventEmitter.emit(B | C);
    eventEmitter.emit(B);
    eventEmitter.emit(C);

    eventEmitter.emit('foo');
    eventEmitter.emit('bar');

    expect(onABC.mock.calls.length).toBe(6);
    expect(onAnything.mock.calls.length).toBe(2);
  });

  it('is able to turn off specified listeners for a topic', () => {
    var a   = jest.genMockFunction();
    var aa  = jest.genMockFunction();
    var aaa = jest.genMockFunction();
    var c   = jest.genMockFunction();
    var cc  = jest.genMockFunction();
    var d   = jest.genMockFunction();

    eventEmitter.on('a', a);
    eventEmitter.on('a', aa);
    eventEmitter.on('aaa', aaa);
    eventEmitter.on('c', c);
    eventEmitter.on('c', cc);
    eventEmitter.on('d', d);

    eventEmitter.off('a', aa);
    expect(Object.keys(eventEmitter._listeners)).toEqual([
      'a',
      'aaa',
      'c',
      'd'
    ]);

    expect(eventEmitter._listeners['c']).toEqual([
      c,
      cc
    ]);

    eventEmitter.off('c');
    expect(eventEmitter._listeners['c']).toEqual([]);
    expect(Object.keys(eventEmitter._listeners)).toEqual([
      'a',
      'aaa',
      'c',
      'd'
    ]);

    eventEmitter.off('d', a);
    expect(Object.keys(eventEmitter._listeners)).toContain('d');

    // TODO: test `.off` against bitwise topics.
  });

  it('should pass `.emit` ...args to callback (listener)', () => {
    var cb = jest.genMockFunction();

    eventEmitter.on(
      'args:test',
      cb
    );

    eventEmitter.emit('args:test', 1, 2, 3, 4);
    eventEmitter.emit('args:test', {
      a: [1, 2],
      b: [3, 4]
    }, [
      5, 6, 7
    ], [
      8, 9, 0
    ]);

    expect(cb).toBeCalled();
    expect(cb).toBeCalledWith(1, 2, 3, 4);
    expect(cb).lastCalledWith({
      a: [1, 2],
      b: [3, 4]
    }, [
      5, 6, 7
    ], [
      8, 9, 0
    ]);
  });
});
