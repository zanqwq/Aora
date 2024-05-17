import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack>
    <Stack.Screen
      name="sign-in"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="sign-up"
      options={{ headerShown: false }}
    />
  </Stack>
);

export default AuthLayout;
