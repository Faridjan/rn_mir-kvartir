// React
import React, { Component } from 'react'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import CategoryScreen from '../screens/CategoryScreen'
import FAQScreen from '../screens/FAQScreen'
import FoodScreen from '../screens/FoodScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Stacks Navigation
const CategoryNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Category' component={CategoryScreen} />
		</Stack.Navigator>
	)
}

const FAQNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='FAQ' component={FAQScreen} />
		</Stack.Navigator>
	)
}

const FoodNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Food' component={FoodScreen} />
		</Stack.Navigator>
	)
}

const ProfileNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Profile' component={ProfileScreen} />
		</Stack.Navigator>
	)
}

// Tabs Navigation
const MainBottomTabsNavigation = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Category' component={CategoryNavigation} />
			<Tab.Screen name='FAQ' component={FAQNavigation} />
			<Tab.Screen name='Food' component={FoodNavigation} />
			<Tab.Screen name='Profile' component={ProfileNavigation} />
		</Tab.Navigator>
	)
}

// Navigation Container
export const AppNavigation = () => {
	return (
		<NavigationContainer>
			<MainBottomTabsNavigation />
		</NavigationContainer>
	)
}
