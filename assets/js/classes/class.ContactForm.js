import swal from 'sweetalert';
import FormValidator from './class.FormValidator';
import { qs } from '../dom-helpers';

class ContactForm {
  constructor() {
    if (!qs('.callback__form')) return;

    this.form = qs('.callback__form');
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
    // const _this = this;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!this._isFormValid()) return;

      // const data = new FormData(this.form);
      // AJAX.post({
      //   data: Abstract.formDataToObject(data),
      //   url: './mail.php',
      //   beforeSend() {
      //     _this.submitButton.disabled = true;
      //   },
      //   complete() {
      //     _this.submitButton.disabled = false;
      //
      //     return swal({
      //       title: 'Good job!',
      //       text: 'You\'ve succesfully submitted the form!',
      //       icon: 'success',
      //     });
      //   },
      //   success(response) {
      //     const level = response.success ? 'success' : 'error';
      //
      //     if (level === 'success') {
      //       return swal({
      //         title: 'Good job!',
      //         text: 'You\'ve succesfully submitted the form!',
      //         icon: 'success',
      //       });
      //     }
      //
      //     return swal({
      //       title: 'Error!',
      //       text: 'Internal Server error',
      //       icon: 'error',
      //     });
      //   },
      // });

      return swal({
        title: 'Good job!',
        text: 'You\'ve succesfully submitted the form!',
        icon: 'success',
      });
    });
  }

  _isFormValid() {
    return new FormValidator().isValid(this.form, {
      name: {
        presence: {
          message: '^Укажите ваше имя',
        },
      },
      email: {
        presence: {
          message: '^Укажите ваш email',
        },
        email: {
          message: '^Убедитесь, что email указан в формате user@example.com',
        },
      },
      website: {
        presence: {
          message: '^Укажите ссылку на ваш сайт',
        },
        url: {
          message: '^Убедитесь, что сайт указан в формате https://example.com',
        },
      },
      message: {
        presence: {
          message: '^Укажите ваш вопрос',
        },
      },
    });
  }
}

export default ContactForm;
