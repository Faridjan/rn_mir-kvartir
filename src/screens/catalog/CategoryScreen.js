import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import Container from '../../components/Container'
import CategoryItem from './containers/CategoryItem'

import { getCategories } from 'src/modules/category/service'

const noImage = require('src/assets/imgCateDefault.png')

export default class CategoryScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			data: null,
			seed: 1,
			refreshing: false,
		}
	}

	async componentDidMount() {
		const query = {
			per_page: 100,
			lang: 'ru',
		}

		const data = await getCategories(query)
		this.setState({ data })
	}

	render() {
		const { data } = this.state
		const listData = data ? data.filter((c) => c.parent === 0) : 0

		const handleRefresh = () => {
			// this.setState({
			// 	page: 1,
			// 	refreshing: true,
			// 	seed: this.state.seed + 1,
			// })
		}

		return (
			<>
				{listData === 0 ? (
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<ActivityIndicator size='large' />
					</View>
				) : (
					<Container>
						<FlatList
							data={listData}
							keyExtractor={(item) => `${item.id}`}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.flatContainer}
							numColumns={2}
							refreshing={this.state.refreshing}
							onRefresh={handleRefresh}
							renderItem={({ item, index }) => (
								<CategoryItem
									name={item.name}
									categoryId={item.id}
									index={index}
									image={
										item && item.image && item.image.src
											? { uri: item.image.src, cache: 'reload' }
											: noImage
									}
								/>
							)}
						/>
					</Container>
				)}
			</>
		)
	}
}

const styles = StyleSheet.create({
	flatContainer: {
		flexDirection: 'column',
	},
})
