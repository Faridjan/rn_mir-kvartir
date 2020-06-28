import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, Marker } from 'react-native-maps'

const { width, height } = Dimensions.get('window')

const LATITUDE_PETROPAVLOVSK = 54.904081
const LONGITUDE_PETROPAVLOVSK = 69.1500506

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.005
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapLocationScreen extends React.Component {
	constructor(props) {
		super(props)
		const { params } = props.route
		this.state = {
			region: {
				latitude: params.address.lat ? params.address.lat : LATITUDE_PETROPAVLOVSK,
				longitude: params.address.lng ? params.address.lng : LONGITUDE_PETROPAVLOVSK,
				latitudeDelta: params.address.lat && params.address.lng ? LATITUDE_DELTA : 0.1,
				longitudeDelta: LONGITUDE_DELTA,
			},
			address: params.address,
		}
	}
	get mapType() {
		return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE
	}
	render() {
		const title = this.state.address.address ? this.state.address.address : 'Петропавловск'
		return (
			<View>
				<MapView
					provider={this.props.provider}
					style={styles.map}
					scrollEnabled={true}
					zoomEnabled={true}
					pitchEnabled={true}
					rotateEnabled={true}
					initialRegion={this.state.region}
				>
					<Marker coordinate={this.state.region} title={title} />
				</MapView>
			</View>
		)
	}
}
export default MapLocationScreen

const styles = StyleSheet.create({
	map: {
		height: '100%',
	},
})