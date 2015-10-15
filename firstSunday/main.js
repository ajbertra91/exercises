'use strict';

(function(){

  /* 
   *  Cycle the message from one letter at a time
   *  put the last letter in front and so on...
   */

  var answerEl = document.getElementById('answer')
      ,year = ''
      ,firstYear = 2014
      ,lastYear = 2050
      ,numberOfYears = lastYear - firstYear
  ;

  var getTheDay = function getTheDay(dateString) {
    return new Date(dateString).getDay();
  };

  for (var i = 0; i <= numberOfYears; i++) {
    if (getTheDay('January 1, ' + firstYear + i) === 0) {
      year = firstYear + i;
      answerEl.innerHTML = year;
    }
  }

  console.debug('getTheDay("January 1, 2014"): ', getTheDay("January 1, 2014"));

  
})();