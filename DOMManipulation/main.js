(function () {
  var textNodes = document.querySelectorAll('.text');

  var oldNode = textNodes[1]
      ,clone = oldNode.cloneNode(true)
      ,msg = 'Adam Bertrand';

  clone.innerHTML = msg;

  setTimeout(function () {
    oldNode.parentNode.replaceChild(clone, oldNode);
  }, 2000)

  console.log(oldNode);
})();