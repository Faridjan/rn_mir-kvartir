// REACT
import React from 'react'
import { StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// REDUX
import { connect } from 'react-redux'
import { compose } from 'redux'

// UTILS
import truncate from 'lodash/truncate'
import isEqual from 'lodash/isEqual'

// MODULES
import { authSelector } from 'src/modules/auth/selectors'
import { signOut } from 'src/modules/auth/actions'

// COMPONENTS
import { EvilIcons } from '@expo/vector-icons'
import Container from 'src/components/Container'
import Separator from 'src/components/Separator'
import { Row } from 'src/components/Gird'

const HeaderMe = (props) => {
	const {
		navigation,
		auth: { isLogin, user },
	} = props

	const handleLogout = () => {
		props.signOut()
		// this.props.navigation.goBack()
	}

	let nameUser = 'Hello!'
	if (isLogin && user && !isEqual(user, {})) {
		nameUser = `Привет, ${user.display_name}`

		// nameUser = truncate(stringName, {
		// 	length: 20,
		// 	separator: '...',
		// })
	}
	if (!isLogin) {
		return (
			<ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
				<Text style={styles.logoutDescription}>
					Для полноценного использования приложения необходимо авторизоваться
				</Text>
				<Row style={styles.logoutViewButton}>
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.btn1}
						onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
					>
						<Text style={styles.btn1Text}>Регистрация</Text>
					</TouchableOpacity>
					<Separator small />
					<TouchableOpacity
						activeOpacity={0.5}
						style={styles.btn2}
						onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
					>
						<Text style={styles.btn2Text}>Вход</Text>
					</TouchableOpacity>
				</Row>
			</ScrollView>
		)
	}
	return (
		<ScrollView>
			<Row style={styles.item}>
				{user.user_url ? (
					<Image
						style={styles.avatar}
						source={user.user_url ? { uri: user.user_url } : require('src/assets/pDefault.png')}
					/>
				) : (
					<EvilIcons name='user' size={70} color='#1a73e8' style={{ marginRight: 10 }} />
				)}

				<Text style={styles.greeting}>{nameUser}</Text>
			</Row>
			<TouchableOpacity style={styles.list} onPress={() => navigation.push('EditProfile')}>
				<Text>Редактировать данные</Text>
				<Ionicons name='ios-arrow-forward' style={styles.icon} color='black' />
			</TouchableOpacity>
			<TouchableOpacity style={styles.list} onPress={() => navigation.push('ChangePassword')}>
				<Text>Пароль</Text>
				<Ionicons name='ios-arrow-forward' style={styles.icon} color='black' />
			</TouchableOpacity>
			<TouchableOpacity style={{ ...styles.list, ...styles.listLeftIco }} onPress={handleLogout}>
				<Text>Выйти</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	logoutDescription: {
		textAlign: 'center',
		marginBottom: 20,
	},
	logoutViewButton: {
		marginTop: 4,
		marginLeft: 0,
		marginRight: 0,
	},
	flex: {
		flex: 1,
	},
	btn1: {
		padding: 12,
		borderRadius: 3,
		borderWidth: 1,
		flex: 1,
		borderBottomColor: '#000',
	},
	btn2: {
		padding: 12,
		borderRadius: 3,
		flex: 1,
		backgroundColor: '#000',
	},
	btn1Text: {
		color: '#000',
		textAlign: 'center',
	},
	btn2Text: {
		color: '#fff',
		textAlign: 'center',
	},
	loginBell: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		padding: 20,
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		marginBottom: 30,
	},
	avatar: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginRight: 10,
	},
	greeting: {
		fontSize: 15,
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
	list: {
		borderColor: '#ccc',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		marginLeft: 0,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	icon: {
		color: '#000',
		fontSize: 16,
		marginRight: 10,
	},
})

const putStateToProps = (state) => {
	return {
		auth: authSelector(state),
	}
}

const putDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOut()),
})

export default connect(putStateToProps, putDispatchToProps)(HeaderMe)
