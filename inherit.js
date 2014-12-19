/**
 * inherit.js
 * Varun Varada
 */

(function ( global ) {
    'use strict';

    function isFunction( func ) {
        return Object.prototype.toString.call( func ) === '[object Function]';
    }

    function isObject( func ) {
        return Object.prototype.toString.call( func ) === '[object Object]';
    }

    // Polyfill for browsers with ECMAScript <5
    if( !isFunction( Object.create ) ) {
        Object.create = function( prototype, properties ) {
            if( typeof prototype !== 'object' && typeof prototype !== 'function' ) {
                throw TypeError( 'Prototype must be an object!' )
            }

            if( typeof properties !== 'undefined' && !isObject( properties ) ) {
                throw TypeError( 'Properties must be an object!' )
            }

            var Object = function() {};
            Object.prototype = prototype;
            var result = new Object();

            // Assign properties and their values
            // Note: Obviously, enumerability and other such property descriptors cannot
            //       be emulated.
            for( var property in properties ) {
                if( properties.hasOwnProperty( property ) ) {

                    // Make sure values are set
                    if( typeof properties[property].value === 'undefined' ) {
                        throw TypeError( 'Properties have no associated values!' );
                    }

                    result[property] = properties[property].value;
                }
            }

            return result;
        };
    }

    var inherit = function ( child, parent ) {

        if( !isFunction( child ) || !isFunction( parent ) ) {
            return;
        }

        // Keep a copy of the child's prototype
        var childCopy = child.prototype;

        // Create a new object that has the parent's prototype as its [[prototype]]
        child.prototype = Object.create(
            parent.prototype,
            {
                // Retain the constructor so that browsers can interpret its symbol name (e.g., when using console.dir())
                constructor: {
                    value: child,
                    writable: true, // Default behavior of this property
                    enumerable: false, // So that it doesn't show up in for..in loops
                    configurable: true // Default behavior of this property
                }
            }
        );

        // Add back in any properties that were assigned to the child's prototype before calling this function
        // Note: This allows for inherit() to be called at any time.
        for( var property in childCopy ) {
            if( childCopy.hasOwnProperty( property ) ) {
                child.prototype[property] = childCopy[property];
            }
        }
    };

    // Export inherit as a global only if it's non-existent
    if( !global.inherit ) {
        global.inherit = inherit;
    }

})( this );
