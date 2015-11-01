/* 
 * first example
 */
// var button = document.getElementById('retrieveDataBtn');
// var source1 = Rx.DOM.getJSON('/resource1').pluck('name');
// var source2 = Rx.DOM.getJSON('/resource2').pluck('props','name');
// var clicks = Rx.Observable.fromEvent(button, 'click');

// function getResults(amount) {
//   return source1.merge(source2)
//     .pluck('names')
//     .flatMap(function(array) {
//       return Rx.Observable.from(array);
//     })
//     .distinct()
//     .take(amount);
// }

// clicks.debounce(1000)
//   .flatMap(getResults(5))
//   .subscribe(
//     function (value) {
//       console.log('Received value', value);
//     },
//     function (err) {
//       console.log('error: ', err);
//     },
//     function () {
//       console.log('All values retrieved!');
//     }
//   );

/*
 * simple stream of clicks that 
 * filters out the clicks on the left side of the screen
 * and only takes the first ten clicks
 */
// Rx.Observable.fromEvent(document, 'click')
//   .filter(function (x) {
//     return x.clientX > window.innerWidth / 2;
//   })
//   .take(10)
//   .subscribe(function (x) {
//     console.log(x.clientX, x.clientY);
//   });

/*
 * Observer Pattern
 */
// function Producer() {
//   this.listeners = [];
// }
// Producer.prototype.add = function (listener) {
//   this.listeners.push (listener)
// };
// Producer.prototype.remove = function (listener) {
//   var index = this.listeners.indexOf(listener);
//   this.listeners.splice(index,1);
// };
// Producer.prototype.notify = function (message) {
//   this.listeners.forEach(function (listener) {
//     listener.update(message);
//   });
// };
// // any object with an 'update' method would work.
// var listener1 = {
//   update: function (message) {
//     console.log('Listener 1 received:', message);
//   }
// };
// var listener2 = {
//   update: function (message) {
//     console.log('Listener 2 received:', message);
//   }
// };
// var notifier = new Producer();
// notifier.add(listener1);
// notifier.add(listener2);
// notifier.notify("hello there!");

/*
 * Iterator Pattern
 */
// function iterateOnMultiples(arr, divisor) {
//   this.cursor = 0;
//   this.array = arr;
//   this.divisor = divisor || 1;
// }
// iterateOnMultiples.prototype.next = function () {
//   while (this.cursor < this.array.length) {
//     var value = this.array[this.cursor++];
//     if (value % this.divisor === 0) {
//       return value;
//     }
//   }
// };
// iterateOnMultiples.prototype.hasNext = function () {
//   var cur = this.cursor;
//   while (cur < this.array.length) {
//     if (this.array[cur++] % this.divisor === 0) {
//       return true;
//     }
//   }
//   return false;
// };
// // use it like this
// var consumer = new iterateOnMultiples([1,2,3,4,5,6,7,8,9,10], 3);
// console.log(consumer.next(), consumer.hasNext());
// console.log(consumer.next(), consumer.hasNext());
// console.log(consumer.next(), consumer.hasNext());

/*
 * Create a simple Observable
 */
// var observable = Rx.Observable.create(function (observer) {
//   observer.onNext('Simon');
//   observer.onNext('Jen');
//   observer.onNext('Sergi');
//   observer.completed(); //we are done
// });


//  * Create a basic Observer
 
// var observer = Rx.Observer.create(
//   function onNext(x) { console.log('Next: ' + x) },
//   function onNext(err) { console.log('Error: ' + err) },
//   function onCompleted(x) { console.log('Completed') }
// );

/*
 * Making AJAX Calls with an Observable
 */
// function get(url) {
//   return Rx.Observable.create(function (observer) {
//     // Make a traditional Ajax request
//     var req = new XMLHttpRequest();
//     req.open('GET', url);
//     req.onload = function () {
//       if (req.status === 200) {
//         // If the status is 200, i.e. there was been no problems,
//         // yield the result to listeners and complete the sequence
//         observer.onNext(req.response);
//         observer.onCompleted();
//       } else {
//         // Otherwise, signal to the listeners that there has been an error
//         observer.onError(new Error(req.statusText));
//       }
//     };
//     req.onerror = function () {
//       observer.onError(new Error('Unknown Error'));
//     };
//     req.send();
//   });
// }
// var test = get('/api/contents.json');
// // nothing happens until the Observable is subscribed to
// test.subscribe(
//   function onNext(x) { console.log('Result: ' + x) },
//   function onError(err) { console.log('Error: ' + err) },
//   function onCompleted(x) { console.log('Completed') }
// );


/*
 * REFACTORED above code to use Rx operator -- reducing code!!!
 */
// Rx.DOM.get('./api/contents.json')
//   .subscribe(
//     function onNext(data) { console.log('data.response: ', data.response); },
//     function onError(err) { console.log('err: ', err); }
//   );


/*
 * Observable$.from()
 */
// Rx.Observable.from(['Adria','Jen','Sergei'])
//   .subscribe(
//     function onNext(x) { console.log('Next: ', Next); },
//     function onError(err) { console.log('err: ', err); },
//     function onCompleted() { console.log('Completed'); }
//   );


/*
 * Observable$.fromEvent()
 */
// var allMoves = Rx.Observable.fromEvent(document, 'mousemove');
// allMoves.subscribe(
//   function (e) {
//     console.log('e.clientX, e.clientY: ', e.clientX, e.clientY);
//   }
// );
// var movesOnTheRight = allMoves.filter(function (e) {
//   return e.clientX > window.innerWidth / 2
// });
// var movesOnTheLeft = allMoves.filter(function (e) {
//   return e.clientX < window.innerWidth / 2
// });
// movesOnTheRight.subscribe(function (e) { console.log('Mouse is on the right: ', e.clientX) });
// movesOnTheLeft.subscribe(function (e) { console.log('Mouse is on the left: ', e.clientX) });


/*
 * Observable$.fromCallback()
 * in terminal run `node main.js `
 */
// var Rx = require('rx');
// var fs = require('fs');
// var readdir$ = Rx.Observable.fromCallback(fs.readdir);
// var source = readdir$('/Users/Adam');
// var subscription = source.subscribe(
//   function (res) { console.log('List of directories: ' + JSON.stringify(res,null,2)); },
//   function (err) { console.log('Error: ', err); },
//   function () { console.log('Done!'); }
// )
/*
 * Marble Diagrams
 *
    .onNext()  .onNext()  .onNext()      .onCompleted()
----1----------2----------3--------------|----->
 *
 *
 *
 *
 * Merge
 * A -------------0------------------1--------->
 * B -----0-------1---------2--------3--------->
 *   |                  MERGE                 |
 * C -----0------0-1--------2-------1-3-------->
 */
var a = Rx.Observable.interval(200).map(function (i) { return 'A' + i }).take(20);
var b = Rx.Observable.interval(100).map(function (i) { return 'B' + i }).take(20);
Rx.Observable.merge(a,b).subscribe(function (x) { console.log(x); });

