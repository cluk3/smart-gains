import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { router, Link } from 'expo-router';
import { View, Pressable } from 'react-native';

import { Screen } from '~/components/screen';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { H1, H2 } from '~/components/ui/typography';
import { getPrograms, Programs as ProgramsType } from '~/repository';
export default function DashboardPage() {
  const { data, isSuccess } = useQuery(getPrograms());

  return (
    <Screen preset="scroll">
      <View className="flex flex-1 flex-col items-center justify-center gap-y-4 bg-background p-4 pt-10">
        <H1 className="text-center">Home</H1>
        <Button
          className="w-full"
          variant="default"
          size="default"
          onPress={() => router.push('/(app)/modal')}>
          <Text>Open Modal</Text>
        </Button>
        {isSuccess && data ? <Programs programs={data} /> : <H2>Loading...</H2>}
      </View>
    </Screen>
  );
}

const Programs = ({ programs }: { programs: ProgramsType }) => {
  return (
    <View className="w-full flex-1">
      <FlashList
        data={programs.map((x) => x.routines!)}
        renderItem={({ item }) => (
          <Link href={`/(app)/(protected)/routines/${item.id}`} asChild>
            <Pressable>
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardDescription>Duration: {item.minutes_per_workout} minutes</CardDescription>
                  <CardDescription>Workouts: {item.routine_weeks.length}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-row items-center gap-2">
                  {(item.difficulty_level?.length || 0) % 4 === 0 ? (
                    <Badge variant="secondary">
                      <Text>All levels</Text>
                    </Badge>
                  ) : (
                    item.difficulty_level?.map((difficulty_level, index) => (
                      <Badge key={difficulty_level} variant="secondary">
                        <Text>{difficulty_level}</Text>
                      </Badge>
                    ))
                  )}
                </CardFooter>
              </Card>
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item?.id}
        ListHeaderComponent={() => <H2>Programs</H2>}
        ItemSeparatorComponent={() => <View className="h-8 " />}
        contentContainerStyle={{ paddingBottom: 10 }}
        estimatedItemSize={220}
      />
    </View>
  );
};
