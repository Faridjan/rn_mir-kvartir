import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

// Components
import Title from '../../components/Title'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import Container from '../../components/Container'

// Containers
import ProductPreview from './containers/ProductPreview'

class ProductListScreen extends Component {
	render() {
		return (
			<Container style={{ marginTop: 0, paddingTop: 0 }}>
				<FlatList
					data={[{ id: 11, title: 'Title Text', price: '3000' }]}
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index, separators }) => <ProductPreview item={item} />}
				/>
			</Container>
		)
	}
}

export default withNavigation(ProductListScreen)
