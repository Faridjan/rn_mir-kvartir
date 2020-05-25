import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

// Components
import Title from 'src/components/Title'
import Container from 'src/components/Container'

export default class ObjectScreen extends Component {
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

const styles = StyleSheet.create({})
