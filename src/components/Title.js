import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Title extends Component {
	render() {
		return <Text style={styles.title}> {this.props.children} </Text>
	}
}

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: 22,
	},
})
