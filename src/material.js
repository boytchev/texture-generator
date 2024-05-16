
//	Equirectangular Texture Generator - Material Patcher
//
//	equimaterial( material )	- patches material's shaders


import { EquirectangularReflectionMapping, MathUtils } from "three";


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
	FRAGMENT_BUMPMAP_FROM = `#include <bumpmap_pars_fragment>`,
	FRAGMENT_BUMPMAP_TO = `
		#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {
		vec2 EquiNoise_BumpMapUv = equirectUv(normalize(vEquiNoise_Position.xyz));

		vec2 dSTdx = dFdx( EquiNoise_BumpMapUv );
		vec2 dSTdy = dFdy( EquiNoise_BumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, EquiNoise_BumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

		#endif
		`;

	
	
// patches material's shaders
function equimaterial( material )
{
	var map = material.map?.mapping == EquirectangularReflectionMapping;
	var bumpMap = material.bumpMap?.mapping == EquirectangularReflectionMapping;
	
	if( map || bumpMap )
	{
		material.onBeforeCompile = function( shader )
		{
			// general patches for any kind of map -- add a varying variable
			// containing position used for equrectangular textures
			shader.vertexShader = shader.vertexShader.replace( VERTEX_FROM, VERTEX_TO );
			shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_FROM, FRAGMENT_TO );
			
			// patch various maps in fragment shader
			
			if( map )
			{
				shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_MAP_FROM, FRAGMENT_MAP_TO );
			} else
			if( bumpMap )
			{
				shader.fragmentShader = shader.fragmentShader.replace( FRAGMENT_BUMPMAP_FROM, FRAGMENT_BUMPMAP_TO );
			}
		} // onBeforeCompile
	} // if any map	

	return material;
	
} // equimaterial



export { equimaterial };