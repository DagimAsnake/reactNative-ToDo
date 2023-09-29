import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ListToDoScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [toDoItems, setToDoItems] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://192.168.43.142:8080/todo');
      const data = await response.json();
      setToDoItems(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const renderToDo = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('Detail ToDo');
    };

    const handleCheckBox = () => {
      // Handle checkbox logic here
    };

    return (
      <Pressable onPress={handlePress}>
        <View className="flex-row p-4 items-center border-blue-500 border-b mx-3">
          <Text className="flex-1 text-lg text-blue-500">{item.title}</Text>
          <CheckBox checked={item.checked} onPress={handleCheckBox} />
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      <FlatList data={toDoItems} keyExtractor={(item) => item._id} renderItem={renderToDo} />
    </View>
  );
};

export default ListToDoScreen;