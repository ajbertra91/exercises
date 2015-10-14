'use strict';

(function(){

  /* 
   *  Cycle the message from one letter at a time
   *  put the last letter in front and so on...
   */

  var msgEl;
  var msg;

  var getString = function(element) {
    msgEl = document.getElementById(element);
    msg = msgEl.innerHTML;
  }
  var makeStringArray = function(string) {
    var array = [];
    for (var l in string) {
      array.push(string[l]);
    }
    return array;
  };
  var makeArrayString = function(array) {
    var string = '';
    array.forEach(function(i) {
      string += i;
    });
    return string;
  }
  var getLast = function(array) {
    var last = array.pop();
    return last;
  };
  var moveToFirst = function(last,array) {
    // biggest point of mutation... adding last character to the front of the array/string
    return last + (makeArrayString(removeLastChar(array)));
  }
  var removeLastChar = function(array) {
    // biggest point of mutation... removing the last character of the array/string
    var length = array.length - 1;
    var nArray = array.slice(0, length);
    return nArray;
  }
  var getNewString = function(string) {
    var a = makeStringArray(msg);
    var l = getLast(makeStringArray(string));
    var newS = moveToFirst( l,a );
    return newS;
  }


  // loop over the function calls once every second for one minute
  for (var i = 0; i < 60; i++) {
    setTimeout(function() {
      getString('message');
      msgEl.innerHTML = getNewString(msg);
      console.log('new string:', getNewString(msg) ); // logs out the new string for fun
    }, i * 1000);
  }

})();


//
// solution posted online: WTF?! 
//
// function animate_string(id) 
// {
//     var element = document.getElementById(id);
//     var textNode = element.childNodes[0]; // assuming no other children
//     var text = textNode.data;

// setInterval(function () 
// {
//  text = text[text.length - 1] + text.substring(0, text.length - 1);
//   textNode.data = text;
// }, 100);
// }