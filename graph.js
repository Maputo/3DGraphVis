// Create a 3d graph  within d3 selection parent.
function scatterPlot3d( parent ) {
  var x3d = parent  
    .append("x3d")
    .style( "width", "99%" )
    .style( "height", "99%" )
    .style( "border", "none" )
  
  
  var scene = x3d.append("scene")

  scene.append("orthoviewpoint")
    .attr( "centerOfRotation", [1, 1, 1])
    .attr( "fieldOfView", [-3, -3, 15, 15])
    .attr( "orientation", [-0.5, 1, 0.2, 1.12*Math.PI/4])
    .attr( "position", [8, 4, 15])


  function drawNode() {
    var nodes = scene
      .append("shape");
    
    nodes
      .append("appearance")
      .append("material");
    
    nodes
      .append("sphere")
      .attr("radius", "0.2");
  }


  drawNode();
}
