# Texture generator API

* [Generators](#generators)
	- <small>[equitexture](#equitexture)
	- [equicanvas](#equicanvas)
	- [equimaterial](#equimaterial)</small>
* [Noisers](#noisers)
	- <small>[noise](#noise)
	- [noiseSeed](#noiseseed)</small>
* [Patterns](#patterns)


# Generators

## equitexture

Function. Generates an equirectangular texture and returns it a
[THREE.CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture)
object. All parameters are optional and can be passed in any order.

```js
equitexture( pattern, width, canvas )
```

where:

* `pattern` &ndash; optional pattern function that defines the pattern of the texture.
See [patterns](#patterns) for details. If not provided, a spherical
grid is used. Texture's `minFilter` is set to [THREE.LinearFilter](https://threejs.org/docs/#api/en/constants/Textures),
as all MIPMAP filters create a seam and destroy the poles. Texture's `mapping`
is set to [THREE.EquirectangularReflectionMapping](https://threejs.org/docs/#api/en/constants/Textures),
so that [`equimaterial`](#equimaterial) knows this texture must be patched.

* `width` &ndash; optional integer for the texture width in pixels, the height
is automatically set to half width. If not provided, the canvas width is used.
If the canvas is also not provided, a default value 1024 is used.

* `canvas` &ndash; optional HTML canvas element to use for rendering. If not
provided, a new canvas is created.


	
## equicanvas

Function. Generates a canvas with an equirectangular texture and returns it as
an [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
object. All parameters are optional and can be passed in any order.

```js
equicanvas( pattern, width, canvas )
```

where:

* `pattern` &ndash; optional pattern function that defines the pattern of the texture.
See [patterns](#patterns) for details. If not provided, a spherical
grid is used.

* `width` &ndash; optional integer for the texture width in pixels, the height
is automatically set to half width. If not provided, the canvas width is used.
If the canvas is also not provided, a default value 1024 is used.

* `canvas` &ndash; optional HTML canvas element to use for rendering. If not
provided, a new canvas is created.



## equimaterial

Function. Patches the shader of a [THREE.Material](https://threejs.org/docs/#api/en/materials/Material)
descendants with non-customized shaders. This patch reduces the texture
zigzagging near the poles. The return value is the modified material.

```js
equimaterial( material )
```

where:

* `material` &ndash; a non-shaderal `THREE.Material` that must be patched.

| Maps | Status |
| :-- | :-- |
| alphaMap | |
| anisotropyMap | |
| aoMap | |
| **bumpMap** | Patched |
| clearcoatNormalMap | |
| clearcoatMap | |
| clearcoatRoughnessMap | |
| displacementMap | |
| emissiveMap | |
| **envMap** | Supports natively equirectangular textures |
| gradientMap | |
| iridescenceMap | |
| iridescenceThicknessMap | |
| lightMap | |
| **map** | Patched |
| matcap | |
| metalnessMap | |
| normalMap | |
| roughnessMap | |
| sheenColorMap | |
| sheenRoughnessMap | |
| specularMap | |
| specularColorMap | |
| specularIntensityMap | |
| thicknessMap | |
| transmissionMap | |



# Noisers

## noise

Function. A 3D noise function based on [THREE.SimplexNoise](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/SimplexNoise.js)
addon. It returns a pseudo-random number &#x2208; [-1,1] for coordinates
(`x`,`y`,`z`) of a point in 3D space.

```js
noise( x, y, z )
```

where:

* `x` &ndash; x coordinate of 3D point.
* `y` &ndash; x coordinate of 3D point.
* `z` &ndash; z coordinate of 3D point.


## noiseSeed

Command. Sets the behavior of the [noise](#noise) function. If the optional
parameter `seed` is an integer number, the next generated pseudo-random numbers
are based on this seed. Otherwise the current timestamp is used as a seed.

```js
noiseSeed( seed )
```

where:

* `seed` &ndash; an optional integer number.



# Patterns

A pattern function is a user-defind function that generates a specific pattern.
The function should use 3D coordinates (`x`,`y`,`z`) and/or texture coordinates
(`u`,`v`) and generate a color in `color`.

```js
function pattern( x, y, z, color, u, v ) {
	// use (x,y,z) or (u,v)
	// calculate color (r,g,b) or (r,g,b,a)
	// store result in color
}
```

where:

* `x`,`y`,`z` &ndash; coordiates of a point on a sphere, *x,y,z* &#x2208; [-1,1].
* `u`,`v` &ndash; texture coordiates of a pixel on the texture, *u,v* &#x2208; [0,1].
* `color` &ndash; a [THREE.Color](https://threejs.org/docs/#api/en/math/Color)
object that must be set by the pattern function. An additional property `color.a`
could be set for encoding alpha transparency. It is not required for the final
value of `color` to be a `THREE.Color`. It is required that `color` has properties
`color.r`, `color.g`, `color.r` and optionally `color.a`, all &#x2208; [0,1].