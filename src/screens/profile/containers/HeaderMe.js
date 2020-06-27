import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import truncate from 'lodash/truncate'
import isEqual from 'lodash/isEqual'

import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native'

import { authSelector } from 'src/modules/auth/selectors'

const HeaderMe = (props) => {
	const {
		navigation,
		auth: { isLogin, user },
	} = props

	console.log(props)

	let nameUser = 'Hello'
	if (isLogin && user && !isEqual(user, {})) {
		const stringName = { name: user.display_name }

		nameUser = truncate(stringName, {
			length: 20,
			separator: '...',
		})
	}
	if (!isLogin) {
		return (
			<>
				<Text style={styles.logoutDescription}>
					Для полноценного использования приложения необходимо авторизоваться
				</Text>
				<View style={styles.logoutViewButton}>
					<Button
						title='Зарегистрироваться'
						containerStyle={styles.flex}
						type='outline'
						onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
					/>
					<Text>----------------------</Text>
					<Button
						title='Войти'
						containerStyle={styles.flex}
						onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
					/>
				</View>
			</>
		)
	}
	return <Text style={styles.item}> {nameUser}</Text>
}

const styles = StyleSheet.create({
	logoutDescription: {
		textAlign: 'center',
	},
	logoutViewButton: {
		marginTop: 4,
		marginLeft: 0,
		marginRight: 0,
	},
	flex: {
		flex: 1,
	},
	loginBell: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		paddingVertical: 4,
	},
	badge: {
		height: 20,
		minWidth: 20,
		borderRadius: 10,
	},
	textBadge: {
		fontSize: 9,
		lineHeight: 20,
	},
})

const mapStateToProps = (state) => {
	return {
		auth: authSelector(state),
	}
}

export default connect(mapStateToProps)(HeaderMe)
