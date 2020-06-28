import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import Input from 'src/components/input/Input'
import Container from 'src/components/Container'
import TextHtml from 'src/components/TextHtml'

import { changePassword } from 'src/modules/auth/actions'
import { authSelector } from 'src/modules/auth/selectors'

class ChangePasswordScreen extends React.Component {
	static navigationOptions = {
		headerShown: false,
	}
	constructor(props) {
		super(props)
		this.state = {
			password_old: '',
			password_new: '',
			password_confirm: '',
		}
	}
	handleChangePassword = () => {
		this.props.dispatch(changePassword(this.state))
	}

	render() {
		const {
			auth: { pendingChangePassword, changePasswordError },
		} = this.props
		const { password_old, password_new, password_confirm } = this.state

		const { message, errors } = changePasswordError

		return (
			<ScrollView>
				<Container>
					{message ? <TextHtml value={message} /> : null}
					<View style={styles.marginBig}>
						<Input
							label='Старый пароль'
							value={password_old}
							onChangeText={(value) => this.setState({ password_old: value })}
							secureTextEntry
							error={errors && errors.password_old}
						/>
						<Input
							label='Новый пароль'
							value={password_new}
							onChangeText={(value) => this.setState({ password_new: value })}
							secureTextEntry
							error={errors && errors.password_new}
						/>
						<Input
							label='Подтверждение пароля'
							value={password_confirm}
							onChangeText={(value) => this.setState({ password_confirm: value })}
							secureTextEntry
							error={errors && errors.password_confirm}
						/>
					</View>
					<Text style={[styles.marginBig, styles.description]}>
						Новый пароль должен содержать по крайней мере 6 символов
					</Text>

					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.btn2}
						onPress={this.handleChangePassword}
					>
						{pendingChangePassword ? (
							<ActivityIndicator size='small' color='#fff' />
						) : (
							<Text style={styles.btn2Text}>Сменить пароль</Text>
						)}
					</TouchableOpacity>
				</Container>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	marginBig: {
		marginBottom: 22,
	},
	btn2: {
		padding: 12,
		borderRadius: 3,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#000',
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

export default connect(mapStateToProps)(ChangePasswordScreen)
