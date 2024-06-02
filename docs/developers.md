<img class="logo" src="../assets/logo/logo.png">

# Procedural Equirectangular Textures

The source code of the project is [hosted on GitHub](https://github.com/boytchev/texture-generator).
It is licenced under [MIT licence](https://github.com/boytchev/texture-generator?tab=MIT-1-ov-file#readme).


## Generators

The project manages a collection of individual pattern generators
distributed as JS modules. Each generator supports cutomization
parameters. 

* [camouflage.js](camouflage.md)
* [cave-art.js](cave-art.md)
* [clouds.js](clouds.md)
* [concrete.js](concrete.md)
* [entangled.js](entangled.md)
* [isolines.js](isolines.md)
* [marble.js](marble.md)
* [polka-dots.js](polka-dots.md)
* [simplex-noise.js](simplex-noise.md)
* [stars.js](stars.md)
* [water-drops.js](water-drops.md)
* [zebra-lines.js](zebra-lines.md)


## Low-level API

The core of all generators is also available as JS modules.
They could be used is one wants to build own generator of
equirectangular textures.

* [texture-generator.js](api-texture-generator.md)
* [generator.js](api-generator.md)
* [material.js](api-material.md)
* [noise.js](api-noise.md)

	
## Tutorials

* [Using generators](#) - to do
* [Using low-level API](#) - to do

	
## Help needed

If you are experinced or willing to help, here is a list of
several major to-do items:

* Using TSL to modify the material shaders
* Using WASM (or other technology) to speed up texture generation
* Converting texture designs to shaders


<div class="footnote">
	<a href="https://github.com/boytchev/texture-generator" >@GitHub</a> &middot;
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>