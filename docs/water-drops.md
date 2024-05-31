<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Water drops
<img src="images/water-drops.jpg">

This texture renderes a bump map for simulating water drops
or frosted surfaces. For a better effect a bump map alone is
not sufficient. Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/water-drops.html?width=1024&height=512&scale=64&density=40&color=16777215&background=0">
		<img src="images/water-drops-1.png">
	</a>

	<a class="style-block nocaption" href="../online/water-drops.html?width=2048&height=1024&scale=86&density=58&color=16777215&background=0">
		<img src="images/water-drops-2.png">
	</a>

	<a class="style-block nocaption" href="../online/water-drops.html?width=2048&height=1024&scale=5&density=92&color=16777215&background=0">
		<img src="images/water-drops-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/water-drops.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 1024
* `height` &ndash; texture height in pixels, default 512
* `scale` &ndash; pattern size [0,100], default 50
* `density` &ndash; patter density [0,100], default 40


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/water-drops.html](../online/water-drops.html)


### Source

[src/patterns/water-drops.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/water-drops.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>