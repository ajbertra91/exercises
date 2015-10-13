'use strict';

(function(){

  /* 
   *  Cycle the message from one letter at a time
   *  put the last letter in front and so on...
   */

  var msg = document.getElementById('message').innerHTML;
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
    console.debug('string: ', string);
    return string;
  }
  var getLast = function(array) {
    var last = array.pop();
    return last;
  };
  var moveToFirst = function(last,array) {
    console.debug('last: ', last);
    console.debug('array: ', array);
    var newString = last + (makeArrayString(array));
  }
  var getNewString = function(string) {
    console.debug('string: ', string);
    var a = makeStringArray(msg);
    console.debug('a: ', a);
    var l = getLast(makeStringArray(string));
    console.debug('l: ', l);
    var newS = moveToFirst( l,a );
    console.debug('newS: ', newS);
    return newS;
  }

  console.log('new string', getNewString(msg) )


})();