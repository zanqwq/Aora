import {
  Alert, Image, ScrollView, Text, View,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalContext';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const handleSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('please fill in all the fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const user = await createUser(form.email, form.password, form.username);
      setUser(user);
      setIsLoggedIn(true);

      Alert.alert('Success', 'sign up successfully');
      router.replace('/home');
    } catch (e) {
      Alert.alert('Error', e.message);
      console.log('Error', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4 justify-center ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-white text-2xl text-semibold font-psemibold mt-10">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            onChange={(username) => setForm({ ...form, username })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            onChange={(email) => setForm({ ...form, email })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            onChange={(password) => setForm({ ...form, password })}
            otherStyles="mt-7"
          />

          <CustomButton title="Sign Up" containerStyles="mt-7" onPress={handleSignUp} isLoading={isSubmitting} />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gl text-gray-100 font-pregular">Already have account ?</Text>
            <Link href="/sign-in" className="text-gl text-secondary-100">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
