import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from '@expo/vector-icons';

import IconButton from "./Components/Ui/IconButton";

import AddToDoScreen from "./Screens/AddToDoScreen";
import DoneToDoScreen from "./Screens/DoneToDoScreen";
import ListToDoScreen from "./Screens/ListToDoScreen";
import DetailToDoScreen from "./Screens/DetailToDoScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function BottomNav() {
  return (
    <BottomTab.Navigator
      initialRouteName="List ToDo"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#3f51b5' },
        headerTintColor: 'white',
        tabBarStyle: { paddingBottom: 5, backgroundColor: '#3f51b5' },
        tabBarActiveTintColor: '#ffffff',
        headerRight: () => (
          <IconButton
            name={'add'}
            size={30}
            color="#ffffff"
            onPress={() => {
              navigation.navigate('Add ToDo');
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="List ToDo"
        component={ListToDoScreen}
        options={{
          title: "To Do",
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Done ToDo"
        component={DoneToDoScreen}
        options={{
          title: "Done",
          tabBarLabel: 'Done',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-check" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#3f51b5' },
            headerTintColor: "white"
          }}
        >
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="Add ToDo" component={AddToDoScreen} options={{ title: "Add To Do" }} />
          <Stack.Screen name="Detail ToDo" component={DetailToDoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


