export default function loadYandexMap() {
  // Дождёмся загрузки API и готовности DOM.
  ymaps.ready(init);
  var myMap;
  function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    (myMap = new ymaps.Map(
      "map",
      {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [22.320629, 114.169428],
        zoom: 16,
        type: "yandex#hybrid",
      },
      {
        searchControlProvider: "yandex#search",
      }
    )), //метка
      (myPlacemark = new ymaps.GeoObject(
        {
          geometry: {
            type: "Point",
            coordinates: [22.320629, 114.169428],
          },
          properties: {
            // Контент метки.
            iconContent: "Our office",
            hintContent: "Come closure",
          },
        },
        {
          // Опции.
          // Иконка метки будет растягиваться под размер ее содержимого.
          preset: "islands#blackStretchyIcon",
        }
      ));
    myMap.geoObjects.add(myPlacemark);
  }
}
