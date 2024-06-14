<img class="logo" src="../assets/logo/logo-big.png">


# Procedural Equirectangular Textures

## utils.js

Module. Collects utility functions useful for custom patterns.

* API Reference<br>
&nbsp; [retexture](#retexture)<br>
&nbsp; [map](#map)<br>
&nbsp; [mapExp](#map)


### retexture(...)

Function. Adjusts the parameters of a texture generator, by
collecting values provided by the user and the default values
of the generator. Then creates a texture. Returns the texture.
This function is used internally by the texture generators.

```js
retexture( opt, defaults, options, pattern )
```

where:

* `opt` &ndash; user-defined parameters (object)
* `defaults` &ndash; default values for the user-defined parameters (object)
* `options` &ndash; pattern-specifix function that compiles the parameters (function)
* `pattern` &ndash; texture pattern function (function)



### map(...)

Function. Calculates linear mapping of a value from one interval
(called input) to another interval (called output). Returnes
the mapped value.


```js
map( x )
map( x, toMin, toMax )
map( x, toMin, toMax, fromMin, fromMax )
```

where:

* `x` &ndash; value to be mapped (number) 
* `toMin` &ndash; lower bound of output interval (number, default 0)
* `toMax` &ndash; upper bound of output interval (number, default 1)
* `fromMin` &ndash; lower bound of input interval (number, default 0)
* `fromMax` &ndash; upper bound of input interval (number, default 100)

Note: Function *map* is similar to [THREE.MathUtils.mapLinear](https://threejs.org/docs/#api/en/math/MathUtils.mapLinear)
but the intervals are swapped.
		


### mapExp(...)

Function. Calculates exponential mapping of a value from one
interval (called input) to another interval (called output).
Returnes the mapped value.


```js
mapExp( x )
mapExp( x, toMin, toMax )
mapExp( x, toMin, toMax, fromMin, fromMax )
```

where:

* `x` &ndash; value to be mapped (number) 
* `toMin` &ndash; lower bound of output interval (number, default 0)
* `toMax` &ndash; upper bound of output interval (number, default 1)
* `fromMin` &ndash; lower bound of input interval (number, default 0)
* `fromMax` &ndash; upper bound of input interval (number, default 100)
		


### Source

[src/utils.js](https://github.com/boytchev/texture-generator/blob/main/src/utils.js)



<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>