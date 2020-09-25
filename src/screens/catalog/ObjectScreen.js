import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
	ScrollView,
	Linking,
} from 'react-native'
import { SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

import merge from 'lodash/merge'

// Components
import Container from 'src/components/Container'
import TextHtml from 'src/components/TextHtml'

// Containers
import ProductImages from './containers/ProductImages'

const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

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

export default class CompanySingle extends Component {
	constructor(props) {
		super(props)

		const { item } = props.route.params

		this.state = {
			product: item,
			images: item.images,
			variation: [],
			fullText: false,
		}
	}

	onChange = (key, value) => {
		this.setState({
			[key]: value,
		})
	}

	images = () => {
		const { variation, images } = this.state
		if (variation && variation['image']) {
			let list = []
			const image = variation['image']
			if (image) {
				list.push(image)
			}
			return list
		}
		return images
	}

	getMetaData = (meta, string) => {
		const foundResult = meta.find((val) => val.key === string)
		return foundResult ? foundResult.value : null
	}

	getPhoneNumberUrl = (phoneNum) => {
		phoneNum = phoneNum.replace(/\D/g, '')
		if (Platform.OS !== 'android') {
			return `telprompt:+${phoneNum}`
		} else {
			return `tel:+${phoneNum}`
		}
	}

	render() {
		const { navigation } = this.props
		const { product, fullText } = this.state
		const { id, name, description, meta_data, variations } = product

		const address = this.getMetaData(meta_data, 'adress_room')
		const phone_number = this.getMetaData(meta_data, 'phone_hotel')
		const phone_number2 = this.getMetaData(meta_data, 'phone_hotel_2')

		const images = this.images()

		return (
			<ScrollView>
				<View style={{ height: 400 }}>
					<ProductImages images={images} name_product={name} height={400} />
				</View>

				<Container>
					<View>
						{variations ? (
							<View style={styles.viewPrice}>
								{Object.entries(variations).map(([key, variation]) => {
									return (
										<Text style={styles.priceGroup} key={key.toString()}>
											<Text style={styles.price}>
												{toLocaleStringPrice(variation.regular_price)}
											</Text>
											<Text style={styles.priceType}> {variation.name}</Text>
										</Text>
									)
								})}
							</View>
						) : null}

						{description ? (
							<View style={{ marginBottom: 16 }}>
								{description ? (
									<DescriptionItem
										fullText={fullText}
										onPress={() => this.setState({ fullText: true })}
										text={description}
									/>
								) : null}
							</View>
						) : null}

						{address ? (
							<TouchableOpacity
								style={styles.list}
								onPress={() =>
									navigation.push('MapLocation', {
										headerTitle: 'Адрес на карте',
										address,
										phone1: phone_number,
										phone2: phone_number2,
										name,
									})
								}
							>
								<View>
									<Text>{`${address.name}` || 'Адрес на карте'}</Text>
								</View>
								<View>
									<SimpleLineIcons style={{ ...styles.icon, fontSize: 25 }} name='map' />
								</View>
							</TouchableOpacity>
						) : null}

						{phone_number ? (
							<TouchableOpacity
								style={styles.list}
								onPress={() => Linking.openURL(this.getPhoneNumberUrl(phone_number))}
							>
								<View>
									<Text>{phone_number}</Text>
								</View>
								<View>
									<SimpleLineIcons name='phone' style={styles.icon} />
								</View>
							</TouchableOpacity>
						) : null}
						{phone_number2 ? (
							<TouchableOpacity
								style={styles.list}
								onPress={() => Linking.openURL(this.getPhoneNumberUrl(phone_number2))}
							>
								<View>
									<Text>{phone_number2}</Text>
								</View>
								<View>
									<SimpleLineIcons name='phone' style={styles.icon} />
								</View>
							</TouchableOpacity>
						) : null}

						<TouchableOpacity
							style={styles.list}
							onPress={() =>
								navigation.push('Booking', {
									variations,
									headerTitle: 'Бронирование',
								})
							}
						>
							<View>
								<Text>Забронировать</Text>
							</View>
							<View>
								<AntDesign style={styles.icon} name='calendar' />
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.list}
							onPress={() =>
								navigation.push('Reviews', {
									image: images[0],
									name,
									product_id: id,
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
}

const styles = StyleSheet.create({
	modalTitle: {
		marginBottom: 30,
		textAlign: 'center',
		fontWeight: 'bold',
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
		marginBottom: 16,
		flexWrap: 'wrap',
	},
	priceGroup: {
		flexDirection: 'column',
		marginBottom: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
	},
})
