import React from 'react'
import { StyleSheet, View, Animated, Text } from 'react-native'

const MIN_HEIGHT = 46
const TOP = 8
const BOTTOM = 4

class ViewLabel extends React.Component {
	UNSAFE_componentWillMount() {
		this._animatedIsFocused = new Animated.Value(this.props.isHeading ? 1 : 0)
	}
	componentDidUpdate() {
		Animated.timing(this._animatedIsFocused, {
			toValue: this.props.isHeading ? 1 : 0,
			duration: 120,
		}).start()
	}

	render() {
		const { label, error, children } = this.props
		const topCenter = (MIN_HEIGHT - 20) / 2
		const labelStyle = {
			position: 'absolute',
			left: 0,
			top: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [topCenter, -TOP],
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [14, 10],
			}),
			lineHeight: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [20, 15],
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: ['#888', '#444'],
			}),
			zIndex: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 9999],
			}),
			backgroundColor: '#fff',
			paddingHorizontal: 7,
			marginHorizontal: 9,
		}
		return (
			<>
				<View
					style={[
						styles.container,
						{
							borderColor: '#e9ecef',
						},
					]}
				>
					{label && (
						<Animated.Text style={labelStyle} numberOfLines={1}>
							{label}
						</Animated.Text>
					)}
					{children}
				</View>
				{error && (
					<Text
						style={[
							styles.textError,
							{
								color: '#ff3b30',
							},
						]}
					>
						{error}
					</Text>
				)}
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		minHeight: MIN_HEIGHT,
		borderWidth: 1,
		borderRadius: 4,
		marginTop: TOP,
		marginBottom: BOTTOM,
	},
	textError: {
		fontSize: 10,
		lineHeight: 15,
		marginBottom: BOTTOM,
	},
})

export default ViewLabel
export { MIN_HEIGHT }
