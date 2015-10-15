'use strict';

(function(){

  /* 
   *  Cycle the message from one letter at a time
   *  put the last letter in front and so on...
   */

  var answerEl = document.getElementById('answer')
      ,year = ''
      ,lastYear = 2050
  ;

  var getTheDay = function getTheDay(year) {
    return new Date(year, 0, 1).getDay();
  };

  for (var year = 2014; year <= lastYear; year++) {
    console.debug('getTheDay("' + year + '"): ', getTheDay(year));
    if (getTheDay(year) === 0) {
      console.debug('year: ', year);
    }
  }


  
})();