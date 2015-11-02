// helper functions
function log(thing) {
  console.log('Thing: ', thing);
  return thing;
}

/*
 * first pass
 */
// var quakes = Rx.Observable.create(function (observer) {
//   window.eqfeed_callback = function (response) {
//     var quakes = response.features;
//     quakes.forEach(function (quake) {
//       observer.onNext(quake);
//     });
//   };
//   loadJSONP(QUAKE_URL);
// });
// quakes.subscribe(function (quake) {
//   var coords = quake.geometry.coordinates;
//   var size = quake.properties.mag * 10000;
//   L.circle([coords[1], coords[0]], size).addTo(map);
// });

/*
 * second pass
 */
// var quakes = Rx.Observable.create(function (observer) {
//   window.eqfeed_callback = function (response) {
//     observer.onNext(response); //1
//     observer.onCompleted(); //2
//   };
//   loadJSONP(QUAKE_URL);
// }).flatMap(function transform(dataset) { //3
//   return Rx.Observable.from(dataset.response.features); //4
// });
// quakes.subscribe(function (quake) { //5
//   var coords = quake.geometry.coordinates;
//   var size = quake.properties.mag * 10000;
//   L.circle([coords[1], coords[0]], size).addTo(map);
// });

/*
 * third pass
 */
// var quakes = Rx.DOM.jsonpRequest({
//   url: QUAKE_URL,
//   jsonpCallback: 'eqfeed_callback'
// })
// .flatMap(function (result) {
//   return Rx.Observable.from(result.response.features);
// })
// .map(function (quake) {
//   return {
//     lat: quake.geometry.coordinates[1],
//     lng: quake.geometry.coordinates[0],
//     size: quake.properties.mag * 10000
//   };
// });
// quakes.subscribe(function (quake) {
//   L.circle([quake.lat, quake.lng], quake.size).addTo(map);
// });

/*
 * fourth pass - make it real time
 */

var quakes = Rx.Observable
  .interval(5000)
  .flatMap(function () {
    return Rx.DOM.jsonpRequest({
      url: QUAKE_URL,
      jsonpCallback: 'eqfeed_callback'
    }).retry(3);
  })
  .flatMap(function (result) {
    return Rx.Observable.from(result.response.features);
  })
  .distinct(function (quake) { quake.properties.code; })
  .map(log);
  // .map(function (quake) {
  //   return {
  //     lat: quake.geometry.coordinates[1],
  //     lng: quake.geometry.coordinates[0],
  //     size: quake.properties.mag * 10000
  //   };
  // });
quakes.subscribe(function (quake) {
  var coords = quake.geometry.coordinates;
  var size = quake.properties.mag * 10000;
  L.circle([coords[1], coords[0]], size).addTo(map);
});

var count = quakes.scan(function (prev, cur) {
  cur = prev + 1
  return cur
}, 0).map(log);

count.subscribe(function(x) {
  // append x to DOM ?
});



// quakes.subscribe(function (quake) {
//   L.circle([quake.lat, quake.lng], quake.size).addTo(map);
// });

