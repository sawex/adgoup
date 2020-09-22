/* global fullpage, fullpage_api */
import '../fullpage.scrollHorizontally.min';
import '../fullpage.extensions.min';
import { qs } from '../dom-helpers';

class FullPage {
  constructor() {
    this.TRANSLATE_GAP = 0;
    this.isFullPageDisabled = false;

    this.cardList = qs('.why-us__cards-list');

    this._run();
  }

  _run() {
    this._initFullPage();
    // this._initScrollingEventListener();
  }

  _initFullPage() {
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

  _initScrollingEventListener() {
    if ('onwheel' in document) {
      this.cardList.addEventListener('wheel', (e) => this._initCardsScrolling(e));
    } else if ('onmousewheel' in document) {
      this.cardList.addEventListener('mousewheel', (e) => this._initCardsScrolling(e));
    } else {
      this.cardList.addEventListener('MozMousePixelScroll', (e) => this._initCardsScrolling(e));
    }

    this._handleFullPageOnResize();
    window.addEventListener('resize', () => this._handleFullPageOnResize());
  }

  _initCardsScrolling(e) {
    if (window.matchMedia('(max-width: 1279px)').matches) return;

    const DELTA = e.deltaY || e.detail || e.wheelDelta;

    if (DELTA > 0) {
      this.TRANSLATE_GAP -= 30;
    } else {
      this.TRANSLATE_GAP += 30;
    }

    this.cardList.style.transform = `translateX(${this.TRANSLATE_GAP}px)`;
    this.cardList.style.WebkitTransform = `translateX(${this.TRANSLATE_GAP}px)`;
    this.cardList.style.MsTransform = `translateX(${this.TRANSLATE_GAP}px)`;

    e.preventDefault();
  }

  _handleFullPageOnResize() {
    if (window.matchMedia('(max-width: 1279px)').matches) {
      if (!this.isFullPageDisabled) {
        fullpage_api.destroy('all');
        this.isFullPageDisabled = true;
      }
    } else if (this.isFullPageDisabled) {
      fullpage_api.reBuild();
      this.isFullPageDisabled = false;
    }
  }
}

export default FullPage;
