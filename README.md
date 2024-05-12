# Texture generator
Procedural equirectangular texture generator

[Preliminary demo](examples/proof-of-concept.html)


## Preliminary API (working draft)

### `equitexture( noise, width, canvas )`

Function. Generates an equirectangular texture. The return value is a
`THREE.CanvasTexture` object.

The parameters are the texture width, a noise function and a canvas. All
parameters are optional and can be passed in any order.

* `noise` &ndash; optional noise function that defines the pattern of the texture.
See [noise function](#noise-function) for details. If not provided, a spherical
grid is used.
* `width` &ndash; optional integer for the texture width in pixels, the height
is automatically set to half width. If not provided, the canvas width is used.
If the canvas is also not provided, a default value 1024 is used.
* `canvas` &ndash; optional HTML canvas element to use for rendering. If not
provided, a new canvas is created.

### `equicanvas( noise, width, canvas )`

Function. Generates a canvas with an equirectangular texture. The return value
is an `HTMLCanvasElement` object.

The parameters are the canvas width, a noise function and the canvas itself. All
parameters are optional and can be passed in any order.

* `noise` &ndash; optional noise function that defines the pattern of the texture.
See [noise function](#noise-function) for details. If not provided, a spherical
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



## Noise function

### `noise( x, y, z, color, u, v )`

A noise function is a user-defind function that generates a specific pattern.
The function should use 3D coordinates (`x`,`y`,`z`) and/or texture coordinates
(`u`,`v`) and generate a color in `color`.

* `x`,`y`,`z` &ndash; coordiates of a point on a sphere, thus *x,y,z* &#x2208; [-1,1].
* `u`,`v` &ndash; texture coordiates of a pixel on the texture, *u,v* &#x2208; [0,1].
* `color` &ndash; a `THREE.Color` object that must be set by the noise function.
An additional property `color.a` could be set for encoding alpha transparency.

The generator does not require that the final value of `color` is still a
`THREE.Color` object. However, it is required that `color` has properties
*r,g,b* &#x2208; [0,1] and optional property *a* &#x2208; [0,1]