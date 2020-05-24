// React
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons'

// React Navigation
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import CategoryScreen from '../screens/catalog/CategoryScreen'
import ProductListScreen from '../screens/catalog/ProductListScreen'
import ObjectScreen from '../screens/catalog/ObjectScreen'
import FAQScreen from '../screens/FAQScreen'
import FoodScreen from '../screens/FoodScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { Image } from 'react-native'

import { THEME } from '../theme'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Navigation Config
const defaultNavigationOptions = {
	headerTitleAlign: 'center',
	headerStyle: {
		backgroundColor: '#fff',
		shadowColor: '#5bc4ff',
		shadowOpacity: 0,
		shadowOffset: {
			height: 0,
		},
		shadowRadius: 0,
		elevation: 0,
		borderBottomColor: THEME.COLORS.BORDER,
		borderBottomWidth: 0.5,
	},
}

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: THEME.COLORS.BACKGROUND,
		primary: THEME.COLORS.MAIN,
		text: THEME.COLORS.TEXT,
		border: THEME.COLORS.BORDER,
	},
}

// Stacks Navigation
const CategoryNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name='Category' component={CategoryScreen} />
			<Stack.Screen name='ProductList' component={ProductListScreen} />
			<Stack.Screen name='Object' component={ObjectScreen} />
		</Stack.Navigator>
	)
}

const FAQNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name='FAQ' component={FAQScreen} />
		</Stack.Navigator>
	)
}

const FoodNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name='Food' component={FoodScreen} />
		</Stack.Navigator>
	)
}

const ProfileNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name='Profile' component={ProfileScreen} />
		</Stack.Navigator>
	)
}

// Tabs Navigation
const MainBottomTabsNavigation = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				showIcon: true,
				style: {
					height: 50,
					backgroundColor: '#fff',
					shadowOpacity: 0,
					shadowOffset: {
						height: 0,
					},
					shadowRadius: 0,
					elevation: 0,
					borderTopWidth: 0.5,
				},
			}}
		>
			<Tab.Screen
				name='Category'
				component={CategoryNavigation}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Image
								source={require('../assets/home_active.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						) : (
							<Image
								source={require('../assets/home.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						),
				}}
			/>
			<Tab.Screen
				name='FAQ'
				component={FAQNavigation}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Image
								source={require('../assets/faq_active.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						) : (
							<Image
								source={require('../assets/faq.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						),
				}}
			/>
			<Tab.Screen
				name='Food'
				component={FoodNavigation}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Image
								source={require('../assets/food_active.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						) : (
							<Image
								source={require('../assets/food.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileNavigation}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Image
								source={require('../assets/profile_active.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						) : (
							<Image
								source={require('../assets/profile.jpg')}
								style={{ height: 30 }}
								square
								resizeMode='contain'
							/>
						),
				}}
			/>
		</Tab.Navigator>
	)
}

// Navigation Container
export const AppNavigation = () => {
	return (
		<NavigationContainer theme={MyTheme}>
			<MainBottomTabsNavigation />
		</NavigationContainer>
	)
}
