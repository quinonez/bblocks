requirejs.config({
  baseUrl: "scripts",
  paths: {
    'app': "../app",
    'd3': "lib/d3.min",
    'THREE': "lib/three.min",
    'BBH1': "BBH1"
  },
  shim: {
    THREE: {
      exports: 'THREE'
    } 
  }
});

// Start loading your main application file. (The file that will be optimized).
// Put all of your application logic in there
requirejs(["main"]);


