/**
 * @constructor
 */

function Mandelbrot(layer) {
  this.shaderPass = new THREE.ShaderPass(SHADERS.mandelbrot);
  this.shaderPass.uniforms.resolution.value =
    new THREE.Vector2(16 * GU, 9 * GU);
  this.shaderPass.uniforms.zoomCoordinate.value =
    new THREE.Vector2(0.001643721971153, -0.822467633298876);
  this.shaderPass.uniforms.tExplosion.value = Loader.loadTexture( 'res/textures/explosion.png' );

  Loader.start(function(){}, function(){});
}

Mandelbrot.prototype.getEffectComposerPass = function() {
  return this.shaderPass;
};

Mandelbrot.prototype.start = function() {
};

Mandelbrot.prototype.end = function() {
};

Mandelbrot.prototype.render = function(renderer, interpolation) {
  renderer.render(this.scene, this.camera);
};

Mandelbrot.prototype.update = function(frame, relativeFrame) {
  this.shaderPass.uniforms.resolution.value = new THREE.Vector2(16 * GU, 9 * GU);
  this.shaderPass.uniforms.time.value = relativeFrame / 60;
};

