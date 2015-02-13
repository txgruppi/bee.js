# Bee - Bitwise Event Emitter

Bee is a JavaScript event emitter which support topics as [**bitmasks**](http://en.wikipedia.org/wiki/Mask_%28computing%29) and OFFC *(of fucking course)* it also works like a charm with normal topics such as *string* ones; as you already do and probably don't knew.

## Well, what?
Nothing. Probably your code hurts 'cause you always spend more keystrokes when you want to listen to both events and have the same callback for them. Don't understand what I mean? Great, let's zoom it:

```JS
var myAwesomeCallback = function() {
    // some sort of voodoo happens here.
    // ...
};

target.on('event:a', myAwesomeCallback);
target.on('event:b', myAwesomeCallback);
```

Hell yeah. :trollface:.

We already overcome those kind of stuff, let's go ahead playing with simple bitwise operations such as:
```JS
var EVENT_A = 1; // 1 << 0
var EVENT_B = 2; // 1 << 1

target.on(
    EVENT_A | EVENT_B,
    myAwesomeCallback
);
```

IHA! We're on the way, much better, nein?

## Why? when?
I'm drunk, can't explain now.

## Contributing
That's why GitHub exists, bro. Then, you can, always and all ways. And also we'll bid you a beer if your PR change my life.

:beers:
