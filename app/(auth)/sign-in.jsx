import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full my-6 px-4 justify-center '>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-white text-2xl text-semibold font-psemibold mt-10'>
            Logn to Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            onChange={email => setForm({ ...form, email })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            onChange={password => setForm({ ...form, password })}
            otherStyles='mt-7'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})