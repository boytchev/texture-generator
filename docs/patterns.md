
## Pattern generators

The pattern generators are individual JS modules that generate specific equirectangular
textures. They are the backbones of the [online generators](../online/index.md).
All pattern generators share the same API.

?b=50&c=16777215&k=0&r=9&s=52
?b=78&c=16766208&k=0&r=9&s=57
?b=44&c=13893887&k=11592439&r=9&s=86

#### Options:

* `color` (`c`) &ndash; integer; the color of simplex-noise
* `backgroundColor` (`k`) &ndash; integer; the color of background
* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `size` (`s`) &ndash; number; the visual size of the pattern &#x2208; [0,100]
* `balance` (`a`) &ndash; number; balance of foreground and background colors &#x2208; [0,100]

#### Defaults:

```js
options = {
	color: 0xffffff,
	backgroundColor: 0x000000,
	resolution: 9, // 512x256
	size: 30,
	balance: 50,
}
```







## Stars
<img src="images/stars.jpg">

[<img src="images/stars-1.png">](https://boytchev.github.io/texture-generator/online/stars?b=50&c=16774640&d=30&k=96&r=9&v=0) [<img src="images/stars-2.png">](https://boytchev.github.io/texture-generator/online/stars?b=100&c=16774640&d=100&k=25343&r=9&v=0)  [<img src="images/stars-3.png">](https://boytchev.github.io/texture-generator/online/stars?b=100&c=16733440&d=84&k=16777205&r=9&v=100) 

#### Options:

* `color` (`c`) &ndash; integer; the color of stars
* `backgroundColor` (`k`) &ndash; integer; the color of the sky
* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `density` (`d`) &ndash; number; the density (amount) of stars &#x2208; [0,100]
* `brightness` (`b`) &ndash; number; the brightness of stars &#x2208; [0,100]
* `variation` (`v`) &ndash; number; hue variation of stars color &#x2208; [0,100]

#### Defaults:

```js
options = {
	starsColor: 0xfff5f0,
	skyColor: 0x000060,
	resolution: 9,
	density: 30,
	brightness: 50,
	variation: 0,
}
```






## Zebra lines
<img src="images/zebra-lines.jpg">

[<img src="images/zebra-lines-1.png">](https://boytchev.github.io/texture-generator/online/zebra-lines?a=0&r=9&s=80) [<img src="images/zebra-lines-2.png">](https://boytchev.github.io/texture-generator/online/zebra-lines?a=45&r=9&s=30)  [<img src="images/zebra-lines-3.png">](https://boytchev.github.io/texture-generator/online/zebra-lines?a=-45&r=9&s=94	) 

#### Options:

* `resolution` (`r`) &ndash; integer; the resolution of the texture is 2<sup>r</sup>&times;2<sup>r-1</sup>
* `size` (`s`) &ndash; number; the visual size of the pattern &#x2208; [0,100]
* `angle` (`a`) &ndash; number; the angle of pattern tilt &#x2208; [-180&deg;,180&deg;]

#### Defaults:

```js
options = {
	resolution: 9, // 512x256
	size: 50,
	angle: 0,
}
```



