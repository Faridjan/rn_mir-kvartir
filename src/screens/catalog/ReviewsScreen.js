// React
import React from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'

// Modules
import concat from 'lodash/concat'
// import { Header, ThemedView } from 'src/components'
// import Button from 'src/containers/Button'
// import Container from 'src/containers/Container'
// import { TextHeader, IconHeader } from 'src/containers/HeaderComponent'
// import InfoRating from './containers/InfoRating'
import CommentItem from './containers/CommentItem'

// Components
import Container from 'src/components/Container'

// Utils
import { getProductReviews } from 'src/modules/product/service'
// import { dataReviewSelector } from 'src/modules/product/selectors'
// import { mainStack } from 'src/config/navigator'

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
			if (dataGet) {
				this.setState((preState) => {
					return {
						error: null,
						dataReview: this.state.page === 1 ? dataGet : concat(preState.dataReview, dataGet),
					}
				})
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
			<Container>
				<ScrollView style={styles.content}>
					{loading ? (
						<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
							<ActivityIndicator size='large' color='red' />
						</View>
					) : (
						dataReview.map((review) => <CommentItem key={review.id} data={review} />)
					)}
				</ScrollView>
				{/* <View style={styles.footer}>
					<Button
						title='Оставить отзыв'
						onPress={() =>
							this.props.navigation.navigate(mainStack.product_review_form, {
								image: image,
								name: name,
								product_id: product_id,
							})
						}
						type='outline'
						size={'small'}
						buttonStyle={styles.button}
					/>
				</View> */}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	// footer: {
	// 	marginVertical: margin.big,
	// 	alignItems: 'center',
	// },
	// button: {
	// 	paddingHorizontal: padding.big - 4,
	// },
})

export default ReviewScreen
