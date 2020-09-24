import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from '@react-navigation/compat'
import concat from 'lodash/concat'

// Components
import Title from '../../components/Title'

// Modules
import { getProducts } from 'src/modules/product/service'

// Containers
import Container from 'src/components/Container'
import ProductPreview from './containers/FoodPreview'

export default class FoodListScreen extends Component {
	constructor(props, context) {
		super(props, context)
		const { route } = props

		const category = route.params.category
		let name = route.params.headerTitle

		this.state = {
			category,
			name,
			loading: true,
			refreshing: false,
			loadingMore: false,
			subCats: [],
			data: [],
			page: 1,
		}
	}

	componentDidMount() {
		this.fetchProducts()
		this.fetchCategories()
	}

	getCats = (page) => {
		const query = {
			status: 'publish',
			lang: 'ru',
			per_page: 7,
			page: page,
			parent: this.state.category, // Взять все подкатегории родительской категории по этому ID
		}

		return getCategories(query)
	}

	fetchCategories = async (page = this.state.page) => {
		try {
			const dataGet = await this.getCats(page)

			if (dataGet.length <= 7 && dataGet.length > 0) {
				this.setState((preState) => {
					return {
						loadingCats: false,
						subCats: page === 1 ? dataGet : concat(preState.data, dataGet),
					}
				})
			} else {
				this.setState({
					loadingCats: false,
				})
			}
		} catch (e) {
			this.setState({
				loadingCats: false,
			})
		}
	}

	getData = (page) => {
		const { category } = this.state

		const query = {
			status: 'publish',
			lang: 'ru',
			per_page: 7,
			page: page,
			category,
		}

		return getProducts(query)
	}

	fetchProducts = async (page = this.state.page) => {
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
					this.fetchProducts()
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
				this.fetchProducts()
			},
		)
	}

	render() {
		const { category, name, data, loading, loadingMore, subCats, refreshing } = this.state

		return (
			<>
				{loading ? (
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<ActivityIndicator size='large' color='red' />
					</View>
				) : data.length ? (
					<Container style={{ marginTop: 0, paddingTop: 0 }}>
						{subCats.length ? (
							<View style={{ flexDirection: 'column' }}>
								<FlatList
									data={subCats}
									contentContainerStyle={{ marginVertical: 20, paddingHorizontal: 5 }}
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({ item, index, separators }) => (
										<TouchableOpacity
											style={styles.subCatItem}
											onPress={() =>
												this.props.navigation.push('FoodList', {
													headerTitle: item.name,
													category: item.id,
												})
											}
											activeOpacity={1}
										>
											<Text style={styles.subCatItemText}>{item.name}</Text>
										</TouchableOpacity>
									)}
								/>
							</View>
						) : null}
						<FlatList
							data={data}
							contentContainerStyle={{ paddingBottom: 20 }}
							keyExtractor={(item) => item.id.toString()}
							// numColumns={2}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.flatContainer}
							onEndReached={this.handleLoadMore}
							refreshing={refreshing}
							onRefresh={this.handleRefresh}
							renderItem={({ item, index, separators }) => <ProductPreview item={item} />}
						/>
					</Container>
				) : (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text>Пусто</Text>
					</View>
				)}
			</>
		)
	}
}

const styles = StyleSheet.create({
	flatContainer: {
		// flexDirection: 'column',
		// backgroundColor: 'pink',
	},
})
