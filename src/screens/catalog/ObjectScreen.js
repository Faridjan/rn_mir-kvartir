import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
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
						<TouchableOpacity onPress={onPress}>
							<Text style={{ color: '#999999', fontSize: 16, paddingTop: 6 }}>Подробнее</Text>
						</TouchableOpacity>
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

	getMetaData = (meta, string, getVal) => {
		const foundResult = meta.find((val) => val.key === string)
		if (foundResult) {
			return getVal ? foundResult.value : foundResult
		}
		return null
	}

	render() {
		const { product, fullText } = this.state
		const { price, name, description, meta_data } = product

		let address = this.getMetaData(meta_data, 'adress_room', false)
		let typeBasePrice = this.getMetaData(meta_data, 'type_base_price', true)
		let addPrice = this.getMetaData(meta_data, 'add_price', true)
		let typeAddPrice = this.getMetaData(meta_data, 'type_add_price', true)

		const images = this.images()

		return (
			<ScrollView>
				<View style={{ height: 400 }}>
					<ProductImages images={images} name_product={name} height={400} />
				</View>

				<Container>
					<View>
						<View style={styles.viewPrice}>
							{price ? (
								<Text style={styles.priceGroup}>
									<Text style={styles.price}>{toLocaleStringPrice(price)} </Text>
									<Text style={styles.priceType}>{typeBasePrice}</Text>
								</Text>
							) : null}
							{addPrice ? (
								<Text style={styles.priceGroup}>
									<Text style={styles.price}>{toLocaleStringPrice(addPrice)} </Text>
									<Text style={styles.priceType}> {typeAddPrice}</Text>
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
							onPress={() => {
								console.log('Test')
							}}
						>
							<View>
								<Text>Адрес на карте</Text>
							</View>
							<View>
								<SimpleLineIcons style={{ ...styles.icon, fontSize: 25 }} name='map' />
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.list} onPress={() => console.log('Test')}>
							<View>
								<Text>Забронировать</Text>
							</View>
							<View>
								<AntDesign style={styles.icon} name='calendar' />
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.list} onPress={() => console.log('Test')}>
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
		paddingVertical: 10,
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
	// priceGroup: {
	// 	flexDirection: 'column',
	// },
	price: {
		fontSize: 22,
		fontWeight: 'bold',
	},
})
