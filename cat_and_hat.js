<img src="img/cat.png" id="cat" style="position: relative">
<img src="img/hat.png" id="hat" style="position: relative">

<script>
  var cat = document.querySelector("#cat");
  var hat = document.querySelector("#hat");
  // Your code here.
  var angle = 0, lastTime = 1;
  function animate(time) {
    if (lastTime != null)
      angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * -90) + "px";
    cat.style.left = (Math.cos(angle) * -90) + "px";
    hat.style.top = (Math.sin(angle) * 90) + "px";
    hat.style.left = (Math.cos(angle) * 90) + "px";

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
</script>
