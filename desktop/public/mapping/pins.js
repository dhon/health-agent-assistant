var pins = [];

// this will be amended to accomadate septic tanks and Wells
function addPin(key) {
  // lets rock
  // makes the default dom elements
  var anchor = document.createElement("a");
  anchor.href = "#popup-" + key;
  anchor.setAttribute("data-rel", "popup");

  var image = document.createElement("div");
  image.className = "pin";
  image.style.margin = "150px";
  anchor.appendChild(image);

  // actual popup below
  var canvas = document.createElement("div");
  canvas.setAttribute("data-role", "popup");
  canvas.setAttribute("data-dismissible", "false");
  canvas.id = "popup-" + key;
  canvas.className = "ui-content";

  // ugh im sorry, but its only here for testing
  canvas.innerHTML = 'Water #' + key + ' <br> Location : 50:40 (Lat:Lon) <br> Lot #3<br> Tank Status : <u style="color:red">Poor</u><br> Trending : <br> <div style="background-color: red; width: 100%; height : 15px"></div>';

  var start = document.getElementById('start');

  start.appendChild(anchor);
  start.appendChild(canvas);

}

addPin("1");
addPin("2");
