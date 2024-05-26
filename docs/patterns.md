
## Pattern generators

The pattern generators are individual JS modules that generate specific equirectangular
textures. They are the backbones of the [online generators](../online/index.md).
All pattern generators share the same API.


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



