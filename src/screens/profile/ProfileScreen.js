import React, { Component } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import HeaderMe from './containers/HeaderMe'

import Container from 'src/components/Container'
export default class ProfileScreen extends Component {
	render() {
		const { navigation } = this.props
		return (
			<ScrollView>
				<Container>
					<HeaderMe navigation={navigation} />
				</Container>
			</ScrollView>
		)
	}
}
