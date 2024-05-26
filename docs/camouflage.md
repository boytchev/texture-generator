<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Camouflage
<img src="images/camouflage.jpg">

This texture immitates the design of camouflage patters in
military clothes and vehicles. It overlaps four-color spots.
The generated texture is intended for color maps. Click on
a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/camouflage.html?a=12762792&b=10258782&c=9610101&d=7435617&g=0&h=512&w=1024&s=50&t=0&u=0">
		<img src="images/camouflage-1.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?a=12762792&b=10258782&c=9610101&d=7435617&g=22&h=512&w=1024&s=73&t=4&u=194">
		<img src="images/camouflage-2.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?a=16776960&b=0&c=16187392&d=5234974&g=-18&h=512&w=1024&s=11&t=-2&u=0">
		<img src="images/camouflage-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/camouflage.js";
:
params = {
	width: 512,
	height: 256,
	scale: 50,
	colorA: 0xc2bea8,
	colorB: 0x9c895e,
	colorC: 0x92a375,
	colorD: 0x717561,
	hue: 0,
	saturation: 0,
	brightness: 0
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/camouflage.html).

```php
?w=512&h=256&s=50&a=12762792&b=10258782&c=9610101&d=7435617&u=0&t=0&g=0
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `scale` (`s`) &ndash; pattern size (number &#x2208; [0,100])
* `colorA` (`a`) &ndash; top color (integer)
* `colorB` (`b`) &ndash; second color (integer)
* `colorC` (`c`) &ndash; third color (integer)
* `colorD` (`d`) &ndash; bottom color (integer)
* `hue` (`u`) &ndash; hue shift (number &#x2208; [-360,360])
* `saturation` (`t`) &ndash; saturation shift (number &#x2208; [-100,100])
* `brightness` (`g`) &ndash; brightness shift (number &#x2208; [-100,100])


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

[online/camouflage.html](../online/camouflage.html)

### Source

[src/patterns/camouflage.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/camouflage.js)


