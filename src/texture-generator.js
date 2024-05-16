
//
//


import { noise, noiseSeed } from "./noise.js";
import { equicanvas, equitexture } from "./generator.js";
import { equimaterial } from "./material.js";


/*
  var blob = new Blob([`
  self.onmessage = function(e) {
    self.postMessage('msg from worker');
  };
`], { type: "text/javascript" })

  var worker = new Worker(window.URL.createObjectURL(blob));
  worker.onmessage = function(e) {
    console.log("Received: " + e.data);
  }
  worker.postMessage("hello"); // Start the worker.
*/


export { equimaterial, equicanvas, equitexture, noise, noiseSeed };