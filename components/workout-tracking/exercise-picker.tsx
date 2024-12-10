// src/components/ExercisePicker.tsx
import { useSuspenseQuery } from '@tanstack/react-query';
import { useControllableValue } from 'ahooks';
import Fuse from 'fuse.js';
import { CheckCircle } from 'lucide-react';
import { useState, useMemo, type Dispatch, type SetStateAction } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import { CATEGORIES, EQUIPMENT, MUSCLES } from '~/constants';

const fuseOptions = {
  keys: ['name'],
  threshold: 0.2, // Lower threshold = more strict matching
  location: 0,
  distance: 100,
};

interface ExercisePickerProps {
  onChange?: Dispatch<SetStateAction<ExerciseSelectModel[]>>;
  value?: ExerciseSelectModel[];
}
export function ExercisePicker(props: ExercisePickerProps) {
  const [filters, setFilters] = useState({
    name: '',
    category: 'all',
    equipment: 'all',
    muscle: 'all',
  });

  const [selectedExercises, setSelectedExercises] =
    useControllableValue<ExerciseSelectModel[]>(props);

  // Fetch exercises
  const { data: exercises = [], isLoading } = useSuspenseQuery(exercisesQueryOptions);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => new Fuse(exercises, fuseOptions), [exercises]);

  // Filter exercises based on search criteria
  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    // Apply fuzzy search for name if there's a search term
    if (filters.name) {
      const fuseResults = fuse.search(filters.name);
      filtered = fuseResults.map((result) => result.item);
    }

    // Apply remaining filters
    return filtered.filter((exercise) => {
      const categoryMatch = filters.category === 'all' || exercise.category === filters.category;
      const equipmentMatch =
        filters.equipment === 'all' ||
        exercise.equipment?.some((e) => e.toLowerCase().includes(filters.equipment.toLowerCase()));
      const muscleMatch =
        filters.muscle === 'all' ||
        [...(exercise.primaryMuscles || []), ...(exercise.secondaryMuscles || [])].some((m) =>
          m.toLowerCase().includes(filters.muscle.toLowerCase())
        );

      return categoryMatch && equipmentMatch && muscleMatch;
    });
  }, [exercises, filters, fuse]);

  return (
    <div className="flex flex-col gap-2 px-4">
      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
        />

        <Select
          value={filters.category}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.equipment}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, equipment: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Equipment</SelectItem>
            {EQUIPMENT.map((item) => (
              <SelectItem key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.muscle}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, muscle: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Muscle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Muscles</SelectItem>
            {MUSCLES.map((muscle) => (
              <SelectItem key={muscle} value={muscle}>
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex h-9 items-center gap-4 px-3">
        <div className="text-sm text-gray-500">
          <span className="text-primary-500 font-semibold">{selectedExercises.length}</span>{' '}
          Exercises Selected
        </div>
        {selectedExercises.length > 0 && (
          <Button variant="ghost" onClick={() => setSelectedExercises([])}>
            Clear Selection
          </Button>
        )}
      </div>

      {/* Exercise List */}
      <div className="h-[50svh] overflow-hidden rounded border">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Virtuoso
            data={filteredExercises}
            itemContent={(index, exercise) => {
              const isSelected = selectedExercises.find((e) => e.id === exercise.id);
              return (
                <div
                  key={exercise.id}
                  className="cursor-pointer border-b p-4 hover:bg-gray-50"
                  onClick={() =>
                    setSelectedExercises(() =>
                      isSelected
                        ? selectedExercises.filter((e) => e.id !== exercise.id)
                        : [...selectedExercises, exercise]
                    )
                  }>
                  <div className="flex gap-4">
                    <div className="font-medium">{exercise.name}</div>
                    {isSelected && <CheckCircle className="text-emerald-500" />}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>{exercise.category}</span>
                    {exercise.equipment?.length ? (
                      <span> • {exercise.equipment.join(', ')}</span>
                    ) : null}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>Primary: {exercise.primaryMuscles?.join(', ')}</span>
                    {exercise.secondaryMuscles?.length ? (
                      <span> • Secondary: {exercise.secondaryMuscles.join(', ')}</span>
                    ) : null}
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="flex flex-col gap-2 border-b p-4">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-32" />
    </div>
  ));
}
