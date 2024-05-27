
//	Procedural Equirectangular Textures
//	Concrete Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )		- converts options into URL
//	info				- general info for the generator
//	fix( ... )			- reexport from core




import { noise, fix } from "pet/texture-generator.js";



function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var k = noise( options.scale*x, options.scale*y, options.scale*z );
		
	color.setHSL( 0, 0, options.bump*(0.5+0.5*k)**options.density );
}



function options( params )
{
	var options = { };
		
	options.scale = 2**(6.5-4*(params.scale??100)/100);
	
	options.density = 10-10*((params.density??100)/100*0.9)**0.5;
	options.bump = (params.bump??100)/100;

	options.width = params.width ?? 512;
	options.height = params.height ?? 256;

	return options;
}
	


function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `s=${params.scale}` );
	url.push( `d=${params.density}` );
	url.push( `b=${params.bump}` );
	
	return url.join( '&' );
}



function texture( opt )
{
	return fix( pattern, options(opt) )
}



var info = { name: 'Concrete', lightIntensity: 3 };



export { pattern, options, share, info, texture };
export * from "pet/texture-generator.js";