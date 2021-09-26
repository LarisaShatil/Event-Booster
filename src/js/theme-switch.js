const bodyTheme = document.querySelector('body');
const switcher = document.querySelector('.theme-switch__toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

switcher.addEventListener('change', changeTheme);

function changeTheme(event) {
  event.currentTarget.checked ? checkedInput() : notCheckedInput();
}

function checkedInput() {
  bodyTheme.classList.add(Theme.LIGHT);

  localStorage.setItem('theme', Theme.LIGHT);

  switcher.checked = true;
}

function notCheckedInput() {
  bodyTheme.classList.remove(Theme.LIGHT);

  localStorage.setItem('theme', Theme.DARK);
  
  switcher.checked = false;
}

function currentTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT) {
    checkedInput();
    return;
  }
  if (savedTheme === Theme.DARK || savedTheme === null) {
    notCheckedInput();
    return;
  }
}

currentTheme();
