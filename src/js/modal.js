import EventService from './events-service';
import modalEventTpl from '../templates/modalEventTpl.hbs';
import refs from './refs';

const modalEventService = new EventService();

refs.eventsItem.addEventListener('click', onEventClick);

function onEventClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'UL') {
    refs.scrollUp.classList.remove('scroll-up--active');
    refs.modalOverlay.classList.add('is-open');
    refs.body.classList.add('overflow-hidden');

    const eventId = e.target.getAttribute('id');
    modalEventService.fetchEventById(eventId).then(event => renderMarkupInModal(event));
  }

  function renderMarkupInModal(arr) {
    const markup = modalEventTpl(arr[0]);
    refs.modalContainer.insertAdjacentHTML('beforeend', markup);
  }
}

function onModalCloseBtn() {
  refs.modalOverlay.classList.remove('is-open');
  refs.scrollUp.classList.add('scroll-up--active');
  refs.body.classList.remove('overflow-hidden');
  refs.modalOverlay.removeEventListener('click', onModalCloseBtn);
  refs.modalContainer.innerHTML = '';
}

refs.modalOverlay.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.modal__btn-close') || target.matches('.modal-overlay')) {
    onModalCloseBtn();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.code !== 'Escape') {
    return;
  }
  onModalCloseBtn();
});
