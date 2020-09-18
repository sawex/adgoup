<?php

class FormHandler {
  const FORM_FIELDS = [
    'name',
    'email',
    'website',
    'message',
  ];

  const ADMIN_EMAIL = 'danil27zp@gmail.com';
  const SERVER_EMAIL = 'form@webzp.com.ua';

  public static function fields_not_empty() {
    $result = true;

    foreach (self::FORM_FIELDS as $form_field) {
      if (!isset($_POST[$form_field])) {
        $result = false;
      }
    }

    return $result;
  }

  public static function get_email_html_from_array(array $fields): string {
    $fields = array_merge([ 'action_date' => date('r') ], $fields);
    $text = '';

    $text .= '<html lang="ru-RU"><body><div>';

    foreach ($fields as $field_name => $field_value) {
      $field_name = str_replace('_', '', ucwords($field_name, '_'));
      $field_name = preg_split('/(?=[A-Z])/', $field_name);
      $field_name = implode(' ', $field_name);

      $text .= sprintf('<b>%s:</b><br/>%s<br/><br/>', $field_name, $field_value);
    }

    $text .= '</div></body></html>';

    return $text;
  }

  public static function response($is_success, $data) {
    ob_clean();

    header_remove();

    header("Content-type: application/json; charset=utf-8");

    if ($is_success) {
      http_response_code(200);
    } else {
      http_response_code(500);
    }

    echo json_encode($data);

    exit();
  }

  public static function handle_email() {
    if (self::fields_not_empty()) {
      mail(
        self::ADMIN_EMAIL,
        'На сайте заполнена новая форма',
        self::get_email_html_from_array([
          'name' => $_POST['name'],
          'email' => $_POST['email'],
          'website' => $_POST['website'],
          'message' => $_POST['message'],
        ]),
        [
          sprintf('From: %s', self::SERVER_EMAIL),
          'MIME-Version: 1.0',
          'Content-type: text/html; charset=iso-8859-1',
          sprintf('X-Mailer: PHP/%s', phpversion()),
        ]
      );

      self::response(true, [ 'success' => 'true' ]);
    }

    self::response(false, [ 'success' => 'false' ]);
  }
}

FormHandler::handle_email();
