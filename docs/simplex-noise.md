<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Simplex noise
<img src="images/simplex-noise.jpg">

This texture renders [Simplex noise](https://en.wikipedia.org/wiki/Simplex_noise)
pattern. Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/simplex-noise.html?w=512&h=256&s=50&b=50&c=16777215&k=0">
		<img src="images/simplex-noise-1.png">
	</a>

	<a class="style-block nocaption" href="../online/simplex-noise.html?w=512&h=256&s=60&b=75&c=16766208&k=0">
		<img src="images/simplex-noise-2.png">
	</a>

	<a class="style-block nocaption" href="../online/simplex-noise.html?w=512&h=256&s=86&b=44&c=13893887&k=11592439">
		<img src="images/simplex-noise-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/simplex-noise.js";
:
params = {
	width: 512,
	height: 256,
	scale: 50,
	balance: 50,
	color: 0xffffff,
	backgroundColor: 0x000000
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/simplex-noise.html).

```php
?w=512&h=256&s=50&b=50&c=16777215&k=0
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `scale` (`s`) &ndash; pattern size (number &#x2208; [0,100])
* `balance` (`s`) &ndash; balance of both colors (number &#x2208; [0,100])
* `color` (`c`) &ndash; main color (integer)
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
* `info` &ndash; general info for the generator, contains its `name`
* `fix( ... )` &ndash; reexport from core's equimaterial


### Online generator

[online/simplex-noise.html](../online/simplex-noise.html)

### Source

[src/patterns/simplex-noise.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/simplex-noise.js)


