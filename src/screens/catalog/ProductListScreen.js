import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

// Components
import Title from '../../components/Title'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Container from '../../components/Container'

class ProductListScreen extends Component {
	render() {
		return (
			<Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Title style={{ color: 'green' }}>В процессе</Title>
					<Text style={{ color: 'green' }}>Идет перенос скриптов со старого проекта...</Text>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Object')}
						style={styles.btn}
					>
						<Text style={styles.btnText}>Экран описания квартиры</Text>
					</TouchableOpacity>
				</View>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: '#999',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		marginTop: 15,
	},
	btnText: {
		color: 'white',
		fontSize: 16,
	},
})

export default withNavigation(ProductListScreen)
