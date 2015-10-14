'use strict';

(function(){

  /* 
   *  had to look a the solution on this one!
   */

   var year = window.prompt("Input a year: ");
   var x = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
   alert(x);

})();