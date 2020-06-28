// React
import React, { Component } from 'react'
import { Image } from 'react-native'

// Expo
import { Ionicons } from '@expo/vector-icons'

// React Navigation
import {
	NavigationContainer,
	DefaultTheme,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Tools
import { THEME } from '../theme'

import NavigationService from 'src/utils/navigation'

/**********  Screens ************/

// Object
import CategoryScreen from 'src/screens/catalog/CategoryScreen'
import SearchScreen from 'src/screens/catalog/SearchScreen'
import ObjectScreen from 'src/screens/catalog/ObjectScreen'
import BookingScreen from 'src/screens/catalog/BookingScreen'
import MapLocationScreen from 'src/screens/catalog/MapLocationScreen'
import ReviewsScreen from 'src/screens/catalog/ReviewsScreen'
import ReviewFormScreen from 'src/screens/catalog/ReviewFormScreen'
import ProductListScreen from 'src/screens/catalog/ProductListScreen'

// FAQ
import FAQScreen from 'src/screens/FAQ/FAQScreen'
import MapLocationFAQScreen from 'src/screens/FAQ/MapLocationFAQScreen'
import ReviewsFAQScreen from 'src/screens/FAQ/ReviewsFAQScreen'
import ReviewFormFAQScreen from 'src/screens/FAQ/ReviewFormFAQScreen'

// FOOD
import FoodScreen from 'src/screens/food/FoodScreen'
import FoodObjectScreen from 'src/screens/food/FoodObjectScreen'
import FoodListScreen from 'src/screens/food/FoodListScreen'
import MapLocationFoodScreen from 'src/screens/food/MapLocationFoodScreen'

// PROFILE
import ProfileScreen from 'src/screens/profile/ProfileScreen'
import LoginScreen from 'src/screens/profile/LoginScreen'
import RegisterScreen from 'src/screens/profile/RegisterScreen'
import ForgotScreen from 'src/screens/profile/ForgotScreen'
import EditProfileScreen from 'src/screens/profile/EditProfileScreen'
import ChangePasswordScreen from 'src/screens/profile/ChangePasswordScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const getTabBarVisibility = (route) => {
	const routeName = route.state ? route.state.routes[route.state.index].name : ''
	if (routeName === 'Search' || routeName === 'MapLocation') {
		return false
	}
	return true
}

const getActiveRouteState = (route) => {
	if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
		return route
	}

	const childActiveRoute = route.routes[route.index]
	return getActiveRouteState(childActiveRoute)
}

const getHeaderTitle = (route) => {
	// If state doesn't exist, we need to default to `screen` param if available, or the initial screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getActiveRouteState(route)

	switch (routeName.params.screen) {
		case 'Register':
			return 'Регистрация'
		case 'Forgot':
			return 'Восстановление пароля'
		case 'Login':
			return 'Вход'
	}
}

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
			<Stack.Screen
				name='Category'
				component={CategoryScreen}
				options={({ navigation }) => ({
					title: 'Категории',
					headerRight: () => (
						<Ionicons
							name='ios-search'
							size={24}
							style={{ marginRight: 15, paddingHorizontal: 5, paddingVertical: 5 }}
							onPress={() => navigation.navigate('Search')}
						/>
					),
				})}
			/>
			<Stack.Screen
				name='Search'
				component={SearchScreen}
				options={{
					title: 'Поиск',
				}}
			/>
			<Stack.Screen
				name='ProductList'
				component={ProductListScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='Object'
				component={ObjectScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='MapLocation'
				component={MapLocationScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='Booking'
				component={BookingScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='Reviews'
				component={ReviewsScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='ReviewForm'
				component={ReviewFormScreen}
				options={({ route }) => ({ title: 'Оставить отзыв' })}
			/>
		</Stack.Navigator>
	)
}

const FAQNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen name='FAQ' component={FAQScreen} />
			<Stack.Screen name='MapLocationFAQ' component={MapLocationFAQScreen} />
			<Stack.Screen name='ReviewsFAQ' component={ReviewsFAQScreen} options={{ title: 'Отзывы' }} />
			<Stack.Screen
				name='ReviewFormFAQ'
				component={ReviewFormFAQScreen}
				options={{ title: 'Оставить отзыв' }}
			/>
		</Stack.Navigator>
	)
}

const FoodNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen
				name='Food'
				component={FoodScreen}
				options={{
					title: 'Еда',
				}}
			/>

			<Stack.Screen
				name='FoodList'
				component={FoodListScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='FoodObject'
				component={FoodObjectScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
			<Stack.Screen
				name='MapLocationFood'
				component={MapLocationFoodScreen}
				options={({ route }) => ({ title: route.params.headerTitle })}
			/>
		</Stack.Navigator>
	)
}

const AuthNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{
					title: 'Авторизация',
				}}
			/>
			<Stack.Screen
				name='Register'
				component={RegisterScreen}
				options={{
					title: 'Регистрация',
				}}
			/>
			<Stack.Screen
				name='Forgot'
				component={ForgotScreen}
				options={{
					title: 'Восстановление пароля',
				}}
			/>
		</Stack.Navigator>
	)
}

const ProfileNavigation = () => {
	return (
		<Stack.Navigator screenOptions={defaultNavigationOptions}>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					title: 'Профиль',
				}}
			/>
			<Stack.Screen
				name='EditProfile'
				component={EditProfileScreen}
				options={{
					title: 'Изменить личные данные',
				}}
			/>
			<Stack.Screen
				name='ChangePassword'
				component={ChangePasswordScreen}
				options={{
					title: 'Изменение пароля',
				}}
			/>
			<Stack.Screen
				name='Auth'
				component={AuthNavigation}
				options={({ route }) => ({
					headerTitle: getHeaderTitle(route),
				})}
			/>
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
				options={({ route }) => ({
					tabBarVisible: getTabBarVisibility(route),
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
				})}
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
		<NavigationContainer
			theme={MyTheme}
			ref={(navigatorRef) => {
				NavigationService.setTopLevelNavigator(navigatorRef)
			}}
		>
			<MainBottomTabsNavigation />
		</NavigationContainer>
	)
}
