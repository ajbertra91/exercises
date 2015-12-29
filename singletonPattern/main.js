/*
 * SINGLETON PATTERN
 */

var SingletonTester = (function () {
  function Singleton( options ) {
    options = options || {};

    this.name = "SingletonTester";
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }

  var instance;
  var _static = {
    name: "SingletonTester",

    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance: function ( options ) {
      if ( instance === undefined ) {
        instance = new Singleton( options );
      }
      return instance;
    }
  };
  return _static;
})();

var singletonTest = SingletonTester.getInstance({
  pointX: 100
});

console.log( singletonTest.pointX );