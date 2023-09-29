import React from 'react'
import { Text, View, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ToDo = [
  {
    id: '1',
    title: "first",
    description: "first first first first first first first"
  },
  {
    id: '2',
    title: "second",
    description: "second second second second second second second"
  },
  {
    id: '3',
    title: "fourth",
    description: "fourth fourth fourth fourth fourth fourth fourth"
  },
  {
    id: '4',
    title: "third",
    description: "third third third third third third third"
  },
  {
    id: '5',
    title: "fifth",
    description: "fifth fifth fifth fifth fifth fifth fifth"
  },
  {
    id: '6',
    title: "six",
    description: "six six six six six six six"
  },
  
]

const ListToDoScreen = () => {
  const renderToDo = ({ item }) => {
    const handlePress = () => {
      // Handle press event for the card
    };

    return (
      <Pressable onPress={handlePress}>
        <View className="flex-row p-4 items-center border-b">
          <Text className="flex-1 text-lg">{item.title}</Text>
          <Feather name="check-square" size={24} className="text-gray-500" />
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      <FlatList data={ToDo} keyExtractor={(item) => item.id} renderItem={renderToDo} />
    </View>
  );
};

export default ListToDoScreen;