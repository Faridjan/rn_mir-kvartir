import React from 'react'
import { connect } from 'react-redux'
import {
	View,
	ScrollView,
	Image,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	ActivityIndicator,
	Platform,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'

import Rating from 'src/components/Rating'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

import { authSelector } from 'src/modules/auth/selectors'
import { addPageComments } from 'src/modules/page/service'

class ReviewFormFAQScreen extends React.Component {
	constructor(props) {
		super(props)
		const {
			auth: { isLogin, user },
			route,
		} = props
		const post = route.params['page_id']
		this.state = {
			post,
			content: '',
			author_name: isLogin ? user.display_name : '',
			author_email: isLogin ? user.user_email : '',
			pushing: false,
			acf: { rating: 1 },
			pushing: false,
		}
	}

	addReview = async () => {
		const { content, pushing, author_name, author_email, post } = this.state
		if (pushing) return
		else if (!content || !author_name || !author_email) {
			showMessage({
				duration: 3000,
				message: 'Заполните все поля',
				type: 'warning',
			})
			return
		}

		this.setState({ pushing: true })

		const { navigation } = this.props
		if (post) {
			try {
				const dataSet = await addPageComments(this.state)
				if (dataSet) {
					showMessage({
						duration: 3000,
						message: 'Отзыв успешно отправлен!',
						type: 'success',
					})
					this.props.route.params.cb(post)
					navigation.goBack()
				}
			} catch (e) {
				showMessage({
					duration: 3000,
					message: e.message,
					type: 'alert',
				})
			}
		}
		this.setState({ pushing: false })
	}

	render() {
		const {
			route,
			auth: { isLogin },
			// dataReview,
		} = this.props
		const { content, author_name, author_email, acf } = this.state

		const imageProduct = route.params['image']
		const nameProduct = route.params['name']

		return (
			<Container style={{ marginBottom: 0 }}>
				<KeyboardAvoidingView
					behavior='padding'
					keyboardVerticalOffset={Platform.select({ ios: 200, android: 0 })}
				>
					<ScrollView>
						<View style={[styles.viewContent, { marginBottom: 20 }]}>
							<Image
								source={imageProduct ? { uri: imageProduct } : require('src/assets/pDefault.png')}
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
								startingValue={acf.rating}
								onStartRating={(value) =>
									this.setState({ acf: { ...this.state.acf, rating: value } })
								}
							/>
						</View>

						<View style={{ marginBottom: 10 }}>
							<Input
								label='Ваш отзыв'
								multiline
								numberOfLines={8}
								value={content}
								onChangeText={(value) => this.setState({ content: value })}
							/>

							{!isLogin && (
								<Input
									label='Ваше имя'
									value={author_name}
									onChangeText={(value) => this.setState({ author_name: value })}
								/>
							)}
							{!isLogin && (
								<Input
									label='Ваш E-mail'
									value={author_email}
									onChangeText={(value) => this.setState({ author_email: value })}
								/>
							)}

							{/* <Input
								label='Ваше имя'
								value={author_name}
								onChangeText={(value) => this.setState({ author_name: value })}
							/>
							<Input
								label='Ваш E-mail'
								value={author_email}
								onChangeText={(value) => this.setState({ author_email: value })}
							/> */}
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
							{this.state.pushing ? (
								<ActivityIndicator animating={this.state.isLoading} />
							) : (
								<Text style={{ color: '#fff', textAlign: 'center' }}>Отправить</Text>
							)}
						</TouchableOpacity>
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

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
	}
}
export default connect(mapStateToProps)(ReviewFormFAQScreen)
