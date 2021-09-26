const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

class EventService {
  constructor() {
    this.searchQuery = ''; //поиск по ключевому слову. Проверял на именах исполнителей: Bob, Martim, Iglesias
    this.country = null; // ключ для поиска по странам.
    this.page = 0; // номер страницы (для пагинации)
    // this.eventsOnOnePage = 100; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
    this.eventsOnOnePage = 19; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
    this.eventID = ''; // переменная с ID события/концерта (возможно совсем не понадобится при работе с данным классом)
    this.numberOfEvens = 0; // число событий/концертов, которіе вернулись от бекенда
  }

  //Эта функция возвращает промис с массивом данных (события/концерты)
  fetchEvents() {
    if (this.country === null) {
      return fetch(
        `${BASE_URL}/events.json?size=${this.eventsOnOnePage}&keyword=${this.searchQuery}&page=${this.page}&apikey=${apikey}`,
      )
        .then(response => response.json())
        .then(data => {
          this.numberOfEvens = data.page.totalElements;
          if (!data.hasOwnProperty('_embedded')) {
            return info('No events found with the specified search word!');
          }
          return data;
        })

        .catch(error => {});
    } else {
      return fetch(
        `${BASE_URL}/events.json?size=${this.eventsOnOnePage}&keyword=${this.searchQuery}&countryCode=${this.country}&page=${this.page}&apikey=${apikey}`,
      )
        .then(response => response.json())
        .then(data => {
          this.numberOfEvens = data.page.totalElements;
          if (!data.hasOwnProperty('_embedded')) {
            return info('No events with the given search word were found in this country!');
          }
          return data;
        })
        .catch(error => {});
    }
  }

  //Функция для получения промиса с одним объектом события/концерта по его ID
  fetchEventById(searchId) {
    this.eventID = searchId;
    return fetch(`${BASE_URL}/events.json?&id=${this.eventID}&apikey=${apikey}`)
      .then(response => response.json())
      .then(data => {
        return data._embedded.events;
      })
      .catch(error => console.log(error));
  }

  // Функция для первой загрузки картинок, до того как пользователь вводил запросы.
  // Использовано API с ключём preferredCountry:  Popularity boost by country, default is us. (Повышение популярности по странам, по умолчанию мы.)
  // возможны значения только 2 стран: String enum:["us", " ca"]
  fetchEventsFirstLoad() {
    return fetch(
      `${BASE_URL}/events.json?size=${this.eventsOnOnePage}&preferredCountry=${('us', 'ca')}&page=${
        this.page
      }&apikey=${apikey}`,
    )
      .then(response => response.json())
      .then(data => {
        return data._embedded.events;
      })
      .catch(error => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get сountryQueryKey() {
    return this.country;
  }

  set сountryQueryKey(newCountry) {
    this.country = newCountry;
  }

  get numberOfPage() {
    return this.page;
  }

  set numberOfPage(newPage) {
    this.page = newPage;
  }

  get numberOfEventsOnOnePage() {
    return this.eventsOnOnePage;
  }

  set numberOfEventsOnOnePage(newValue) {
    this.eventsOnOnePage = newValue;
  }

  get EventID() {
    return this.eventID;
  }

  set EventID(newID) {
    this.eventID = newID;
  }
}

export default EventService;
