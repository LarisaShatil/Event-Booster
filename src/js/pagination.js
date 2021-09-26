import { clearEventsContainer, eventsMarkUp } from '../index';
import { refs, activeButton } from './refs';

export class Pagination {
  constructor({ paginationContainer }) {
    this.currentPage = 1;
    this.numberOfItems = 0;
    this.numberPerPage = 0;
    this.paginationContainer = paginationContainer;
    this.numberOfPages = 0;
    this.respData = [];
    this.paginationContainer.addEventListener('click', this.onPaginationBtnClick.bind(this));
  }

  getData(data) {
    this.respData.splice(0, this.respData.length);

    this.respData.push(...data);

    this.numberOfItems = this.respData.length;

    this.getProperNumberPerPage();

    this.displayList(this.respData);
    this.displayPagination(this.respData);
  }

  getProperNumberPerPage() {
    if (
      document.documentElement.clientWidth >= 768 &&
      document.documentElement.clientWidth < 1280
    ) {
      this.numberPerPage = 21;
    } else {
      this.numberPerPage = 20;
    }
  }

  displayList(data) {
    clearEventsContainer();

    const start = (this.currentPage - 1) * this.numberPerPage;
    const end = start + this.numberPerPage;
    const paginatedEvents = data.slice(start, end);

    eventsMarkUp(paginatedEvents);
  }

  displayPagination(data) {
    this.resetPagination();

    this.numberOfPages = Math.ceil(this.numberOfItems / this.numberPerPage);

    for (let i = 1; i < this.numberOfPages + 1; i += 1) {
      let button = this.createPaginationButton(i, data);
      this.paginationContainer.appendChild(button);
    }
  }

  resetPagination() {
    this.currentPage = 1;
    this.paginationContainer.innerHTML = '';
  }

  createPaginationButton(page) {
    let button = document.createElement('button');
    button.innerText = page;
    button.dataset.number = page;
    button.classList.add('pagination__button');

    if (this.currentPage === page) {
      button.classList.add('pagination__button--active');
    }
    return button;
  }

  onPaginationBtnClick(e) {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    this.currentPage = e.target.dataset.number;
    this.displayList(this.respData, this.currentPage);

    let activeBtn = document.querySelector('.pagination__button--active');
    activeBtn.classList.remove('pagination__button--active');

    e.target.classList.add('pagination__button--active');
  }
}
