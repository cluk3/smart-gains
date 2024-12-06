export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          category: string
          created_at: string
          equipment: Database["public"]["Enums"]["equipment"][] | null
          id: string
          image: string | null
          instructions: string[] | null
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles: Database["public"]["Enums"]["muscle"][] | null
          updated_at: string
          user_id: string | null
          video: string | null
        }
        Insert: {
          category: string
          created_at?: string
          equipment?: Database["public"]["Enums"]["equipment"][] | null
          id?: string
          image?: string | null
          instructions?: string[] | null
          name: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          updated_at?: string
          user_id?: string | null
          video?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          equipment?: Database["public"]["Enums"]["equipment"][] | null
          id?: string
          image?: string | null
          instructions?: string[] | null
          name?: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          updated_at?: string
          user_id?: string | null
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          deleted: boolean | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          weight_unit: Database["public"]["Enums"]["weight_unit"] | null
        }
        Insert: {
          avatar_url?: string | null
          deleted?: boolean | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          weight_unit?: Database["public"]["Enums"]["weight_unit"] | null
        }
        Update: {
          avatar_url?: string | null
          deleted?: boolean | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          weight_unit?: Database["public"]["Enums"]["weight_unit"] | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          routine_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          routine_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          routine_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: true
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_exercises: {
        Row: {
          alternative_exercises: Json | null
          created_at: string
          deleted: boolean | null
          exercise_id: string
          id: string
          notes: string | null
          order: number
          sets: Json
          tempo_concentric: number | null
          tempo_eccentric: number | null
          tempo_iso_bottom: number | null
          tempo_iso_top: number | null
          updated_at: string
          workout_id: string
        }
        Insert: {
          alternative_exercises?: Json | null
          created_at?: string
          deleted?: boolean | null
          exercise_id: string
          id?: string
          notes?: string | null
          order: number
          sets: Json
          tempo_concentric?: number | null
          tempo_eccentric?: number | null
          tempo_iso_bottom?: number | null
          tempo_iso_top?: number | null
          updated_at?: string
          workout_id: string
        }
        Update: {
          alternative_exercises?: Json | null
          created_at?: string
          deleted?: boolean | null
          exercise_id?: string
          id?: string
          notes?: string | null
          order?: number
          sets?: Json
          tempo_concentric?: number | null
          tempo_eccentric?: number | null
          tempo_iso_bottom?: number | null
          tempo_iso_top?: number | null
          updated_at?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "routine_workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_weeks: {
        Row: {
          created_at: string
          deleted: boolean | null
          description: string | null
          id: string
          name: string
          program_id: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          id?: string
          name: string
          program_id: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          id?: string
          name?: string
          program_id?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "routine_weeks_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_workouts: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          name: string
          order: number
          updated_at: string
          week_id: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          name: string
          order: number
          updated_at?: string
          week_id: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          name?: string
          order?: number
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_workouts_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "routine_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      routines: {
        Row: {
          created_at: string
          deleted: boolean | null
          description: string | null
          difficulty_level:
            | Database["public"]["Enums"]["difficulty_level"][]
            | null
          focus_area: string | null
          id: string
          image: string | null
          minutes_per_workout: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"][]
            | null
          focus_area?: string | null
          id?: string
          image?: string | null
          minutes_per_workout?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          description?: string | null
          difficulty_level?:
            | Database["public"]["Enums"]["difficulty_level"][]
            | null
          focus_area?: string | null
          id?: string
          image?: string | null
          minutes_per_workout?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      workout_exercise_trackings: {
        Row: {
          created_at: string
          deleted: boolean | null
          exercise_id: string
          id: string
          notes: string | null
          order: number
          sets: Json
          updated_at: string
          weight_unit: Database["public"]["Enums"]["weight_unit"]
          workout_id: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          exercise_id: string
          id?: string
          notes?: string | null
          order: number
          sets: Json
          updated_at?: string
          weight_unit: Database["public"]["Enums"]["weight_unit"]
          workout_id: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          exercise_id?: string
          id?: string
          notes?: string | null
          order?: number
          sets?: Json
          updated_at?: string
          weight_unit?: Database["public"]["Enums"]["weight_unit"]
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_trackings_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_trackings_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workout_trackings"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_trackings: {
        Row: {
          created_at: string
          deleted: boolean | null
          duration: number
          id: string
          routine_workout_id: string | null
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          duration: number
          id?: string
          routine_workout_id?: string | null
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          duration?: number
          id?: string
          routine_workout_id?: string | null
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_trackings_routine_workout_id_fkey"
            columns: ["routine_workout_id"]
            isOneToOne: true
            referencedRelation: "routine_workouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_trackings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_times_trigger: {
        Args: {
          table_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      difficulty_level: "beginner" | "novice" | "intermediate" | "advanced"
      equipment:
        | "none"
        | "ez curl bar"
        | "barbell"
        | "dumbbell"
        | "gym mat"
        | "exercise ball"
        | "medicine ball"
        | "pull-up bar"
        | "bench"
        | "incline bench"
        | "kettlebell"
        | "machine"
        | "cable"
        | "bands"
        | "foam roll"
        | "other"
      muscle:
        | "neck"
        | "traps"
        | "shoulders"
        | "chest"
        | "biceps"
        | "triceps"
        | "forearms"
        | "lats"
        | "middle back"
        | "lower back"
        | "abs"
        | "obliques"
        | "glutes"
        | "adductors"
        | "quads"
        | "hamstrings"
        | "calves"
      weight_unit: "kg" | "lb"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
