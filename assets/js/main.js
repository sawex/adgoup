import './polyfill';
import 'focus-visible/dist/focus-visible.min';
import store from 'store';
import Rellax from 'rellax';
import smoothAnchors from './smooth-anchors';

import { qs, qsAll } from './dom-helpers';

class Main {
  constructor() {
    this.sections = qsAll('section');
    this.main = qs('#main');
    this._run();
  }

  _run() {
    smoothAnchors();

    this._registerGlobalObjects();
    this._initParalaxCard();
    this._calculateSectionsWidths();
    this._initEventListeners();
    this._scrollHorizontally();
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

  _calculateSectionsWidths() {
    if (!this.sections.length) {
      return;
    }

    this.main.style.width = `${this.sections.length * 100}vw`;
  }

  _initEventListeners() {
    window.addEventListener('mousewheel', (e) => this._scrollHorizontally(e), false);
    window.addEventListener('DOMMouseScroll', (e) => this._scrollHorizontally(e), false);
  }

  _scrollHorizontally(e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    const SCROLL_SPEED = 100;

    document.documentElement.scrollLeft -= (delta * SCROLL_SPEED);
    document.body.scrollLeft -= (delta * SCROLL_SPEED);

    e.preventDefault();
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
