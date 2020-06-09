import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

// Components
import Title from '../../components/Title'

// Modules
import { getProducts } from 'src/modules/product/service'

// Containers
import Container from 'src/components/Container'
import ProductPreview from './containers/ProductPreview'

class ProductListScreen extends Component {
	constructor(props, context) {
		super(props, context)
		const { navigation, route } = props

		const category = route.params.category
		let name = route.params.headerTitle

		this.state = {
			category,
			name,
			loading: true,
			refreshing: false,
			loadingMore: false,
			data: [],
			page: 1,
		}
	}

	componentDidMount() {
		this.fetchProducts()
	}

	getData = (page) => {
		const { category } = this.state

		const query = {
			status: 'publish',
			lang: 'ru',
			per_page: 4,
			page: page,
			category,
		}

		return getProducts(query)
	}

	fetchProducts = async (page = this.state.page) => {
		try {
			const dataGet = await this.getData(page)

			if (dataGet.length <= 4 && dataGet.length > 0) {
				this.setState((preState) => {
					return {
						loading: false,
						refreshing: false,
						loadingMore: dataGet.length === 4,
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

	render() {
		const { category, name, data, loading, loadingMore, refreshing } = this.state
		return (
			<>
				{loading ? (
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<ActivityIndicator size='large' />
					</View>
				) : data.length ? (
					<Container style={{ marginTop: 0, paddingTop: 0 }}>
						<FlatList
							data={data}
							contentContainerStyle={{ paddingBottom: 20 }}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item, index, separators }) => <ProductPreview item={item} />}
						/>
					</Container>
				) : (
					<Text>Пусто</Text>
				)}
			</>
		)
	}
}

export default withNavigation(ProductListScreen)
