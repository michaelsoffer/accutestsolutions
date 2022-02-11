function openMenu() {
  var x = document.getElementById("top-nav-rightside");
  if (x.className === "top-nav-right") {
    x.className += " responsive";
  } else {
    x.className = "top-nav-right";
  }
}
