// Create a 3d graph  within d3 selection parent.
function graph3d( parent ) {
  
  // Assign handlers immediately after making the request,
  // and remember the jqxhr object for this request
  var jqxhr = $.getJSON( "http://berndmalle.com/akhci/graphs/graph_small.json", function() {
    console.log( "success" );
  })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  
  // Perform other work here ...
  
  // Set another completion function for the request above
  jqxhr.complete(function() {
    console.log( "second complete" );
  });


  function Node(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  var x3d = parent  
    .append("x3d")
    .style( "width", "99%" )
    .style( "height", "99%" )
    .style( "border", "none" )
  
  
  var scene = x3d.append("scene")

  scene.append("viewpoint")
    .attr( "centerOfRotation", [0, 0, 0])
    .attr( "position", [0, 0, 125])


  function drawNode(node) {
    var nodes = scene
      .append("transform")
      .attr("translation", [node.x, node.y, node.z])
      .append("shape");
    
    nodes
      .append("appearance")
      .append("material")
      .attr("diffuseColor", [1, 1, 4]);
    
    nodes
      .append("sphere")
      .attr("radius", 0.5);
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

  var a = new Node(0, 0, 0);
  var b = new Node(1, 2, 3);
  var c = new Node(3, 2, 1);
  
  drawNode(a);
  drawNode(b);
  drawNode(c);
  drawEdge(a, b);
  drawEdge(b, c);
}
