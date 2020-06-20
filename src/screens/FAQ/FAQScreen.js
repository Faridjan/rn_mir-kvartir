import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	ScrollView,
	Linking,
	Modal,
} from 'react-native'
import { SimpleLineIcons, AntDesign, Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons'

// Components
import Container from 'src/components/Container'
import TextHtml from 'src/components/TextHtml'

// Containers
import ProductImages from '../catalog/containers/ProductImages'

import { getSinglePage } from 'src/modules/page/service'

import concat from 'lodash/concat'

class DescriptionItem extends React.PureComponent {
	render() {
		let { text, onPress } = this.props
		const regexText = /(<([^>]+)>)/gi
		let cleanText = text.replace(regexText, '')
		return (
			<View>
				<Text style={{ marginBottom: 10, fontSize: 18 }}>Описание</Text>
				{this.props.fullText ? (
					<TextHtml value={text} />
				) : (
					<View style={{}}>
						<Text numberOfLines={4}>{cleanText}</Text>
						<Text onPress={onPress} style={{ color: 'red', fontStyle: 'italic', fontSize: 16 }}>
							Подробнее
						</Text>
					</View>
				)}
			</View>
		)
	}
}

class FAQScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			page: 1,
			loading: true,
			error: null,
			fullText: false,
			modalVisible: false,
			pageId: 131,
			lang: 'ru',
		}
	}

	componentDidMount() {
		this.fetchPage()
	}

	fetchPage = async (id = this.state.pageId, lang = this.state.lang, page = this.state.page) => {
		try {
			const dataGet = await getSinglePage(id, lang)

			if (dataGet) {
				this.setState((preState) => {
					return {
						error: null,
						loading: false,
						data: page === 1 ? dataGet : concat(preState.data, dataGet),
					}
				})
			} else {
				this.setState({
					loading: false,
				})
			}
		} catch (e) {
			this.setState({
				error: e,
				loading: false,
			})
		}
	}

	renderModal(data) {
		const { modalVisible } = this.state
		return (
			<Modal animationType='slide ' transparent={true} visible={modalVisible}>
				<TouchableOpacity
					style={styles.modal}
					onPress={() => {
						this.setState({ modalVisible: false })
					}}
				>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							{data ? (
								<View style={{ justifyContent: 'center' }}>
									<TextHtml stylesheet={styles} value={data} />
								</View>
							) : null}

							<TouchableOpacity
								style={styles.closeModal}
								onPress={() => this.setState({ modalVisible: false })}
							>
								<EvilIcons name='close' size={30} color='black' />
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</TouchableOpacity>
			</Modal>
		)
	}

	renderData() {
		const { navigation } = this.props
		const { data, fullText } = this.state
		const { acf, content, title, id } = data
		const { photo_gallery, adress_room, phone_number, instagram, web_page, work_time } = acf
		return (
			<ScrollView>
				<View style={{ height: 400 }}>
					<ProductImages
						images={photo_gallery.images_faq[0]}
						name_product={title.rendered}
						height={400}
					/>
				</View>

				<Container>
					<View>
						<View style={{ marginBottom: 16 }}>
							{content.rendered ? (
								<DescriptionItem
									fullText={fullText}
									onPress={() => this.setState({ fullText: true })}
									text={content.rendered}
								/>
							) : null}
						</View>

						<TouchableOpacity
							style={styles.list}
							onPress={() =>
								navigation.push('MapLocationFAQ', {
									headerTitle: 'Адрес на карте',
									address: adress_room,
								})
							}
						>
							<View>
								<Text>
									{`${adress_room.street_name_short} ${adress_room.street_number}` ||
										'Адрес на карте'}
								</Text>
							</View>
							<View>
								<SimpleLineIcons style={{ ...styles.icon, fontSize: 25 }} name='map' />
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.list}
							onPress={() => Linking.openURL(`tel:${phone_number}`)}
						>
							<View>
								<Text>{phone_number}</Text>
							</View>
							<View>
								<SimpleLineIcons name='phone' style={styles.icon} />
							</View>
						</TouchableOpacity>

						{this.renderModal(work_time)}
						<TouchableOpacity
							style={styles.list}
							onPress={() => this.setState({ modalVisible: true })}
						>
							<View>
								<Text>Режим работы</Text>
							</View>
							<View>
								<SimpleLineIcons name='clock' style={styles.icon} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.list}
							onPress={() => Linking.openURL(`https://www.instagram.com/${instagram}`)}
						>
							<View>
								<Text>{instagram}</Text>
							</View>
							<View>
								<AntDesign name='instagram' style={styles.icon} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.list}
							onPress={() => Linking.openURL(`http:/${web_page}`)}
						>
							<View>
								<Text>{web_page}</Text>
							</View>
							<View>
								<Ionicons name='md-globe' style={styles.icon} />
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.list}
							onPress={() =>
								navigation.push('ReviewsFAQ', {
									page_id: id,
									image: photo_gallery.images_faq[0][0].thumbnail_image_url,
									name: title.rendered,
									headerTitle: 'Отзывы',
								})
							}
						>
							<View>
								<Text>Отзывы</Text>
							</View>
							<View>
								<FontAwesome style={styles.icon} name='comment-o' />
							</View>
						</TouchableOpacity>
					</View>
				</Container>
			</ScrollView>
		)
	}

	render() {
		const { navigation } = this.props.navigation
		const { data, fullText, loading } = this.state

		return (
			<>
				{loading ? (
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<ActivityIndicator size='large' color='red' />
					</View>
				) : data ? (
					<>{this.renderData()}</>
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
	modalTitle: {
		marginBottom: 30,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	modalContainer: {
		width: '85%',
		backgroundColor: '#fff',
		padding: 30,
		minHeight: 200,
		borderRadius: 5,
	},
	closeModal: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 10,
	},
	list: {
		borderColor: '#ccc',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		marginLeft: 0,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	input: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		color: '#444',
		marginLeft: 0,
		fontSize: 16,
		paddingVertical: 5,
		paddingHorizontal: 0,
	},
	icon: {
		color: '#ff0000',
		fontSize: 28,
	},
	viewPrice: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 26,
	},
	strong: {
		fontSize: 18,
	},
	pre: {
		fontSize: 18,
	},
	// priceGroup: {
	// 	flexDirection: 'column',
	// },
	price: {
		fontSize: 22,
		fontWeight: 'bold',
	},
})

export default FAQScreen
