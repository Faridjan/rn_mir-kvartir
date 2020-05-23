// React
import React, { Component } from 'react'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import CategoryScreen from '../screens/CategoryScreen'
import FAQScreen from '../screens/FAQScreen'
import FoodScreen from '../screens/FoodScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()

export class AppNavigation extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='Category' component={CategoryScreen} />
					<Stack.Screen name='FAQ' component={FAQScreen} />
					<Stack.Screen name='Food' component={FoodScreen} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}
