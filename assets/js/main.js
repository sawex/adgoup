import './polyfill';
import 'focus-visible/dist/focus-visible.min';
import store from 'store';
import Rellax from 'rellax';
import smoothAnchors from './smooth-anchors';

import { qs, qsAll } from './dom-helpers';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    smoothAnchors();

    this._registerGlobalObjects();
    this._initParalaxCard();
  }

  _registerGlobalObjects() {
    window.qs = qs;
    window.qsAll = qsAll;
    window.store = store;
  }

  _initParalaxCard() {
    new Rellax('.rellax', {
      speed: -2,
      center: false,
      wrapper: null,
      round: true,
      vertical: false,
      horizontal: true,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
