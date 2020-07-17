import React from 'react'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import omit from 'lodash/omit'

import {
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	ScrollView,
} from 'react-native'

import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

import { authSelector } from 'src/modules/auth/selectors'
import { updateCustomer, updateUserSuccess } from 'src/modules/auth/actions'
import { validatorUpdateAccount } from 'src/modules/auth/validator'

class EditAccount extends React.Component {
	constructor(props) {
		super(props)
		const {
			auth: { user },
		} = props
		this.state = {
			data: {
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				email: user.user_email || '',
			},
			errors: null,
		}
	}

	handleSaveCustomer = () => {
		const { dispatch } = this.props
		const { data } = this.state
		const errors = validatorUpdateAccount(data)
		if (errors.size > 0) {
			this.setState({
				errors: errors.toJS(),
			})
			showMessage({
				message: 'Fill information fail.',
				type: 'danger',
			})
		} else {
			this.setState({
				errors: null,
			})
			dispatch(updateCustomer(data, this.saveDataUser))
		}
	}
	saveDataUser = () => {
		const { dispatch, navigation } = this.props
		const { data } = this.state
		const user_email = data.email
		dispatch(
			updateUserSuccess({
				...omit(data, ['email']),
				user_email,
			}),
		)
		navigation.goBack()
	}

	changeData(key, value) {
		const { data } = this.state
		this.setState({
			data: {
				...data,
				[key]: value,
			},
		})
	}
	render() {
		const {
			auth: { pendingUpdateCustomer },
		} = this.props
		const { data, errors } = this.state
		const { first_name, last_name, email } = data

		return (
			<KeyboardAvoidingView>
				<ScrollView>
					<Container>
						<Input
							label='Имя'
							value={first_name}
							onChangeText={(value) => this.changeData('first_name', value)}
							error={errors && errors.first_name}
						/>
						<Input
							label='Фамилия'
							value={last_name}
							onChangeText={(value) => this.changeData('last_name', value)}
							error={errors && errors.last_name}
						/>
						<Input
							label='Email'
							value={email}
							onChangeText={(value) => this.changeData('email', value)}
							error={errors && errors.email}
							keyboardType='email-address'
						/>

						<TouchableOpacity
							activeOpacity={0.5}
							style={styles.btn2}
							onPress={this.handleSaveCustomer}
						>
							{pendingUpdateCustomer ? (
								<ActivityIndicator size='small' color='#fff' />
							) : (
								<Text style={styles.btn2Text}>Сохранить</Text>
							)}
						</TouchableOpacity>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	description: {
		marginVertical: 4,
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

export default connect(mapStateToProps, null)(EditAccount)
