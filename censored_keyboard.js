<input type="text">
<script>
  var field = document.querySelector("input");
  // array of key codes to censor. not case sensitive
  var keyCodeArr = [81, 88, 87];
    field.addEventListener("keydown", function(event) {
      console.log(keyCodeArr.indexOf(event.keyCode));
  /* The index of an elemenet which is
   * not in the array is -1
   * Only if the keycode of the entered event is
   * equal to or bigger than 0, input should be blocked.
   */
       if (keyCodeArr.indexOf(event.keyCode) >= 0) {
       event.preventDefault();
     }
});
</script>
