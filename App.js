import React, { Component } from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { AppNavigation } from './src/navigation/AppNavigation'

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content' />
				<AppNavigation />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
