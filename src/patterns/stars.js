
//	Procedural Equirectangular Textures
//	Stars Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )		- converts options into URL
//	info				- general info for the generator
//	fix( ... )			- reexport from core



import { Vector3,Color,MathUtils } from "three";
import { noise, equitexture, equimaterial } from "pet/texture-generator.js";



var pts = [];
var n = 6000;
for( var i=0; i<n; i++)
{
	pts.push( new Vector3().randomDirection() );
}

var vec = new Vector3();

function pattern( x, y, z, color, options, u, v, px, py )
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

	color.lerpColors( options.backgroundColor, options.color, s );
	
	if( s > 0.1 ) color.offsetHSL( s*options.variation/*k*/, 0, 0 );
}



function options( params )
{
	var options = { };
	
	options.brightness = 0.3 + (params.brightness ?? 20)/20;
	options.density = 100/(0+(params.density ?? 20));
	options.variation = (params.variation ?? 0)/100;
	
	options.color = new Color( params.color ?? 0xfff5f0 );
	options.backgroundColor = new Color( params.backgroundColor ?? 0x000060 );
	
	options.width = params.width ?? 512;
	options.height = params.height ?? 256;
	
	return options;
}
	


function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `d=${params.density}` );
	url.push( `b=${params.brightness}` );
	url.push( `v=${params.variation}` );

	url.push( `c=${params.color}` );
	url.push( `k=${params.backgroundColor}` );
	
	return url.join( '&' );
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = {name: 'Stars', lightIntensity: 3};



export { pattern, options, share, info, texture, equimaterial as fix };