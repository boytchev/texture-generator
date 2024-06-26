<img class="logo" src="../assets/logo/logo-big.png">


# Procedural Equirectangular Textures

## Tutorial



### Contents

* [Introduction](#introduction)
* [Using a predefined generator](#using-a-predefined-generator)
* [Setting generator properties](#setting-generator-properties)
* [Generating multiple textures](#generating-multiple-textures)
* [Using multiple generators](#using-multiple-generators)
* [Deferred texture generator](#deferred-texture-generator)



### Introduction

This is a short tutorial of how to use the predefined
equirectangular generators (pet-gens) in your JS code.

The tutorial is for loading the generators via a CDN.
This is to make it easy to use them without installing
anything additional.

An `importmap` is used to define the locations of both
Three.js and the generators. All pet-gens rely on Three.js
and they access it via the keyword `three`. The importmap
when using Three.js r164 and Pet-gen v1.7.0 looks like this:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js",
    "pet/": "https://cdn.jsdelivr.net/npm/pet-gen@1.7.0/src/"
  }
}
</script>
```

Note: Users with node.js and installed packages need
no importmaps.

Once the importmap is defined, Three.js and the generator
must be imported. If the generator for isolines is used,
the imports are:

```js
import * as THREE from "three";
import * as PET from "pet/patterns/isolines.js";
```

Other names of generators are in the [list of generators](developers.html#generators).


### Using a predefined generator

The easiest way to use a generator is to rely on its
default values. The following fragment shows how to
assign the generator to a texture in object material:

```js
var map = PET.texture( );

var model = new THREE.Mesh(
    new THREE.SphereGeometry( 1 ),
    new THREE.MeshBasicMaterial( { map: map } )
);

PET.material( model );
```

`PET.texture` generates the texture, and `PET.material` is
optional &ndash; it may improve the texture appearance in
some cases ([more details](about.md).

Here is a complete example of using the Isolines generator
with its default values. The example uses [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) to
rotate the a sphere with isolines texture on it:

[Tutorial Example 1](../examples/tutorial-example-1.html)

[<img src="../examples/snapshots/tutorial-example-1.jpg">](../examples/tutorial-example-1.html)


### Setting generator properties

TO DO.

### Generating multiple textures

TO DO.

### Using multiple generators

TO DO.

### Deferred texture generator

TO DO.




<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>