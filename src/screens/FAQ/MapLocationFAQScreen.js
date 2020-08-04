import * as React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const { width, height } = Dimensions.get('window')

export default class MapLocationFAQScreen extends React.Component {
	constructor(props) {
		super(props)
		const { params } = props.route
		this.state = {
			lat: params.address.lat,
			lng: params.address.lng,
			visible: true,
		}
	}
	render() {
		const { lat, lng } = this.state
		const { name, address, phone1, phone2 } = this.props.route.params
		return (
			<View style={{ flex: 1 }}>
				<WebView
					style={{ flex: 1 }}
					source={{
						uri: 'https://mk.inplus.kz/map-page.php',
						method: 'POST',
						body: `
							{
								"lat": "${lat}",
								"lng": "${lng}",
								"name": "${name}",
								"address": "${address.address}",
								"phone1": "${phone1}",
								"phone2": "${phone2}"
							}
						`,
					}}
					onLoad={() => this.setState({ visible: false })}
				/>
				{this.state.visible && (
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ActivityIndicator size='large' color='red' />
					</View>
				)}
			</View>
		)
	}
}
