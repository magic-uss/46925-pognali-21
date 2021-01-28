const menu = document.querySelector('.header-menu');
const logoHeader = document.querySelector('.page-header__logo-wrapper');
const menuToggle = document.querySelector('.header-menu__toggle');
const mainPage = document.querySelector('.features');

const modalPopup = document.querySelector('.tariffs-modal');
const tariffsBtn = document.querySelector('.tariffs__link');
const closeBtn = modalPopup.querySelector('.tariffs-modal__button');

/* menu show/close */

menu.classList.remove('header-menu--nojs');
logoHeader.classList.remove('page-header__logo-wrapper--nojs');
mainPage.classList.remove('features--nojs');

menuToggle.addEventListener('click', function() {
  if (menu.classList.contains('header-menu--closed')) {
    menu.classList.remove('header-menu--closed');
    menu.classList.add('header-menu--opened');
  } else {
    menu.classList.add('header-menu--closed');
    menu.classList.remove('header-menu--opened');
  }
  if (logoHeader.classList.contains('page-header__logo-wrapper--opened')) {
    logoHeader.classList.remove('page-header__logo-wrapper--opened');
  } else {
    logoHeader.classList.add('page-header__logo-wrapper--opened');
  }
});

/* menu scroll */

document.addEventListener('scroll', function() {
  const pageWidth = document.documentElement.clientWidth;
  const pageHeight = pageYOffset;

  if (pageWidth >= 1440) {
    if (pageHeight < 750) {
      logoHeader.classList.remove('page-header__logo-wrapper--scroll');
      menuToggle.classList.remove('header-menu__toggle--scroll');
    } else {
    logoHeader.classList.add('page-header__logo-wrapper--scroll');
    menuToggle.classList.add('header-menu__toggle--scroll');
    }
  } else {
    if (pageHeight == 0) {
      logoHeader.classList.remove('page-header__logo-wrapper--scroll');
      menuToggle.classList.remove('header-menu__toggle--scroll');
    } else {
    logoHeader.classList.add('page-header__logo-wrapper--scroll');
    menuToggle.classList.add('header-menu__toggle--scroll');
    }
  }
});

/* modal show/close */

tariffsBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.add('tariffs-modal--show');
});

closeBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalPopup.classList.remove('tariffs-modal--show');
});

window.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    if (modalPopup.classList.contains('tariffs-modal--show')) {
      evt.preventDefault();
      modalPopup.classList.remove('tariffs-modal--show');
    }
  }
});
