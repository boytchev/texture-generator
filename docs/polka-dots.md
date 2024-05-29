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
import * as PET from "pet/patterns/polka-dots.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 512
* `height` &ndash; texture height in pixels, default 256
* `layout` &ndash; dot layout number [1,*$layouts*], default 9
* `scale` &ndash; relative dot size [0,100], default 50
* `blur` &ndash; smoothness of dots edges [0,100], default 20
* `color` &ndash; color of dots, default 0x000000 (black)
* `background` &ndash; color of background, default 0xFFFFFF (white)

Additional system parameter:

* `$layouts` &ndash; the number of supported layouts, currently 20


### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/polka-dots.html](../online/polka-dots.html)


### Source

[src/patterns/polka-dots.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/polka-dots.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>