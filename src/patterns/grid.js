
//	Procedural Equirectangular Textures
//	Grid Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, Color, MathUtils } from "three";
import { retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Grid',

	countH: 32,
	countV: 16,

	thickness: 32,
	caps: true,

	width: 1024,
	height: 512,

	color: 0x000000,
	background: 0xFFFFFF,
};



var vec = new Vector3();
var vecTo = new Vector3();

function pattern( x, y, z, color, options, u, v, /*px, py*/ ) {

	vec.set( x, y, z );

	var uTo = Math.round( options.countH*u+0.5/options.width )/options.countH,
		vTo = Math.round( options.countV*v )/options.countV;

	var caps = options.caps || ( v>1/options.countV && v<1-1/options.countV );

	v *= Math.PI;
	u *= 2*Math.PI;
	vTo *= Math.PI;
	uTo *= 2*Math.PI;

	var sinU = Math.sin( u ),
		cosU = Math.cos( u ),
		sinV = Math.sin( v ),
		cosV = Math.cos( v );

	var sinUTo = Math.sin( uTo ),
		cosUTo = Math.cos( uTo ),
		sinVTo = Math.sin( vTo ),
		cosVTo = Math.cos( vTo );

	vec.set( cosU*sinV, cosV, sinU*sinV );
	vecTo.set( cosU*sinVTo, cosVTo, sinU*sinVTo );

	var angle = vec.angleTo( vecTo );

	if ( caps ) {

		vecTo.set( cosUTo*sinV, cosV, sinUTo*sinV );

		angle = Math.min( angle, vec.angleTo( vecTo ) );

	}

	var k = 1 - MathUtils.smoothstep( angle, options.smoothMin, options.smoothMax, 0, 1 );

	color.lerpColors( options.background, options.color, k );

}



function options( params ) {

	var thickness = mapExp( params.thickness ?? defaults.thickness, 0.002, 0.1 );
	
	return {

		color: new Color( params.color ?? defaults.color ),
		background: new Color( params.background ?? defaults.background ),

		countH: ( params.countH ?? defaults.countH ),
		countV: ( params.countV ?? defaults.countV ),


		smoothMin: thickness/1.1,
		smoothMax: thickness*1.1,

		caps: params.caps ?? defaults.caps,

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,

	};

}




function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
