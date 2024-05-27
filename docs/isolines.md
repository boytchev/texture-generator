<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Isolines
<img src="images/isolines.jpg">

This texture renders looped concentric lines like
[contour lines](https://en.wikipedia.org/wiki/Contour_line)
found in topographic and meteorological maps. The generated
texture is intended for color maps. Click on a snapshot to
open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/isolines.html?w=1024&h=512&s=60&b=10&d=20&a=50&c=16777215&k=0">
		<img src="images/isolines-1.png">
	</a>

	<a class="style-block nocaption" href="../online/isolines.html?w=1024&h=512&s=80&b=45&d=14&a=16&c=16777215&k=3148976">
		<img src="images/isolines-2.png">
	</a>

	<a class="style-block nocaption" href="../online/isolines.html?w=1024&h=512&s=100&b=3&d=6&a=28&c=13041664&k=16777215">
		<img src="images/isolines-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/isolines.js";
:
params = {
	width: 1024,
	height: 512,
	scale: 50,
	density: 20,
	blur: 10,
	balance: 50,
	color: 0xffffff,
	backgroundColor: 0x000000
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/isolines.html).

```php
?w=1024&h=512&s=50&b=10&d=20&a=50&c=16777215&k=0
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `scale` (`s`) &ndash; pattern size (number &#x2208; [0,100])
* `density` (`d`) &ndash; density of lines (number &#x2208; [0,100])
* `blur` (`b`) &ndash; smoothness of lines edges (number &#x2208; [0,100])
* `balance` (`s`) &ndash; thickness of lines (number &#x2208; [0,100])
* `color` (`c`) &ndash; color of lines (integer)
* `backgroundColor` (`k`) &ndash; color of background (integer)


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

[online/isolines.html](../online/isolines.html)

### Source

[src/patterns/isolines.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/isolines.js)


