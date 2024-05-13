# Texture generator
Procedural equirectangular texture generator

# Demos

<!--[Preliminary demo](https://boytchev.github.io/texture-generator/examples/proof-of-concept.html)-->

[<kbd style="margin:10px">Preliminary demo<br><br><br><img src="examples/snapshots/proof-of-concept.jpg" style="width:300px;"></kbd>](https://boytchev.github.io/texture-generator/examples/proof-of-concept.html)

<!--[Equirectangular bump map](https://boytchev.github.io/texture-generator/examples/bump-map.html)-->

[<kbd style="margin:10px">Equirectangular bump map<br><br><img src="examples/snapshots/bump-map.jpg" style="width:300px;"></kbd>](https://boytchev.github.io/texture-generator/examples/bump-map.html)



## Preliminary API (working draft)

### `equitexture( pattern, width, canvas )`

Function. Generates an equirectangular texture. The return value is a
`THREE.CanvasTexture` object.

The parameters are the texture width, a pattern function and a canvas. All
parameters are optional and can be passed in any order.

* `pattern` &ndash; optional pattern function that defines the pattern of the texture.
See [pattern function](#pattern-function) for details. If not provided, a spherical
grid is used.
* `width` &ndash; optional integer for the texture width in pixels, the height
is automatically set to half width. If not provided, the canvas width is used.
If the canvas is also not provided, a default value 1024 is used.
* `canvas` &ndash; optional HTML canvas element to use for rendering. If not
provided, a new canvas is created.

Notes:
* texture's `minFilter` is set to `THREE.LinearFilter`, as all MIPMAP filters
create a seam and destroy the poles
* texture's `mapping` is set to `THREE.EquirectangularReflectionMapping`, so
that [`equimaterial`](#equimaterial-material-) knows this texture must be patched.
	
### `equicanvas( pattern, width, canvas )`

Function. Generates a canvas with an equirectangular texture. The return value
is an `HTMLCanvasElement` object.

The parameters are the canvas width, a pattern function and the canvas itself. All
parameters are optional and can be passed in any order.

* `pattern` &ndash; optional pattern function that defines the pattern of the texture.
See [pattern function](#pattern-function) for details. If not provided, a spherical
grid is used.
* `width` &ndash; optional integer for the texture width in pixels, the height
is automatically set to half width. If not provided, the canvas width is used.
If the canvas is also not provided, a default value 1024 is used.
* `canvas` &ndash; optional HTML canvas element to use for rendering. If not
provided, a new canvas is created.

### `equimaterial( material )`

Function. Patches the shader of a Three.js material. This patch reduces the
texture zigzagging near the poles. The return value is the modified material.

* `material` &ndash; a non-shaderal `THREE.Material` that must be patched.
Currently on the `map` property is patched.

### `noise( x, y, z )`

Function. A 3D noise function based on `THREE.SimplexNoise`. It returns a pseudo-random
number &#x2208; [0,1] for coordinates (`x`,`y`,`z`) of a point in 3D space.

* `x` &ndash; x coordinate of 3D point.
* `y` &ndash; x coordinate of 3D point.
* `z` &ndash; z coordinate of 3D point.

### `noiseSeed( seed )`

Command. Configures the `noise` function to start generating a fixed sequence of
pseudo-random numbers.

* `seed` &ndash; integer number.

### `noiseRandomize( )`

Command. Configures the `noise` function to start generating a random sequence
of pseudo-random numbers. `noiseRandomize` seeds the generator with the current
time.

* `seed` &ndash; integer number.



## Pattern function

### `pattern( x, y, z, color, u, v )`

A pattern function is a user-defind function that generates a specific pattern.
The function should use 3D coordinates (`x`,`y`,`z`) and/or texture coordinates
(`u`,`v`) and generate a color in `color`.

* `x`,`y`,`z` &ndash; coordiates of a point on a sphere, thus *x,y,z* &#x2208; [-1,1].
* `u`,`v` &ndash; texture coordiates of a pixel on the texture, *u,v* &#x2208; [0,1].
* `color` &ndash; a `THREE.Color` object that must be set by the pattern function.
An additional property `color.a` could be set for encoding alpha transparency.

The generator does not require that the final value of `color` is still a
`THREE.Color` object. However, it is required that `color` has properties
*r,g,b* &#x2208; [0,1] and optional property *a* &#x2208; [0,1]