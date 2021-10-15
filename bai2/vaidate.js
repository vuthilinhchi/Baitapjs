

function Validator(options) {
    function Validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
        } else {
            errorElement.innerText = '';
        }
        return!errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormSucces = true;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isSucces = Validate(inputElement, rule);
                if (!isSucces) {
                    isFormSucces = false;
                }
            });

            if (isFormSucces) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {});
                    options.onSubmit(formValues);
                    alert("Đăng ký thành công");
                }
            }
        }

        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                }
            }
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!'

        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.value == "") {
                return value.trim() ? undefined : 'Vui lòng nhập trường này!'
            } else {
                return regex.test(value) ? undefined : message || 'Trường này phải là email !'
            }
        }
    };
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex_password = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,32}/;
            if (password.value == "") {
                return value.trim() ? undefined : 'Vui lòng nhập trường này!'
            } else {
                return regex_password.test(value) ? undefined : message || 'Mật khẩu 8-32 kí tự, ít nhất 1 chữ hoa và 1 chữ thường'
            }

        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            if (password_confirmation.value == "") {
                return value.trim() ? undefined : 'Vui lòng nhập trường này!'
            } else {
                return value == getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
            }

        }
    }

}
