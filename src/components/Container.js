import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Container extends Component {
	render() {
		return <View style={styles.container}>{this.props.children}</View>
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginTop: 30,
		flex: 1,
	},
})
