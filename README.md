inherit.js
==========

inherit.js is an easy way to properly use prototype chaining in JavaScript. Typically, only 1-level prototype chains are used to keep things simple, and because multi-level prototype chains [are hard to get right](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Multi-level_prototype_hierarchies#Multi-level_prototype_hierarchies). This library makes it really easy to use any number of levels in the prototype chain, which helps keep code [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

## Usage

```javascript
inherit( childConstructor, parentConstructor )
```

## Example

```javascript
function Grandfather() {}
Gradfather.prototype.getName = function () { return 'John Doe I'; };
function Father() {}
Father.prototype.getName = function () { return 'John Doe II'; };

inherit( Father, Grandfather );

function Child() {}
Child.prototype.getName = function () { return 'John Doe III'; };

inherit( Child, Father );
```

## Compatibility

ECMAScript 3rd Edition and above. The script uses a polyfill for providing `Object.create` in older browsers.

*Note: Since property descriptors cannot be set in versions before ECMAScript 5, the `constructor` property will be enumerable after a child has been extended.*
