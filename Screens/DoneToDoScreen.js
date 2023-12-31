import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const DoneToDoScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  const [toDoItems, setToDoItems] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused, isChecked]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://192.168.43.142:8080/todo/done');
      const data = await response.json();
      setToDoItems(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const renderToDo = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('Detail ToDo', { todoId: item._id });
    };

    const handleCheckBox = async () => {
      try {
        const response = await fetch(`http://192.168.43.142:8080/todo/checkdone/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Error: ' + response.status);
        }
        const data = await response.json();
        setIsChecked(!isChecked);
        console.log(data); 
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    return (
      <Pressable onPress={handlePress}>
        <View className="flex-row p-4 items-center border-blue-500 border-b mx-3">
          <Text className="flex-1 text-lg text-blue-500">{item.title}</Text>
          <CheckBox
            checked={item.checked} 
            onPress={ handleCheckBox}
          />
        </View>
      </Pressable>
    );
  };

  if (!toDoItems || toDoItems.length === 0) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-xl text-blue-500">No ToDo Done yet. Finish some ToDO's.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList data={toDoItems} keyExtractor={(item) => item._id} renderItem={renderToDo} />
    </View>
  );
};

export default DoneToDoScreen;
