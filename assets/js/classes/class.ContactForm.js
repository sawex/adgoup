import { __ } from '@wordpress/i18n';
import AJAX from './class.AJAX';
import Abstract from './class.Abstract';
import FormValidator from './class.FormValidator';
import { qs } from '../dom-helpers';

class ContactForm {
  constructor() {
    if (!qs('.contacts__form')) return;

    this.form = qs('.contacts__form');
    this.formSuccessMessage = qs('.send-message');
    this.formStatus = qs('.alert', this.form);
    this.submitButton = qs('button[type="submit"]');

    this._run();
  }

  _run() {
    try {
      this._handleSubmit();
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }

  _handleSubmit() {
    const _this = this;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!this._isFormValid()) return;

      const data = new FormData(this.form);

      AJAX.post({
        action: 'mst_somi_contact_form',
        data: Abstract.formDataToObject(data),
        beforeSend() {
          _this.submitButton.disabled = true;
        },
        complete() {
          _this.submitButton.disabled = false;
        },
        success(response) {
          const level = response.success ? 'success' : 'error';

          if (level === 'success') {
            return _this._showSuccessMessage();
          }

          _this._writeStatus(level, response.data.message);
        },
      });
    });
  }

  _isFormValid() {
    return new FormValidator().isValid(this.form, {
      name: {
        presence: {
          message: __('^Name field can\'t be empty', 'mst_somi_js'),
        },
      },
      email: {
        presence: {
          message: __('^Email field can\'t be empty', 'mst_somi_js'),
        },
        email: {
          message: __('^Incorrect email format', 'mst_somi_js'),
        },
      },
      phone: {
        presence: {
          message: __('^Phone field can\'t be empty', 'mst_somi_js'),
        },
        format: {
          pattern: new RegExp(/^[0-9]{1,12}$/),
          message: __('^Phone number must contain only digits', 'mst_somi_js'),
        },
      },
      comment: {
        presence: {
          message: __('^Comment field can\'t be empty', 'mst_somi_js'),
        },
      },
    });
  }

  _writeStatus(level, status) {
    Abstract.fadeIn(this.formStatus);

    this.formStatus.classList.add(level);
    this.formStatus.innerText = status;

    setTimeout(() => {
      Abstract.fadeOut(this.formStatus);

      this.formStatus.classList.remove(level);
      this.formStatus.innerText = '';
    }, 8000);
  }

  _showSuccessMessage() {
    Abstract.fadeOut(this.form);
    Abstract.fadeIn(this.formSuccessMessage);
    this.form.remove();
  }
}

export default ContactForm;
