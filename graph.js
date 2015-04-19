function graph3d(parent) {
  
  var x3d = parent  
    .append("x3d")
    .style("width", "100%")
    .style("height", "100%")
    .style("border", "none")

  var scene = x3d.append("scene")
  scene.append("viewpoint")
    .attr("centerOfRotation", [10, 8.5, 0])
    .attr("position", [10, 8.5, 25])

  var COORDS = "coords";
  var EDGES = "edges";

  loadJSON();
  main();


  function loadJSON() {

    $.ajaxSetup({
      async: false
    });

    $.getJSON("graph_small.json", function(graph_response) {
      window.graph = graph_response;
    });

    $.ajaxSetup({
      async: true
    });
    
  }
  
  function main() {

    scaleGraph(graph);

    for (var key in graph) {
      var node = graph[key];
      var edges = graph[key][EDGES];

      drawNode(node[COORDS]);

      for (var e in edges) {
        var edge = edges[e];
        
        drawEdge(node[COORDS], graph[edge][COORDS]);
      }      
    }
  }  

  function scaleGraph(graph) {
    var scaleCoords = function(node) {
      node.x = parseFloat(node.x) / 100;
      node.y = parseFloat(node.y) / 100;
      node.z = parseFloat(node.z) / 100;
    }

    for (var node in graph) {
      scaleCoords(graph[node][COORDS]);
    }
  }


  function Node(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  function drawNode(node) {
    var nodes = scene
      .append("transform")
      .attr("translation", [node.x, node.y, node.z])
      .append("shape");
    
    nodes
      .append("appearance")
      .append("material")
      .attr("diffuseColor", [0, 0, 1]);
    
    nodes
      .append("sphere")
      .attr("radius", 0.1);
  }

  function drawEdge(source, target) {
    var edges = scene
      .append("shape")
      .append("lineSet")
      .attr("lineCount", 1);

    edges
      .append("color")
      .attr("DEF", "COLOR")
      .attr("color", [0, 0, 1, 0, 0, 1]);
    
    edges
      .append("coordinate")
      .attr("point", [source.x, source.y, source.z,
                      target.x, target.y, target.z]);

  }
}
