<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Simplex noise
<img src="images/simplex-noise.jpg">

This texture renders [Simplex noise](https://en.wikipedia.org/wiki/Simplex_noise)
pattern. Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/simplex-noise.html?width=512&height=256&scale=50&balance=50&color=16777215&background=0">
		<img src="images/simplex-noise-1.png">
	</a>

	<a class="style-block nocaption" href="../online/simplex-noise.html?width=512&height=256&scale=60&balance=75&color=16766208&background=0">
		<img src="images/simplex-noise-2.png">
	</a>

	<a class="style-block nocaption" href="../online/simplex-noise.html?width=512&height=256&scale=86&balance=44&color=13893887&background=11592439">
		<img src="images/simplex-noise-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/simplex-noise.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 512
* `height` &ndash; texture height in pixels, default 256
* `scale` &ndash; relative dot size [0,100], default 50
* `balance` &ndash; balance of color and background [0,100], default 50
* `color` &ndash; color of dots, default 0xFFFFFF (white)
* `background` &ndash; color of background, default 0x000000 (black)


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/simplex-noise.html](../online/simplex-noise.html)


### Source

[src/patterns/simplex-noise.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/simplex-noise.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>