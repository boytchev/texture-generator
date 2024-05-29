<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Camouflage
<img src="images/camouflage.jpg">

This texture immitates the design of camouflage patters in
military clothes and vehicles. It overlaps four-color spots.
The generated texture is intended for color maps. Click on
a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/camouflage.html?w=512&h=256&s=50&a=12762792&b=10258782&c=9610101&d=7435617&u=0&t=0&g=0">
		<img src="images/camouflage-1.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?w=1024&h=512&s=73&a=12762792&b=10258782&c=9610101&d=7435617&u=194&t=4&g=22">
		<img src="images/camouflage-2.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?w=1024&h=512&s=11&a=16776960&b=0&c=16187392&d=5234974&u=0&t=-2&g=-18">
		<img src="images/camouflage-3.png">
	</a>

</p>


### Code template

Code template of parameters with their default values.

```js
import * as PET from "pet/patterns/camouflage.js";
:
model.material.map = PET.texture( );
PET.material( model.material );
```


### Parameters

The parameters of the texture generator are:

* `width` &ndash; texture width in pixels, default 512
* `height` &ndash; texture height in pixels, default 256
* `scale` &ndash; pattern size [0,100], default 50
* `colorA` &ndash; top color, default 0xC2BEA8
* `colorB` &ndash; second color, default 0x9C895E
* `colorC` &ndash; third color, default 0x92A375
* `colorD` &ndash; bottom color, default 0x717561
* `hue` &ndash; hue shift [-360,360], default 0
* `saturation` &ndash; saturation shift [-100,100], default 0
* `brightness` &ndash; brightness shift [-100,100], default 0



### API

All texture modules share the same API.

* `pattern( x, y, z, color, options )` &ndash; pattern implementation
* `texture( {params} )` &ndash; generator for a texture with given parameters
* `defaults` &ndash; object with default parameters
* `material( ... )` &ndash; material shader patcher


### Online generator

[online/camouflage.html](../online/camouflage.html)

### Source

[src/patterns/camouflage.js](https://github.com/boytchev/texture-generator/blob/main/src/patterns/camouflage.js)


		
<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>