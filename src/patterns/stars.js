
//	Procedural Equirectangular Textures
//	Stars Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color } from "three";
import { noise, texture as coreTexture } from "pet/texture-generator.js";



var defaults = {
		$name: 'Stars',

		width: 1024,
		height: 512,
		
		density: 20,
		brightness: 20,
		variation: 0,

		color: 0xfff5f0,
		background: 0x000060,
	};	
	

	
function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	var s = 0,
		H = options.width/25,
		eps = 0.15;

	x *= H;
	y *= H;
	z *= H;

	var k = noise( x, y, z );
	var n = false;
	for( var dx=-1; dx<=1; dx++ ) if( !n )
	for( var dy=-1; dy<=1; dy++ ) if( !n )
	for( var dz=-1; dz<=1; dz++ ) if( !n )
		if( dx && dy && dz )
		if (k < noise( x+dx*eps, y+dy*eps, z+dz*eps ))
			n=true;
		
	if( !n )
	{
		s = options.brightness*(0.6+0.3*noise( y/4, z/4, x/4 )+0.3*noise( z/2, x/2, y/2 ))**options.density;
	}

	color.lerpColors( options.background, options.color, s );
	
	if( s > 0.1 ) color.offsetHSL( s*options.variation/*k*/, 0, 0 );
}



function options( params )
{
	var options = { };
	
	options.brightness = 0.3 + (params.brightness ?? defaults.brightness)/20;
	options.density = 100/(0+(params.density ?? defaults.density));
	options.variation = (params.variation ?? defaults.variation)/100;
	
	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );
	
	options.width = params.width ?? defaults.width;
	options.height = params.height ?? defaults.height;
	
	return options;
}
	


function texture( ...opt )
{
	if( opt.length==0 ) opt = [defaults];
	
	// if there is {...}, assume it is user options, compile them
	var params = opt.map( (e) => (e!=-null) && (typeof e =='object') && !(e instanceof HTMLCanvasElement) ? options(e) : e );

	// if pattern is missing, add pattern
	if( params.findIndex((e)=>e instanceof Function) == -1 )
	{
		params.push( pattern );
	}
		
	return coreTexture( ... params );
}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";