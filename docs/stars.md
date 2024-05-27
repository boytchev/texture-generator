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

	<a class="style-block nocaption" href="../online/stars.html?w=1024&h=512&d=19&b=24&v=0&c=16774640&k=96">
		<img src="images/stars-1.png">
	</a>

	<a class="style-block nocaption" href="../online/stars.html?w=1024&h=512&d=100&b=30&v=0&c=16774640&k=25343">
		<img src="images/stars-2.png">
	</a>

	<a class="style-block nocaption" href="../online/stars.html?w=1024&h=512&d=50&b=50&v=100&c=16733440&k=16777205">
		<img src="images/stars-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/stars.js";
:
params = {
	width: 512,
	height: 256,
	density: 30,
	brightness: 50,
	variation: 0,
	color: 0xfff5f0,
	backgroundColor: 0x000000
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/stars.html).

```php
?w=1024&h=512&d=20&b=20&v=0&c=16774640&k=96
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `density` (`d`) &ndash; density of stars (number &#x2208; [0,100])
* `brightness` (`b`) &ndash; brightness of stars (number &#x2208; [0,100])
* `variation` (`v`) &ndash; hue variation when the color is not pure white (number &#x2208; [0,100])
* `color` (`c`) &ndash; color of stars (integer)
* `backgroundColor` (`k`) &ndash; color of sky (integer)


### API

All texture modules share the same API. Note that *parameters*
are the user-friendly set pattern characteristics, while
*options* are the calculation-friendly version of the same
characteristics, used internally by `pattern`.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( params )` &ndash; generates a texture with given parameters
* `options( params )` &ndash; converts parameters into internal options
* `share( params )` &ndash; generates URL with the given parameters
* `info` &ndash; general info for the generator, contains its `name`, and 'lightIntensity' (used only by the online editor)
* `fix( ... )` &ndash; reexport from core's equimaterial


### Online generator

[online/stars.html](../online/stars.html)

### Source

[src/patterns/stars.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/stars.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>