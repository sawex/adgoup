class AJAX {
  constructor() {
    if (this.constructor === AJAX) {
      throw new TypeError('Can not construct abstract class.');
    }
  }

  static post(options) {
    jQuery.ajax({
      type: 'POST',
      url: options.url,
      data: {
        action: options.action,
        ...options.data,
      },
      beforeSend: options.beforeSend,
      complete: options.complete,
      success: options.success,
    });
  }
}

export default AJAX;
