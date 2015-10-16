'use strict';

(function(){

  /* 
   *  had to look a the solution on this one!
   */

  var daysEl = document.querySelector('#days')
      ,days;

  var d = new Date;
  var currentYear = d.getFullYear();
  var christmasInMs = new Date(currentYear, 11, 25).getTime();
  var today = Date.now();
  var days = christmasInMs - today
  var convertToDays = function convertToDays(days) {
    return Math.floor((((days / 1000) / 60) / 60) / 24);
  }
   
  daysEl.innerHTML = convertToDays(days);

})();