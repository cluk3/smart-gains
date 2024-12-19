import { valibotResolver } from '@hookform/resolvers/valibot';
import * as v from 'valibot';

import { MEASUREMENT_TYPES_ARR, SET_TYPES_ARR, WEIGHT_UNITS_ARR } from '~/const';

export const workoutTrackingInsertSchema = v.object({
  name: v.optional(v.string()),
  startDate: v.optional(v.number(), () => Date.now()),
  duration: v.optional(v.number(), 0),
  workoutId: v.string(),
  exercises: v.array(
    v.object({
      exerciseId: v.string(),
      weightUnit: v.picklist(WEIGHT_UNITS_ARR),
      order: v.number(),
      notes: v.optional(v.string()),
      sets: v.array(
        v.object({
          type: v.object({ value: v.picklist(SET_TYPES_ARR), label: v.string() }),
          completed: v.boolean(),
          rpe: v.pipe(
            v.optional(v.string()),
            v.transform((i) => (i ? Number(i) : undefined)),
            v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(10)))
          ),
          weight: v.pipe(v.string(), v.transform(Number), v.number(), v.minValue(0)),
          measurement: v.pipe(v.string(), v.transform(Number), v.number(), v.minValue(0)),
          measurementType: v.picklist(MEASUREMENT_TYPES_ARR),
        })
      ),
    })
  ),
});

export type FormData = v.InferInput<typeof workoutTrackingInsertSchema>;
export type ValidatedFormData = v.InferOutput<typeof workoutTrackingInsertSchema>;

export const resolver = valibotResolver(workoutTrackingInsertSchema);
