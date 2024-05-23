
//	Procedural Equirectangular Textures
//	Concrete Pattern
//
//	pattern( ... )	- implements concrete pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { noise } from "../noise.js";



function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	var k = noise( options.size*x, options.size*y, options.size*z );
		
	color.setHSL( 0, 0, options.height*(0.5+0.5*k) );
}



function options( opt )
{
	var options = { };
		
	options.size = 2**(-((opt.size??50)-100)/50 * 4 + 1);
	options.height = (opt.height??100)/100;

	return options;
}
	


function share( opt )
{
	var params = [];
	
	params.push( `h=${opt.height}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );

	params = params.join( '&' );
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Concrete',
		info: 'Designet for .bumpMap properties',
		lightIntensity: 3,
	};



export { pattern, options, share, info };