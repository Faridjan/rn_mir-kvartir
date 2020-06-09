import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import Container from '../../components/Container'
import CategoryItem from './containers/CategoryItem'

export default class CategoryScreen extends Component {
	render() {
		return (
			<Container>
				<FlatList
					data={[{ id: 1, name: '1 Комнатные', image: require('src/assets/mask.png') }]}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index, separators }) => (
						<CategoryItem name={item.name} image={item.image} />
					)}
				/>
			</Container>
		)
	}
}
