<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Scream
<img src="images/scream.jpg">

This texture attempts imitate the curves from the famous
painting ["The Scream"](https://en.wikipedia.org/wiki/The_Scream)
by Edvard Munch. The generated texture is intended for color
maps. Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/scream.html?width=1024&height=512&scale=73&color=10020859&background=397464">
		<img src="images/scream-1.png">
	</a>

	<a class="style-block nocaption" href="../online/scream.html?width=2048&height=1024&scale=100&color=15790176&background=13668496">
		<img src="images/scream-2.png">
	</a>

	<a class="style-block nocaption" href="../online/scream.html?width=2048&height=1024&scale=61&color=11405577&background=16777215">
		<img src="images/scream-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/scream.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 1024
* `height` &ndash; texture height in pixels, default 512
* `scale` &ndash; pattern size [0,100], default 60
* `color` &ndash; main color, default 0x4545D3 (yellow)
* `background &ndash; secondary color, default 0xF0F8FF (tan)


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/scream.html](../online/scream.html)


### Source

[src/patterns/scream.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/scream.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>