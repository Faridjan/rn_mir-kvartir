import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

import Container from 'src/components/Container'

// import { createStackNavigator } from 'react-navigation'
// import { Bottom, FrontHeader, Loader, Slider } from '../components'
// import { LinearGradient } from 'expo-linear-gradient'
// import EventBus from 'react-native-event-bus'
// import HTML from '../components/HTML'

export default class CompanySingle extends Component {
	render() {
		return (
			<Container>
				{/* <Slider images={images} /> */}

				<View>
					<Text>Описание</Text>

					<TouchableOpacity
						style={styles.list}
						onPress={() => {
							console.log('Test')
						}}
					>
						<View>
							<Text>Адрес на карте</Text>
						</View>
						<View>
							<SimpleLineIcons style={{ ...styles.icon, fontSize: 25 }} name='map' />
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.list} onPress={() => console.log('Test')}>
						<View>
							<Text>Забронировать</Text>
						</View>
						<View>
							<AntDesign style={styles.icon} name='calendar' />
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.list} onPress={() => console.log('Test')}>
						<View>
							<Text>Отзывы</Text>
						</View>
						<View>
							<FontAwesome style={styles.icon} name='comment-o' />
						</View>
					</TouchableOpacity>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	modalTitle: {
		marginBottom: 30,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	list: {
		borderColor: '#ccc',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		marginLeft: 0,
		paddingVertical: 10,
	},
	input: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		color: '#444',
		marginLeft: 0,
		fontSize: 16,
		paddingVertical: 5,
		paddingHorizontal: 0,
	},
	icon: {
		color: '#ff0000',
		fontSize: 28,
	},
})
