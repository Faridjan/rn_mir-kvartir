import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Title from '../components/Title'

import Container from 'src/components/Container'
export default class ProfileScreen extends Component {
	render() {
		return (
			<Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Title>В процессе</Title>
					<Text>Идет перенос скриптов со старого проекта...</Text>
				</View>
			</Container>
		)
	}
}
