// React
import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View, KeyboardAvoidingView, Picker, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

// Modules
import moment from 'moment'
import { createOrder } from 'src/modules/product/service'
import { showMessage } from 'react-native-flash-message'

export default class BookingScreen extends Component {
	constructor(props) {
		super(props)

		// const durationDate = this.getDurationDate(nowDate, nextDate)

		this.state = {
			arrival: moment(),
			departure: moment().add({ days: 1 }),
			type: this.props.route.params.variations.night.id,
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
		for (let i in variations) {
			if (variations[i].id === id) return variations[i].regular_price
		}
		return 0
	}

	render() {
		const { type, pushing, firstName, phone } = this.state
		const { variations } = this.props.route.params

		return (
			<Container style={styles.container}>
				{/* <Text style={styles.title}> Бронирование</Text> */}
				<ScrollView>
					<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.select({ ios: 200, android: 0 })}>
						<Text style={styles.title}>Квартира:</Text>
						<View style={{ ...styles.picker }}>
							<Picker selectedValue={type} onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
								<Picker.Item label="Час" value={variations.hour.id} />
								<Picker.Item label="Ночь" value={variations.night.id} />
								<Picker.Item label="Сутки" value={variations.day.id} />
							</Picker>
						</View>
<<<<<<< HEAD
						<View style={styles.halfInput}>
							<View style={{ flex: 1, marginRight: 10 }}>
								{/* <Input
									label='Дата заезда'
									value={arrival}
									onChangeText={(value) => this.setState({ arrival: value })}
								/> */}
								<TouchableOpacity
									style={{ ...styles.picker, ...styles.input }}
									onPress={() => this.setState({ showDatePickerArival: true })}
								>
									<Fontisto name='date' size={16} color='black' style={{ marginRight: 10 }} />
									<Text>{arrival.format('DD-MM-YYYY')}</Text>
									<Text style={styles.labelDate}>Дата заезда</Text>
								</TouchableOpacity>
								{showDatePickerArival && (
									<DateTimePicker
										testID='dateTimePicker'
										value={moment(arrival).toDate()}
										mode='date'
										is24Hour={true}
										minimumDate={moment(arrival).toDate()}
										display='default'
										onChange={(event, selectedDate) => {
											this.setState({
												arrival: moment(selectedDate),
												showDatePickerArival: false,
											})
										}}
									/>
								)}
							</View>
							<View style={{ width: '50%' }}>
								<TouchableOpacity
									style={{ ...styles.picker, ...styles.input }}
									onPress={() => this.setState({ showDatePickerDeparture: true })}
								>
									<Fontisto name='date' size={16} color='black' style={{ marginRight: 10 }} />
									<Text>{departure.format('DD-MM-YYYY')}</Text>
									<Text style={styles.labelDate}>Дата отъезда</Text>
								</TouchableOpacity>
								{showDatePickerDeparture && (
									<DateTimePicker
										testID='dateTimePicker'
										value={moment(departure).toDate()}
										minimumDate={moment(arrival).toDate()}
										is24Hour={true}
										display='default'
										onChange={(event, selectedDate) => {
											this.setState({
												departure: moment(selectedDate),
												showDatePickerDeparture: false,
											})
										}}
									/>
								)}
							</View>
						</View>

						<Text style={{ fontStyle: 'italic', marginLeft: 4, color: '#999', marginBottom: 10 }}>
							{this.getDiffDays()}
							<Text>
								{this.state.type.id === this.props.route.params.variations.night.id
									? ' ночь'
									: ' сутки'}
							</Text>
						</Text>
						<View style={styles.halfInput}>
							<View style={{ flex: 1, marginRight: 10 }}>
								<View style={styles.picker}>
									<Picker
										selectedValue={adults}
										onValueChange={(itemValue, itemIndex) => this.setState({ adults: itemValue })}
									>
										<Picker.Item label='1 взрослых' value='1' />
										<Picker.Item label='2 взрослых' value='2' />
										<Picker.Item label='3 взрослых' value='3' />
										<Picker.Item label='4 взрослых' value='4' />
										<Picker.Item label='5 взрослых' value='5' />
										<Picker.Item label='6 взрослых' value='6' />
									</Picker>
								</View>
							</View>
							<View style={{ width: '50%' }}>
								<View style={styles.picker}>
									<Picker
										selectedValue={children}
										onValueChange={(itemValue, itemIndex) => this.setState({ children: itemValue })}
									>
										<Picker.Item label='Без детей' value='0' />
										<Picker.Item label='1 ребенок' value='1' />
										<Picker.Item label='2 детей' value='2' />
										<Picker.Item label='3 детей' value='3' />
										<Picker.Item label='4 детей' value='4' />
										<Picker.Item label='5 детей' value='5' />
										<Picker.Item label='6 детей' value='6' />
									</Picker>
								</View>
							</View>
						</View>
=======
>>>>>>> c91e3f3c593f6f9c5fda6fd0e282a277e7d9ddd9

						<Text style={{ ...styles.title, marginTop: 30 }}>Личные данные:</Text>
						<Input label="Имя" value={firstName} onChangeText={(value) => this.setState({ firstName: value })} />
						<Input label="Телефон" type="input-mask" keyboardType="phone-pad" value={phone} onChangeText={(value) => this.setState({ phone: value })} />

						<Text style={{ marginTop: 20, marginBottom: 15 }}>
							<Text style={{ color: 'green' }}>ПРЕДОПЛАТА НЕ ТРЕБУЕТСЯ</Text> — платите на месте. Бесплатная отмена бронирования
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
								backgroundColor: '#febb02',
								borderRadius: 3,
								width: '60%',
								alignSelf: 'center',
							}}
							onPress={() => {
								if (!pushing) this.pushOrder()
							}}
						>
							{pushing ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Забронировать</Text>}
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
	},
	input: {
		paddingVertical: 4,
		paddingHorizontal: 16,
		minHeight: 48,
		flexDirection: 'row',
		alignItems: 'center',
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
