<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    var tagNameArr = [];
    if (node.nodeType == document.ELEMENT_NODE) {
      for (var i = 0; i < node.childNodes.length; i++) {
        function callSelf(node, tagName) {
          byTagName(node.childNodes[i], tagName)
          if (node.tagName.toLowerCase === tagName){
            tagNameArr.push(tagName);
          }
          callSelf(node, tagName);
        }
      }
    }
    return tagNameArr;
  };

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>
