import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

const WorldScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is a {props.name}!</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Inicio"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={21} />
            ),
          }}
        >
          {(props) => <WorldScreen {...props} name="home" />}
        </Tab.Screen>

        <Tab.Screen
          name="Tienda"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="logo-apple-appstore"
                color={color}
                size={21}
              />
            ),
          }}
        >
          {(props) => <WorldScreen {...props} name="store" />}
        </Tab.Screen>

        <Tab.Screen
          name="Cuenta"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="person-circle-outline"
                color={color}
                size={21}
              />
            ),
          }}
        >
          {(props) => <WorldScreen {...props} name="account" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
