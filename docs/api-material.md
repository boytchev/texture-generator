<img class="logo" src="../assets/logo/logo-big.png">


# Procedural Equirectangular Textures


## material.js

Module. Used to patch the shader of a material to reduce
geometrical artifacts.

* API Reference<br>
&nbsp; [material](#material)


### material(...)

Function. Patches the shader of a mesh material. This reduces
the texture [zigzagging near the poles](about.md##but-wait-there-is-more). 
The function can be applied to both meshes and materials.

```js
material( mesh )
material( material )
```

where:

* `mesh` &ndash; [THREE.Mesh](https://threejs.org/docs/#api/en/objects/Mesh) which material is patched
* `material` &ndash; [THREE.Material](https://threejs.org/docs/?q=mater#api/en/materials/Material) to patch

The function returns the material.

The function avoids patching a material in the following conditions:

* the texture `.mapping` property is not `THREE.EquirectangularReflectionMapping`
* one or more of the patches cannot be applied, because the shader code differs
from what is expected
* the material has unsupported texture map &ndash; currently supported map are
`.map`, `aoMap` and `.bumpMap`, while textures in `envMap` do not need patching
* two or more maps within a single material needs patching

<!--
Unsupported yet texture maps:
`alphaMap`, `anisotropyMap`, `aoMap`,
`clearcoatNormalMap`, `clearcoatMap`, `clearcoatRoughnessMap`, `displacementMap`,
`emissiveMap`, `gradientMap`, `iridescenceMap`, `iridescenceThicknessMap`,
`lightMap`, `matcap`, `metalnessMap`, `normalMap`, `roughnessMap`, `sheenColorMap`,
`sheenRoughnessMap`, `specularMap`, `specularColorMap`, `specularIntensityMap`,
`thicknessMap`, `transmissionMap`
-->



<div class="footnote">
	<a href="#" onclick="window.history.back(); return false;">Back</a>
</div>