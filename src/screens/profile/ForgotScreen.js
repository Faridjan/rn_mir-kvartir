import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native'

import Container from 'src/components/Container'
import TextHtml from 'src/components/TextHtml'
import Input from 'src/components/input/Input'

import { forgotPassword } from 'src/modules/auth/actions'
import { authSelector } from 'src/modules/auth/selectors'

class ForgotScreen extends React.Component {
	static navigationOptions = {
		headerShown: false,
	}

	constructor(props) {
		super(props)
		this.state = {
			email: '',
		}
	}

	handleSubmit = () => {
		this.props.dispatch(forgotPassword(this.state.email))
	}

	render() {
		const {
			auth: { pendingForgotPassword, forgotPasswordError },
		} = this.props

		const { email } = this.state
		const { message, errors } = forgotPasswordError

		return (
			<ScrollView>
				<KeyboardAvoidingView>
					<Container style={{ marginTop: 15 }}>
						<Text style={styles.description} colorSecondary>
							Введите адрес электронной почты Вашей учетной записи. Нажмите кнопку Продолжить, чтобы
							получить пароль по электронной почте.
						</Text>
						{message ? <TextHtml value={message} /> : null}
						<Input
							label='Email'
							value={email}
							onChangeText={(value) => this.setState({ email: value })}
							error={errors && errors.email}
						/>
						<TouchableOpacity activeOpacity={0.5} style={styles.btn2} onPress={this.handleSubmit}>
							{pendingForgotPassword ? (
								<ActivityIndicator size='small' color='#fff' />
							) : (
								<Text style={styles.btn2Text}>Отправить</Text>
							)}
						</TouchableOpacity>
					</Container>
				</KeyboardAvoidingView>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	description: {
		marginBottom: 6,
	},
	margin: {
		marginVertical: 22,
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

export default connect(mapStateToProps)(ForgotScreen)
