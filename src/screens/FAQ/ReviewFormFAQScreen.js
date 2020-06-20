import React from 'react'
import { View, ScrollView, Image, Text, Button, KeyboardAvoidingView } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import Rating from 'src/components/Rating'

// Components
import Container from 'src/components/Container'
import Input from 'src/components/input/Input'

import { addPageComments } from 'src/modules/page/service'

class ReviewFormFAQScreen extends React.Component {
	constructor(props) {
		super(props)
		const {
			// auth: { isLogin, user },
			route,
		} = props
		const post = route.params['page_id']
		this.state = {
			post,
			content: '',
			// author_name: isLogin ? user.display_name : '',
			author_name: '',
			// author_email: isLogin ? user.user_email : '',
			author_email: '',
			acf: { rating: 1 },

			// status: isLogin ? 'approved' : 'hold',
			// status: 'hold',
		}
	}

	addReview = async () => {
		const { navigation } = this.props
		const { post } = this.state
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
	}

	render() {
		const {
			navigation,
			route,
			// auth: { isLogin },
			// dataReview,
		} = this.props
		const { content, author_name, author_email, acf } = this.state

		const imageProduct = route.params['image']
		const nameProduct = route.params['name']

		return (
			<Container>
				<KeyboardAvoidingView behavior='height'>
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

							{/* {!isLogin && (
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
							)} */}

							<Input
								label='Ваше имя'
								value={author_name}
								onChangeText={(value) => this.setState({ author_name: value })}
							/>
							<Input
								label='Ваш E-mail'
								value={author_email}
								onChangeText={(value) => this.setState({ author_email: value })}
							/>
						</View>
						<Button
							// loading={dataReview.get('loadingAdd')}
							title='Отправить'
							containerStyle={{ marginBottom: 20 }}
							onPress={this.addReview}
						/>
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

export default ReviewFormFAQScreen
