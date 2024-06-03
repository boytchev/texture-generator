
//	Equirectangular Texture Generator - Material Patcher
//
//	material( mesh )		- patches mesh's material's shaders
//	material( material )	- patches material's shaders


import { EquirectangularReflectionMapping } from "three";


const // general patch for vertex shader
	VERTEX_FROM = `void main() {`,
	VERTEX_TO = `
		varying vec3 vEquiNoise_Position;
		void main() {
			vEquiNoise_Position = vec3(position);
	`;
		
const // general patch for fragment shader
	FRAGMENT_FROM = `uniform vec3 diffuse;`,
	FRAGMENT_TO = `
		varying vec3 vEquiNoise_Position;
		uniform vec3 diffuse;
	`;
		
const // specific patch for map in fragment shader
	FRAGMENT_MAP_FROM = `#include <map_fragment>`,
	FRAGMENT_MAP_TO = `
		#ifdef USE_MAP
			vec2 EquiNoise_uv = equirectUv(normalize(vEquiNoise_Position.xyz));
			diffuseColor *= texture2D(map,EquiNoise_uv);
		#endif
	`;
		
const // specific patch for bumpMap in fragment shader
	FRAGMENT_BUMPMAP_FROM = `#include <uv_pars_fragment>`,
	FRAGMENT_BUMPMAP_TO = `
		#ifdef USE_BUMPMAP
			#define EQUINOISE_USE_BUMPMAP
			#undef USE_BUMPMAP
			vec2 vBumpMapUv;
		#endif
		#include <uv_pars_fragment>
		#ifdef EQUINOISE_USE_BUMPMAP
			#define USE_BUMPMAP
			#undef EQUINOISE_USE_BUMPMAP
		#endif
	`;

const // another specific patch for bumpMap in fragment shader
	FRAGMENT_BUMPMAP_FROM2 = `void main() {`,
	FRAGMENT_BUMPMAP_TO2 = `void main() {
		#ifdef USE_BUMPMAP
			vBumpMapUv = equirectUv(normalize(vEquiNoise_Position.xyz));
		#endif
	`;
		
const // specific patch for aoMap in fragment shader
	FRAGMENT_AOMAP_FROM = `#include <uv_pars_fragment>`,
	FRAGMENT_AOMAP_TO = `
		#ifdef USE_AOMAP
			#define EQUINOISE_USE_AOMAP
			#undef USE_AOMAP
			vec2 vAoMapUv;
		#endif
		#include <uv_pars_fragment>
		#ifdef EQUINOISE_USE_AOMAP
			#define USE_AOMAP
			#undef EQUINOISE_USE_AOMAP
		#endif
	`;

const // another specific patch for аоMap in fragment shader
	FRAGMENT_AOMAP_FROM2 = `void main() {`,
	FRAGMENT_AOMAP_TO2 = `void main() {
		#ifdef USE_AOMAP
			vAoMapUv = equirectUv(normalize(vEquiNoise_Position.xyz));
		#endif
	`;

	
// replace a group of strings as a transaction, i.e. either all replacements are done, or none is done
function batchReplace( string, from, to, name )
{
	// check weather all patterns exist
	for( var i=0; i<from.length; i++ )
	{
		if( string.indexOf(from[i]) < 0 )
		{
			console.warn( `Patch №${i} of ${name} cannot be applied, so all patches of ${name} will be ignored.` );
			return string;
		}
	} // for i
	
	// replace patterns
	for( var i=0; i<from.length; i++ )
	{
		string = string.replace( from[i], to[i] );
	}
	
	return string;
}


	
// patches material's shaders
function material( object )
{	
	var _material = object.isMesh ? object.material : object;
		
	var map = _material.map?.mapping == EquirectangularReflectionMapping;
	var bumpMap = _material.bumpMap?.mapping == EquirectangularReflectionMapping;
	var aoMap = _material.aoMap?.mapping == EquirectangularReflectionMapping;
	
	let originalOnBeforeCompile = _material.onBeforeCompile;
		
	if( map || bumpMap || aoMap )
	{
		
		_material.onBeforeCompile = function( shader )
		{
			// first call the original onBeforeCompile
			if( originalOnBeforeCompile )
			{
				originalOnBeforeCompile( shader );
			}
			
			// general patches for any kind of map -- add a varying variable
			// containing position used for equrectangular textures
			shader.vertexShader = batchReplace( shader.vertexShader, [VERTEX_FROM], [VERTEX_TO], 'vertex' );
			shader.fragmentShader = batchReplace( shader.fragmentShader, [FRAGMENT_FROM], [FRAGMENT_TO], 'fragment' );
			
			// patch various maps in fragment shader
			
			if( map )
			{
				shader.fragmentShader = batchReplace( shader.fragmentShader, [FRAGMENT_MAP_FROM], [FRAGMENT_MAP_TO], 'map' );
			}
			
			if( bumpMap )
			{
				shader.fragmentShader = batchReplace( shader.fragmentShader, [FRAGMENT_BUMPMAP_FROM, FRAGMENT_BUMPMAP_FROM2], [FRAGMENT_BUMPMAP_TO, FRAGMENT_BUMPMAP_TO2], 'bumpMap' );
			}
			
			if( aoMap )
			{
				shader.fragmentShader = batchReplace( shader.fragmentShader, [FRAGMENT_AOMAP_FROM, FRAGMENT_AOMAP_FROM2], [FRAGMENT_AOMAP_TO, FRAGMENT_AOMAP_TO2], 'aoMap' );
			}
		} // onBeforeCompile
	} // if any map	

	return _material;
	
} // material



export { material };