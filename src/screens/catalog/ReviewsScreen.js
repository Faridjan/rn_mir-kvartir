// React
import React from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Button } from 'react-native'

// Modules
import concat from 'lodash/concat'
import CommentItem from './containers/CommentItem'
import { showMessage } from 'react-native-flash-message'

// Components
import Container from 'src/components/Container'

// Utils
import { getProductReviews } from 'src/modules/product/service'
import { TextInput } from 'react-native-gesture-handler'

class ReviewScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dataReview: [],
			page: 1,
			loading: true,
			error: null,
		}
	}

	componentDidMount() {
		const { route } = this.props
		const product_id = route.params['product_id']
		if (product_id) {
			this.fetchReview(product_id)
		}
	}

	fetchReview = async (product_id) => {
		try {
			const dataGet = await getProductReviews(product_id)
			if (dataGet.length) {
				console.log(dataGet)
				this.setState((preState) => {
					return {
						error: null,
						dataReview: this.state.page === 1 ? dataGet : concat(preState.dataReview, dataGet),
					}
				})
			} else {
			}
		} catch (e) {
			console.log(e)
			this.setState({
				error: e,
			})
		} finally {
			this.setState({
				loading: false,
			})
		}
	}

	render() {
		const { dataReview, loading } = this.state
		const { route } = this.props
		const image = route.params['image']
		const name = route.params['name']
		const product_id = route.params['product_id']

		return (
			<Container style={{ marginBottom: 0 }}>
				<ScrollView>
					{loading ? (
						<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
							<ActivityIndicator size='large' color='red' />
						</View>
					) : dataReview.length ? (
						dataReview.map((review) => <CommentItem key={review.id} data={review} />)
					) : (
						<Text>Нет отзывов</Text>
					)}
				</ScrollView>
				<View style={styles.footer}>
					<Button
						title='Оставить отзыв'
						onPress={() =>
							this.props.navigation.navigate('ReviewForm', {
								image: image,
								name: name,
								product_id: product_id,
								cb: this.fetchReview,
							})
						}
					/>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	footer: {
		marginVertical: 22,
		alignItems: 'center',
	},
})

export default ReviewScreen
