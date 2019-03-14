import {
  successColor,
  failureColor
} from './constants';

export default class Form {
  constructor() {
    this.submitForm = $('#submit');
    this.loginField = $('#login');
    this.passwordField = $('#password1');
    this.confirmPasswordField = $('#password2');

    this.loginField.change(this.handleLoginChange);
    this.confirmPasswordField.change(this.handleConfirmPasswordChange);
    this.submitForm.click(this.handleSubmit);
  }

  handleLoginChange = () => {
    $.get(
      `/checkLogin/${this.loginField.val()}`,
      this.handleGetRequest
    )
  };

  handleGetRequest = ({status}) => this.checkField(status.includes('alright'), this.loginField);

  handleConfirmPasswordChange = () => {
    const isPasswordCorrect = this.passwordField.val() === this.confirmPasswordField.val();

    return this.checkField(isPasswordCorrect, this.passwordField, this.confirmPasswordField)
  };

  checkField = (isCorrect, field, additionalField = null) => {
    const borderColor = isCorrect
      ? successColor
      : failureColor;

    const resultField = additionalField
      ? additionalField
      : field;

    resultField.css({'border-color': borderColor});
    field.valid = isCorrect;

    this.unlockButton();
  };

  unlockButton = () => {
    if (this.passwordField.valid && this.loginField.valid) {
      this.submitForm.removeAttr('disabled');
    } else {
      this.submitForm.attr('disabled', 'disable');
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    $.post('/createAccount', $('#create-account-form').serialize(), this.handlePostRequest);
  };

  handlePostRequest = ({status}) => {
    if (status === 'ok') {
      alert('Account Created Successfully');
    }
  };
}
