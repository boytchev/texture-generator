<img class="logo" src="../assets/logo/logo.png">

# Procedural Equirectangular Textures

The source code of the project is [hosted on GitHub](https://github.com/boytchev/texture-generator).
It is licenced under [MIT licence](https://github.com/boytchev/texture-generator?tab=MIT-1-ov-file#readme).


## Generators

The project manages a collection of individual pattern generators
distributed as JS modules. Each generator supports cutomization
parameters. 

* [camouflage.js](camouflage.md)
* [concrete.js](concrete.md)
* [isolines.js](isolines.md)
* [polka-dots.js](polka-dots.md)
* [simplex-noise.js](simplex-noise.md)
* [stars.js](stars.md)
* [zebra-lines.js](zebra-lines.md)


## Low-level API

The core of all generators is also available as JS modules.
They could be used is one wants to build own generator of
equirectangular textures.

* [generator.js](#generatorjs)
* [noise.js](#noisejs)
* [material.js](#materialjs)
* [texture-generator.js](#texture-generatorjs)
	
	
<div class="footnote">
	<a href="https://github.com/boytchev/texture-generator" >GitHub Repository</a>
	&middot;
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>