import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	View,
	ActivityIndicator,
	Clipboard,
	TouchableOpacity,
	Image,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import Container from 'src/components/Container'
import { getSinglePage } from 'src/modules/page/service'

export default class KaspiScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			pageId: 419,
			loading: true,
			error: '',
			data: [],
			page: 1,
		}
	}

	componentDidMount() {
		this.fetchPage()
	}

	fetchPage = async (id = this.state.pageId, page = this.state.page) => {
		try {
			const dataGet = await getSinglePage(id)

			if (dataGet) {
				this.setState((preState) => {
					return {
						error: null,
						loading: false,
						data: page === 1 ? dataGet : concat(preState.data, dataGet),
					}
				})
			} else {
				this.setState({
					loading: false,
				})
			}
		} catch (e) {
			this.setState({
				error: e,
				loading: false,
			})
		}
	}

	setToClipboard(str, type) {
		const msg = type === 'phone' ? ' без +7' : ''

		const buffer = type === 'phone' ? str.replace(/(^..)|([^A-Za-z0-9])/gi, '') : str

		Clipboard.setString(buffer)
		showMessage({
			duration: 3000,
			message: 'Текст скопирован' + msg,
			type: 'warning',
		})
	}

	render() {
		const {
			loading,
			data: { acf },
		} = this.state
		return (
			<Container style={styles.container}>
				{!loading ? (
					<View>
						<View style={styles.cardInfo}>
							<Image
								style={styles.cardImg}
								resizeMode={'contain'}
								source={require('src/assets/kaspi-card.png')}
							/>
							<View style={styles.cardTextWr}>
								<View>
									<Text style={styles.cardTextDesc}>ИИН</Text>
									<Text style={styles.cardText}>{acf.kaspi_iin}</Text>
								</View>
								<View>
									<Text style={styles.cardTextDesc}>Номер телефона</Text>
									<Text style={styles.cardText}>{acf.kaspi_phone}</Text>
								</View>
							</View>
						</View>
						<View style={styles.list}>
							<View>
								<View style={styles.rowInfo}>
									<View style={styles.tdInfo1}>
										<Text style={styles.textTd1}>БИН</Text>
									</View>
									<View style={styles.tdInfo2}>
										<Text>3434893489384</Text>
									</View>
								</View>
								<View style={styles.rowInfo}>
									<View style={styles.tdInfo1}>
										<Text style={styles.textTd1}>Адрес чего-то там</Text>
									</View>
									<View style={styles.tdInfo2}>
										<Text>Интернациональная 35</Text>
									</View>
								</View>
								<View style={styles.rowInfo}>
									<View style={styles.tdInfo1}>
										<Text style={styles.textTd1}>Дополнительная строка</Text>
									</View>
									<View style={styles.tdInfo2}>
										<Text>34839489384983</Text>
									</View>
								</View>
							</View>
						</View>
						<TouchableOpacity
							style={styles.list}
							onPress={() => {
								this.setToClipboard(acf.kaspi_iin, 'iin')
							}}
						>
							<MaterialCommunityIcons
								name='content-copy'
								style={{ ...styles.icon, fontSize: 25 }}
							/>
							<Text>Скопировать ИИН</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.list}
							onPress={() => {
								this.setToClipboard(acf.kaspi_phone, 'phone')
							}}
						>
							<MaterialCommunityIcons
								name='content-copy'
								style={{ ...styles.icon, fontSize: 25 }}
							/>
							<Text>Скопировать Номер телефона</Text>
						</TouchableOpacity>
					</View>
				) : (
					<ActivityIndicator color='red' />
				)}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center',
		marginBottom: 0,
		paddingHorizontal: 0,
		paddingVertical: 30,
		backgroundColor: '#ececec',
	},
	desc: {
		marginBottom: 50,
		fontSize: 16,
		paddingHorizontal: 20,
	},
	list: {
		borderColor: '#ccc',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		marginLeft: 0,
		padding: 15,
		flexDirection: 'row',
		backgroundColor: '#fff',
		// justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		color: '#ff0000',
		fontSize: 28,
		marginRight: 15,
	},
	cardInfo: {
		alignItems: 'center',
		paddingHorizontal: 50,
	},
	cardImg: {
		height: 250,
		width: '100%',
	},
	cardTextWr: {
		position: 'absolute',
		left: 70,
		top: 50,
		height: 150,
		justifyContent: 'space-between',
	},
	cardTextDesc: {
		color: '#fff',
	},
	cardText: {
		color: '#fff',
		fontSize: 25,
	},

	rowInfo: {
		flexDirection: 'row',
	},
	tdInfo1: {
		width: '40%',
	},
	tdInfo2: {
		width: '60%',
	},
	textTd1: {
		color: '#999',
		textAlign: 'right',
		paddingRight: 15,
	},
})
