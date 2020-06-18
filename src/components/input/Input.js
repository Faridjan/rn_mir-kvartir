import React from 'react'
import { StyleSheet, View } from 'react-native'
import InputBasic from './InputBasic'
import ViewLabel, { MIN_HEIGHT } from '../ViewLabel'

import { Feather } from '@expo/vector-icons'

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSecure: props.secureTextEntry,
			isHeading: props.value || props.defaultValue,
		}
		this.input = React.createRef()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({
				isHeading: this.props.value,
			})
		}
	}

	handleFocus = (data) => {
		this.setState({ isHeading: true })
		if (this.props.onFocus) {
			this.props.onFocus(data)
		}
	}
	onChange = (value) => {
		this.setState(
			{
				value,
			},
			() => {
				if (this.props.onChangeText) {
					this.props.onChangeText(value)
				}
			},
		)
	}
	handleBlur = (data) => {
		const { value } = this.state
		this.setState({
			isHeading: value || (this.input.current && this.input.current._lastNativeText),
		})
		if (this.props.onBlur) {
			this.props.onBlur(data)
		}
	}

	render() {
		const { label, error, secureTextEntry, theme, style, multiline, ...rest } = this.props
		const { isSecure, isHeading } = this.state
		return (
			<ViewLabel label={label} error={error} isHeading={isHeading}>
				<View style={styles.viewInput}>
					<InputBasic
						{...rest}
						inputRef={this.input}
						testID='RN-text-input'
						onBlur={this.handleBlur}
						onFocus={this.handleFocus}
						secureTextEntry={isSecure}
						multiline={multiline}
						style={[
							styles.input,
							!multiline && {
								height: MIN_HEIGHT,
							},
							style && style,
						]}
					/>
					{secureTextEntry && (
						<Feather
							name={isSecure ? 'eye' : 'eye-off'}
							color={isSecure ? '#adb5bd' : 'red'}
							size={15}
							containerStyle={styles.viewIcon}
							iconStyle={styles.icon}
							underlayColor='transparent'
							onPress={() =>
								this.setState({
									isSecure: !isSecure,
								})
							}
						/>
					)}
				</View>
			</ViewLabel>
		)
	}
}

const styles = StyleSheet.create({
	viewInput: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
	},
	viewIcon: {
		marginRight: 16,
	},
	icon: {
		paddingVertical: 4,
	},
})

export default Input
