import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { StyleSheet, StatusBar, View } from 'react-native'
import { AppNavigation } from 'src/navigation/AppNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from 'react-native-flash-message'

import configureStore from 'src/config-store'
import { tokenSelector } from 'src/modules/auth/selectors'
import demoConfig from 'src/utils/demo'
import globalConfig from 'src/utils/global'

const { store, persistor } = configureStore()

type Props = {}

export default class App extends Component<Props> {
	componentDidMount() {
		store.subscribe(() => {
			const state = store.getState()
			// demoConfig.setData(getDemoSelector(state).toJS())
			globalConfig.setToken(tokenSelector(state))
		})
	}

	render() {
		return (
			<SafeAreaProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<View style={styles.container}>
							<AppNavigation />
						</View>
						<FlashMessage position='top' />
					</PersistGate>
				</Provider>
			</SafeAreaProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
