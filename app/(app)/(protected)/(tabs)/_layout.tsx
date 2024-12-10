import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors } from '~/constants/colors';
import { useColorScheme } from '~/lib/useColorScheme';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        animation: 'fade',
        tabBarStyle: {
          backgroundColor: colors[colorScheme].background,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors[colorScheme].background,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: colors[colorScheme].foreground,
        tabBarActiveTintColor: colors[colorScheme].primary,
        tabBarInactiveTintColor: colors[colorScheme].foreground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: true,
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: colors[colorScheme].background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: colors[colorScheme].foreground,
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          title: 'Train',
          tabBarIcon: ({ color }) => <TabBarIcon name="dumbbell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}
