
//	Procedural Equirectangular Textures
//	Isolines Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )		- converts options into URL
//	info				- general info for the generator
//	fix( ... )			- reexport from core



import { Color, MathUtils } from "three";
import { noise, fix } from "pet/texture-generator.js";



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var k = noise( options.scale*x, options.scale*y, options.scale*z );
	
	k = 0.5 - 0.5*Math.sin(options.density*k);
	
	k = MathUtils.smoothstep( k, options.minSmooth, options.maxSmooth );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function options( params )
{
	var options = { };
	
	var blur = (params.blur??10)/100,
		balance = (params.balance??50)/100;

	options.scale = 2**(-((params.scale??50)-100)/50 * 3 - 1);
	options.density = 10 + 50 * (params.density??20)/100;
		
	options.minSmooth = balance - blur - 0.01;
	options.maxSmooth = balance + blur + 0.01;
	
	options.color = new Color( params.color ?? 0xffffff );
	options.backgroundColor = new Color( params.backgroundColor ?? 0x000000 );

	options.width = params.width ?? 1024;
	options.height = params.height ?? 512;
	
	return options;
}
	


function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `s=${params.scale}` );
	url.push( `b=${params.blur}` );
	url.push( `d=${params.density}` );
	url.push( `a=${params.balance}` );

	url.push( `c=${params.color}` );
	url.push( `k=${params.backgroundColor}` );
	
	return url.join( '&' );
}



function texture( opt )
{
	return fix( pattern, options(opt) )
}



var info = { name: 'Isolines', lightIntensity: 4 };



export { pattern, options, share, info, texture };
export * from "pet/texture-generator.js";