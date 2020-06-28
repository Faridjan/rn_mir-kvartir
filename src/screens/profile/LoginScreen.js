import React from 'react'
import { connect } from 'react-redux'

import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native'

import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

import TextHtml from 'src/components/TextHtml'

import { signInWithEmail } from 'src/modules/auth/actions'
import { authSelector } from 'src/modules/auth/selectors'

class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
	}

	handleLogin = () => {
		const { username, password } = this.state
		this.props.dispatch(signInWithEmail({ username, password }))
	}

	render() {
		const {
			navigation,
			auth: { pending, loginError },
		} = this.props
		const { username, password } = this.state
		const { message, errors } = loginError

		return (
			<Container style={{ marginBottom: 0 }}>
				<KeyboardAvoidingView behavior='height' style={styles.keyboard}>
					<ScrollView>
						<Container>
							{message ? <TextHtml value={message} /> : null}
							<Input
								label='Email или Логин'
								value={username}
								onChangeText={(value) => this.setState({ username: value })}
								error={errors && errors.username}
							/>
							<Input
								label='Пароль'
								value={password}
								secureTextEntry
								onChangeText={(value) => this.setState({ password: value })}
								error={errors && errors.password}
							/>

							<TouchableOpacity activeOpacity={0.5} style={styles.btn2} onPress={this.handleLogin}>
								{pending ? (
									<ActivityIndicator size='small' color='#fff' />
								) : (
									<Text style={styles.btn2Text}>Войти</Text>
								)}
							</TouchableOpacity>

							<Text
								onPress={() => navigation.navigate('Auth', { screen: 'Forgot' })}
								style={styles.textForgot}
							>
								Забыли пароль?
							</Text>
						</Container>
					</ScrollView>
				</KeyboardAvoidingView>
				<View>
					<Text style={styles.textAccount}>Нет аккаунта?</Text>

					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.btn1}
						onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
					>
						<Text style={styles.btn1Text}>Зарегистрироваться</Text>
					</TouchableOpacity>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	keyboard: {
		flex: 1,
	},
	textForgot: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	textAccount: {
		textAlign: 'center',
		marginBottom: 16,
		color: '#999',
	},
	viewSocial: {
		marginBottom: 25,
	},
	btn1: {
		padding: 12,
		borderRadius: 3,
		borderWidth: 1,
		marginBottom: 15,
		borderBottomColor: '#000',
	},
	btn2: {
		padding: 12,
		borderRadius: 3,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#000',
		marginVertical: 15,
	},
	btn1Text: {
		color: '#000',
		textAlign: 'center',
	},
	btn2Text: {
		color: '#fff',
		textAlign: 'center',
	},
})

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
		requiredLogin: false,
	}
}

export default connect(mapStateToProps)(LoginScreen)
