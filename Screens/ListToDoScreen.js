import React, { useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';

const ToDo = [
  {
    id: '1',
    title: 'first',
    description: 'first first first first first first first',
    checked: false,
  },
  {
    id: '2',
    title: 'second',
    description: 'second second second second second second second',
    checked: false,
  },
  {
    id: '3',
    title: 'fourth',
    description: 'fourth fourth fourth fourth fourth fourth fourth',
    checked: false,
  },
  {
    id: '4',
    title: "third",
    description: "third third third third third third third",
    checked: false,
  },
  {
    id: '5',
    title: "fifth",
    description: "fifth fifth fifth fifth fifth fifth fifth",
    checked: false,
  },
  {
    id: '6',
    title: "six",
    description: "six six six six six six six",
    checked: false,
  },
];

const ListToDoScreen = () => {
  const [toDoItems, setToDoItems] = useState(ToDo);

  const renderToDo = ({ item }) => {
    const handlePress = () => {
      // Handle press event for the card
    };

    const handleCheckBox = () => {
      const updatedItems = toDoItems.map((todo) => {
        if (todo.id === item.id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      setToDoItems(updatedItems);
    };

    return (
      <Pressable onPress={handlePress}>
        <View className="flex-row p-4 items-center border-b">
          <Text className="flex-1 text-lg">{item.title}</Text>
          <CheckBox
            checked={item.checked}
            onPress={handleCheckBox}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      <FlatList data={toDoItems} keyExtractor={(item) => item.id} renderItem={renderToDo} />
    </View>
  );
};

export default ListToDoScreen;