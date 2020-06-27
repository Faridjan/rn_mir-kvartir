import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, ScrollView, View, Text, Button, KeyboardAvoidingView } from 'react-native'

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
			requiredLogin,
		} = this.props
		const { username, password } = this.state
		const { message, errors } = loginError

		return (
			<View>
				<KeyboardAvoidingView behavior='height' style={styles.keyboard}>
					<ScrollView>
						<Container>
							{message ? <TextHtml value={message} /> : null}
							<Input
								label='Email Address or Username'
								value={username}
								onChangeText={(value) => this.setState({ username: value })}
								error={errors && errors.username}
							/>
							<Input
								label='Password *'
								value={password}
								secureTextEntry
								onChangeText={(value) => this.setState({ password: value })}
								error={errors && errors.password}
							/>
							<Button
								title='Sign In'
								loading={pending}
								onPress={this.handleLogin}
								containerStyle={styles.margin}
							/>
							<Text> </Text>
							<Text
								onPress={() => navigation.navigate('Auth', { screen: 'Forgot' })}
								style={styles.textForgot}
								medium
							>
								Forgot Password
							</Text>
							<View style={[styles.viewOr, styles.margin]}>
								<Text style={styles.textOr}>----------------------------</Text>
							</View>
						</Container>
					</ScrollView>
				</KeyboardAvoidingView>
				<Container style={styles.margin}>
					<Text h6 colorThird style={styles.textAccount}>
						Don't have an account?
					</Text>
					<Button
						title='Register'
						type='outline'
						onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
					/>
				</Container>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	keyboard: {
		// flex: 1,
	},
	textForgot: {
		textAlign: 'center',
	},
	viewOr: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	divOr: {
		flex: 1,
	},
	textOr: {
		marginHorizontal: 16,
	},
	textAccount: {
		textAlign: 'center',
		marginBottom: 16,
	},
	margin: {
		marginVertical: 25,
	},
	viewSocial: {
		marginBottom: 25,
	},
})

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
		requiredLogin: false,
	}
}

export default connect(mapStateToProps)(LoginScreen)
