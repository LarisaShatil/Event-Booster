const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.js-search-input'),
  eventsContainer: document.querySelector('.js-events-container'),
  paginationContainer: document.querySelector('#pagination'),
  loadMore: document.querySelector('.js-load-more'),

  body: document.querySelector("body"),
  
  eventsItem: document.querySelector('.events__list'),
  modalOverlay: document.querySelector('.js-modal'),
  modalCloseBtn: document.querySelector('button[data-action="close-modal"]'),
  event: document.querySelector('.events__image'),
  eventCard:document.querySelector(".events__link"),
  modal: document.querySelector('.modal'),
  modalContainer: document.querySelector('.modal__event-card'),
  scrollUp: document.querySelector('.scroll-up'),
};

export default refs;
