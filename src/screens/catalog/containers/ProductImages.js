import React, { Component } from 'react'

import {
	Modal,
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	Dimensions,
	Image,
	ActivityIndicator,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import ImageViewer from 'react-native-image-zoom-viewer'
// import Pagination from 'src/containers/Pagination';

import Container from 'src/components/Container'
import Pagination from 'src/components/Pagination'

import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width } = Dimensions.get('window')

class ProductImages extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			visible: false,
			indexCurrency: 0,
		}
	}

	renderItem = ({ item }) => {
		const { height } = this.props
		const src = item.full_image_url ? item.full_image_url : item.src
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={styles.viewImage}
				onPress={() => this.setState({ visible: true })}
			>
				<Image
					source={{ uri: src, cache: 'reload' }}
					resizeMode='cover'
					style={{ height: height, width: width }}
					PlaceholderContent={<ActivityIndicator />}
				/>
			</TouchableOpacity>
		)
	}
	onViewableItemsChanged = ({ viewableItems }) => {
		this.setState({
			indexCurrency: viewableItems[0] ? viewableItems[0].index : 0,
		})
	}
	render() {
		const { images } = this.props
		const { visible, indexCurrency } = this.state

		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item, index) => `${item.id}${index}`}
					data={images}
					horizontal
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					decelerationRate={0.993}
					renderItem={this.renderItem}
					onViewableItemsChanged={this.onViewableItemsChanged}
					viewabilityConfig={{
						itemVisiblePercentThreshold: 50,
					}}
				/>
				<View style={styles.viewFooter}>
					<Pagination
						containerStyle={styles.viewPagination}
						activeVisit={indexCurrency}
						count={images.length}
					/>
				</View>
				<Modal visible={visible} transparent={true}>
					<ImageViewer
						onCancel={() => this.setState({ visible: false })}
						loadingRender={() => <ActivityIndicator />}
						enableSwipeDown={true}
						index={indexCurrency}
						imageUrls={images.map((image) => {
							return {
								url: image.full_image_url ? image.full_image_url : image.src,
							}
						})}
						renderHeader={() => (
							<Container style={styles.viewHeaderImages}>
								<AntDesign
									name='close'
									size={24}
									color='white'
									iconStyle={styles.iconClose}
									onPress={() => this.setState({ visible: false })}
								/>
							</Container>
						)}
					/>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		marginBottom: 8,
	},
	viewImage: {
		flex: 1,
		width: width,
		alignItems: 'center',
	},
	viewFooter: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
		paddingHorizontal: 0,
	},
	viewPagination: {
		// flexWrap: 'wrap',
		// flex: 1,
		// marginRight: 12,
	},
	iconWishlist: {
		marginLeft: 16,
	},
	viewHeaderImages: {
		position: 'absolute',
		top: 0,
		left: 0,
		// alignItems: 'flex-start',
		paddingTop: 0,
		zIndex: 999999,
	},
	iconClose: {
		paddingVertical: 12,
	},
})
export default ProductImages
