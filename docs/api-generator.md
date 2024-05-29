<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures

## generator.js

Module. Implements the equirectangular texture generator and
provides the result as a texture. The pattern of the texture
is computed by a user-defined callback function. 

* API Reference<br>
&nbsp; [texture](#texture)<br>
&nbsp; [[ ].update](#update)<br>
&nbsp; [[ ].border](#border)
* Generation customization<br>
&nbsp; [Pattern functions](#pattern-function)<br>
&nbsp; [Pattern options](#pattern-options)<br>
&nbsp; [Deferred generation](#deferred-generation)




### texture(...)

Function. Generates an equirectangular texture. Mipmaps are
turned off. Parameters of *texture* can be passed in any order.

```js
texture( pattern, {options}, {canvas}, {deferred} )
```

where:

* `pattern` &ndash; user-defined callback pattern function that computes the texture
* `options` &ndash; optional object with pattern-specific internal options
* `canvas` &ndash; optional
			[HTML canvas]([HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement))
			for rendering; if not provided, a new canvas is created
* `deferred` &ndash; optional boolean whether the texture
			generation is [deferred](#deferred-texture)

The function returns a [THREE.CanvasTexture](https://threejs.org/docs/#api/en/textures/CanvasTexture)
object enriched by instance methods: [update](#textureupdate)
and [border](#textureborder).



### [texture].update(...)

Instance method. Added to any texture created by [texture](#texture).
Updates a deferred texture by calculating as much as it is
possible, within a set time constraint. While the texture is
not complete, *update* generates at least one row of texture
pixels per call.

```js
myTexture.update( {ms} )
```

where:

* `ms` &ndash; suggested time in miliseconds to spend on
			generation of textures rows, by default *ms* is 20

This instance method returns a number &#x2208; [0,1] for how
much of the texture generated, i.e. 0.5 means 50%, 1 means 100%.
This includes the newly generated rows. If the texture is
completely generated, no new rows are calculated and the
return value is immediately 1.


### [texture].border(...)

Instance method. Added to any texture created by [texture](#texture).
Draws rows of red pixels in the yet to be generated part of
the texture.

```js
myTexture.border( {rows} )
```

where:

* `rows` &ndash; suggested number of rows, by default *rows* is 1





### Pattern function

Callback function. A pattern function is a user-defind function
that generates a specific pattern. The function calculates
the color of a point in 3D space, based on its (*x,y,z*)
coordinates, its texture coordinates (*u,v*) and its pixel
coordinates (*px,py*). 

```js
pattern( x,y,z, color )
pattern( x,y,z, color, options )
pattern( x,y,z, color, options, u,v )
pattern( x,y,z, color, options, u,v, px,py )
```

where:

* `x`,`y`,`z` &ndash; coordiates of a point on a sphere, *x,y,z* &#x2208; [-1,1].
* `color` &ndash; [THREE.Color](https://threejs.org/docs/#api/en/math/Color); 
its properties *r,g,b* &#x2208; [0,1] must be updated by the pattern function.
An additional color property *a* &#x2208; [0,1] could be set for encoding alpha transparency. 
* `options` &ndash; object; contains customization parameters of the pattern function. 
* `u`,`v` &ndash; optional texture coordiates of a pixel on the texture, *u,v* &#x2208; [0,1].
* `px`,`py` &ndash; optional integer coordiates of a pixel in the texture, *px* &#x2208; [0,*width*-1], *py* &#x2208; [0,*height*-1].

The *width* and *height* of the texture can be retrieved from parameters
*options.width* and *options.height*.




### Pattern options

The generation of each texture may require additional parameters.
They are provided as a JS object, passed to [texture](#texture)
as *options* parameter. The properties of the options are:

* `.$name` &ndash; texture name (text, optional)
* `.width` &ndash; texture width in pixels (integer, optional)
* `.height` &ndash; texture height in pixels (integer, optional)
* ... &ndash; other pattern-specific options
	
If *width* and *height* are not provided, the texture size is
taken from the canvas size. If the canvas is also not provided,
the default size 1024&times;512 pixels is used.

All properties starting with *$* character are not used by
the texture generator, but could be useful for software that
incorporates the generator.


Example:
```js
{
	width: 1024,
	height: 512,
	color: 0xFF80D0,
	scale: 5.1
}
```


### Deferred generation

By default a texture is generated as a single step. For large
or complex textures this blocks the user interface. Deferred 
generation prevents blocking by distributing calculations in
small steps. Calculations are initialized by texture's instance
method [[ ].update](#textureupdate).

Deferred generation sets 
[.needsUpdate](https://threejs.org/docs/#api/en/textures/Texture.needsUpdate)
only when the texture is complete.

A typical implementation of deferred generation that spends
10 ms during each frame and continuously updates the texture
on the screen, may look like this:

```js
map = texture( pattern, true, options );
	
function animationLoop( )
{
	if( map.update(10) < 1 )
		map.needsUpdate = true;
	...
	renderer.render( scene, camera );
}
```

			
### Source

[src/generator.js](https://github.com/boytchev/texture-generator/blob/main/src/generator.js)



<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>