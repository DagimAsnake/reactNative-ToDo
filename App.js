import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "./Components/Ui/IconButton";

import AddToDoScreen from "./Screens/AddToDoScreen";
import DoneToDoScreen from "./Screens/DoneToDoScreen";
import ListToDoScreen from "./Screens/ListToDoScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function BottomNav() {
  return (
    <BottomTab.Navigator initialRouteName="List ToDo"
      screenOptions={({ navigation }) => ({
        headerRight: () => <IconButton name={"add"} size={32} onPress={() => { navigation.navigate("Add ToDo") }} />
      })}
    >
      <BottomTab.Screen name="List ToDo" component={ListToDoScreen} />
      <BottomTab.Screen name="Done ToDo" component={DoneToDoScreen} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="Add ToDo" component={AddToDoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


