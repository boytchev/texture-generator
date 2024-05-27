
//
//


import { noise, noiseSeed } from "./noise.js";
import { equicanvas, equitexture } from "./generator.js";
import { equimaterial } from "./material.js";



function fix( ...args )
{
	if( args.length==1 && args[0].isMaterial )
		return equimaterial( ...args );
	else
		return equitexture( ...args );
}



export { equimaterial, equicanvas, equitexture, noise, noiseSeed, fix };