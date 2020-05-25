import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '../../components/Container'
import CategoryItem from '../../containers/CategoryItem'

export default class CategoryScreen extends Component {
	render() {
		return (
			<Container>
				<CategoryItem name='Test category' image={require('src/assets/mask.png')} />
			</Container>
		)
	}
}
