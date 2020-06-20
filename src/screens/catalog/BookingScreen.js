// React
import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Picker,
	Button,
	ActivityIndicator,
} from 'react-native'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

// Modules
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class BookingScreen extends Component {
	constructor(props) {
		super(props)

		const nowDate = moment().format('DD-MM-YYYY')
		const nextDate = moment().add({ days: 1 }).format('DD-MM-YYYY')
		// const durationDate = this.getDurationDate(nowDate, nextDate)

		this.state = {
			arrival: nowDate,
			departure: nextDate,
			adults: '1 взрослых',
			children: 'Без детей',
			hotel: '1 номер',
			pushing: false,
			showDatePicker: false,
			// duration: durationDate,
		}
	}

	// getDurationDate(now, another) {
	// 	return moment.duration(now.diff(another)).asDays()
	// }

	render() {
		const {
			arrival,
			departure,
			adults,
			pushing,
			children,
			hotel,
			firstName,
			lastName,
			phone,
			showDatePicker,
		} = this.state

		return (
			<Container style={styles.container}>
				{/* <Text style={styles.title}> Бронирование</Text> */}
				<ScrollView>
					<KeyboardAvoidingView>
						<Text style={styles.title}>Квартира:</Text>
						<Input
							label='Дата заезда'
							value={arrival}
							onChangeText={(value) => this.setState({ arrival: value })}
						/>
						{showDatePicker && (
							<DateTimePicker
								testID='dateTimePicker'
								value={new Date(1598051730000)}
								mode='date'
								is24Hour={true}
								display='default'
								onChange={() => {}}
							/>
						)}
						<Input
							label='Дата отъезда'
							value={departure}
							onChangeText={(value) => this.setState({ departure: value })}
						/>
						<View style={styles.picker}>
							<Picker
								selectedValue={adults}
								onValueChange={(itemValue, itemIndex) => this.setState({ adults: itemValue })}
							>
								<Picker.Item label='1 взрослых' value='1 взрослых' />
								<Picker.Item label='2 взрослых' value='2 взрослых' />
								<Picker.Item label='3 взрослых' value='3 взрослых' />
								<Picker.Item label='4 взрослых' value='4 взрослых' />
								<Picker.Item label='5 взрослых' value='5 взрослых' />
								<Picker.Item label='6 взрослых' value='6 взрослых' />
							</Picker>
						</View>
						<View style={styles.halfInput}>
							<View style={{ ...styles.picker, flex: 1, marginRight: 10 }}>
								<Picker
									selectedValue={children}
									onValueChange={(itemValue, itemIndex) => this.setState({ children: itemValue })}
								>
									<Picker.Item label={children} value={children} />
									<Picker.Item label='1 ребенок' value='1 ребенок' />
									<Picker.Item label='2 детей' value='2 детей' />
									<Picker.Item label='3 детей' value='3 детей' />
									<Picker.Item label='4 детей' value='4 детей' />
									<Picker.Item label='5 детей' value='5 детей' />
									<Picker.Item label='6 детей' value='6 детей' />
								</Picker>
							</View>
							<View style={{ ...styles.picker, width: '50%' }}>
								<Picker
									selectedValue={hotel}
									onValueChange={(itemValue, itemIndex) => this.setState({ hotel: itemValue })}
								>
									<Picker.Item label={hotel} value={hotel} />
									<Picker.Item label='2 номера' value='2 номера' />
									<Picker.Item label='3 номера' value='3 номера' />
									<Picker.Item label='4 номера' value='4 номера' />
									<Picker.Item label='5 номеров' value='5 номеров' />
									<Picker.Item label='6 номеров' value='6 номеров' />
								</Picker>
							</View>
						</View>

						<Text style={{ ...styles.title, marginTop: 30 }}>Личные данные:</Text>
						<Input
							label='Имя'
							value={firstName}
							onChangeText={(value) => this.setState({ firstName: value })}
						/>
						<Input
							label='Фамилия'
							value={lastName}
							onChangeText={(value) => this.setState({ lastName: value })}
						/>
						<Input
							label='Телефон'
							value={phone}
							onChangeText={(value) => this.setState({ phone: value })}
						/>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{ marginTop: 25, padding: 10, backgroundColor: '#febb02', borderRadius: 3 }}
							onPress={() => {
								this.setState({
									pushing: true,
								})
								setTimeout(() => {
									this.setState({
										pushing: false,
									})
								}, 3000)
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
	picker: {
		paddingHorizontal: 10,
		minHeight: 46,
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 8,
		marginBottom: 4,
		borderColor: '#e9ecef',
	},
	halfInput: {
		flexDirection: 'row',
	},
})
