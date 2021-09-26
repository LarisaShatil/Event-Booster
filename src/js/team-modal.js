import teamModalTpl from '../templates/teamModal.hbs';
import teamData from './data/team';

$('.hover').mouseleave(function () {
  $(this).removeClass('hover');
});

const openTeamModal = document.querySelector('.footer-open-modal');
const teamModal = document.querySelector('.team-modal');
const scrollUp = document.querySelector('.scroll-up');
// const backdrop = document.querySelector('.backdrop'),

openTeamModal.addEventListener('click', e => {
  e.preventDefault();

  const teamModalMarkup = teamModalTpl(teamData);
  document.querySelector('.team-modal').innerHTML = teamModalMarkup;

  const btnCloseModal = document.querySelector('.close');
  document.body.style.overflow = 'hidden';
  scrollUp.style.display = 'none';
  teamModal.classList.remove('is-hidden');
  teamModal.classList.add('is-open');

  btnCloseModal.addEventListener('click', () => {
    document.body.style.overflow = 'visible';
    scrollUp.style.display = 'block';
    teamModal.classList.remove('is-open');
    teamModal.classList.add('is-hidden');
  });
});