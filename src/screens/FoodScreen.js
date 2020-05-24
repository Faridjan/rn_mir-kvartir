import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Title from '../components/Title'

export default class FoodScreen extends Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Title>В процессе</Title>
					<Text>Идет перенос скриптов со старого проекта...</Text>
				</View>
			</View>
		)
	}
}
