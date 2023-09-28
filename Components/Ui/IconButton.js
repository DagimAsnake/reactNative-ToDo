import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ onPress, name }) => {
  return (
    <Pressable onPress={onPress} >
      <View className='m-4 bg-red-500'>
        <Ionicons name={name} />
      </View>
    </Pressable>
  );
};

export default IconButton;