import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

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

	render() {
		const { navigation } = this.props
		const { product, fullText } = this.state
		const { id, name, description, meta_data, variations, sale_price, regular_price } = product

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
						<View style={styles.viewPrice}>
							<Text>
								<Text style={[styles.price, sale_price && styles.priceOld]}>
									{toLocaleStringPrice(regular_price)}
								</Text>
								<Text style={[styles.priceType, sale_price && styles.priceOld]}> ₸</Text>
							</Text>
							{sale_price ? (
								<Text style={styles.salePrice}>
									<Text style={styles.price}>{toLocaleStringPrice(sale_price)}</Text>
									<Text style={styles.priceType}> ₸</Text>
								</Text>
							) : null}
						</View>

						<View style={{ marginBottom: 16 }}>
							{description ? (
								<DescriptionItem
									fullText={fullText}
									onPress={() => this.setState({ fullText: true })}
									text={description}
								/>
							) : null}
						</View>

						<TouchableOpacity
							style={styles.list}
							onPress={() =>
								navigation.push('MapLocationFood', {
									headerTitle: 'Адрес на карте',
									address,
								})
							}
						>
							<View>
								<Text>
									{`${address.street_name_short} ${address.street_number}` || 'Адрес на карте'}
								</Text>
							</View>
							<View>
								<SimpleLineIcons style={{ ...styles.icon, fontSize: 25 }} name='map' />
							</View>
						</TouchableOpacity>

						{phone_number ? (
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
						) : null}
						{phone_number2 ? (
							<TouchableOpacity
								style={styles.list}
								onPress={() => Linking.openURL(`tel:${phone_number2}`)}
							>
								<View>
									<Text>{phone_number2}</Text>
								</View>
								<View>
									<SimpleLineIcons name='phone' style={styles.icon} />
								</View>
							</TouchableOpacity>
						) : null}
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
		alignItems: 'flex-end',
		// justifyContent: 'flex-end',
		marginBottom: 20,
	},
	price: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	priceType: {
		fontWeight: 'bold',
	},
	priceOld: {
		textDecorationLine: 'line-through',
		fontWeight: 'normal',
		color: '#999',
	},
	salePrice: {
		marginLeft: 10,
	},
})
