// React
import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Picker,
	TouchableOpacity,
	ActivityIndicator,
	Platform,
} from 'react-native'

import { connect } from 'react-redux'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

// Selectors
import { authSelector } from 'src/modules/auth/selectors'

// Modules
import moment from 'moment'
import { createOrder } from 'src/modules/product/service'
import { showMessage } from 'react-native-flash-message'

const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
class BookingScreen extends Component {
	constructor(props) {
		super(props)

		// const durationDate = this.getDurationDate(nowDate, nextDate)
		const { variations } = this.props.route.params
		const {
			auth: { isLogin, user },
		} = props

		this.state = {
			user,
			isLogin,
			arrival: moment(),
			departure: moment().add({ days: 1 }),
			type: variations[Object.keys(variations)[0]]['id'],
			adults: 1,
			children: 0,
			firstName: '',
			lastName: '',
			phone: '',
			pushing: false,
			showDatePickerArival: false,
			showDatePickerDeparture: false,
		}
	}

	// getDurationDate(now, another) {
	// 	return moment.duration(now.diff(another)).asDays()
	// }

	pushOrder = async () => {
		const { firstName, lastName, phone } = this.state
		if (!firstName || !phone) {
			showMessage({
				duration: 3000,
				renderFlashMessageIcon: true,
				icon: 'auto',
				message: 'Заполните личные данные.',
				type: 'warning',
			})
			return
		}
		try {
			this.setState({ pushing: true })
			let data = {
				payment_method: 'cod',
				payment_method_title: 'Оплата на месте',
				set_paid: true,
				billing: {
					first_name: this.state.firstName,
					phone: this.state.phone,
				},
				line_items: [
					{
						product_id: this.state.type,
					},
				],
			}
			const dataSet = await createOrder(data)
			if (dataSet) {
				showMessage({
					duration: 3000,
					message: 'Квартира успешно забронирована!',
					type: 'success',
				})
				setTimeout(() => this.props.navigation.goBack(), 1000)
			}
		} catch (e) {
			console.log(e, 'ERROR')
		} finally {
			this.setState({ pushing: false })
		}
	}

	getPrice(variations, id) {
		let variation = 0
		Object.keys(variations).forEach((i) => {
			if (variations[i].id == id) {
				variation = variations[i].regular_price
			}
		})
		return toLocaleStringPrice(variation)
	}

	render() {
		const { type, pushing, firstName, phone, user, isLogin } = this.state
		const { variations } = this.props.route.params
		const variationsLength = Object.keys(variations).length

		return (
			<Container style={styles.container}>
				{/* <Text style={styles.title}> Бронирование</Text> */}
				<ScrollView>
					<KeyboardAvoidingView
						behavior='padding'
						keyboardVerticalOffset={Platform.select({ ios: 200, android: 0 })}
					>
						<Text style={styles.title}>Квартира:</Text>
						<View style={[styles.picker, variationsLength === 1 ? styles.input : null]}>
							{variations ? (
								<Picker
									selectedValue={type}
									onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}
								>
									{Object.entries(variations).map(([key, variation]) => {
										return <Picker.Item label={variation.name} value={variation.id} />
									})}
								</Picker>
							) : (
								<Text style={styles.inp}>Тг</Text>
							)}
						</View>

						<Text style={{ ...styles.title, marginTop: 30 }}>Личные данные:</Text>
						<Input
							label='Имя'
							value={isLogin ? `${user.first_name} ${user.last_name}` : firstName}
							onChangeText={(value) => this.setState({ firstName: value })}
						/>
						<Input
							label='Телефон'
							type='input-mask'
							keyboardType='phone-pad'
							value={phone}
							onChangeText={(value) => this.setState({ phone: value })}
						/>

						<Text style={{ marginTop: 20, marginBottom: 15 }}>
							<Text style={{ color: 'green' }}>ПРЕДОПЛАТА НЕ ТРЕБУЕТСЯ</Text> — платите на месте.
							Бесплатная отмена бронирования
						</Text>
						<Text style={{ ...styles.price, textAlign: 'right' }}>
							Цена: <Text>{this.getPrice(variations, type)}</Text> ₸
						</Text>

						<TouchableOpacity
							activeOpacity={0.8}
							style={{
								marginTop: 25,
								padding: 10,
								fontSize: 16,
								backgroundColor: '#ff0000',
								borderRadius: 3,
								width: '60%',
								alignSelf: 'center',
							}}
							onPress={() => {
								if (!pushing) this.pushOrder()
							}}
						>
							{pushing ? (
								<ActivityIndicator size='small' color='#fff' />
							) : (
								<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
									Забронировать
								</Text>
							)}
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#febb02',
		marginBottom: 0,
	},
	title: {
		marginTop: 10,
		fontSize: 16,
		marginLeft: 3,
		marginBottom: 10,
		color: '#999',
		// fontWeight: '700',
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	picker: {
		paddingHorizontal: 10,
		// minHeight: 46,
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 8,
		marginBottom: 4,
		borderColor: '#e9ecef',
		justifyContent: 'center',
	},
	input: {
		paddingVertical: 4,
		paddingHorizontal: 16,
		minHeight: 48,
	},
	labelDate: {
		position: 'absolute',
		left: 10,
		top: -9,
		backgroundColor: '#fff',
		paddingVertical: 2,
		paddingHorizontal: 5,
		fontSize: 10,
		lineHeight: 14,
	},
	halfInput: {
		flexDirection: 'row',
	},
})

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
	}
}
export default connect(mapStateToProps)(BookingScreen)
