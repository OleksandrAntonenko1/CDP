const submitForm = '#submit';
const loginField = '#login';
const passwordField = '#password1';
const confirmPasswordField = '#password2';
const successMessage = 'Account Created Successfully';
const wrongLogin = 'john.doe';
const url = 'http://localhost:3000';
const successColor = 'rgb(0, 204, 0)';
const failureColor = 'rgb(204, 0, 0)';

module.exports = {
  'successful login': function (browser) {
    browser
      .url(url)
      .waitForElementVisible('body', 1000)
      .setValue(loginField, 'nightwatch')
      .click('body')
      .expect.element(loginField).to.have.css('border-color').which.equals(successColor);

    browser
      .setValue(passwordField, 'nightwatch')
      .setValue(confirmPasswordField, 'nightwatch')
      .click('body')
      .expect.element(confirmPasswordField).to.have.css('border-color').which.equals(successColor);

    browser
      .click('body')
      .click(submitForm)
      .getAlertText(function (res) {
        this.assert.equal(res.value, successMessage);
      })
      .acceptAlert()
      .end()
  },

  'wrong login': function (browser) {
    browser
      .url(url)
      .waitForElementVisible('body', 1000)
      .setValue(loginField, wrongLogin)
      .click('body')
      .expect.element(loginField).to.have.css('border-color').which.equals(failureColor);

    browser
      .setValue(passwordField, 'nightwatch')
      .setValue(confirmPasswordField, 'nightwatch')
      .click('body')
      .expect.element(confirmPasswordField).to.have.css('border-color').which.equals(successColor);

    browser
      .click('body')
      .click(submitForm)
      .getAttribute(submitForm, 'disabled', function (res) {
        this.assert.equal(res.value, true.toString());
      })
      .end()
  },

  'wrong second password': function (browser) {
    browser
      .url(url)
      .waitForElementVisible('body', 1000)
      .setValue(loginField, 'nightwatch')
      .click('body')
      .expect.element(loginField).to.have.css('border-color').which.equals(successColor);

    browser
      .setValue(passwordField, 'nightwatch')
      .setValue(confirmPasswordField, 'nightwatch1')
      .click('body')
      .expect.element(confirmPasswordField).to.have.css('border-color').which.equals(failureColor);

    browser
      .click('body')
      .getAttribute(submitForm, 'disabled', function (res) {
        this.assert.equal(res.value, true.toString());
      })
      .end()
  },
};
