<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## concrete
<img src="images/concrete.jpg">

This texture immitates the grains of a rough concrete 
surface. It is designed to be used as bump map. Click on a
snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/concrete.html?w=1024&h=512&s=40&d=100&b=100">
		<img src="images/concrete-1.png">
	</a>

	<a class="style-block nocaption" href="../online/concrete.html?w=1024&h=512&s=89&d=55&b=100">
		<img src="images/concrete-2.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/concrete.js";
:
params = {
	width: 512,
	height: 256
	scale: 50,
	density: 100,
	bump: 100
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/concrete.html).

```php
?h=256&w=512&s=50&d=100&b=100
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `scale` (`s`) &ndash; pattern size (number &#x2208; [0,100])
* `density` (`d`) &ndash; pattern density (number &#x2208; [0,100])
* `bump` (`b`) &ndash; bump height (number &#x2208; [0,100])


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

[online/concrete.html](../online/concrete.html)

### Source

[src/patterns/concrete.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/concrete.js)


