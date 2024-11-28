import { faker } from '@snaplet/copycat';
import { createSeedClient } from '@snaplet/seed';

import {
  EQUIPMENTS,
  MEASUREMENT_TYPES,
  MUSCLES,
  SET_TYPES,
  TARGET_TYPES,
  INTENSITY_TYPES,
  WEIGHT_UNITS,
} from './const';

async function main() {
  const seed = await createSeedClient({
    dryRun: true,
    models: {
      profiles: {
        data: {
          avatarUrl: () => faker.image.avatarGitHub(),
        },
      },
      exercises: {
        data: {
          name: () => faker.commerce.productName(),
          equipment: () => faker.helpers.arrayElements(EQUIPMENTS),
          category: () => faker.word.words(1),
          instructions: () => [faker.word.words(5), faker.word.words(6)],
          primaryMuscles: () => faker.helpers.arrayElements(MUSCLES),
          secondaryMuscles: () => faker.helpers.arrayElements(MUSCLES),
        },
      },
      routines: {
        data: {
          name: () => faker.commerce.productName(),
          description: () => faker.lorem.sentences(3),
          minutesPerWorkout: () => faker.number.int({ min: 30, max: 60 }),
          difficultyLevel: () =>
            faker.helpers.arrayElements(['beginner', 'novice', 'intermediate', 'advanced']),
        },
      },
      routineWeeks: {
        data: {
          name: () => faker.word.words(3),
          description: () => faker.lorem.sentences(3),
          weekNumber: () => faker.number.int({ min: 1, max: 10 }),
        },
      },
      routineWorkouts: {
        data: {
          name: () => faker.helpers.arrayElement(['push', 'pull', 'legs', 'upper', 'lower']),
          order: () => faker.number.int({ min: 1, max: 10 }),
        },
      },
      routineExercises: {
        data: {
          sets: () => ({
            type: SET_TYPES.normal,
            intensity: {
              type: INTENSITY_TYPES.rpe,
              value: faker.number.int({ min: 1, max: 10 }),
            },
            target: {
              type: TARGET_TYPES.rep,
              reps: faker.number.int({ min: 1, max: 20 }),
            },
          }),
          order: () => faker.number.int({ min: 1, max: 10 }),
          notes: () => faker.lorem.sentences(3),
          tempoEccentric: () => faker.number.int({ min: 1, max: 5 }),
          tempoIsoBottom: () => faker.number.int({ min: 1, max: 5 }),
          tempoIsoTop: () => faker.number.int({ min: 1, max: 5 }),
          tempoConcentric: () => faker.number.int({ min: 1, max: 5 }),
        },
      },
      workoutTrackings: {
        data: {
          duration: () => faker.number.int({ min: 1, max: 60 }),
          startDate: () => faker.date.past(),
        },
      },
      workoutExerciseTrackings: {
        data: {
          order: () => faker.number.int({ min: 1, max: 10 }),
          sets: () => ({
            rpe: faker.number.int({ min: 1, max: 10 }),
            weight: faker.number.int({ min: 0, max: 200 }),
            measurement: faker.number.int({ min: 1, max: 20 }),
            type: MEASUREMENT_TYPES.reps,
          }),
          notes: () => faker.lorem.sentences(1),
          weightUnit: () => faker.helpers.enumValue(WEIGHT_UNITS),
        },
      },
    },
  });

  const { users } = await seed.users([
    {
      email: 'test@user.com',
      // PASSWORD = 'testuser';
      encryptedPassword: '$2a$10$wbpRytlVVSHH6ltji2634eOWKx2Hz2RK4TXvzaiyRxXdJjlSWBlK6',
      // aud: 'authenticated',
      // role: 'authenticated',
      // rawAppMetaData: {
      //   provider: 'email',
      //   providers: ['email'],
      // },
      // rawUserMetaData: {
      //   email: 'test@user.com',
      //   email_verified: true,
      //   phone_verified: false,
      // },
      // invitedAt: null,
      // confirmationToken: null,
      // confirmationSentAt: null,
      // recoveryToken: null,
      // recoverySentAt: null,
      // emailChange: null,
      // emailChangeSentAt: null,
      // emailChangeTokenNew: null,
      // bannedUntil: null,
      // reauthenticationSentAt: null,
      // deletedAt: null,
      // isAnonymous: false,
      // isSsoUser: false,
    },
  ]);

  const profiles = users.map((user) => ({
    id: user.id,
  }));

  const { exercises } = await seed.exercises((x) => x(10));
  const { routines } = await seed.routines((x) => x(5));
  const { routineWeeks } = await seed.routineWeeks((x) => x(routines.length * 4), {
    connect: {
      routines,
    },
  });
  const { routineWorkouts } = await seed.routineWorkouts((x) => x(routineWeeks.length * 4), {
    connect: {
      routineWeeks,
    },
  });

  const { routineExercises } = await seed.routineExercises((x) => x(routineWorkouts.length * 5), {
    connect: {
      routineWorkouts,
      exercises,
    },
  });

  await seed.programs((x) => x(routines.length), {
    connect: {
      routines,
      profiles,
    },
  });

  const { workoutTrackings } = await seed.workoutTrackings((x) => x(routineWorkouts.length), {
    connect: {
      routineWorkouts,
      profiles,
    },
  });

  await seed.workoutExerciseTrackings((x) => x(routineExercises.length), {
    connect: {
      exercises,
      workoutTrackings,
    },
  });
  process.exit(0);
}

main();
