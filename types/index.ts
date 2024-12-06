import {
  WEIGHT_UNITS,
  MEASUREMENT_TYPES,
  TARGET_TYPES,
  SET_TYPES,
  DIFFICULTY_LEVELS,
} from '~/const';

export type SetType = keyof typeof SET_TYPES;
export type WeightUnit = keyof typeof WEIGHT_UNITS;
export type MeasurementType = keyof typeof MEASUREMENT_TYPES;
export type TargetType = keyof typeof TARGET_TYPES;
export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;

export type FocusArea =
  | 'athleticism'
  | 'bodybuilding'
  | 'powerlifting'
  | 'olympic'
  | 'powerbuilding'
  | 'strongman'
  | 'plyometrics'
  | 'bodyweight';

export interface RpeIntensity {
  type: 'rpe';
  value: number; // 1-10 scale
}

export interface RpeRangeIntensity {
  type: 'rpeRange';
  minValue: number; // 1-10 scale
  maxValue: number; // 1-10 scale
}

export interface OneRepMaxIntensity {
  type: 'oneRepMax';
  value: number; // percentage of 1RM
}

export type Intensity = RpeIntensity | RpeRangeIntensity | OneRepMaxIntensity;

export interface RepTarget {
  type: 'rep';
  reps: number;
}

export interface RepRangeTarget {
  type: 'repRange';
  minReps: number;
  maxReps: number;
}

export interface RepMinTarget {
  type: 'repMin';
  reps: number;
}

export interface AmrapTarget {
  type: 'amrap';
  timeLimit?: number; // in seconds
}

export interface TimeTarget {
  type: 'time';
  duration: number; // in seconds
}

export interface TimeRangeTarget {
  type: 'timeRange';
  minDuration: number; // in seconds
  maxDuration: number; // in seconds
}

export type SetTarget =
  | RepTarget
  | RepRangeTarget
  | RepMinTarget
  | AmrapTarget
  | TimeTarget
  | TimeRangeTarget;

export interface ExerciseSet {
  id: string;
  setNumber: number;
  type: SetType;
  intensity: Intensity;
  target: SetTarget;
}

export interface SetTracking {
  id: string;
  rpe?: number;
  weight: number;
  measurement: number;
  measurementType: MeasurementType;
}
