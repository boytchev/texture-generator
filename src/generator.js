
//	Equirectangular Texture Generator - Texture Generator
//
//	equicanvas( ...args )	- generating texture in a canvas
//	equitexture( ...args )	- generating texture in Three.js texture


import { Color, Vector3, CanvasTexture, LinearFilter, EquirectangularReflectionMapping, MathUtils } from "three";




function unitToByte( x )
{

	return Math.max( 0, Math.min( 255, Math.round(255*x) ) );

} // unitToByte


function defaultPattern( x, y, z, color, u, v, px, py, width, height )
{
	var xx = Math.round(10*x)/10,
		yy = Math.round(10*y)/10,
		zz = Math.round(10*z)/10;
		
	var k = 1-15*Math.sqrt( (x-xx)**2 + (y-yy)**2 + (z-zz)**2 );
	
	if( k > 0.4 )
		k = 1;
	else
		k = MathUtils.mapLinear( k, 0, 0.4, -3, 0.4 );

	color.setHSL( 0, 0, k );
	
} // defaultPattern
	
	
	
// generating texture in a canvas
function equicanvas( ...args ) // number, canvas, function
{
	var width, height, canvas, smooth, pattern;

	// processing input parameters

	for( var param of args )
	{
		if( param instanceof HTMLCanvasElement )
			canvas = param;
		else
		if( param instanceof Function )
			pattern = param;
		else
		if( Number.isFinite(param) )
		{
			width = param;
			height = Math.round(param/2);
		}
		else
			console.warn( `Ignored parameter '${param}'. The parameters of generate(...) are a number, a canvas and a function (in any order).` );
	}
	
	if( !canvas && !Number.isFinite(width) )
	{
		width = 1024;
		height = 512;
	}

	if( !canvas )
	{
		canvas = document.createElement( 'canvas' );
	}
	
	if( Number.isFinite(width) )
	{
		canvas.width = width;
		canvas.height = height;
	}
	
	if( !pattern )
	{
		pattern = defaultPattern;
	}
	
	width = canvas.width;
	height = canvas.height;


	// generating texture
	
	var context = canvas.getContext( '2d' ),
		imageData = context.getImageData( 0, 0, width, height ),
		data = imageData.data,
		index = 0,
		color = new Color(),
		vector = new Vector3();

	for( var y=0; y<height; y++)
	for( var x=0; x<width; x++)
	{
		var u = x / width,
			v = y / height;
			
		vector.setFromSphericalCoords( 1, Math.PI*v, 2*Math.PI*u );
		pattern( vector.x, vector.y, vector.z, color, u, v, x, y, width, height );

		data[index++] = unitToByte( color.r );
		data[index++] = unitToByte( color.g );
		data[index++] = unitToByte( color.b );
		data[index++] = unitToByte( color?.a ?? 255 );
	}
	
	context.putImageData( imageData, 0, 0 );

	return canvas;
	
} // equicanvas


// generating texture in Three.js texture
function equitexture( ...args )
{

	var texture = new CanvasTexture( equicanvas(...args) );

	texture.mapping = EquirectangularReflectionMapping; 
	
	// turn off mipmap, as they create a seam and destroy the poles
	texture.minFilter = LinearFilter; 
	texture.generateMipmaps = false;
				
	return texture;
	
} // equitexture


export { equicanvas, equitexture };