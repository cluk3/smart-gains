export const MEASUREMENT_TYPES = {
  duration: 'duration',
  reps: 'reps',
} as const;

export const MEASUREMENT_TYPES_ARR = Object.values(MEASUREMENT_TYPES);

export const SET_TYPES = {
  normal: 'normal',
  warmup: 'warmup',
  myoreps: 'myoreps',
  drop: 'drop',
} as const;

export const SET_TYPES_ARR = Object.values(SET_TYPES);

export const TARGET_TYPES = {
  rep: 'rep',
  repRange: 'repRange',
  repMin: 'repMin',
  amrap: 'amrap',
  time: 'time',
  timeRange: 'timeRange',
} as const;

export const TARGET_TYPES_ARR = Object.values(TARGET_TYPES);

export const INTENSITY_TYPES = {
  rpe: 'rpe',
  rpeRange: 'rpeRange',
  oneRepMax: 'oneRepMax',
} as const;

export const INTENSITY_TYPES_ARR = Object.values(INTENSITY_TYPES);

export const WEIGHT_UNITS = {
  kg: 'kg',
  lb: 'lb',
} as const;

export const WEIGHT_UNITS_ARR = Object.values(WEIGHT_UNITS);

export const MUSCLES = [
  'neck',
  'traps',
  'shoulders',
  'chest',
  'biceps',
  'triceps',
  'forearms',
  'lats',
  'middle back',
  'lower back',
  'abs',
  'obliques',
  'glutes',
  'adductors',
  'quads',
  'hamstrings',
  'calves',
] as const;

export const EQUIPMENTS = [
  'none',
  'ez curl bar',
  'barbell',
  'dumbbell',
  'gym mat',
  'exercise ball',
  'medicine ball',
  'pull-up bar',
  'bench',
  'incline bench',
  'kettlebell',
  'machine',
  'cable',
  'bands',
  'foam roll',
  'other',
] as const;
