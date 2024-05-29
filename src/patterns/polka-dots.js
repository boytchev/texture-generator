
//	Procedural Equirectangular Textures
//	Polka Dots Pattern
//
//	defaults = {...}	- default parameters
//	pattern( ... )		- calculate color of pixel
//	texture( params )	- generate a texture
//	material( ... )		- material shader fix



import { Vector3, Color, PolyhedronGeometry, TetrahedronGeometry, OctahedronGeometry, DodecahedronGeometry, IcosahedronGeometry, MathUtils } from "three";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { noise, texture as coreTexture } from "pet/texture-generator.js";



// internal class to have the cube as one of the Platonic solids

class HexahedronGeometry extends PolyhedronGeometry
{
	constructor( radius, level )
	{
		var verticesOfCube = [
			-1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
			-1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
		];

		var indicesOfFaces = [
			2,1,0,    0,3,2,
			0,4,7,    7,3,0,
			0,1,5,    5,4,0,
			1,2,6,    6,5,1,
			2,3,7,    7,6,2,
			4,5,6,    6,7,4
		];

		super( verticesOfCube, indicesOfFaces, radius, level );
	}
}



// generate predefined layouts of points on a unit sphere

var layouts = [
	{geometry: TetrahedronGeometry, level: 0, points: [], maxScale: 106},	// #2, pts=4

	{geometry: OctahedronGeometry, level: 0, points: [], maxScale: 95},		// #3, pts=6
	{geometry: OctahedronGeometry, level: 1, points: [], maxScale: 77},		// #6, pts=18

	{geometry: HexahedronGeometry, level: 0, points: [], maxScale: 96},		// #4, pts=8
	{geometry: HexahedronGeometry, level: 1, points: [], maxScale: 69},		// #8, pts=26
	
	{geometry: DodecahedronGeometry, level: 0, points: [], maxScale: 79},	// #7, pts=20

	{geometry: IcosahedronGeometry, level: 0, points: [], maxScale: 79},	// #5, pts=12
	{geometry: IcosahedronGeometry, level: 1, points: [], maxScale: 59},	// #9, pts=42
	{geometry: IcosahedronGeometry, level: 2, points: [], maxScale: 48},	// #10, pts=92
	{geometry: IcosahedronGeometry, level: 3, points: [], maxScale: 42},	// #11, pts=162
	{geometry: IcosahedronGeometry, level: 4, points: [], maxScale: 37},	// #12, pts=252
	{geometry: IcosahedronGeometry, level: 5, points: [], maxScale: 32},	// #13, pts=361
	{count: 1, points: [], maxScale: 141}, // #1, pts=1
	{count: 500, points: [], maxScale: 33}, // #14, pts=500
	{count: 750, points: [], maxScale: 30}, // #15, pts=750
	{count: 1000, points: [], maxScale: 28}, // #16, pts=1000
	{count: 1500, points: [], maxScale: 25}, // #17, pts=1500
	{count: 2000, points: [], maxScale: 23}, // #18, pts=2000
	{count: 3000, points: [], maxScale: 21}, // #19, pts=3000
	{count: 5000, points: [], maxScale: 18}, // #20, pts=5000
]


// generate dot positions

for( var index in layouts )
{
	var level = layouts[index].level,
		geometryClass = layouts[index].geometry;
		
	if( geometryClass )
	{
		// platonic
		var geometry = new geometryClass(1,level);
			geometry.deleteAttribute( 'normal' );
			geometry.deleteAttribute( 'uv' );
			
		var	mergedGeometry = mergeVertices( geometry );

		var positions = mergedGeometry.getAttribute( 'position' );
			
		for( var i=0; i<positions.count; i++ )
			layouts[index].points.push( new Vector3().fromBufferAttribute( positions, i ) );
			
		geometry.dispose( );
		mergedGeometry.dispose( );
	}
	else
	{
		// fibonaccic
		var n = layouts[index].count;
		
		var gr = (1+5**0.5)/2;

		for( var i=0; i<n; i++ )
		{
			var theta = 2*Math.PI*i/gr;
			var phi = Math.acos(1-(2*i+1)/n);
			layouts[index].points.push(new Vector3().setFromSphericalCoords(1,phi,theta));
		}
	}
}

layouts.sort( (a,b)=>a.points.length-b.points.length );



var defaults = {
		$name: 'Polka dots',
		$layouts: layouts.length,
		
		width: 512,
		height: 256,

		layout: 9,
		scale: 50,
		blur: 20,
		
		color: 0x000000,
		background: 0xFFFFFF,
	};



var vec = new Vector3();

function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	vec.set( z, y, x );
	
	var dist = 1e10;
	for( var point of options.points )
		dist = Math.min( dist, vec.distanceTo(point) );
		
	var k = MathUtils.smoothstep( dist, options.minSmooth, options.maxSmooth );
	
	color.lerpColors( options.color, options.background, k );
}



function options( params )
{
	var options = { };

	options.color = new Color( params.color ?? defaults.color );
	options.background = new Color( params.background ?? defaults.background );

	var data = layouts[(params.layout ?? defaults.layout)-1];
	
	options.points = data.points;
	
	var blur = ((params.blur??defaults.blur) / 100)**2.5 / 3;
	
	var scale = (params.scale??defaults.scale);
		scale = MathUtils.mapLinear(scale,0,100,0,data.maxScale);
		scale = (scale / 100)**2;

	options.minSmooth = scale - blur;
	options.maxSmooth = scale + blur;

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