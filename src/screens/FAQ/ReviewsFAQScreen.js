// React
import React from 'react'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Button } from 'react-native'

// Modules
import concat from 'lodash/concat'
import CommentItem from '../catalog/containers/CommentItem'
import { showMessage } from 'react-native-flash-message'

// Components
import Container from 'src/components/Container'

// Utils
import { getPageComments } from 'src/modules/page/service'
import { TextInput } from 'react-native-gesture-handler'

class ReviewFAQScreen extends React.Component {
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
		const page_id = route.params['page_id']
		if (page_id) {
			this.fetchReview(page_id)
		}
	}

	fetchReview = async (page_id) => {
		try {
			const dataGet = await getPageComments(page_id)
			if (dataGet.length) {
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
		const page_id = route.params['page_id']

		console.log(dataReview)

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
							this.props.navigation.navigate('ReviewFormFAQ', {
								image: image,
								name: name,
								page_id: page_id,
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

export default ReviewFAQScreen
