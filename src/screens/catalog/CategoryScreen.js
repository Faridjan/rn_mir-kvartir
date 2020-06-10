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
			refreshing: false,
			loadingMore: false,
			data: [],
			page: 1,
		}
	}

	componentDidMount() {
		this.fetchCategories()
	}

	getData = (page) => {
		const { category } = this.state

		const query = {
			status: 'publish',
			lang: 'ru',
			per_page: 7,
			page: page,
		}

		return getCategories(query)
	}

	fetchCategories = async (page = this.state.page) => {
		try {
			const dataGet = await this.getData(page)

			if (dataGet.length <= 7 && dataGet.length > 0) {
				this.setState((preState) => {
					return {
						loading: false,
						refreshing: false,
						loadingMore: dataGet.length === 7,
						data: page === 1 ? dataGet : concat(preState.data, dataGet),
					}
				})
			} else {
				this.setState({
					loadingMore: false,
					loading: false,
					refreshing: false,
				})
			}
		} catch (e) {
			this.setState({
				loading: false,
			})
		}
	}

	handleLoadMore = () => {
		const { loadingMore } = this.state

		if (loadingMore) {
			this.setState(
				(prevState) => ({
					page: prevState.page + 1,
					loadingMore: true,
				}),
				() => {
					this.fetchCategories()
				},
			)
		}
	}

	handleRefresh = () => {
		this.setState(
			{
				page: 1,
				refreshing: true,
			},
			() => {
				this.fetchCategories()
			},
		)
	}

	render() {
		const { data, refreshing, loading } = this.state
		const listData = data ? data.filter((c) => c.parent === 0) : 0

		return (
			<>
				{loading ? (
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<ActivityIndicator size='large' />
					</View>
				) : data.length ? (
					<Container>
						<FlatList
							data={listData}
							keyExtractor={(item) => `${item.id}`}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.flatContainer}
							numColumns={2}
							onEndReached={this.handleLoadMore}
							refreshing={refreshing}
							onRefresh={this.handleRefresh}
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
				) : (
					<Text>Пусто</Text>
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
