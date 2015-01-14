<!doctype html>
<html>
<head>
<style>
.trail { /* className for the trail elements */
    position: fixed;
              height: 6px; width: 6px;
                      border-radius: 3px;
                      background: teal;
}
body {
    height: 300px;
}
</style>
</head>
<body>
<script>



var elemArr = [];
/*
 * div elements cannot be attached to a whole document.
 * therefore body is selected
 */
var body = document.querySelector('body');
var element, i;
/*
 * create div elements in a loop,
 * append them to body,
 * push them into the empty array
 */
for (i = 0; i <= 7; i++) {
    element = document.createElement('div');
    element.classList.add("trail");
    body.appendChild(element);
    elemArr.push(element);
};

/*
 * When moving the cursor, pop the
 * last element of the array and
 * unshift it again in the beginning
 * of the array.
 * update its position to the new one.
 */
document.addEventListener("mousemove", function(ev) {
    var e = elemArr.pop();
    elemArr.unshift(e);
    e.style.top = ev.clientY + 'px';
    e.style.left = ev.clientX + 'px';
});
// cooooooool
</script>
</body>
</html>
