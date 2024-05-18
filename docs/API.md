# Texture generator API

The code of equirectangular texture generator is split into three modules. They
can be used standalone or together through [texture-generator.js](#texture-generatorjs):

* [generator.js](#generatorjs) - equirectangular texture generator
* [noise.js](#noisejs) - seeded noise functions
* [material.js](#materialjs) - material patcher


# `texture-generator.js`

Module. Collects exports from [noise.js](#noisejs), [generator.js](#generatorjs)
and [material.js](#materialjs) and reexports them. The file is used to import all
functions via a single import.




# `generator.js`

Module. Implements the equirectangular texture generator and provides the result
as a texture or as a canvas. The pattern of the texture is a callback function.

## equitexture

Function. Generates an equirectangular texture. Returns it a
[THREE.CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture)
object with turned off mipmaps. All parameters are optional and can be passed in
any order, except for width and height.

```js
equitexture( pattern )
equitexture( pattern, width )
equitexture( pattern, width, height )
equitexture( pattern, width, height, canvas )
equitexture( pattern, width, height, canvas, deferred )
equitexture( pattern, canvas )
```

where:

* `pattern` &ndash; optional user-defined [callback function](#pattern-function)
that calculates the pattern of the texture at a point in 3D space. If not provided,
a [default dotted pattern](../examples/default-pattern.html) is used.

* `width` &ndash; optional integer number for the texture width in pixels. If
not provided, the canvas width is used. If the canvas is also not provided, a
default value 1024 is used.

* `height` &ndash; optional integer number for the texture height in pixels.
If not provided, the height is automatically set to half width. If the width is
not provided, the canvas height is used. If the canvas is also not provided, a
default value 512 is used.

* `canvas` &ndash; optional [HTML canvas]([HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement))
element to use for rendering. If not provided, a new hidden canvas is created.

* `deferred` &ndash; optional boolean. If it is `true` the texture generation
is deferred and the function returns immediately. If not provided, the whole
texture is generated. See [deferred textures](#deferred-textures) for more details.


	
## equicanvas

Function. Generates a canvas with an equirectangular texture. Returns it as an
[HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
object. All parameters are optional and can be passed in any order, except for width and height.

```js
equicanvas( pattern )
equicanvas( pattern, width )
equicanvas( pattern, width, height )
equicanvas( pattern, width, height, canvas )
equicanvas( pattern, width, height, canvas, deferred )
equicanvas( pattern, canvas )
```

where the parameters are the same as in [equitexture](#equitexture).


## Pattern function

Callback function. This is a user-defind function that generates a specific pattern.
The function calculates the color of a 3D point in 3D space, based on its (x,y,z)
coordinates, its texture coordinates (u,v), its pixel coordinates (px,py) and the
texture size (width,height). 

```js
pattern( x,y,z, color )
pattern( x,y,z, color, u,v )
pattern( x,y,z, color, u,v, px,py )
pattern( x,y,z, color, u,v, px,py, width,height )
```

where:

* `x`,`y`,`z` &ndash; floats; coordiates of a point on a sphere, *x,y,z* &#x2208; [-1,1].
* `color` &ndash; [THREE.Color](https://threejs.org/docs/#api/en/math/Color); 
it must be set by the pattern function. An additional property `color.a`
could be set for encoding alpha transparency. It is not required for the final
value of `color` to be a `THREE.Color`. It is required that `color` has properties
`color.r`, `color.g`, `color.r` and optionally `color.a`, all &#x2208; [0,1].
* `u`,`v` &ndash; floats; texture coordiates of a pixel on the texture, *u,v* &#x2208; [0,1].
* `px`,`py` &ndash; integers; coordiates of a pixel in the texture, *px* &#x2208; [0,width-1], *py* &#x2208; [0,height-1].
* `width`,`height` &ndash; integers; size of the texture in pixels.


## Deferred textures

A deferred texture is one that is initially created empty, and is generated
later on. Deferred generation could be implemented as a seriece of small updates.
This is usually applied for large textures to prevent prolonged blocking of user
interface.

A deferred generation is set by `true` parameter of [equitexture](#equitexture)
or [equicanvas](#equicanvas). The actual generation is activated with the method
`update`.

```js
texture.update( ms )
canvas.update( ms )
```

where:

* `ms` - options number; the number of [milliseconds ](https://en.wikipedia.org/wiki/Millisecond)
to spend on generating. If not provided, a 100 ms time span is used (i.e. 0.1 seconds).
At least one full row of pixels is generated at each update. If the texture is
completely generated, `update` does nothing. This is an [example of deferred texture](../examples/deferred-generation).





# `noise.js`

Module. Defines a seedable 3D noise function, that is used by variour texture
patterns. It is based on [THREE.SimplexNoise](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/SimplexNoise.js)
and [THREE.MathUtils.seededRandom](https://threejs.org/docs/#api/en/math/MathUtils.seededRandom).


## noise

Function. A 3D noise function. Returns a pseudo-random number &#x2208; [-1,1]
for a point in 3D space.

```js
noise( x, y, z )
```

where:

* `x` &ndash; float; x coordinate of 3D point.
* `y` &ndash; float; y coordinate of 3D point.
* `z` &ndash; float; z coordinate of 3D point.


## noiseSeed

Command. Sets the behavior of the [noise](#noise) function. If the optional
seed is an integer number, the next generated pseudo-random numbers are based on
this seed. Otherwise the current timestamp is used as a seed to achieve a kind
of randomization.

```js
noiseSeed( )
noiseSeed( seed )
```

where:

* `seed` &ndash; integer, optional; the seed vale for future pseudo-random numbers



# `material.js`

Module. Used to patch the shader of a material to reduce geometrical artifacts.


## `equimaterial`

Function. Patches the shader of a [THREE.Material](https://threejs.org/docs/#api/en/materials/Material)
descendants. This patch reduces the texture zigzagging near the poles. Returns 
the modified material. The function may not work for materials with user-provided
shaders.

```js
equimaterial( material )
```

where:

* `material` &ndash; a descendant of `THREE.Material` that must be patched. Only
`map` and `bumpMap` textures are patched; `envMap` does not need patching; and
all the rest maps are not patched (i.e. `alphaMap`, `anisotropyMap`, `aoMap`,
`clearcoatNormalMap`, `clearcoatMap`, `clearcoatRoughnessMap`, `displacementMap`,
`emissiveMap`, `gradientMap`, `iridescenceMap`, `iridescenceThicknessMap`,
`lightMap`, `matcap`, `metalnessMap`, `normalMap`, `roughnessMap`, `sheenColorMap`,
`sheenRoughnessMap`, `specularMap`, `specularColorMap`, `specularIntensityMap`,
`thicknessMap`, `transmissionMap`).
