/* global fullpage */

import './polyfill';
import './fullpage.scrollHorizontally.min';
import './fullpage.extensions.min';

import 'focus-visible/dist/focus-visible.min';
import store from 'store';
// import Rellax from 'rellax';
import smoothAnchors from './smooth-anchors';

import { qs, qsAll } from './dom-helpers';
import ContactForm from './classes/class.ContactForm';

class Main {
  constructor() {
    this.sections = qsAll('section');
    this.distanceHelper = qs('.hidden-distance');
    this.lastScrollDistance = 0;

    this.fullPageInstance = null;
    this.lastWheel = new Date();

    this._run();
  }

  _run() {
    smoothAnchors();

    new ContactForm();

    this._registerGlobalObjects();
    // this._initParalaxCard();
    this._initFullpage();
  }

  _registerGlobalObjects() {
    window.qs = qs;
    window.qsAll = qsAll;
    window.store = store;
  }

  // _initParalaxCard() {
  //   new Rellax('.rellax', {
  //     speed: -2,
  //     center: false,
  //     wrapper: null,
  //     round: true,
  //     vertical: false,
  //     horizontal: true,
  //   });
  // }

  // _calculateSectionsWidths() {
  //   if (!this.sections.length) {
  //     return;
  //   }
  //
  //   this.main.style.width = `${this.sections.length * 100}vw`;
  // }

  _initFullpage() {
    // eslint-disable-next-line new-cap
    this.fullPageInstance = new fullpage('#fullpage', {
      autoScrolling: true,
      loopHorizontal: false,
      controlArrows: false,
      anchors: ['section1', 'section2', 'section3', 'section4'],
      normalScrollElements: '.why-us__cards-list',
      licenseKey: 'DB55ED36-24984ABE-A41951BD-7E95785D',
      scrollHorizontally: true,
      scrollHorizontallyKey: '0F51D536-0F9C4FFC-9EF22BD4-92F4E21',
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
