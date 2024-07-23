import {
  View, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { useState } from 'react';
import { icons } from '../constants';

const SearchInput = ({
  value, placeholder, onChange, otherStyles, onPress, ...props
}) => (
  <View className="w-full h-16 px-4
      bg-black-100 rounded-2xl
      border-2 border-black-200 focus:border-secondary
      flex-row item-center items-center
    "
  >
    <TextInput
      className="flex-1 text-white font-pregular text-base"
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#7b7b8b"
      onChangeText={onChange}
    />

    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Image className="w-5 h-5" source={icons.search} resizeMode="contain" />
    </TouchableOpacity>
  </View>
);

export default SearchInput;
