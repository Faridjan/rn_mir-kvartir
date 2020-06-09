import React, { Component } from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { AppNavigation } from './src/navigation/AppNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default class App extends Component {
	render() {
		return (
			<SafeAreaProvider>
				<View style={styles.container}>
					<StatusBar barStyle='light-content' />
					<AppNavigation />
				</View>
			</SafeAreaProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
