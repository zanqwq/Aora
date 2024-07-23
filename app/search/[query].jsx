import {
  View, Text, FlatList, Image, RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../context/globalContext';
import SearchInput from '../../components/SearchInput';
import { images } from '../../constants';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { getAllVideos } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';

const Search = () => {
  const { user } = useGlobalContext();
  const { data: videos, invokeFetch } = useAppwrite(getAllVideos);
  const { data: latestVideos, invokeFetch: invokeLatestFetch } = useAppwrite(getAllVideos);
  const { query: localQuery } = useLocalSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(localQuery);
  }, [localQuery]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await invokeFetch();
      await invokeLatestFetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const listHeader = (
    <View className="my-6 px-4 space-y-6">
      <View className="user-logo-view flex-row justify-between items-center">
        <View className="user-view">
          <Text className="text-gray-100 text-xs font-pregular">Welcome Back</Text>
          <Text className="text-secondary text-3xl font-pmedium">{user.username}</Text>
        </View>

        <View className="logo-view">
          <Image className="w-[40px] h-[40px]" source={images.logoSmall} resizeMode="contain" />
        </View>
      </View>

      <View className="search-view">
        <SearchInput
          value={query}
          placeholder="Search for a video topic"
          onChange={setQuery}
          onPress={() => {
            router.setParams({ query });
          }}
        />
      </View>

      <View className="latest-video w-full flex-1">
        <Text className="text-gray-100 text-lg font-pregular">Latest videos</Text>

        <Trending videos={latestVideos} />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={videos}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={<EmptyState title="No Video Found" subtitle="Be the first uploader" />}
        renderItem={({ item }) => (
          <View className="mb-5 px-2">
            <VideoCard video={item} />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />

      <StatusBar {...{ style: 'light' }} />
    </SafeAreaView>
  );
};

export default Search;
