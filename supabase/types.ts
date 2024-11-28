export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          category: string;
          created_at: string;
          equipment: Json | null;
          id: string;
          image: string | null;
          instructions: Json | null;
          name: string;
          primary_muscles: Json | null;
          secondary_muscles: Json | null;
          updated_at: string;
          video: string | null;
        };
        Insert: {
          category: string;
          created_at?: string;
          equipment?: Json | null;
          id?: string;
          image?: string | null;
          instructions?: Json | null;
          name: string;
          primary_muscles?: Json | null;
          secondary_muscles?: Json | null;
          updated_at?: string;
          video?: string | null;
        };
        Update: {
          category?: string;
          created_at?: string;
          equipment?: Json | null;
          id?: string;
          image?: string | null;
          instructions?: Json | null;
          name?: string;
          primary_muscles?: Json | null;
          secondary_muscles?: Json | null;
          updated_at?: string;
          video?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      program_plan_exercises: {
        Row: {
          alternative_exercises: Json;
          created_at: string;
          exercise_id: string;
          id: string;
          notes: string | null;
          order: number;
          sets: Json;
          tempo_concentric: number | null;
          tempo_eccentric: number | null;
          tempo_iso_bottom: number | null;
          tempo_iso_top: number | null;
          updated_at: string;
          workout_id: string;
        };
        Insert: {
          alternative_exercises: Json;
          created_at?: string;
          exercise_id: string;
          id?: string;
          notes?: string | null;
          order: number;
          sets: Json;
          tempo_concentric?: number | null;
          tempo_eccentric?: number | null;
          tempo_iso_bottom?: number | null;
          tempo_iso_top?: number | null;
          updated_at: string;
          workout_id: string;
        };
        Update: {
          alternative_exercises?: Json;
          created_at?: string;
          exercise_id?: string;
          id?: string;
          notes?: string | null;
          order?: number;
          sets?: Json;
          tempo_concentric?: number | null;
          tempo_eccentric?: number | null;
          tempo_iso_bottom?: number | null;
          tempo_iso_top?: number | null;
          updated_at?: string;
          workout_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'program_plan_exercises_exercise_id_fkey';
            columns: ['exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'program_plan_exercises_workout_id_fkey';
            columns: ['workout_id'];
            isOneToOne: false;
            referencedRelation: 'program_plan_workouts';
            referencedColumns: ['id'];
          },
        ];
      };
      program_plan_weeks: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          program_id: string;
          updated_at: string;
          week_number: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          program_id: string;
          updated_at: string;
          week_number: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          program_id?: string;
          updated_at?: string;
          week_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'program_plan_weeks_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'program_plans';
            referencedColumns: ['id'];
          },
        ];
      };
      program_plan_workouts: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          order: number;
          updated_at: string;
          week_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          order: number;
          updated_at: string;
          week_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          order?: number;
          updated_at?: string;
          week_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'program_plan_workouts_week_id_fkey';
            columns: ['week_id'];
            isOneToOne: false;
            referencedRelation: 'program_plan_weeks';
            referencedColumns: ['id'];
          },
        ];
      };
      program_plans: {
        Row: {
          created_at: string;
          id: string;
          program_template_id: string;
          template_version: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          program_template_id: string;
          template_version: number;
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          program_template_id?: string;
          template_version?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'program_plans_program_template_id_fkey';
            columns: ['program_template_id'];
            isOneToOne: false;
            referencedRelation: 'program_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      program_template_exercises: {
        Row: {
          alternative_exercises: Json | null;
          created_at: string;
          exercise_id: string;
          id: string;
          notes: string | null;
          order: number;
          sets: Json;
          tempo_concentric: number | null;
          tempo_eccentric: number | null;
          tempo_iso_bottom: number | null;
          tempo_iso_top: number | null;
          updated_at: string;
          workout_id: string;
        };
        Insert: {
          alternative_exercises?: Json | null;
          created_at?: string;
          exercise_id: string;
          id?: string;
          notes?: string | null;
          order: number;
          sets: Json;
          tempo_concentric?: number | null;
          tempo_eccentric?: number | null;
          tempo_iso_bottom?: number | null;
          tempo_iso_top?: number | null;
          updated_at: string;
          workout_id: string;
        };
        Update: {
          alternative_exercises?: Json | null;
          created_at?: string;
          exercise_id?: string;
          id?: string;
          notes?: string | null;
          order?: number;
          sets?: Json;
          tempo_concentric?: number | null;
          tempo_eccentric?: number | null;
          tempo_iso_bottom?: number | null;
          tempo_iso_top?: number | null;
          updated_at?: string;
          workout_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'program_template_exercises_exercise_id_fkey';
            columns: ['exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'program_template_exercises_workout_id_fkey';
            columns: ['workout_id'];
            isOneToOne: false;
            referencedRelation: 'program_template_workouts';
            referencedColumns: ['id'];
          },
        ];
      };
      program_template_weeks: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          program_id: string;
          updated_at: string;
          week_number: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          program_id: string;
          updated_at: string;
          week_number: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          program_id?: string;
          updated_at?: string;
          week_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'program_template_weeks_program_id_fkey';
            columns: ['program_id'];
            isOneToOne: false;
            referencedRelation: 'program_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      program_template_workouts: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          order: number;
          updated_at: string;
          week_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          order: number;
          updated_at: string;
          week_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          order?: number;
          updated_at?: string;
          week_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'program_template_workouts_week_id_fkey';
            columns: ['week_id'];
            isOneToOne: false;
            referencedRelation: 'program_template_weeks';
            referencedColumns: ['id'];
          },
        ];
      };
      program_templates: {
        Row: {
          created_at: string;
          creator_id: string;
          description: string | null;
          difficulty_level: Json | null;
          focus_area: string | null;
          id: string;
          image: string | null;
          minutes_per_workout: number | null;
          name: string;
          original_creator: string | null;
          updated_at: string;
          version: number;
        };
        Insert: {
          created_at?: string;
          creator_id: string;
          description?: string | null;
          difficulty_level?: Json | null;
          focus_area?: string | null;
          id?: string;
          image?: string | null;
          minutes_per_workout?: number | null;
          name: string;
          original_creator?: string | null;
          updated_at: string;
          version: number;
        };
        Update: {
          created_at?: string;
          creator_id?: string;
          description?: string | null;
          difficulty_level?: Json | null;
          focus_area?: string | null;
          id?: string;
          image?: string | null;
          minutes_per_workout?: number | null;
          name?: string;
          original_creator?: string | null;
          updated_at?: string;
          version?: number;
        };
        Relationships: [];
      };
      workout_exercise_trackings: {
        Row: {
          created_at: string;
          exercise_id: string;
          id: string;
          notes: string | null;
          order: number;
          sets: Json;
          updated_at: string;
          workout_id: string;
        };
        Insert: {
          created_at?: string;
          exercise_id: string;
          id?: string;
          notes?: string | null;
          order: number;
          sets: Json;
          updated_at: string;
          workout_id: string;
        };
        Update: {
          created_at?: string;
          exercise_id?: string;
          id?: string;
          notes?: string | null;
          order?: number;
          sets?: Json;
          updated_at?: string;
          workout_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'workout_exercise_trackings_exercise_id_fkey';
            columns: ['exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'workout_exercise_trackings_workout_id_fkey';
            columns: ['workout_id'];
            isOneToOne: false;
            referencedRelation: 'workout_trackings';
            referencedColumns: ['id'];
          },
        ];
      };
      workout_trackings: {
        Row: {
          created_at: string;
          duration: number;
          id: string;
          program_plan_workout_id: string | null;
          start_date: number;
          updated_at: string;
          user_id: string;
          weight_unit: string;
        };
        Insert: {
          created_at?: string;
          duration: number;
          id?: string;
          program_plan_workout_id?: string | null;
          start_date: number;
          updated_at: string;
          user_id: string;
          weight_unit: string;
        };
        Update: {
          created_at?: string;
          duration?: number;
          id?: string;
          program_plan_workout_id?: string | null;
          start_date?: number;
          updated_at?: string;
          user_id?: string;
          weight_unit?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'workout_trackings_program_plan_workout_id_fkey';
            columns: ['program_plan_workout_id'];
            isOneToOne: true;
            referencedRelation: 'program_plan_workouts';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
