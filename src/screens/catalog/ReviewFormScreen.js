import React from 'react'
import { View, ScrollView, Image, Text, ActivityIndicator, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import Rating from 'src/components/Rating'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

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
			status: 'approved',
			pushing: false,
		}
	}

	componentDidMount() {
		this.keyboardEventListeners = [
			// Keyboard.addListener('keyboardDidShow', this.visible(false)),
			// Keyboard.addListener('keyboardDidHide', this.visible(true)),
		]
	}

	addReview = async () => {
		const { reviewer, pushing, reviewer_email, review } = this.state

		if (pushing) return
		else if (!reviewer || !review || !reviewer_email) {
			showMessage({
				duration: 3000,
				message: 'Заполните все поля',
				type: 'warning',
			})
			return
		}

		this.setState({ pushing: true })
		const { navigation } = this.props
		const { product_id } = this.state
		if (product_id) {
			try {
				const dataSet = await addProductReviews(this.state)
				if (dataSet) {
					showMessage({
						duration: 3000,
						message: 'Отзыв успешно отправлен',
						type: 'success',
					})
					this.props.route.params.cb(product_id)
					navigation.goBack()
				}
			} catch (e) {
				showMessage({
					duration: 3000,
					message: e.message,
					type: 'warning',
				})
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
			<Container style={{ marginBottom: 0 }}>
				<ScrollView>
					<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.select({ ios: 200, android: 0 })}>
						<View style={[styles.viewContent, { marginBottom: 20 }]}>
							<Image source={imageProduct ? { uri: imageProduct.src } : require('src/assets/pDefault.png')} resizeMode="contain" style={[styles.image, { marginBottom: 10 }]} />
							<Text medium style={{ marginBottom: 10 }}>
								{nameProduct}
							</Text>
							<Text colorThird style={styles.tab}>
								Отметьте кол-во звезд
							</Text>
							<Rating size={20} startingValue={rating} onStartRating={(value) => this.setState({ rating: value })} />
						</View>

						<View style={{ marginBottom: 10 }}>
							<Input label="Ваш отзыв" multiline numberOfLines={8} value={review} onChangeText={(value) => this.setState({ review: value })} />

							{/* {!isLogin && (
								<Input
									label='Ваше имя'
									value={reviewer}
									onChangeText={(value) => this.setState({ reviewer: value })}
								/>
							)}
							{!isLogin && (
								<Input
									label='Ваш E-mail'
									value={reviewer_email}
									onChangeText={(value) => this.setState({ reviewer_email: value })}
								/>
							)} */}

							<Input label="Ваше имя" value={reviewer} onChangeText={(value) => this.setState({ reviewer: value })} />
							<Input label="Ваш E-mail" value={reviewer_email} onChangeText={(value) => this.setState({ reviewer_email: value })} />
						</View>

						<TouchableOpacity
							style={{
								marginBottom: 20,
								paddingVertical: 10,
								backgroundColor: '#000',
								alignSelf: 'center',
								width: '60%',
							}}
							onPress={this.addReview}
						>
							{this.state.pushing ? <ActivityIndicator animating={this.state.isLoading} /> : <Text style={{ color: '#fff', textAlign: 'center' }}>Отправить</Text>}
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</ScrollView>
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
