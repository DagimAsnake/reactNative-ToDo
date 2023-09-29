import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';

const DetailToDoScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const todoId = route.params.todoId

  const [toDoItems, setToDoItems] = useState({});

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused, todoId, toDoItems]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://192.168.43.142:8080/todo/${todoId}`);
      const data = await response.json();
      setToDoItems(data.msg);
      navigation.setOptions({
        title: toDoItems?.title
       })
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleRemovePress = async () => {
    try {
      const response = await fetch(`http://192.168.43.142:8080/todo/delete/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      const data = await response.json();
      navigation.goBack();
      console.log(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <View className="flex-1 m-4">
      <View className="bg-white rounded-lg p-5 shadow-md">
        <Text className="text-xl font-bold mb-2 text-center">{toDoItems?.title}</Text>
        <Text className="text-gray-600 text-center">{toDoItems?.description}</Text>

        <View className="flex flex-row justify-center m-5 items-center">
          <TouchableOpacity
            className="bg-red-500 rounded-lg p-4 px-5 mx-2"
            onPress={handleRemovePress}
          >
            <Text className="text-white font-bold">Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-4 px-5 mx-2"
            onPress={""}
          >
            <Text className="text-white font-bold">Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default DetailToDoScreen