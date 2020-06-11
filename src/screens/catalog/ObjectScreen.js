import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons'

import merge from 'lodash/merge'

// Components
import Container from 'src/components/Container'
import TextHtml from 'src/components/TextHtml'

// Containers
import ProductImages from './containers/ProductImages'

export default class CompanySingle extends Component {
	constructor(props) {
		super(props)

		const { item } = props.route.params

		this.state = {
			product: item,
			images: item.images,
			variation: [],
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

	render() {
		const { product } = this.state
		const { price, name, short_description, description, meta_data } = product

		let address = meta_data.find((val) => val.key === 'adress_room')
		let typeBasePrice = meta_data.find((val) => val.key === 'type_base_price')
		let addPrice = meta_data.find((val) => val.key === 'add_price')
		let typeAddPrice = meta_data.find((val) => val.key === 'type_add_price')

		const images = this.images()
		const firstImage = images[0]
		const image = firstImage && firstImage['src'] ? firstImage['src'] : ''

		return (
			<ScrollView>
				<View style={{ height: 400 }}>
					<ProductImages images={images} name_product={name} height={400} />
				</View>

				<Container>
					<View>
						<View style={{ marginBottom: 16 }}>
							<TextHtml
								value={description}
								// style={merge(changeSize('h6'), changeColor(theme.Text.third.color))}
							/>
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
})
