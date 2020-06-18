import React from 'react'
import { View, ScrollView, Image, Text, Button, Input, KeyboardAvoidingView } from 'react-native'

import Rating from 'src/components/Rating'

// Components
import Container from 'src/components/Container'

import { addProductReviews } from 'src/modules/product/service'

class ReviewFormScreen extends React.Component {
	constructor(props) {
		super(props)
		const {
			// auth: { isLogin, user },
			route,
		} = props
		const product_id = route.params['product_id']
		this.state = {
			product_id,
			review: '',
			// reviewer: isLogin ? user.display_name : '',
			reviewer: '',
			// reviewer_email: isLogin ? user.user_email : '',
			reviewer_email: '',
			rating: 1,
			// status: isLogin ? 'approved' : 'hold',
			status: 'hold',
		}
	}

	addReview = async () => {
		const { navigation } = this.props
		const { product_id } = this.state
		if (product_id) {
			try {
				const dataGet = await addProductReviews(this.state)
				if (dataGet) {
					navigation.goBack()
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	render() {
		const {
			navigation,
			route,
			// auth: { isLogin },
			// dataReview,
		} = this.props
		const { review, reviewer, reviewer_email, rating } = this.state

		const imageProduct = route.params['image']
		const nameProduct = route.params['name']

		return (
			<Container>
				<KeyboardAvoidingView behavior='height'>
					<ScrollView>
						<View style={[styles.viewContent, { marginBottom: 20 }]}>
							<Image
								source={
									imageProduct ? { uri: imageProduct.src } : require('src/assets/pDefault.png')
								}
								resizeMode='contain'
								style={[styles.image, { marginBottom: 10 }]}
							/>
							<Text medium style={{ marginBottom: 10 }}>
								{nameProduct}
							</Text>
							<Text colorThird style={styles.tab}>
								Отметьте кол-во звезд
							</Text>
							<Rating
								size={20}
								startingValue={rating}
								onStartRating={(value) => this.setState({ rating: value })}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Container>
		)
	}
}

const styles = {
	viewContent: {
		alignItems: 'center',
	},
	image: {
		width: 109,
		height: 128,
	},
	tab: {
		fontSize: 10,
		lineHeight: 15,
	},
}

export default ReviewFormScreen
