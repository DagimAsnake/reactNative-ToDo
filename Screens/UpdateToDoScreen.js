import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';

const UpdateToDoScreen = () => {
    const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const todoId = route.params.todoId

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState();

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTodos();
    }
  }, [isFocused, todoId]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://192.168.43.142:8080/todo/${todoId}`);
      const data = await response.json();
      setTitle(data.msg.title);
      setDescription(data.msg.description)
      setChecked(data.msg.checked)
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleFormSubmit = async () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Warnning', 'Title and Description are required');
      return;
    }

    const editedTodo = {
      title: title,
      description: description,
      checked: checked
    };

    try {
      const response = await fetch(`http://192.168.43.142:8080/todo/update/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTodo),
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      const data = await response.json();
      console.log(data);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 pt-4 m-5">
    <View className="flex items-center">
      <Text className="text-2xl font-bold mb-4 text-blue-500">Update To Do</Text>
    </View>
    <TextInput
      className="border-2 border-blue-500 rounded-lg p-3 mb-4 w-full"
      placeholder="Title"
      value={title}
      onChangeText={handleTitleChange}
    />
    <TextInput
      className="border-2 border-blue-500 rounded-lg p-3 mb-4 w-full h-32"
      placeholder="Description"
      multiline
      numberOfLines={4}
      value={description}
      onChangeText={handleDescriptionChange}
      textAlignVertical="top"
    />
    <View className="flex items-center">
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4 px-10"
        onPress={handleFormSubmit}
      >
        <Text className="text-white font-bold">Update</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default UpdateToDoScreen