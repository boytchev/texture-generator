<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Stars
<img src="images/stars.jpg">

This texture renders a sky with stars. Because this version
works on a line-per-line basis, the distribution and shape
of stars near the poles are not that good. The generated
texture is intended for color maps. Click on a snapshot to
open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/stars.html?width=1024&height=512&density=19&brightness=24&variation=0&color=16774640&background=96">
		<img src="images/stars-1.png">
	</a>

	<a class="style-block nocaption" href="../online/stars.html?width=1024&height=512&density=100&brightness=30&variation=0&color=16774640&background=25343">
		<img src="images/stars-2.png">
	</a>

	<a class="style-block nocaption" href="../online/stars.html?width=1024&height=512&density=50&brightness=50&variation=100&color=16733440&background=16777205">
		<img src="images/stars-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/stars.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 1024
* `height` &ndash; texture height in pixels, default 512
* `density` &ndash; density of stars [0,100], default 20
* `brightness` &ndash; brightness of stars [0,100], default 20
* `variation` &ndash; hue variation [0,100], default 0
* `color` &ndash; color of stars, default 0xFFF5F0 (light blue)
* `background` &ndash; color of sky, default 0x000060 (dark blue)

Hue *variation* is noticeable when the color of stars is not pure white.


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/stars.html](../online/stars.html)


### Source

[src/patterns/stars.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/stars.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>