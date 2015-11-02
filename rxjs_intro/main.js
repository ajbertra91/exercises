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
// var a = Rx.Observable.interval(200).map(function (i) { return 'A' + i }).take(20);
// var b = Rx.Observable.interval(100).map(function (i) { return 'B' + i }).take(20);
// Rx.Observable.merge(a,b).subscribe(function (x) { console.log(x); });

/*
 * Aggregate Observables with .reduce()
 */
// var avg = Rx.Observable.range(0,5)
//   .reduce(function (prev, cur) {
//     return {
//       sum: prev.sum + cur,
//       count: prev.count + 1
//     };
//   }, {sum: 0, countL 0})
//   .map(function (o) {
//     return o.sum / o.count;
//   });

// var subscription = avg.subscribe(function (x) {
//   console.log('Average is', x);
// });

/*
 * Aggregate Infinite Observables with .scan()
 */
// var avg = Rx.Observable.interval(1000)
//   .scan(function (prev, cur) {
//     return {
//       sum: prev.sum + cur,
//       count: prev.count + 1
//     };
//   }, {sum: 0, count: 0})
//   .map(function (o) {
//     return o.sum / o.count;
//   });

// var subscription = avg.subscribe(function (x) { 
//   console.log(x);
// });

/*
 * Aggregate Observables with .flatMap() 
 * can make flatMap with reduce like this
 */
 // function concatAll(source) {
 //  return source.reduce(function(a,b) {
 //    return a.concat(b)
 //  });
 // }
 // used like this: 
 // concatAll([0,1,2,3],[4,5,6],[7,8,9]);
 // => [0,1,2,3,4,5,6,7,8,9]

/*
 * Cancel Observables with .dispose()
 */
// var counter = Rx.Observable.interval(1000).take(20);
// var subscription1 = counter.subscribe(function (i) {
//   console.log('Subscription 1: ', i);
// });
// var subscription2 = counter.subscribe(function (i) {
//   console.log('Subscription 2: ', i);
// });
// setTimeout(function () {
//   console.log('Canceling subscription2!');
//   subscription2.dispose();
// }, 4000);

/*
 * Cancel Observables that wrap external API
 * but it doesn't cancel the API action
 */
// var p = new Promise(function (resolve,reject) {
//   window.setTimeout(resolve, 2000);
// });
// p.then(function () {
//   console.log('Promise resolved.');
//   // some unexpected side effect could happen here
// });
// var subscription = Rx.Observable.fromPromise(p).subscribe(function (msg) {
//   console.log('Observable resolved!');
// });
// subscription.dispose();

/*
 * Error Handling with onError()
 */
// function getJSON(arr) {
//   return Rx.Observable.from(arr).map(function (str) {
//     var parsedJSON = JSON.parse(str);
//     return parsedJSON;
//   });
// }
// getJSON([
//   '{"1":1, "2":2}',
//   '{"sucess: true}',
//   '{"enabled": true}'
// ]).subscribe(
//   function (json) { console.log('Parsed JSON',json); },
//   function (err) { console.log(err.message); }
// )

/*
 * Error Handling with .catch()
 */
// function getJSON(arr) {
//   return Rx.Observable.from(arr).map(function (str) {
//     var parsedJSON = JSON.parse(str);
//     return parsedJSON;
//   });
// }

// var caught = getJSON([ '{"1":1, "2":2}', '{"1: 1}' ]).catch(
//   Rx.Observable.return({
//     error: 'There was an error parsing JSON'
//   })
// );

// caught.subscribe(
//   function (json) {
//     console.log('Parsed JSON: ', json);
//   },
//   function (err) {
//     console.log('ERROR', err.message);
//   }
// );

/*
 * Error Handling with .retry()
 */
// Rx.DOM.get('/products').retry(5)
//   .subscribe(
//     function (xhr) {
//       console.log(xhr);
//     },
//     function (err) {
//       console.log('ERROR: ', err);
//     }
//   );


/* 
 * additional thoughts/techniques
 */

/*
 * IMPERATIVE
 */
// var getFullNames = function (objs) {
//   var result = [];
//   for(var i=0,l=objs.length; i<l; i++) {
//     var fname = objs[i].firstName,
//         lname = objs[i].lastName;

//     result.push(fname + " " + lname);
//   }
//   return result;
// }

// users = [
//   {firstName: "barney", lastName: "Rubble"},
//   {firstName: "fred", lastName: "Flinstone"}
// ];

// console.log(getFullNames(users));

/*
 * DECLARATIVE
 * No computation happens unitl line 126
 * uses HIGHER ORDER FUNCTIONS (HOF) a combinator: a function that 
 * takes another function and returns a new composed function
 */
// var juxt = require('mori').juxt;
// var _ = require('ramda');

// // first, we define a function which will get us both parts of a name
// var getNameParts = juxt(_.prop("firstName"),
//                         _.prop("lastName"));

// // we also need a function which will join the parts together
// var joinNameParts = _.join(" ");

// // and lastly, we define a function which will apply the two functions above
// // to every element of a collection
// var getFullNames = _.map(_.compose(joinNameParts, getNameParts));

// users = [
//   {firstName: "barney", lastName: "Rubble"},
//   {firstName: "fred", lastName: "Flinstone"}
// ];

// // finally we apply the resulting function to get our resulting
// console.log(getFullNames(users));


/*
 * CURRY
 */
// var R = require("ramda");

// var addFourNumbers = function(a, b, c, d) {return a + b + c + d;};
// var curriedAddFourNumbers = R.curry(addFourNumbers);

// // now we can call curriedAddFourNumbers in a couple of different ways
// var f = curriedAddFourNumbers; // let's give it a shorter name for convenience

// console.log(
//   addFourNumbers(1, 2, 3, 4),
//   f(1, 2, 3, 4),
//   f(1)(2)(3)(4),
//   f(1, 2, 3)(4),
//   f(1)(2, 3, 4)
// );