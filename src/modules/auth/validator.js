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
		errors = errors.set('username', 'Must fill value is email or username')
	}

	if (!data || !data.password || !schema.validate(data.password)) {
		errors = errors.set('password', 'Password must be between 6 and 20 characters!')
	}

	return errors
}

export function validatorRegister(register, isPhone = true, language) {
	let errors = Map()

	if (!register || !register.first_name || !isLength(register.first_name, { min: 1, max: 32 })) {
		errors = errors.set('first_name', 'First Name must be between 1 and 32 characters!')
	}

	if (!register || !register.last_name || !isLength(register.last_name, { min: 1, max: 32 })) {
		errors = errors.set('last_name', 'Last Name must be between 1 and 32 characters!')
	}

	if (
		!register ||
		!register.name ||
		!isAlphanumeric(register.name) ||
		!isLength(register.name, { min: 6, max: 20 })
	) {
		errors = errors.set(
			'name',
			'User Name must be alpha or number and between 8 and 20 characters!',
		)
	}

	if (isPhone) {
		if (!register || !register.phone_number) {
			errors = errors.set('phone_number', 'Phone number does not appear to be valid!')
		}
	}

	if (!register || !register.email || !isEmail(register.email)) {
		errors = errors.set('email', 'E-Mail does not appear to be valid!')
	}

	if (!register || !register.password || !schema.validate(register.password)) {
		errors = errors.set('password', 'Password must be between 6 and 20 characters!')
	}

	return errors
}

export function validatorLoginMobile(phone, language) {
	let errors = Map()

	if (!phone || !isMobilePhone(phone, undefined, { strictMode: true })) {
		errors = errors.set('phone_number', 'Phone number does not appear to be valid!')
	}

	return errors
}

export function validatorForgotPassword(email, language) {
	let errors = Map()

	if (!email || !isEmail(email)) {
		errors = errors.set('email', 'E-Mail does not appear to be valid!')
	}

	return errors
}

export function validatorChangePassword(data, language) {
	let errors = Map()

	if (!data || !data.password_old) {
		errors = errors.set('password_old', 'Password old must fill')
	}

	if (!data || !data.password_new || !schema.validate(data.password_new)) {
		errors = errors.set('password_new', 'Password must be between 6 and 20 characters!')
	}

	if (!data || !data.password_confirm || data.password_confirm !== data.password_new) {
		errors = errors.set('password_confirm', 'Confirm Password must same New Password!')
	}

	return errors
}
