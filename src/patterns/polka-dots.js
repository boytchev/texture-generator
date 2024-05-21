

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
	{geometry: TetrahedronGeometry, level: 0, maxDotSize: 10.8},

	{geometry: OctahedronGeometry, level: 0, maxDotSize: 9.6},
	{geometry: OctahedronGeometry, level: 1, maxDotSize: 9.7},

	{geometry: HexahedronGeometry, level: 0, maxDotSize: 8.1},
	{geometry: HexahedronGeometry, level: 1, maxDotSize: 7.8},
	
	{geometry: DodecahedronGeometry, level: 0, maxDotSize: 8.1},

	{geometry: IcosahedronGeometry, level: 0, maxDotSize: 7.0},
	{geometry: IcosahedronGeometry, level: 1, maxDotSize: 6.2},
	{geometry: IcosahedronGeometry, level: 2, maxDotSize: 5.0},
	{geometry: IcosahedronGeometry, level: 3, maxDotSize: 4.4},
	{geometry: IcosahedronGeometry, level: 4, maxDotSize: 4.0},
	{geometry: IcosahedronGeometry, level: 5, maxDotSize: 3.6},
]


// generate dot positions
var dotPoints = [];

for( var index in arrangements )
{
	dotPoints[index] = [];
	
	var level = arrangements[index].level,
		geometryClass = arrangements[index].geometry;
		
	var geometry = new geometryClass(1,level);
		geometry.deleteAttribute( 'normal' );
		geometry.deleteAttribute( 'uv' );
		
	var	mergedGeometry = mergeVertices( geometry );

	var positions = mergedGeometry.getAttribute( 'position' );
	
	for( var i=0; i<positions.count; i++ )
		dotPoints[index].push( new Vector3().fromBufferAttribute( positions, i ) );
		
	geometry.dispose( );
	mergedGeometry.dispose( );
}

dotPoints.sort( (a,b)=>a.length-b.length );




function options( opt )
{
	var options = { };
	
	options.color = new Color( opt.color ?? 0x000000 );

	options.backgroundColor = new Color( opt.backgroundColor ?? 0xffffff );
	
	options.points = dotPoints[opt?.arrangement||7];	
	
	options.minDotSmooth = ((opt.dotSize??3)**2-(opt.blur??0.5))/100;
	options.maxDotSmooth = ((opt.dotSize??3)**2+(opt.blur??0.5))/100;

	return options;
}
	


var vec = new Vector3();

function pattern( x, y, z, color, options, /*u, v, px, py, width, height*/ )
{
	vec.set( z, y, x );
	
	var dist = 1e10;
	for( var point of options.points )
		dist = Math.min( dist, vec.distanceTo(point) );
		
	var k = MathUtils.smoothstep(
			dist,
			options.minDotSmooth,
			options.maxDotSmooth );
	
	color.lerpColors( options.color, options.backgroundColor, k );
}



function share( options )
{
	var params = [];
	
	params.push( `a=${options.arrangement}` );
	params.push( `b=${options.blur}` );
	params.push( `c=${options.color}` );
	params.push( `k=${options.backgroundColor}` );
	params.push( `r=${options.resolution}` );
	params.push( `s=${options.dotSize}` );

	params = params.join( '&' );
	
	return window.location.href.split('?')[0].split('#')[0] + '?' + params;
}



var info = {
		name: 'Polka dots',
		maxArrangement: arrangements.length-1,
		maxDotSize: arrangements.map( e => e.maxDotSize ),
	};


export { pattern, options, share, info };