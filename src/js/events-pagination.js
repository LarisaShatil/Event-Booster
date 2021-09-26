import { clearEventsContainer, eventsMarkUp, eventService } from '../index';
import Pagination from 'tui-pagination';
export class EventsPagination {
  constructor({ visiblePages, page, centerAlign, paginationContainer }) {
    this.visiblePages = visiblePages;
    this.page = page;
    this.centerAlign = centerAlign;
    this.paginationContainer = paginationContainer;
  }

  setOptions(data) {
    return {
      totalItems: data?.page?.totalElements,
      itemsPerPage: data?.page?.size,
      visiblePages: this.visiblePages,
      page: this.page,
      centerAlign: this.centerAlign,

      template: {
        page: '<a class="pagination__button tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="pagination__button pagination__button--active tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="pagination__move-button pagination__move-button--{{type}} tui-{{type}}">' +
          '<span class="tui-ico-{{type}}"></span>' +
          '</a>',
        disabledMoveButton:
          '<span class="pagination__move-button--disabled pagination__move-button pagination__move-button--{{type}} tui-page-btn tui-is-disabled tui-{{type}}">' +
          '</span>',
        moreButton:
          '<a href="#" class="pagination__move-button pagination__button pagination__button--more tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
  }

  createPagination(data) {
    this.resetPagination();

    this.renderMarkup(data);
    this.renderPagination(data);
  }

  renderPagination(data) {
    const obj = this.setOptions(data);
    const pagination = new Pagination('pagination', obj);
    pagination.on('beforeMove', e => {
      const { page } = e;
      eventService.page = page - 1;
      eventService.fetchEvents().then(data => this.renderMarkup(data));
    });
  }

  renderMarkup(data) {
    clearEventsContainer();
    eventsMarkUp(data?._embedded?.events);
  }

  resetPagination() {
    eventService.number = 0;
  }

  onPaginationClick(e) {
    const { page } = e;
    eventService.page = page;
    eventService.fetchEvents().then(data => this.renderMarkup(data));
  }
}
