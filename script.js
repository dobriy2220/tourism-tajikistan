// Простой JavaScript для поиска и формы
var tours = {
  iskanderkul:{title:'Озеро Искандеркуль',region:'Согдийская область',days:'3 дня',price:950,img:'iskanderkul.svg',desc:'Поездка к озеру Искандеркуль. В маршруте прогулка по территории, отдых и фотографии.'},
  haftkul:{title:'Семь озёр',region:'Согдийская область',days:'4 дня',price:1390,img:'haftkul.svg',desc:'Посещение известных Семи озёр, прогулка и знакомство с природой Фанских гор.'},
  pamir:{title:'Памир',region:'ГБАО',days:'7 дней',price:3250,img:'pamir.svg',desc:'Несколько дней путешествия по горной местности Памира.'},
  khujand:{title:'Прогулка по Худжанду',region:'Согдийская область',days:'2 дня',price:690,img:'khujand.svg',desc:'Экскурсия по историческим местам Худжанда.'},
  fann:{title:'Фанские горы',region:'Согдийская область',days:'5 дней',price:2190,img:'fann.svg',desc:'Путешествие по Фанским горам, осмотр живописных мест.'},
  dushanbe:{title:'Экскурсия в Душанбе',region:'Душанбе',days:'2 дня',price:730,img:'dushanbe.svg',desc:'Знакомство с центральными площадями, парками и музеями Душанбе.'}
};

// Каталог: поиск по названию и выбор региона
var search = document.getElementById('search');
var region = document.getElementById('region');
if (search && region) {
  function showTours() {
    var cards = document.querySelectorAll('#tourCards .card');
    var count = 0;
    cards.forEach(function(card) {
      var name = card.dataset.name.toLowerCase();
      var selectedRegion = card.dataset.region;
      var textOk = name.includes(search.value.trim().toLowerCase());
      var regionOk = region.value === '' || selectedRegion === region.value;
      var visible = textOk && regionOk;
      card.style.display = visible ? '' : 'none';
      if (visible) count++;
    });
    document.getElementById('resultCount').textContent = 'Найдено туров: ' + count;
    document.getElementById('noTours').hidden = count !== 0;
  }
  search.addEventListener('input', showTours);
  region.addEventListener('change', showTours);
  document.getElementById('reset').addEventListener('click', function() {
    search.value = ''; region.value = ''; showTours();
  });
  showTours();
}

// Отдельная страница выбранного тура
var params = new URLSearchParams(window.location.search);
var tourId = params.get('tour') || 'iskanderkul';
if (!tours[tourId]) tourId = 'iskanderkul';
var item = tours[tourId];
if (document.getElementById('tourTitle')) {
  document.getElementById('tourTitle').textContent = item.title;
  document.getElementById('tourRegion').textContent = item.region;
  document.getElementById('tourImage').src = 'imags/' + item.img;
  document.getElementById('tourImage').alt = item.title;
  document.getElementById('tourText').textContent = item.desc;
  document.getElementById('tourPrice').textContent = item.price + ' сомони';
  document.getElementById('tourDays').textContent = item.days;
  document.getElementById('tourBook').href = 'booking.html?tour=' + tourId;
}

// Форма бронирования (только проверка, без сервера)
var form = document.getElementById('bookingForm');
if (form) {
  document.getElementById('selectedTour').value = tourId;
  var dateField = document.getElementById('date');
  var today = new Date();
  dateField.min = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var msg = document.getElementById('formMsg');
    if (!form.checkValidity()) {
      msg.textContent = 'Проверьте обязательные поля.';
      form.reportValidity();
      return;
    }
    msg.textContent = '';
    document.getElementById('modal').hidden = false;
  });
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').hidden = true;
    form.reset();
  });
}
