import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Title from 'src/components/Title'

import Container from 'src/components/Container'
export default class RegisterScreen extends Component {
	render() {
		const { navigation } = this.props
		return (
			<Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Title>В процессе</Title>
					<Text>Идет перенос скриптов со старого проекта...</Text>
					<Button onPress={() => navigation.goBack()} title='Назад' />
				</View>
			</Container>
		)
	}
}
