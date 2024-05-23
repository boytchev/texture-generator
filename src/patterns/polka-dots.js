
//	Procedural Equirectangular Textures
//	Polka dots Pattern
//
//	pattern( ... )	- implements Polks dots pattern
//	options( opt )	- converts options into internal format
//	share( opt )	- converts options into URL
//	info			- general info for the generator



import { Vector3, Color, PolyhedronGeometry, TetrahedronGeometry, OctahedronGeometry, DodecahedronGeometry, IcosahedronGeometry, MathUtils } from "three";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';



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



// generate predefined arrangeents of points on a unit sphere

var arrangements = [
	{geometry: TetrahedronGeometry, level: 0, points: [], maxSize: 1.157},	// 0

	{geometry: OctahedronGeometry, level: 0, points: [], maxSize: 0.922},	// 1
	{geometry: OctahedronGeometry, level: 1, points: [], maxSize: 0.607},	// 4

	{geometry: HexahedronGeometry, level: 0, points: [], maxSize: 0.941},	// 2
	{geometry: HexahedronGeometry, level: 1, points: [], maxSize: 0.479},	// 6
	
	{geometry: DodecahedronGeometry, level: 0, points: [], maxSize: 0.644},	// 5

	{geometry: IcosahedronGeometry, level: 0, points: [], maxSize: 0.643},	// 3
	{geometry: IcosahedronGeometry, level: 1, points: [], maxSize: 0.365},	// 7
	{geometry: IcosahedronGeometry, level: 2, points: [], maxSize: 0.240},	// 8
	{geometry: IcosahedronGeometry, level: 3, points: [], maxSize: 0.191},	// 9
	{geometry: IcosahedronGeometry, level: 4, points: [], maxSize: 0.153},	// 10
	{geometry: IcosahedronGeometry, level: 5, points: [], maxSize: 0.128},	// 11
]



// generate dot positions

for( var index in arrangements )
{
	var level = arrangements[index].level,
		geometryClass = arrangements[index].geometry;
		
	var geometry = new geometryClass(1,level);
		geometry.deleteAttribute( 'normal' );
		geometry.deleteAttribute( 'uv' );
		
	var	mergedGeometry = mergeVertices( geometry );

	var positions = mergedGeometry.getAttribute( 'position' );
		
	for( var i=0; i<positions.count; i++ )
		arrangements[index].points.push( new Vector3().fromBufferAttribute( positions, i ) );
		
	geometry.dispose( );
	mergedGeometry.dispose( );
}

arrangements.sort( (a,b)=>a.points.length-b.points.length );

var vec = new Vector3();

function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	vec.set( z, y, x );
	
	var dist = 1e10;
	for( var point of options.points )
		dist = Math.min( dist, vec.distanceTo(point) );
		
	var k = MathUtils.smoothstep( dist, options.minSmooth, options.maxSmooth );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function options( opt )
{
	var options = { };

	options.color = new Color( opt.color ?? 0x000000 );
	options.backgroundColor = new Color( opt.backgroundColor ?? 0xffffff );

	var data = arrangements[opt.arrangement ?? 7];
	
	options.points = data.points;
	
	var blur = ((opt.blur??20) / 100)**2.5 / 3,
		size = ((opt.size??30) / 100)**2;
	
	options.minSmooth = size - blur;
	options.maxSmooth = size + blur;
	return options;
}



function share( opt )
{
	var params = [];
	
	params.push( `a=${opt.arrangement}` );
	params.push( `b=${opt.blur}` );
	params.push( `c=${opt.color}` );
	params.push( `k=${opt.backgroundColor}` );
	params.push( `r=${opt.resolution}` );
	params.push( `s=${opt.size}` );

	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Polka dots',
		info: 'Designed for .map properties',
		maxArrangement: arrangements.length-1,
	};



export { pattern, options, share, info };