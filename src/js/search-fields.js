import SelectTemplate from '../templates/countryList.hbs';

export default class Select {
  constructor(selector, options) {
    this.selectEl = document.querySelector(selector);
    this.options = options;
    this.selectedCode = null;
    this.countryCode = null;
    this.#render();
    this.#setup();
  }

  #render() {
    this.options.data.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.selectEl.innerHTML = SelectTemplate(this.options);
  }

  #setup() {
    this.handlerClick = this.handlerClick.bind(this);
    this.selectEl.addEventListener('click', this.handlerClick);
    this.arrow = this.selectEl.querySelector('[data-type="arrow"]');
    this.selectValue = this.selectEl.querySelector('.select__current');
  }

  open() {
    this.selectEl.classList.add('open');
    this.arrow.classList.remove('open');
  }
  close() {
    this.selectEl.classList.remove('open');
    this.arrow.classList.add('open');
  }

  handlerClick(e) {
    this.clickNotSelect = this.clickNotSelect.bind(this);
    window.addEventListener('click', this.clickNotSelect);
    const { type, code } = e.target.dataset;

    if (type === 'input' || type === 'arrow') {
      this.toggle();
    } else if (type === 'item') {
      this.countryCode = code;
      this.select(this.countryCode);
    }
  }

  clickNotSelect(e) {
    const { type } = e.target.dataset;
    if (!(type === 'input' || type === 'arrow' || type === 'item')) {
      this.close();
      window.removeEventListener('click', this.clickNotSelect);
    }
  }

  alreadyChooseCountry() {
    if (!this.selectValue.classList.contains('choose')) {
      this.selectValue.classList.add('choose');
    }
  }

  get current() {
    return this.options.data.find(item => item.countryCode === this.selectedCode);
  }

  select(code) {
    this.selectedCode = code;
    this.alreadyChooseCountry();
    this.selectEl
      .querySelectorAll('[data-type="item"]')
      .forEach(el => el.classList.remove('selected'));
    if (this.selectedCode === 'null') {
      this.selectValue.textContent = 'Choose country';
      this.selectValue.classList.remove('choose');
      this.countryCode = null;
    } else {
      this.selectValue.textContent = this.current.name;
      this.selectEl.querySelector(`[data-code=${code}]`).classList.add('selected');
    }

    this.close();
  }

  get isOpen() {
    return this.selectEl.classList.contains('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}
