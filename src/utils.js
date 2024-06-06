
//	Equirectangular Texture Generator - Utility Functions
//
//	retexture(...)		- generate texture with user parameters
//	map(...) 			- linear map
//	mapExp(...)			- exponential map


import { MathUtils } from "three";
import { texture } from "./generator.js";



function retexture( opt, defaults, options, pattern ) {

	if ( opt.length==0 ) opt = [ defaults ];

	// if there is {...}, assume it is user options, compile them
	var params = opt.map( ( e ) => ( e!=-null ) && ( typeof e =='object' ) && !( e instanceof HTMLCanvasElement ) ? options( e ) : e );

	// if pattern is missing, add pattern
	if ( params.findIndex( ( e )=>e instanceof Function ) == -1 ) {

		params.push( pattern );

	}

	return texture( ... params );

}



function map( x, toMin=0, toMax=1, fromMin=0, fromMax=100 ) {

	x = MathUtils.mapLinear( x, fromMin, fromMax, toMin, toMax );

	return x;

}



function mapExp( x, toMin, toMax, fromMin=0, fromMax=100 ) {

	x = map( x, 0, 1, fromMin, fromMax );
	x = 2**( x * Math.log2( toMax/toMin ) + Math.log2( toMin ) );

	return x;

}


export
{
	retexture,
	map,
	mapExp,
};
