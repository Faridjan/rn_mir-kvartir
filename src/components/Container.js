import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

export default class Container extends Component {
	render() {
		return (
			<SafeAreaView style={[styles.container, this.props.style]}>
				{this.props.children}
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginTop: 30,
		flex: 1,
	},
})
