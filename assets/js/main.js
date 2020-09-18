import './polyfill';

import 'focus-visible/dist/focus-visible.min';
// import smoothAnchors from './smooth-anchors';

import ContactForm from './classes/class.ContactForm';
import FullPage from './classes/class.FullPage';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    // smoothAnchors();

    new ContactForm();
    new FullPage();
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
