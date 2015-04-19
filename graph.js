function graph3d(parent, json) {
  
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

  loadJSON(json);
  main();


  function loadJSON(json) {

    $.ajaxSetup({
      async: false
    });

    $.getJSON(json, function(graph_response) {
      window.graph = graph_response;
    });

    $.ajaxSetup({
      async: true
    });
    
  }
  
  function main() {

    scaleGraph(graph);

    for (var key in graph) {
      node = graph[key];
      edges = node[EDGES]

      drawNode(node[COORDS]);

      for (var e in edges) {
        edgeNode = graph[edges[e]];
        drawEdge(node[COORDS], edgeNode[COORDS]);
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
      .attr("diffuseColor", "black");
    
    nodes
      .append("sphere")
      .attr("radius", 0.02);
  }

  function drawEdge(source, target) {
    var edges = scene
      .append("shape")
      .append("lineSet")
      .attr("lineCount", 1);

/**
 * Color
 *
    edges
      .append("color")
      .attr("DEF", "COLOR")
      .attr("color", [0, 0, 1, 0, 0, 1]);
 */

    edges
      .append("coordinate")
      .attr("point", [source.x, source.y, source.z,
                      target.x, target.y, target.z]);

  }
}
