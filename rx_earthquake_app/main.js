function log(thing) {
  console.log('Thing: ', thing);
  return thing;
}
var codeLayers = {};
var quakeLayer = L.layerGroup([]).addTo(map);

function makeRow(props) {
  var row = document.createElement('tr');
  var time = (new Date(props.time)).toString();

  row.id = props.net + props.code;

  [props.place, props.mag, time].forEach(function(text) {
    var cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
  });

  return row;
}

function initialize() {
  var socket = Rx.DOM.fromWebSocket('ws://127.0.0.1:8080');
  var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/' +
  'summary/all_day.geojsonp';

  var quakes = Rx.Observable
  .interval(5000)
  .flatMap(function() {
    return Rx.DOM.jsonpRequest({
      url: QUAKE_URL,
      jsonpCallback: 'eqfeed_callback'
    });
  })
  .flatMap(function(result) {
    return Rx.Observable.from(result.response.features);
  })
  .distinct(function(quake) { return quake.properties.code; });

  quakes.subscribe(function(quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;

    var circle = L.circle([coords[1], coords[0]], size).addTo(map);
    quakeLayer.addLayer(circle);
    codeLayers[quake.id] = quakeLayer.getLayerId(circle);
  });

  var table = document.getElementById('quakes_info');

  function getRowFromEvent(event) {
    return Rx.Observable
      .fromEvent(table, event)
      .filter(function(event) { //(1)
        var el = event.target;
        return el.tagName === 'TD' && el.parentNode.id.length;
      })
      .pluck('target', 'parentNode') //(2)
      .distinctUntilChanged(); //(3)
  }

  getRowFromEvent('mouseover')
    .pairwise()
    .subscribe(function(rows) {
       var prevCircle = quakeLayer.getLayer(codeLayers[rows[0].id]);
       var currCircle = quakeLayer.getLayer(codeLayers[rows[1].id]);

       prevCircle.setStyle({ color: '#0000ff' });
       currCircle.setStyle({ color: '#ff0000' });
      });

  getRowFromEvent('click')
    .subscribe(function(row) {
       var circle = quakeLayer.getLayer(codeLayers[row.id]);
       map.panTo(circle.getLatLng());
      });

  quakes
    .pluck('properties')
    .map(makeRow)
    .subscribe(function(row) { table.appendChild(row); });
}

Rx.DOM.ready().subscribe(initialize);




















