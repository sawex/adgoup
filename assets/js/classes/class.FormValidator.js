import validate from 'validate.js';
import { qs, qsAll } from '../dom-helpers';

class FormValidator {
  constructor() {
    /**
     * Remember that if you change these constants, you'll probably have to
     * change them in CSS and, possibly, somewhere in JS.
     * */
    this.ERROR_CLASS = 'formfield--invalid';
    this.SUCCESS_CLASS = 'formfield--success';
    this.MESSAGE_CLASS = 'invalid-message';

    this.form = null;
    this.rules = null;
    this.withScroll = null;

    this._addCustomValidators();
  }

  /**
   * Here must be added all custom validators, that could be used in any form.
   *
   * @private
   */
  _addCustomValidators() {
    validate.validators._time = (value) => {
      const regex = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);

      if (!value || regex.test(value)) {
        return null;
      }

      return 'Invalid time';
    };

    validate.validators._equalPasswords = (value, options) => {
      if (!options.firstPassword || !options.secondPassword) {
        return options.message ? options.message : true;
      }

      if (options.firstPassword !== options.secondPassword) {
        return options.message ? options.message : true;
      }

      return null;
    };

    validate.validators._returnInvalidIf = (value, options) => (options.message ? options.message : true);
  }

  /**
   * Compares inputs values with defined rules. Returns true if form is valid, false otherwise.
   *
   * @param {HTMLElementTagNameMap} form
   * @param {object} rules
   * @param {boolean} [withScroll] If true, scroll to the first error after validation.
   *
   * @return boolean
   */
  isValid(form, rules, withScroll = false) {
    try {
      return this._validate(form, rules, withScroll);
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }

  /**
   * @param {HTMLElementTagNameMap} form
   * @param {object} rules
   * @param {boolean} [withScroll] If true, scroll to the first error after validation.
   *
   * @return boolean|array
   */
  _validate(form, rules, withScroll) {
    if (form.tagName !== 'FORM') {
      throw new TypeError('"form" must be an HTML form element');
    }

    this.form = form;
    this.rules = rules;
    this.withScroll = withScroll;

    this._checkFieldsExistence();

    const validationResult = validate(this.form, this.rules);
    this.showErrors(validationResult || {}, withScroll);

    return !validationResult;
  }

  /**
   * The validate.js library doesn't handle the case when we have more rules, then fields in a form, so that
   * could be the case when a form is not valid, but we don't have any errors or validation messages.
   * This method throws an error if found fields that aren't presented in a form.
   *
   * @return boolean|Error
   */
  _checkFieldsExistence() {
    for (const fieldName in this.rules) {
      if (Object.prototype.hasOwnProperty.call(this.rules, fieldName)) {
        const isFieldExists = !!qs(`[name="${fieldName}"]`, this.form);

        if (!isFieldExists) {
          throw new Error(`You've tried to validate the field "${fieldName}" that not exists.`);
        }
      }
    }

    return true;
  }

  showErrors(errors, withScroll) {
    const inputs = qsAll('input[name]:not([type="submit"]), select[name], textarea[name]', this.form);

    inputs.forEach((input) => {
      this.showErrorsForInput(input, errors && errors[input.name]);
    });

    if (withScroll) {
      this.scrollToTheFirstError();
    }
  }

  showErrorsForInput(input, errors) {
    const parent = input.closest('.form-row');

    if (!parent) {
      console.warn(`Didn't find parent node for: ${input.name}`); // eslint-disable-line
      return;
    }

    if (!qs(`.${this.MESSAGE_CLASS}`, parent)) {
      const message = document.createElement('span');
      message.classList.add(this.MESSAGE_CLASS);
      parent.appendChild(message);
    }

    const messages = qs(`.${this.MESSAGE_CLASS}`, parent);

    this.resetFormGroup(parent);

    if (errors) {
      parent.classList.add(this.ERROR_CLASS);
      errors.forEach((error) => this.addError(messages, error));
    } else {
      parent.classList.add(this.SUCCESS_CLASS);
    }
  }

  resetFormGroup(parent) {
    parent.classList.remove(this.ERROR_CLASS);
    parent.classList.remove(this.SUCCESS_CLASS);

    const messages = qsAll(`.${this.MESSAGE_CLASS}`, parent);

    messages.forEach((message) => {
      message.innerText = '';
    });
  }

  addError(messages, error) {
    messages.innerText = error;
  }

  scrollToTheFirstError() {
    const error = qs(`.${this.ERROR_CLASS}`);

    if (!error) {
      return;
    }

    const errorOffset = error.offsetTop;
    const GAP = 120;

    window.scrollTo({
      top: errorOffset - GAP,
      behavior: 'smooth',
    });
  }
}

export default FormValidator;
