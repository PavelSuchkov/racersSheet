import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriversScreen from '../screens/DriversScreen';
import DriverWebViewScreen from '../screens/DriverWebViewScreen';
import { Text, TouchableOpacity, Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const BackArrow = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingLeft: 12,
      paddingRight: 16,
      minWidth: 44,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <Text style={{ fontSize: 32, lineHeight: 36, color: '#222' }}>{'←'}</Text>
  </TouchableOpacity>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerStyle: { height: 36, backgroundColor: '#fff' },
        headerLeft:
          Platform.OS === 'ios' && navigation.canGoBack()
            ? () => <BackArrow onPress={navigation.goBack} />
            : undefined,
      })}
    >
      <Stack.Screen
        name="Drivers"
        component={DriversScreen}
        options={{ title: 'Список гонщиков' }}
      />
      <Stack.Screen
        name="DriverWebView"
        component={DriverWebViewScreen}
        options={{ title: 'Профиль гонщика' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
