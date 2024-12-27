
//	Procedural Equirectangular Textures
//	Scepter Head Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, retexture, mapExp } from "../texture-generator.js";



var defaults = {
	$name: 'Scepter head',

	width: 1024,
	height: 512,

	xFactor: 18,
	yFactor: 36,
	zFactor: 0,

	colorRim: 0xFFFFFF,
	colorA: 0x70E0FF,
	colorB: 0x3000FF,
};



var hsl = { h: 0, s: 0, l: 0 };

function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var fx = options.xFactor*x,
		fy = options.yFactor*y,
		fz = options.zFactor*z;

	var cosX = Math.cos( fx ),
		cosY = Math.cos( fy ),
		cosZ = Math.cos( fz );

	var k = -noise( x/cosX, y/cosY, z/cosZ );

	var dx = Math.abs( ( fx*Math.tan( fx )+1 )/Math.cos( fx ) ),
		dy = Math.abs( ( fy*Math.tan( fy )+1 )/Math.cos( fy ) ),
		dz = Math.abs( ( fz*Math.tan( fz )+1 )/Math.cos( fz ) );

	if ( dx<55 && dy<55 && dz<55 ) {

		var indexX = Math.abs( Math.floor( ( fx/Math.PI*2+1 )/2 ) ),
			indexY = Math.abs( Math.floor( ( fy/Math.PI*2+1 )/2 ) ),
			indexZ = Math.abs( Math.floor( ( fz/Math.PI*2+1 )/2 ) );

		var index = ( indexX+indexY+indexZ )%2;

		color.lerpColors( options.colorA, options.colorB, index );
		color.getHSL( hsl );
		color.setHSL( hsl.h, hsl.s, k*hsl.l );

	} else {

		color.copy( options.colorRim );

		color.getHSL( hsl );
		color.setHSL( hsl.h, hsl.s, 2*k*hsl.l );

	}

}



function options( params ) {

	return {

		colorRim: new Color( params.colorRim ?? defaults.colorRim ),
		colorA: new Color( params.colorA ?? defaults.colorA ),
		colorB: new Color( params.colorB ?? defaults.colorB ),

		xFactor: mapExp( params.xFactor ?? defaults.xFactor, 1.35, 30 ),
		yFactor: mapExp( params.yFactor ?? defaults.yFactor, 1.35, 30 ),
		zFactor: mapExp( params.zFactor ?? defaults.zFactor, 1.35, 30 ),

		width: params.width ?? defaults.width,
		height: params.height ?? defaults.height,
	};

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "../texture-generator.js";
