/* eslint-disable no-underscore-dangle */
import { Image, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({
  icon, color, name, focused,
}) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />

    <Text
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const _layout = () => (
  <Tabs screenOptions={{
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#FFA001',
    tabBarInactiveTintColor: '#CDCDE0',
    tabBarStyle: {
      backgroundColor: '#161622',
      borderTopColor: '#FF8E01',
      height: 72,
    },
  }}
  >
    {[
      { name: 'home', icon: icons.home },
      { name: 'bookmark', icon: icons.bookmark },
      { name: 'create', icon: icons.plus },
      { name: 'profile', icon: icons.profile },
    ].map(({ name, icon }) => (
      <Tabs.Screen
        key={name}
        name={name}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icon}
              color={color}
              name={`${name[0].toUpperCase()}${name.substring(1)}`}
              focused={focused}
            />
          ),
        }}
      />
    ))}
    {/* <Tabs.Screen
        name='home'
        options={{
          title: 'Home' ,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name='Home'
              focused={focused}
            />
          )
        }}
      /> */}
  </Tabs>
);

export default _layout;
