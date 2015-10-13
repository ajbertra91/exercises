'use strict';

(function(){

  /* 
   *  Heron's Area Formula
   *  A = square root of s(s-a)(s-b)(s-c)
   *  where s = (a+b+c) divided by 2
   */

  var s1 = parseInt(document.querySelector('#sideA').innerHTML);
  var s2 = parseInt(document.querySelector('#sideB').innerHTML);
  var s3 = parseInt(document.querySelector('#sideC').innerHTML);
  var areaEl = document.querySelector('#area');

  var getAreaOfTriangle = function(a,b,c) {
    // console.debug('a: ', a);
    // console.debug('b: ', b);
    // console.debug('c: ', c);
    var s = (a+b+c)/2;
    // console.debug('s: ', s);
    var area = Math.sqrt( (s * (s - a) * (s - b) * (s - c)) );
    // console.debug('area: ', area);
    return area;
  }

  areaEl.innerHTML = getAreaOfTriangle(s1,s2,s3);
})();