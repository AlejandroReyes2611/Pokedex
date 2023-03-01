import { createStackNavigator } from '@react-navigation/stack';
import { EditProfile } from '../screens/EditProfile';
import { Profile } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
