
//	Procedural Equirectangular Textures
//	Polka dots Pattern
//
//	pattern( ... )		- implements the pattern
//	texture( params )	- generate a texture with options
//	options( params )	- converts options into internal format
//	share( opt )		- converts options into URL
//	info				- general info for the generator
//	fix( ... )			- reexport from core



import { Vector3, Color, PolyhedronGeometry, TetrahedronGeometry, OctahedronGeometry, DodecahedronGeometry, IcosahedronGeometry, MathUtils } from "three";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { equitexture, equimaterial } from "pet/texture-generator.js";



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



var vec = new Vector3();

function pattern( x, y, z, color, options, /*u, v, px, py*/ )
{
	vec.set( z, y, x );
	
	var dist = 1e10;
	for( var point of options.points )
		dist = Math.min( dist, vec.distanceTo(point) );
		
	var k = MathUtils.smoothstep( dist, options.minSmooth, options.maxSmooth );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function options( params )
{
	var options = { };

	options.color = new Color( params.color ?? 0x000000 );
	options.backgroundColor = new Color( params.backgroundColor ?? 0xffffff );

	var data = layouts[(params.layout ?? 8)-1];
	
	options.points = data.points;
	
	var blur = ((params.blur??20) / 100)**2.5 / 3;
	
	var scale = (params.scale??50);
		scale = MathUtils.mapLinear(scale,0,100,0,data.maxScale);
		scale = (scale / 100)**2;

	options.minSmooth = scale - blur;
	options.maxSmooth = scale + blur;

	options.width = params.width ?? 512;
	options.height = params.height ?? 256;
	
	return options;
}



function share( params )
{
	var url = [];
	
	url.push( `w=${params.width}` );
	url.push( `h=${params.height}` );

	url.push( `l=${params.layout}` );
	url.push( `s=${params.scale}` );
	url.push( `b=${params.blur}` );

	url.push( `c=${params.color}` );
	url.push( `k=${params.backgroundColor}` );

	return url.join( '&' );
}



function texture( opt )
{
	return equitexture( pattern, options(opt) )
}



var info = { name: 'Polka dots', layouts: layouts.length };



export { pattern, options, share, info, texture, equimaterial as fix };