
//	Equirectangular Texture Generator - Texture Generator
//
//	equicanvas( ...args )	- generating texture in a canvas
//	equitexture( ...args )	- generating texture in Three.js texture


import { Color, Vector3, CanvasTexture, LinearFilter, EquirectangularReflectionMapping, MathUtils } from "three";



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
function equicanvas( ...args ) // number, number, canvas, function
{
	var width, height, canvas, pattern, deferred = false;

	// processing input parameters

	for( var param of args )
	{
		if( param instanceof HTMLCanvasElement )
			canvas = param;
		else
		if( param instanceof Function )
			pattern = param;
		else
		if( Number.isFinite(param) && width==undefined)
		{
			width = Math.round( param );
		}
		else
		if( Number.isFinite(param) && height==undefined)
		{
			height = Math.round( param );
		}
		else
		if( param===true || param===false )
		{
			deferred = param;
		}
		else
			console.warn( `Ignored parameter '${param}'. The parameters of generate(...) are two numbers, a canvas and a pattern function (in any order).` );
	}

	if( Number.isFinite(width) && height==undefined )
	{
		height = Math.round( width/2 );
	}
	
	if( canvas==undefined && width==undefined )
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
		imageData = new ImageData( width, 1 ),
		data = imageData.data,
		color = new Color(),
		vector = new Vector3(),
		y = 0;

	canvas.update = function ( ms = 100 ) {
		
		if( y>=height ) return false;
		
		var endTime = performance.now()+ms;
	
		do 
		{
			if( y>=height ) return true;
			
			var index = 0,
				v = y / height;

			for( var x=0; x<width; x++)
			{
				var u = x / width;
					
				vector.setFromSphericalCoords( 1, Math.PI*v, 2*Math.PI*u );
			
				pattern( vector.x, vector.y, vector.z, color, u, v, x, y, width, height );

				data[index++] = 255*color.r;
				data[index++] = 255*color.g;
				data[index++] = 255*color.b;
				data[index++] = 255*( color?.a ?? 1 );
			}
			
			context.putImageData( imageData, 0, y );
			
			y++;
		} while( performance.now() < endTime );
			
		return true;
	}

	if( deferred ) return canvas;
	
	while( canvas.update() );
	
	return canvas;
	
} // equicanvas



// generating texture in Three.js texture
function equitexture( ...args )
{
	var canvas = equicanvas(...args);
	var texture = new CanvasTexture( canvas );

	texture.update = function ( ms = 100 ) {
		if( canvas.update( ms ) )
			texture.needsUpdate = true;
	}

	texture.mapping = EquirectangularReflectionMapping; 
	
	// turn off mipmaps, as they create a seam and destroy the poles
	texture.minFilter = LinearFilter; 
	texture.generateMipmaps = false;
				
	return texture;
	
} // equitexture



export { equicanvas, equitexture };