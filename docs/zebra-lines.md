<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Zebra lines
<img src="images/zebra-lines.jpg">

This texture renders a pattern of regularily spread white and
black lines. They are used in the [zebra analysis](https://en.wikipedia.org/wiki/Zebra_analysis)
to examine the second derivative of smooth surface. The
generated texture is intended for color or environment maps.
Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/zebra-lines.html?width=1024&height=512&scale=80&angle=0">
		<img src="images/zebra-lines-1.png">
	</a>

	<a class="style-block nocaption" href="../online/zebra-lines.html?width=1024&height=512&scale=30&angle=45">
		<img src="images/zebra-lines-2.png">
	</a>

	<a class="style-block nocaption" href="../online/zebra-lines.html?width=1024&height=512&scale=94&angle=-45">
		<img src="images/zebra-lines-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/zebra-lines.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```

### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 512
* `height` &ndash; texture height in pixels, default 256
* `scale` &ndash; pattern size [0,100], default 60
* `angle` &ndash; pattern tilt angle in degrees [-180,180], default 0


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/zebra-lines.html](../online/zebra-lines.html)

### Source

[src/patterns/zebra-lines.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/zebra-lines.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>
