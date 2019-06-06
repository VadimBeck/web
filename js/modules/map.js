ymaps.ready(init);
  var geoObjects= [];
  var marks = [
    {
      latitude: 55.7587,
      longitude: 37.5828,
      hintContent: '<div class="map__hint">Кудринская площадь д.1</div>',
    },
    {
      latitude: 55.7427,
      longitude: 37.5799,
      hintContent: '<div class="map__hint">ул.Плющиха д.11</div>',
    },
    {
      latitude: 55.7574,
      longitude: 37.6208,
      hintContent: '<div class="map__hint">Площадь Революции д.1</div>',
    },
    {
      latitude: 55.7500,
      longitude: 37.6037,
      hintContent: '<div class="map__hint">Большой Знаменский пер. д.23</div>',
    }
  ]

function init() {
  var map = new ymaps.Map('map', {
    center: [55.75269656, 37.59427083],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });
  for (let i=0; i<marks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([marks[i].latitude, marks[i].longitude],
      {
        hintContent: marks[i].hintContent
      },
      {
        iconLayout: 'default#image',
        iconImageHref: '../img/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
      });
  }
  var clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: '../img/map-marker.png',
        size: [46, 57],
        offset: [-23, -57]
      }
    ],
    clusterIconContentLayout: null
  });
  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);
}