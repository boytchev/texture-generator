<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Polka dots
<img src="images/polka-dots.jpg">

This texture arranges dots similar to the [Polka dots](https://en.wikipedia.org/wiki/Polka_dot)
in fashion design. There are 20 layouts for the dots ranging from a single dot,
then vertices of [Platonic soids](https://en.wikipedia.org/wiki/Platonic_solid)
derivatives and vertices of a sunflower seeds arragement (also known as Fibonacci
lattice) with up to 5000 dots. Click on a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/polka-dots.html?w=1024&h=512&l=11&s=65&b=20&c=0&k=16777215">
		<img src="images/polka-dots-1.png">
	</a>

	<a class="style-block nocaption" href="../online/polka-dots.html?w=1024&h=512&l=5&s=80&b=20&c=16777215&k=54798">
		<img src="images/polka-dots-2.png">
	</a>

	<a class="style-block nocaption" href="../online/polka-dots.html?w=1024&h=512&l=10&s=80&b=80&c=15263976&k=5187937">
		<img src="images/polka-dots-3.png">
	</a>

</p>


### Code example

Code template of parameters with their default values.

```js
import { texture, fix } from "pet/patterns/polka-dots.js";
:
params = {
	width: 512,
	height: 256,
	layout: 9,
	scale: 50,
	blur: 20,
	color: 0x000000,
	backgroundColor: 0xffffff
};

model.material.map = texture( params );
model.material = fix( material );
```

### URL example

Code template of default parameters for the [online generator](../online/polka-dots.html).

```php
?w=512&h=256&l=9&s=50&b=20&c=0&k=16777215
```

### Parameters

Description of parameters and their URL names.

* `width` (`w`) &ndash; texture width in pixels (integer)
* `height` (`h`) &ndash; texture height in pixels (integer)
* `layout` (`l`) &ndash; dot layout number (integer &#x2208; [1,20])
* `scale` (`s`) &ndash; relative dot size (number &#x2208; [0,100])
* `blur` (`b`) &ndash; smoothness of dots edges (number &#x2208; [0,100])
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
* `info` &ndash; general info for the generator, contains its `name`, and 'layouts' wth the number of layouts
* `fix( ... )` &ndash; reexport from core's equimaterial


### Online generator

[online/polka-dots.html](../online/polka-dots.html)

### Source

[src/patterns/polka-dots.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/polka-dots.js)


