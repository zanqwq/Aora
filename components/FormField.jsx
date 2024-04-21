import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, onChange, otherStyles, ...props }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <View className='w-full h-16 px-4
        bg-black-100 border-black-500
        rounded-2xl focus:border-secondary
        item-center
      '>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={onChange}
        />
      </View>
    </View>
  )
}

export default FormField