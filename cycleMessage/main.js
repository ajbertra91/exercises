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
  // --
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
    return last + (makeArrayString(removeLastChar(array)));
  }
  var removeLastChar = function(array) {
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
  // --

  for (var i = 0; i < 60; i++) {
    setTimeout(function() {
      getString('message');
      msgEl.innerHTML = getNewString(msg);
    }, i * 1000);
  }

  console.log('new string', getNewString(msg) );
})();