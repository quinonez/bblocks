define( ['require', 'd3', 'THREE', 'BBH1' ], function( require, d3, THREE, BBH1 ){
//  var d3 = require('lib/d3.min');
//  var THREE = require('lib/three.min');

  d3.select("body")
    .append("h1")
    .text("Successfully loaded D3 version " + d3.version); 


  var histo = new BBH1("nombre", "titulo", 25, 0, 200);
  histo.Fill(123.4);
  histo.Fill(113.4);
  histo.Fill(129.4);
  histo.Fill(23.4);
  histo.Fill(33.6);
  histo.Fill(3.98);
  histo.Fill(12);
  histo.Fill(7);
  histo.Draw();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
  };

  render();


});
