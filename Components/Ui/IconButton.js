import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ onPress, name, color, size }) => {
  return (
    <Pressable onPress={onPress} >
      <View className='m-4'>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;