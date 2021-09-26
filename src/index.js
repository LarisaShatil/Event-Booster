import './sass/main.scss';
import EventService from './js/events-service';
import { EventsPagination } from './js/events-pagination';
// import { Pagination } from './js/pagination'; // ! старая версия пагинации
import eventTpl from './templates/eventTpl.hbs';
import countries from './js/data/countryList.json';
import Select from './js/search-fields';
import onEventClick from './js/modal.js';

import refs from './js/refs';

import './js/scrollUp';
import './js/team-modal';
import './js/theme-switch';
import './js/animation-cards';

export const eventService = new EventService();
const debounce = require('lodash.debounce');
import {
  alert,
  error,
  success,
  info,
  defaults,
  defaultStack,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;

// start
refs.searchInput.addEventListener('input', debounce(onInputChange, 500));

const eventsPagination = new EventsPagination({
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  paginationContainer: refs.paginationContainer,
});

// Первичная отрисовка. Просто передать данные на пагинацию

checkingScreenWidth();
eventService.fetchEvents().then(data => eventsPagination.createPagination(data));

//Логика поиска стран
const options = {
  placeholder: 'Choose country',
  data: countries,
};

const selectCountry = new Select('#select', options);

// Функция для ренденинга страницы после изменения страны в поле!
selectCountry.selectEl.addEventListener('click', onChangeSelect);

function onChangeSelect(e) {
  if (!e.target.classList.contains('select__item')) {
    return;
  }
  eventService.country = selectCountry.countryCode;
  checkingScreenWidth();
  eventService.resetPage();
  eventService
    .fetchEvents()
    .then(events => {
      if (events === undefined) {
        info({ text: `No results were found for your search.` });
      }
      eventsPagination.createPagination(events);
    })
    .catch(error => onFetchError(error));
}

// Функция поиска по заданному слову
function onInputChange(e) {
  e.preventDefault();

  // в этой строке связывает выбранную страну с классом, который отправляет запрос на бекенд
  eventService.сountryQueryKey = selectCountry.countryCode;

  eventService.query = e.target.value.trim();
  checkingScreenWidth();
  eventService.resetPage();
  eventService
    .fetchEvents(EventService)
    .then(events => {
      renderEventsList(events);
    })
    .catch(error => onFetchError(error));
}

function renderEventsList(events) {
  if (eventService.query.length === 0) {
    refs.searchInput.value = '';
    defaultStack.close();
    info({
      text: `Enter your request in the search field, please`,
    });
  } else if (events === undefined) {
    defaultStack.close();
    error({
      text: `No results were found for your search.`,
    });
  } else {
    checkingScreenWidth();
    eventsPagination.createPagination(events);
    defaultStack.close();
    success({
      text: `Searching results:`,
    });
  }
}

//Проверка ширины экрана. Если Tablet-версия, то грузим 21 картинку, для остальных версий 20 картинок
export function checkingScreenWidth() {
  if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth < 1280) {
    eventService.eventsOnOnePage = 21;
  } else {
    eventService.eventsOnOnePage = 20;
  }
}

//  Функция рендеринга(отрисовки) массива событий/концертов
export function eventsMarkUp(array) {
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventTpl(array));
}

// Функция для очистки галереи событий (вызывается при вводе нового поискового слова)
export function clearEventsContainer() {
  refs.eventsContainer.innerHTML = '';
}

// Устраняем перезагрузку страницы, если прльзователь нажал Enter в инпуте с поисковым словом
refs.searchInput.addEventListener('keydown', onEnterInKeyWordInput);

function onEnterInKeyWordInput(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
}
