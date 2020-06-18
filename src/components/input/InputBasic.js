import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const InputBasic = ({
	placeholderTextColor,
	style,
	multiline,
	numberOfLines,
	inputRef,
	...rest
}) => {
	return (
		<TextInput
			{...rest}
			ref={inputRef}
			placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'grey'}
			multiline={multiline}
			numberOfLines={multiline ? numberOfLines : 1}
			style={[
				styles.input,
				{
					color: '#000',
				},
				multiline && styles.inputMultiline,
				multiline && {
					height: numberOfLines * 20 + 2 * 12,
				},
				style && style,
			]}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontSize: 14,
		lineHeight: 20,
		textAlignVertical: 'center',
	},
	inputMultiline: {
		textAlignVertical: 'top',
		paddingVertical: 12,
	},
})

InputBasic.defaultProps = {
	autoCapitalize: 'none',
	underlineColorAndroid: 'transparent',
	numberOfLines: 3,
}

export default InputBasic
