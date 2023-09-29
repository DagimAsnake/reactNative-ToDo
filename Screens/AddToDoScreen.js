import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const AddToDoScreen = () => {
  const navigation = useNavigation()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleFormSubmit = async () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Validation Error', 'Title and Description are required');
      return;
    }

    const newTodo = {
      title: title,
      description: description,
      checked: false
    };
    
    try {
      const response = await fetch('http://192.168.43.142:8080/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
  
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      const data = await response.json();
      console.log(data); 
      navigation.navigate("BottomNav")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 pt-4 m-5">
      <View className="flex items-center">
        <Text className="text-2xl font-bold mb-4 text-blue-500">Add To Do</Text>
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
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddToDoScreen;