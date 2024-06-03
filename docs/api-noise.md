<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures

## noise.js

Module. Defines a seedable 3D noise function, that is used by variour texture
patterns. It is based on [THREE.SimplexNoise](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/SimplexNoise.js)
and [THREE.MathUtils.seededRandom](https://threejs.org/docs/#api/en/math/MathUtils.seededRandom).

* API Reference<br>
&nbsp; [noise](#noise)<br>
&nbsp; [noiseSeed](#noiseseed)


### noise(...)

Function. A 3D noise function. Returns a pseudo-random number
&#x2208; [-1,1] for a point in 3D space. Coordinates *x*,
*y* and *z) are multiplied by *scale* before calculating the
noise.

```js
noise( x, y, z, scale=1 )
```

where:

* `x` &ndash; x coordinate of 3D point (number)
* `y` &ndash; y coordinate of 3D point (number)
* `z` &ndash; z coordinate of 3D point (number)




### noiseSeed(...)

Function. Sets the behavior of the [noise](#noise) function.
If the optional seed is an integer number, the next generated
pseudo-random numbers are based on this seed. Otherwise the
current timestamp is used as a seed to achieve a kind of
randomization. The result of the function is the seed.

```js
noiseSeed( )
noiseSeed( seed )
```

where:

* `seed` &ndash; optional the seed value for next pseudo-random
numbers (integer) 

		
		

### Source

[src/noise.js](https://github.com/boytchev/texture-generator/blob/main/src/noise.js)



<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>