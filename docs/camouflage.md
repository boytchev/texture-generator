<img class="logo" src="../assets/logo/logo.png">


# Procedural Equirectangular Textures


## Camouflage
<img src="images/camouflage.jpg">

This texture immitates the design of camouflage patters in
military clothes and vehicles. It overlaps four-color spots.
The generated texture is intended for color maps. Click on
a snapshot to open it online.

<p class="gallery">

	<a class="style-block nocaption" href="../online/camouflage.html?width=512&height=256&scale=50&colorA=12762792&colorB=10258782&colorC=9610101&colorD=7435617&hue=0&saturation=0&brightness=0">
		<img src="images/camouflage-1.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?width=1024&height=512&scale=73&colorA=12762792&colorB=10258782&colorC=9610101&colorD=7435617&hue=194&saturation=4&brightness=22">
		<img src="images/camouflage-2.png">
	</a>

	<a class="style-block nocaption" href="../online/camouflage.html?width=1024&height=512&scale=11&colorA=16776960&colorB=0&colorC=16187392&colorD=5234974&hue=0&saturation=-2&brightness=-18">
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