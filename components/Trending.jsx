import { useEffect, useState } from 'react';
import {
  FlatList, TouchableOpacity, ImageBackground,
  Text,
  View,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../constants';

const TrendingItem = ({ video: videoDoc, active }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Animatable.View
      className="mr-1"
      animation={{
        0: { scale: active ? 0.95 : 1 },
        1: { scale: active ? 1 : 0.95 },
      }}
      duration={500}
    >
      {playing ? (
        <Video
          source={{ uri: videoDoc.video }}
          className="w-40 h-60 rounded-[35px] my-5 bg-black/40"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlaying(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity className="relative justify-center items-center" onPress={() => setPlaying(true)}>
          <ImageBackground
            source={{ uri: videoDoc.thumbnail }}
            resizeMode="cover"
            className="w-40 h-60 rounded-[35px] my-5 shadow-lg shadow-white overflow-hidden"
          />
          <Image source={icons.play} className="absolute w-10 h-10" resizeMode="cover" />
          {/* <Text>{video.thumbnail}</Text> */}
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ videos = [] }) => {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={({ viewableItems }) => {
        setActiveKey(viewableItems.length ? viewableItems[0].key : videos[0]?.$id)
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      renderItem={({ item: video, index }) => (
        <TrendingItem video={video} active={video.$id === activeKey} />
      )}
      horizontal
    />
  );
};

export default Trending;
