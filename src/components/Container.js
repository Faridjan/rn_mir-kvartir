import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class Container extends Component {
	render() {
		return <View style={[styles.container, this.props.style]}>{this.props.children}</View>
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		flex: 1,
		marginBottom: 30,
	},
})
