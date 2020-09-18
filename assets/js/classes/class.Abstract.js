import $ from 'jquery';

class Abstract {
  constructor() {
    if (this.constructor === Abstract) {
      throw new TypeError('Can not construct abstract class.');
    }
  }

  static isFunction(f) {
    return typeof f === 'function';
  }

  static findClassNameAndRemove(className, parentNode) {
    const node = parentNode || document;

    const el = node.querySelector(`.${className}`);

    if (el) {
      el.classList.remove(className);
    }
  }

  static fadeIn(node) {
    return $(node).fadeIn();
  }

  static fadeOut(node) {
    return $(node).fadeOut();
  }

  static formDataToObject(formData) {
    const result = {};

    formData.forEach((value, key) => {
      if (!Reflect.has(result, key)) {
        result[key] = value;
        return;
      }

      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }

      result[key].push(value);
    });

    return result;
  }
}

export default Abstract;
