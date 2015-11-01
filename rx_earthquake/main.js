/*
 * Aggregate Observables with .reduce()
 */
var avg = Rx.Observable.range(0,5)
  .reduce(function (prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, {sum: 0, countL 0})
  .map(function (o) {
    return o.sum / o.count;
  });

var subscription = avg.subscribe(function (x) {
  console.log('Average is', x);
});

/*
 * Aggregate Infinite Observables with .scan()
 */
var avg = Rx.Observable.interval(1000)
  .scan(function (prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, {sum: 0, count: 0})
  .map(function (o) {
    return o.sum / o.count;
  });

var subscription = avg.subscribe(function (x) { 
  console.log(x);
});