# Predefined patterns

* [Camouflage](#camouflage) &ndash; 4-color spots that resembles designs of camouflage
* [Concrete](#concrete) &ndash; imitates the grainy surface of concrete
* [Isolines](#isolines) &ndash; generates looped concentric curves


Each predefined pattern is implemented as JS module file, exporting the same set of functions:
* **`pattern`** &ndash; the pattern function
* **`options`** &ndash; converter from user-defined options to internal pettern-specific options
* **`share`** &ndash; converter from user-defined options to shareable URL with options parameters
* **`info`** &ndash; general info about the pattern, like name, description and so on

The values of all colors are integers &#x2208; [0,16777215] (i.e. [0x000000,0xFFFFFF]).




# Camouflage
<img src="images/camouflage.jpg">

[<img src="images/camouflage-1.png">](https://boytchev.github.io/texture-generator/online/camouflage.html?a=12762792&b=10258782&c=9610101&d=7435617&g=0&h=0&r=9&s=50&t=0) [<img src="images/camouflage-2.png">](https://boytchev.github.io/texture-generator/online/camouflage.html?a=12762792&b=10258782&c=9610101&d=7435617&g=22&h=194&r=9&s=73&t=4)  [<img src="images/camouflage-3.png">](https://boytchev.github.io/texture-generator/online/camouflage.html?a=16776960&b=0&c=16187392&d=5234974&g=-18&h=0&r=9&s=11&t=-2) 

#### Options:

* `colorA` (`a`) &ndash; integer; the top-most camouflage color
* `colorB` (`b`) &ndash; integer; the secondary camouflage color
* `colorC` (`c`) &ndash; integer; the tertiary camouflage color
* `colorD` (`d`) &ndash; integer; the bottom-most camouflage color
* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `size` (`s`) &ndash; number; the visual size of the pattern &#x2208; [0,100]
* `hue` (`h`) &ndash; number; hue offset of all colors &#x2208; [-360&deg;,360&deg;]
* `saturation` (`t`) &ndash; number; saturation offset of all colors &#x2208; [-100%,100%]
* `brightness` (`g`) &ndash; number; brightness offset of all colors &#x2208; [-100%,100%]

#### Defaults:

```js
options = {
	colorA: 0xc2bea8,
	colorB: 0x9c895e,
	colorC: 0x92a375,
	colorD: 0x717561,
	resolution: 9, // 512x256
	size: 50,
	hue: 0,
	saturation: 0,
	brightness: 0,
}
```





# Concrete
<img src="images/concrete.jpg">

[<img src="images/concrete-1.png">](https://boytchev.github.io/texture-generator/online/concrete?h=100&r=9&s=50) [<img src="images/concrete-2.png">](https://boytchev.github.io/texture-generator/online/concrete?h=100&r=9&s=78) 

#### Options:

* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `size` (`s`) &ndash; number; the visual size of the pattern &#x2208; [0,100]
* `height` (`h`) &ndash; number; concrete bumps height &#x2208; [0%,100%]

#### Defaults:

```js
options = {
	resolution: 9, // 512x256
	size: 50,
	height: 100,
}
```





# Isolines
<img src="images/isolines.jpg">

[<img src="images/isolines-1.png">](https://boytchev.github.io/texture-generator/online/isolines?a=50&b=10&d=20&c=16777215&k=0&r=9&s=50) [<img src="images/isolines-2.png">](https://boytchev.github.io/texture-generator/online/isolines?a=11&b=65&d=20&c=16777215&k=1443&r=9&s=81)  [<img src="images/isolines-3.png">](https://boytchev.github.io/texture-generator/online/isolines?a=22&b=0&d=15&c=13574176&k=16777215&r=9&s=100) 

#### Options:

* `color` (`c`) &ndash; integer; the color of isolines
* `backgroundColorB` (`k`) &ndash; integer; the color of background
* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `size` (`s`) &ndash; number; the visual size of the pattern &#x2208; [0,100]
* `density` (`d`) &ndash; number; density of isolines &#x2208; [0,100]
* `blur` (`b`) &ndash; number; blur factor of isoline edges &#x2208; [0,100]
* `balance` (`a`) &ndash; number; balance of isoline thickness and gaps &#x2208; [0,100]

#### Defaults:

```js
options = {
	color: 0xffffff,
	backgroundColor: 0x000000,
	resolution: 9, // 512x256
	size: 50,
	density: 20,
	blur: 10,
	balance: 50,
}
```










