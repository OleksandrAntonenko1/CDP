import $ from 'jquery';
import fs from 'fs';

import Form from "../src/form";
import {
  successColor,
  failureColor,
} from  "../src/constants"

const html = fs.readFileSync('./index.html').toString();
document.documentElement.innerHTML = html;

describe('Form', () => {
  let form;

  describe('checkField', () => {
    let unlockButton;

    beforeEach(() => {
      form = new Form();

      jest.spyOn(form, 'unlockButton').mockImplementation(() => false);

      unlockButton = jest.spyOn(form, 'unlockButton');
    });

    describe('correct field', () => {
      let testNode;

      beforeEach(() => {
        testNode = $('<div>test</div>');
        form.checkField(true, testNode);
      });

      it('should change input color to success', () => {
        expect(testNode.css('border-color')).toBe(successColor);
      });

      it('should change valid property to true', () => {
        expect(testNode.valid).toBe(true);
      });

      it('should call unlockButton', () => {
        expect(unlockButton).toHaveBeenCalled();
      });
    });

    describe('incorrect field', () => {
      let testNode;

      beforeEach(() => {
        testNode = $('<div>test</div>');
        form.checkField(false, testNode);
      });

      it('should change input color to failure', () => {
        expect(testNode.css('border-color')).toBe(failureColor);
      });

      it('should change valid property to false', () => {
        expect(testNode.valid).toBe(false);
      });

      it('should call unlockButton', () => {
        expect(unlockButton).toHaveBeenCalled();
      });
    });

    describe('correct field with additional field', () => {
      let testNode;
      let additionalTestNode;

      beforeEach(() => {
        testNode = $('<div>test</div>');
        additionalTestNode = $('<div>test</div>');
        form.checkField(true, testNode, additionalTestNode);
      });

      it('should change input color to success', () => {
        expect(additionalTestNode.css('border-color')).toBe(successColor);
      });

      it('should change valid property to true', () => {
        expect(testNode.valid).toBe(true);
      });

      it('should call unlockButton', () => {
        expect(unlockButton).toHaveBeenCalled();
      });
    });

    describe('incorrect field with additional field', () => {
      let testNode;
      let additionalTestNode;

      beforeEach(() => {
        testNode = $('<div>test</div>');
        additionalTestNode = $('<div>test</div>');
        form.checkField(false, testNode, additionalTestNode);
      });

      it('should change input color to failure', () => {
        expect(additionalTestNode.css('border-color')).toBe(failureColor);
      });

      it('should change valid property to false', () => {
        expect(testNode.valid).toBe(false);
      });

      it('should call unlockButton', () => {
        expect(unlockButton).toHaveBeenCalled();
      });
    });
  });

  describe('unlockButton', () => {
    beforeEach(() => {
      form = new Form();
    });

    describe('both fields are valid', () => {
      beforeEach(() => {
        form.passwordField.valid = true;
        form.loginField.valid = true;
        form.unlockButton()
      });

      it('submitForm should remove disabled attribute', () => {
        expect(form.submitForm.attr('disabled')).toBe(undefined);
      })
    });

    describe('one field is valid', () => {
      beforeEach(() => {
        form.passwordField.valid = false;
        form.loginField.valid = true;
        form.unlockButton()
      });

      it('submitForm should have disabled attribute', () => {
        expect(form.submitForm.attr('disabled')).toBe('disabled');
      })
    });

    describe('both fields are invalid', () => {
      beforeEach(() => {
        form.passwordField.valid = false;
        form.loginField.valid = false;
        form.unlockButton()
      });

      it('submitForm should have disabled attribute', () => {
        expect(form.submitForm.attr('disabled')).toBe('disabled');
      });
    });
  });

  describe('handleConfirmPasswordChange', () => {
    let checkField;

    beforeEach(() => {
      form = new Form();
      jest.spyOn(form, 'checkField').mockImplementation(() => false);
      checkField = jest.spyOn(form, 'checkField');
      form.handleConfirmPasswordChange()
    });

    it('should call checkField', () => {
      expect(checkField).toHaveBeenCalled();
    });
  });

  describe('handleLoginChange', () => {
    let get;

    beforeEach(() => {
      form = new Form();
      jest.spyOn($, 'get').mockImplementation(() => false);
      get = jest.spyOn($, 'get');
      form.handleLoginChange()
    });

    it('should call get', () => {
      expect(get).toHaveBeenCalled();
    });
  });

  describe('handleGetRequest', () => {
    let checkField;

    beforeEach(() => {
      form = new Form();
      jest.spyOn(form, 'checkField').mockImplementation(() => false);
      checkField = jest.spyOn(form, 'checkField');
      form.handleGetRequest({status: 'test'})
    });

    it('should call checkField', () => {
      expect(checkField).toHaveBeenCalled();
    });
  });

  describe('handleSubmit', () => {
    let post;

    beforeEach(() => {
      form = new Form();
      jest.spyOn($, 'post').mockImplementation(() => false);
      post = jest.spyOn($, 'post');
      form.handleSubmit({
        preventDefault: () => {
        }
      })
    });

    it('should call post', () => {
      expect(post).toHaveBeenCalled();
    });
  });

  describe('handlePostRequest', () => {
    let alert;

    beforeEach(() => {
      form = new Form();
      jest.spyOn(window, 'alert').mockImplementation(() => {
      });
      alert = jest.spyOn(window, 'alert');
    });

    describe('success', () => {
      beforeEach(() => {
        form.handlePostRequest({status: 'ok'});
      });

      it('should call alert', () => {
        expect(alert).toHaveBeenCalled();
      });
    });

    describe('failure', () => {
      beforeEach(() => {
        form.handlePostRequest({status: 'test'});
      });

      it('should not call alert', () => {
        expect(alert).not.toHaveBeenCalled();
      });
    });
  });
});
