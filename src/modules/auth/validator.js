import { Map } from 'immutable'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import passwordValidator from 'password-validator'

// import en from 'src/locales/en.json';
// import ar from 'src/locales/ar.json';

let schema = new passwordValidator()

schema
	.is()
	.min(6) // Minimum length 6
	.is()
	.max(20) // Maximum length 20
	.has()
	.digits() // Must have digits
	.has()
	.not()
	.spaces() // Should not have spaces

// const languages = {
//   en,
//   ar,
// };

export function validatorSignIn(data, language) {
	let errors = Map()
	// const t = languages[language] ? languages[language] : languages.en;
	// const validators = t.validators || {};

	if (
		!data ||
		!data.username ||
		!(
			isEmail(data.username) ||
			(isAlphanumeric(data.username) && isLength(data.username, { min: 6, max: 20 }))
		)
	) {
		errors = errors.set('username', 'Необходимо указать E-mail или имени пользователя')
	}

	if (!data || !data.password || !schema.validate(data.password)) {
		errors = errors.set('password', 'Пароль должен содержать от 6 до 20 символов!')
	}

	return errors
}

export function validatorRegister(register, isPhone = true, language) {
	let errors = Map()

	if (!register || !register.first_name || !isLength(register.first_name, { min: 1, max: 32 })) {
		errors = errors.set('first_name', 'Имя должно содержать от 1 до 32 символа!')
	}

	if (!register || !register.last_name || !isLength(register.last_name, { min: 1, max: 32 })) {
		errors = errors.set('last_name', 'Фамилия должна содержать от 1 до 32 символа!')
	}

	if (
		!register ||
		!register.name ||
		!isAlphanumeric(register.name) ||
		!isLength(register.name, { min: 6, max: 20 })
	) {
		errors = errors.set(
			'name',
			'Имя пользователя должно быть буквенно-цифровым и содержать от 8 до 20 символов!',
		)
	}

	if (isPhone) {
		if (!register || !register.phone_number) {
			errors = errors.set('phone_number', '!')
		}
	}

	if (!register || !register.email || !isEmail(register.email)) {
		errors = errors.set('email', 'Электронная почта не является действительной!')
	}

	if (!register || !register.password || !schema.validate(register.password)) {
		errors = errors.set('password', 'Пароль должен содержать от 6 до 20 символов!')
	}

	return errors
}

export function validatorLoginMobile(phone, language) {
	let errors = Map()

	if (!phone || !isMobilePhone(phone, undefined, { strictMode: true })) {
		errors = errors.set('phone_number', 'Номер телефона не является действительным!')
	}

	return errors
}

export function validatorForgotPassword(email, language) {
	let errors = Map()

	if (!email || !isEmail(email)) {
		errors = errors.set('email', 'Электронная почта не является действительной!')
	}

	return errors
}

export function validatorChangePassword(data, language) {
	let errors = Map()

	if (!data || !data.password_old) {
		errors = errors.set('password_old', 'Введите текущий пароль')
	}

	if (!data || !data.password_new || !schema.validate(data.password_new)) {
		errors = errors.set('password_new', 'Пароль должен содержать от 6 до 20 символов!')
	}

	if (!data || !data.password_confirm || data.password_confirm !== data.password_new) {
		errors = errors.set('password_confirm', 'Пароли не совпадают!')
	}

	return errors
}

export function validatorUpdateAccount(data) {
	let errors = Map()

	if (!data || !data.first_name || !isLength(data.first_name, { min: 1, max: 32 })) {
		errors = errors.set('first_name', 'Имя должно содержать от 1 до 32 символа!')
	}

	if (!data || !data.last_name || !isLength(data.last_name, { min: 1, max: 32 })) {
		errors = errors.set('last_name', 'Фамилия должна содержать от 1 до 32 символа!')
	}

	// if (
	//   !data ||
	//   !data.last_name ||
	//   !isLength(data.last_name, {min: 1, max: 32})
	// ) {
	//   errors = errors.set('last_name', validators.text_last_name);
	// }

	if (!data || !data.email || !isEmail(data.email)) {
		errors = errors.set('email', 'Электронная почта не является действительной!')
	}

	return errors
}
