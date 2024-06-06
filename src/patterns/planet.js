
//	Procedural Equirectangular Textures
//	Planet Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Color, MathUtils } from "three";
import { noise, retexture, map, mapExp } from "pet/texture-generator.js";



var defaults = {
	$name: 'Planet',

	width: 1024,
	height: 512,

	scale: 50,

	colorDeep: 0x4682B4, // SteelBlue
	colorShallow: 0x87CEEB, // SkyBlue
	colorBeach: 0xFFFACD, // LemonChiffon
	colorGrass: 0x3CB371, // MediumSeaGreen
	colorForest: 0x2E8B57, // SeaGreen
	colorRock: 0x404040, // some Dark gray
	colorSnow: 0xF0FFFF, // Azure

	sizeDeep: 40,
	sizeShallow: 20,
	sizeBeach: 5,
	sizeGrass: 40,
	sizeForest: 40,
	sizeRock: 50,
};



function pattern( x, y, z, color, options, /*u, v, px, py*/ ) {

	var scale = options.scale,
		power = 2,
		sum = 1;

	var k = 0;

	for ( var i=0; i<options.iterations; i++ ) {

		k += power*noise( x, y, z, scale );
		sum += power;
		power = 0.8*power;
		scale = 1.5*scale;

	}

	k = ( 5*k/sum )**2;

	for ( var i=0; i<options.colors.length-1; i++ )
		if ( options.ranges[ i ]<=k && k<options.ranges[ i+1 ]) {

			color.lerpColors( options.colors[ i ], options.colors[ i+1 ], MathUtils.mapLinear( k, options.ranges[ i ], options.ranges[ i+1 ], 0, 1 ) );
			break;

		}

	if ( i<2 ) {

		color.offsetHSL( 0, 0, -0.03*Math.random() );

	}

}



function options( params ) {

	var options = { };


	options.scale = mapExp( params.scale ?? defaults.scale, 2, 0.15);

	options.colors = [
		new Color( params.colorDeep ?? defaults.colorDeep ),
		new Color( params.colorDeep ?? defaults.colorDeep ),

		new Color( params.colorShallow ?? defaults.colorShallow ),
		new Color( params.colorShallow ?? defaults.colorShallow ),

		new Color( params.colorBeach ?? defaults.colorBeach ),
		new Color( params.colorBeach ?? defaults.colorBeach ),

		new Color( params.colorGrass ?? defaults.colorGrass ),
		new Color( params.colorGrass ?? defaults.colorGrass ),

		new Color( params.colorForest ?? defaults.colorForest ),
		new Color( params.colorForest ?? defaults.colorForest ),

		new Color( params.colorRock ?? defaults.colorRock ),
		new Color( params.colorRock ?? defaults.colorRock ),

		new Color( params.colorSnow ?? defaults.colorSnow ),
		new Color( params.colorSnow ?? defaults.colorSnow ),
	];

	var sizes = [
		0,
		( ( params.sizeDeep??defaults.sizeDeep )/50 )**2,
		( ( params.sizeShallow??defaults.sizeShallow )/50 )**2,
		( ( params.sizeBeach??defaults.sizeBeach )/50 )**2,
		( ( params.sizeGrass??defaults.sizeGrass )/50 )**2,
		( ( params.sizeForest??defaults.sizeForest )/50 )**2,
		( ( params.sizeRock??defaults.sizeRock )/50 )**2,
	];
	for ( var i=1; i<7; i++ )
		sizes[ i ] += sizes[ i-1 ];

	function lerp( x, y, k ) {

		return x*( 1-k )+y*k;

	}

	options.ranges = [
		sizes[ 0 ],
	];

	for ( var i=1; i<6; i++ )
		options.ranges.push(
			lerp( sizes[ i ], sizes[ i-1 ], 0.4 ),
			lerp( sizes[ i ], sizes[ i+1 ], 0.4 ),
		);

	options.ranges.push(
		lerp( sizes[ 6 ], sizes[ 5 ], 0.4 ),
		sizes[ 6 ],
		10
	);

	options.width = params.width ?? defaults.width;
	options.height = params.height ?? defaults.height;

	options.iterations = Math.max( 4, 4+Math.log2( options.width ) );

	return options;

}



function texture( ...opt ) {

	return retexture( opt, defaults, options, pattern );

}



export { pattern, defaults, texture };
export { material } from "pet/texture-generator.js";
