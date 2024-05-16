﻿
//	Equirectangular Texture Generator - Noise Functions
//
//	noise(x,y,z)		- seeded 3D noise
//	noiseSeed( ) 		- reseeding the noise generator with timestamp
//	noiseSeed( seed )	- reseeding the noise generator with specific seed


import { MathUtils } from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";


var PRNG =
{
	random: function (x)
	{
		return MathUtils.seededRandom(x);
	}
};


var simplex = new SimplexNoise(PRNG);


// seeded 3D noise
function noise(x, y, z)
{
	return simplex.noise3d(x, y, z);
}


// reseeding the noise generator
function noiseSeed(seed)
{
	if (!Number.isInteger(seed))
		seed = new Date().getTime();

	PRNG.random(seed);

	simplex = new SimplexNoise(PRNG);
}


noiseSeed();


export
{
	noise,
	noiseSeed
};