
//	Equirectangular Texture Generator - Texture Generator
//
//	texture( ...args )	- generates texture as Three.js texture
//	[ ].update(ms)		- updates the texture with few more rows
//	[ ].border](rows)	- draws a red border



import { Color, Vector3, CanvasTexture, LinearFilter, EquirectangularReflectionMapping, SRGBColorSpace } from "three";



// to speed up some Firefox stuff (reportedly)
CanvasRenderingContext2D.prototype.clip = function () { };



// generates texture as a canvas
function canvas( ...args ) // pattern, canvas, deferred, options
{
	var width, height, _canvas, pattern, deferred = false, options = {};


	// load input parameters

	for( var param of args )
	{
		if( param instanceof HTMLCanvasElement )
			_canvas = param;
		else
		if( param instanceof Function )
			pattern = param;
		else
		if( param===true || param===false )
		{
			deferred = param;
		}
		else
		if( typeof param === 'object' && param !== null )
		{
			options = param;
		}
		else
		{
			console.warn( `Ignored parameter '${param}'. The parameters could be a function, a canvas, an object and a boolean.` );
		}
	}


	// process texture resolution
	
	if( Number.isFinite(options.width) )
	{
		width = Math.round( options.width );
	}
	
	if( Number.isFinite(options.height) )
	{
		height = Math.round( options.height );
	}
	
	if( Number.isFinite(width) && height==undefined )
	{
		height = Math.round( width/2 );
	}
	
	if( _canvas==undefined && width==undefined )
	{
		width = 1024;
		height = 512;
	}

	if( !_canvas )
	{
		_canvas = document.createElement( 'canvas' );
	}
	
	if( Number.isFinite(width) )
	{
		if( _canvas.width != width ) _canvas.width = width;
		if( _canvas.height != height ) _canvas.height = height;
	}
	
	if( !pattern )
	{
		console.error( 'No pattern function provided to texture generator.' );
		return;
	}
	
	width = _canvas.width;
	height = _canvas.height;

	// generating texture
	
	var context = _canvas.getContext( '2d' ),
		imageData = new ImageData( width, 1 ),
		data = imageData.data,
		color = new Color(),
		vector = new Vector3(),
		y = 0;
	
	_canvas.update = function ( ms = 20 ) {
		
		if( y>=height )
		{
			return 1;
		}
		
		var startTime = performance.now( );
		
		do
		{
			var index = 0,
				v = y / height;

			for( var x=0; x<width; x++)
			{
				var u = x / width;
					
				vector.setFromSphericalCoords( 1, Math.PI*v, 2*Math.PI*u );
			
				pattern( vector.x, vector.y, vector.z, color, options, u, v, x, y );

				data[index++] = 255*color.r;
				data[index++] = 255*color.g;
				data[index++] = 255*color.b;
				data[index++] = 255*( color?.a ?? 1 );
			}

			context.putImageData( imageData, 0, y );
			
			y++;

		} while( (v < 1) && (performance.now( )-startTime < ms) );
		
		return v;
	}

	_canvas.border = function ( rows = 1 ) {
		context.fillStyle = 'black';
		context.fillRect( 0, y+rows, width, height-y-rows );
		context.fillStyle = 'crimson';
		context.fillRect( 0, y, width, rows );
	}

	if( deferred )
	{	
		/*
		context.fillStyle = 'white';
		
		for( let x = 0; x<width; x+=32 )
		for( let y = 0; y<height; y+=32 )
			if( ((x>>5)+(y>>5))%2 )
				context.fillRect( x, y, 4, 4 );
		*/	
		return _canvas;
	}

	while( _canvas.update( 1000 ) < 1 );
	
	return _canvas;
	
} // canvas



// generates texture in Three.js texture
function texture( ...args )
{
	var _canvas = canvas(...args);
	var _texture = new CanvasTexture( _canvas );
		_texture.needsUpdate = false;

	var incomplete = true;
	
	_texture.update = function ( ms = 20 ) {
		var progress = _canvas.update( ms );
		if( progress==1 && incomplete )
		{
			_texture.needsUpdate = true;
			incomplete = false;
		}
		return progress;
	}
	
	_texture.border = function ( rows = 1 ) {
		_canvas.border( rows );
	}
		
	_texture.mapping = EquirectangularReflectionMapping; 
	
	// turn off mipmaps, as they create a seam and destroy the poles
	_texture.minFilter = LinearFilter; 
	_texture.generateMipmaps = false;
	
	_texture.colorSpace = SRGBColorSpace;
				
	return _texture;
	
} // texture


export { texture};