import React from 'react'

import { connect } from 'react-redux'

import {
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	TouchableOpacity,
	ActivityIndicator,
	Text,
} from 'react-native'

import Container from 'src/components/Container'
import Input from 'src/components/input/Input'
import TextHtml from 'src/components/TextHtml'

import { signUpWithEmail } from 'src/modules/auth/actions'
import { authSelector } from 'src/modules/auth/selectors'
import { showMessage } from 'react-native-flash-message'

class RegisterScreen extends React.Component {
	static navigationOptions = {
		headerShown: false,
	}

	constructor(props, context) {
		super(props, context)
		this.state = {
			data: {
				first_name: '',
				last_name: '',
				name: '',
				email: '',
				password: '',
				phone_number: '',
				country_no: '',
				subscribe: false,
			},
			user: null,
			confirmResult: null,
			visibleModal: false,
			loading: false,
			error: {
				message: null,
				errors: null,
			},
		}
		this.confirmation = null
	}

	changeData = (value) => {
		this.setState({
			data: {
				...this.state.data,
				...value,
			},
		})
	}

	register = () => {
		const { data } = this.state
		let payload = data

		this.setState({ loading: false })
		this.props.dispatch(signUpWithEmail(payload))
	}

	/**
	 * Handle User register
	 */
	handleRegister = async () => {
		this.setState({
			loading: true,
		})
		try {
			this.register()
		} catch (e) {
			showMessage({
				message: e.message,
				type: 'danger',
			})
			this.setState({
				loading: false,
			})
		}
	}

	render() {
		const {
			navigation,
			auth: { pending },
		} = this.props
		const {
			data: { email, first_name, last_name, name, phone_number, country_no, password, subscribe },
			error: { message, errors },
			visibleModal,
			loading,
			user,
			confirmResult,
		} = this.state
		const visible = visibleModal || !!(!user && confirmResult)
		return (
			<KeyboardAvoidingView
				behavior='height'
				style={styles.keyboard}
				// contentContainerStyle={{flex: 1}}
			>
				<ScrollView>
					<Container style={{ marginTop: 15 }}>
						{message ? <TextHtml value={message} /> : null}
						<Input
							label='Имя'
							value={first_name}
							onChangeText={(value) => this.changeData({ first_name: value })}
							error={errors && errors.first_name}
						/>
						<Input
							label='Фамилия'
							value={last_name}
							onChangeText={(value) => this.changeData({ last_name: value })}
							error={errors && errors.last_name}
						/>
						{/* <Input
							label='Логин'
							value={name}
							onChangeText={(value) => this.changeData({ name: value })}
							error={errors && errors.name}
						/> */}

						<Input
							label='Email'
							value={email}
							onChangeText={(value) => this.changeData({ email: value, name: value })}
							error={errors && errors.email}
						/>
						<Input
							label='Пароль'
							value={password}
							secureTextEntry
							onChangeText={(value) => this.changeData({ password: value })}
							error={errors && errors.password}
						/>

						<TouchableOpacity activeOpacity={0.5} style={styles.btn2} onPress={this.handleRegister}>
							{loading || pending ? (
								<ActivityIndicator size='small' color='#fff' />
							) : (
								<Text style={styles.btn2Text}>Зарегистрироваться</Text>
							)}
						</TouchableOpacity>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	keyboard: {
		flex: 1,
	},
	viewSwitch: {
		marginVertical: 22,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	textSwitch: {
		flex: 1,
		marginRight: 16,
	},
	viewAccount: {
		marginVertical: 22,
	},
	textHaveAccount: {
		paddingVertical: 9,
		marginTop: 16,
		marginBottom: 22,
		textAlign: 'center',
	},
	btn2: {
		padding: 12,
		borderRadius: 3,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#ff0000',
		marginVertical: 15,
	},
	btn2Text: {
		color: '#fff',
		textAlign: 'center',
	},
})

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
	}
}

export default connect(mapStateToProps)(RegisterScreen)
