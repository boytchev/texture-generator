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

	<a class="style-block nocaption" href="../online/zebra-lines.html?w=1024&h=512&s=80&a=0">
		<img src="images/zebra-lines-1.png">
	</a>

	<a class="style-block nocaption" href="../online/zebra-lines.html?w=1024&h=512&s=30&a=45">
		<img src="images/zebra-lines-2.png">
	</a>

	<a class="style-block nocaption" href="../online/zebra-lines.html?w=1024&h=512&s=94&a=-45">
		<img src="images/zebra-lines-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/zebra-lines.js";
:
params = {
	width: 1024,
	height: 512,
	scale: 60,
	angle: 0,
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/zebra-lines.html).

```php
?w=1024&h=512&s=60&a=0
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `scale` (`s`) &ndash; pattern size (number &#x2208; [0,100])
* `angle` (`a`) &ndash; pattern tilt angle (number &#x2208; [-180,180])


### API

All texture modules share the same API. Note that *parameters*
are the user-friendly set pattern characteristics, while
*options* are the calculation-friendly version of the same
characteristics, used internally by `pattern`.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( params )` &ndash; generates a texture with given parameters
* `options( params )` &ndash; converts parameters into internal options
* `share( params )` &ndash; generates URL with the given parameters
* `info` &ndash; general info for the generator, contains its `name`
* `fix( ... )` &ndash; reexport from core's equimaterial


### Online generator

[online/zebra-lines.html](../online/zebra-lines.html)

### Source

[src/patterns/zebra-lines.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/zebra-lines.js)


