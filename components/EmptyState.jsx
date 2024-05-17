import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { images } from '../constants';
import CustomButton from './CustomButton';

function EmptyState({ title, subtitle }) {
  return (
    <View className="items-center justify-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px] object-contain" />

      <Text className="text-gray-100 text-xl font-pmedium">{title}</Text>

      <Text className="text-gray-100 text-xs font-pregular">{subtitle}</Text>

      <CustomButton
        title="Create video"
        containerStyles="w-full mt-5"
        onPress={() => { router.push('/create'); }}
      />
    </View>
  );
}

export default EmptyState;
