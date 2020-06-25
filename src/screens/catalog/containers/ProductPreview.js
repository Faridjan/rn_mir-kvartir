import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const noImage = require('src/assets/imgCateDefault.png')
const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		const { images, variations, meta_data } = item

		let address = meta_data.find((val) => val.key === 'adress_room')

		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Object', { headerTitle: item.name, item })
				}}
			>
				<View style={styles.preview}>
					<Image
						resizeMode='cover'
						style={styles.img}
						source={images && images[0] ? { uri: images[0].src, cache: 'reload' } : noImage}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.name}</Text>

						{address.value ? (
							<Text style={styles.address}>
								{address.value.street_name_short} {address.value.street_number}
							</Text>
						) : null}

						<View style={styles.viewPrice}>
							{variations.hour ? (
								<Text style={styles.priceGroup}>
									<Text style={styles.price}>
										{toLocaleStringPrice(variations.hour.regular_price)}
									</Text>
									<Text style={styles.priceType}> тг/час</Text>
								</Text>
							) : null}
							{variations.night ? (
								<Text style={styles.priceGroup}>
									<Text style={styles.price}>
										{toLocaleStringPrice(variations.night.regular_price)}
									</Text>
									<Text style={styles.priceType}> тг/ночь</Text>
								</Text>
							) : null}
							{variations.day ? (
								<Text style={styles.priceGroup}>
									<Text style={styles.price}>
										{toLocaleStringPrice(variations.day.regular_price)}
									</Text>
									<Text style={styles.priceType}> тг/сутки</Text>
								</Text>
							) : null}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	preview: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#444',
		// backgroundColor: 'green',
		flex: 1,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	viewPrice: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	img: {
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
	},
	textContainer: {
		marginLeft: 15,
		flexGrow: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 3,
	},
	address: { fontSize: 16, marginBottom: 3 },
	priceContainer: {
		fontSize: 16,
	},
})

export default withNavigation(ProductPreview)
