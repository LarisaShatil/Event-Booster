// файл черновой для отработки моих попыток достучаться до событий, не подключен в index.js
import EventService from './events-service';
import modalEventTpl from '../templates/modalEventTpl.hbs';

const refs = {
  body: document.querySelector('body'),
  eventsItem: document.querySelector('.events__list'),
  modalOverlay: document.querySelector('.js-modal'),
  modalCloseBtn: document.querySelector('button[data-action="close-modal"]'),
  event: document.querySelector('.events__image'),
  eventCard: document.querySelector('.events__link'),
  modal: document.querySelector('.modal'),
  modalContainer: document.querySelector('.modal__event-card'),
};
const modalEventService = new EventService();

refs.eventsItem.addEventListener('click', onEventClick);

// открытие модального окна при клике на галерею
function onEventClick(e) {
  e.preventDefault();

  refs.modalOverlay.classList.remove('visually-hidden');
  refs.modalOverlay.classList.add('is-open');
  refs.body.classList.add('overflow-hidden');
  const eventId = e.target.getAttribute('id');
  modalEventService.fetchEventById(eventId).then(event => renderMarkupInModal(event));
}
function renderMarkupInModal(arr) {
  const markup = modalEventTpl(arr[0]);
  refs.modalContainer.insertAdjacentHTML('beforeend', markup);
}

function onModalCloseBtn() {
  refs.modalOverlay.classList.remove('is-open');
  refs.modalOverlay.classList.add('visually-hidden');
  refs.body.classList.remove('overflow-hidden');

  refs.modalOverlay.removeEventListener('click', onModalCloseBtn);

  refs.modalContainer.innerHTML = '';
}

// Закрытие по клику на кнопку close и на overlay модального окна
refs.modalOverlay.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.modal__btn-close') || target.matches('.modal-overlay')) {
    onModalCloseBtn();
  }
});

// Закрытие при нажатии Escape
document.addEventListener('keydown', function (event) {
  if (event.code !== 'Escape') {
    return;
  }
  onModalCloseBtn();
});
