import {
  View, Text, ScrollView, TouchableOpacity, Image,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons, images } from '../../constants';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalContext';

const Create = () => {
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });
  // const router =

  const pickFile = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      // eslint-disable-next-line no-nested-ternary
      type: selectType === 'image'
        ? ['image/jpg', 'image/jpeg', 'image/png']
        : (
          selectType === 'video'
            ? ['video/mp4', 'video/gif']
            : null
        ),
    });
    if (!result.canceled) {
      return result.assets[0];
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
      Alert.alert('please complete the form');
    }

    try {
      setIsLoading(true);
      await createVideo(form, user.$id);
      Alert.alert('video upload successfully!');
      router.push('/home');
    } catch (e) {
      console.error('error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary h-full px-2 py-4">
        <View>
          <Text className="text-gray-50 text-2xl font-pmedium">Upload Video</Text>
        </View>

        <FormField
          title="Video Title"
          otherStyles="py-4"
          placeholder="Give your video a title"
          value={form.title}
          onChange={(title) => setForm({ ...form, title })}
        />

        <Text className="text-gray-50 text-base">Upload Video</Text>
        <TouchableOpacity onPress={async () => {
          if (form.video) {
            setForm({ ...form, video: null });
          } else {
            setForm({ ...form, video: await pickFile('video') });
          }
        }}
        >
          {
            form.video
              ? (
                <View className="relative w-full h-[400] items-center justify-center">
                  <Video source={{ uri: form.video.uri }} resizeMode="contain" className="w-full h-[400]" />
                  <Image source={icons.logout} resizeMode="cover" className="w-[20] h-[20] absolute" />
                </View>
              )
              : (
                <View className="w-full h-40 px-4 bg-black-100 justify-center items-center rounded-2xl">
                  <View className="w-14 h-14 justify-center items-center">
                    <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                  </View>
                </View>
              )
          }
        </TouchableOpacity>

        <Text className="text-gray-50 text-base">Thumbnail image</Text>

        <TouchableOpacity onPress={async () => {
          if (form.thumbnail) {
            setForm({ ...form, thumbnail: null });
          } else {
            setForm({ ...form, thumbnail: await pickFile('image') });
          }
        }}
        >
          {
            form.thumbnail
              ? (
                <View className="relative w-full h-[200] items-center justify-center">
                  <Image source={{ uri: form.thumbnail.uri }} resizeMode="cover" className="w-full h-[200]" />
                  <Image source={icons.logout} resizeMode="cover" className="w-[20] h-[20] absolute" />
                </View>
              )
              : (
                <View className="w-full h-16 px-4 bg-black-100 justify-center items-center rounded-2xl">
                  <View className="w-14 h-14 justify-center items-center flex-row space-x-2">
                    <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                    <Text className="text-gray-50">Choose a thumbnail</Text>
                  </View>
                </View>
              )
          }
        </TouchableOpacity>

        <FormField
          title="AI Prompt"
          placeholder="The Prompt you use to create"
          value={form.prompt}
          onChange={(prompt) => setForm({ ...form, prompt })}
        />

        <View className="px-4 pt-4">
          <CustomButton
            title="Submit & Publish"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
