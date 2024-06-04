
//	Procedural Equirectangular Textures
//	Grid Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, Color, MathUtils } from "three";
import { texture as coreTexture } from "pet/texture-generator.js";



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

	var options = { };

	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	options.countH = ( params.countH??defaults.countH );
	options.countV = ( params.countV??defaults.countV );

	var thickness = 2**( ( params.thickness??defaults.thickness )/100 * Math.log2( 0.1/0.002 ) + Math.log2( 0.002 ) );

	options.smoothMin = thickness/1.1;
	options.smoothMax = thickness*1.1;

	options.caps = params.caps??defaults.caps;

	//	var scale = ( params.scale??defaults.scale );
	//	scale = MathUtils.mapLinear( scale, 0, 100, 0, data.maxScale );
	//	scale = ( scale / 100 )**2;

	//	options.minSmooth = scale - blur;
	//	options.maxSmooth = scale + blur;

	options.width = params.width ?? defaults.width;
	options.height = params.height ?? defaults.height;

	return options;

}




function texture( ...opt ) {

	if ( opt.length==0 ) opt = [ defaults ];

	// if there is {...}, assume it is user options, compile them
	var params = opt.map( ( e ) => ( e!=-null ) && ( typeof e =='object' ) && !( e instanceof HTMLCanvasElement ) ? options( e ) : e );

	// if pattern is missing, add pattern
	if ( params.findIndex( ( e )=>e instanceof Function ) == -1 ) {

		params.push( pattern );

	}

	return coreTexture( ... params );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
