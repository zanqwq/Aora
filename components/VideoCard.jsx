import { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../constants';

const VideoCard = ({
  video: {
    title, thumbnail, vedio: uri, $createdAt, creator: { username, avatar } = {},
  },
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <View className="px-5 pt-5 pb-2 bg-black-100 rounded-xl">
      <View className="flex-row gap-x-4 mb-2 items-center relative">
        <Image source={{ uri: avatar }} className="w-[40px] h-[40px] rounded-3xl" />

        <View>
          <Text className="text-secondary-100">{username}</Text>
          <Text className="text-gray-50">{$createdAt}</Text>
        </View>

        {/* maintain the aspect ratio util the image is contained in the container */}
        <Image source={icons.menu} className="w-5 h-5 absolute right-2" resizeMode="contain" />
      </View>

      {
        playing
          ? (
            <Video
              className="w-full h-60 bg-black-100"
              source={{ uri }}
              shouldPlay
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  setPlaying(false);
                }
              }}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setPlaying(true)}
              className="w-full h-60 relative justify-center items-center"
            >
              {/* cover -> maintain aspect ratio and cover the container */}
              <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl" resizeMode="cover" />
              <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="cover" />
            </TouchableOpacity>
          )
      }

      <Text className="text-gray-50 text-xl mb-2">{title}</Text>

      <View className="flex-row justify-around items-center">
        {[icons.share, icons.comments, icons.like].map((icon) => (
          <TouchableOpacity activeOpacity={0.4}>
            <Image key={icon} source={icon} className="w-8 h-8" resizeMode="cover" />
          </TouchableOpacity>
          // <Text key={icon} className="text-gray-50">{icon}</Text>
        ))}
      </View>

    </View>
  );
};

export default VideoCard;
