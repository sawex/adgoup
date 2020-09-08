import './polyfill';
import 'focus-visible/dist/focus-visible.min';
import store from 'store';
import smoothAnchors from './smooth-anchors';

import { qs, qsAll } from './dom-helpers';

class Main {
  constructor() {
    this._run();
  }

  _run() {
    smoothAnchors();

    this._registerGlobalObjects();
  }

  _registerGlobalObjects() {
    window.qs = qs;
    window.qsAll = qsAll;
    window.store = store;
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
