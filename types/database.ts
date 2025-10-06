export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'admin' | 'customer' | 'driver' | 'vendor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'admin' | 'customer' | 'driver' | 'vendor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'admin' | 'customer' | 'driver' | 'vendor'
          created_at?: string
          updated_at?: string
        }
      }
      drivers: {
        Row: {
          id: string
          user_id: string
          license_number: string
          license_expiry: string | null
          status: 'offline' | 'online' | 'busy' | 'suspended'
          rating: number | null
          total_rides: number
          current_location_lat: number | null
          current_location_lng: number | null
          vehicle_id: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          license_expiry?: string | null
          status?: 'offline' | 'online' | 'busy' | 'suspended'
          rating?: number | null
          total_rides?: number
          current_location_lat?: number | null
          current_location_lng?: number | null
          vehicle_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          license_expiry?: string | null
          status?: 'offline' | 'online' | 'busy' | 'suspended'
          rating?: number | null
          total_rides?: number
          current_location_lat?: number | null
          current_location_lng?: number | null
          vehicle_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          driver_id: string
          make: string
          model: string
          year: number
          license_plate: string
          color: string
          vehicle_type: 'sedan' | 'suv' | 'hatchback' | 'luxury'
          created_at: string
          updated_at: string
        }
      }
      rides: {
        Row: {
          id: string
          ride_code: string
          customer_id: string
          driver_id: string | null
          pickup_latitude: number
          pickup_longitude: number
          pickup_address: string
          pickup_landmark: string | null
          destination_latitude: number
          destination_longitude: number
          destination_address: string
          destination_landmark: string | null
          status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          fare_amount: number | null
          distance_km: number | null
          duration_minutes: number | null
          payment_status: 'pending' | 'completed' | 'failed'
          payment_method: 'cash' | 'card' | 'wallet'
          rating: number | null
          feedback: string | null
          cancelled_by: string | null
          cancellation_reason: string | null
          booking_type: 'regular' | 'rental' | 'outstation' | 'airport'
          vehicle_type: string
          rental_hours: number | null
          pickup_otp: string | null
          drop_otp: string | null
          special_instructions: string | null
          created_at: string
          updated_at: string
          scheduled_time: string | null
        }
        Insert: {
          id?: string
          ride_code: string
          customer_id: string
          driver_id?: string | null
          pickup_latitude: number
          pickup_longitude: number
          pickup_address: string
          pickup_landmark?: string | null
          destination_latitude: number
          destination_longitude: number
          destination_address: string
          destination_landmark?: string | null
          status?: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          fare_amount?: number | null
          distance_km?: number | null
          duration_minutes?: number | null
          payment_status?: 'pending' | 'completed' | 'failed'
          payment_method?: 'cash' | 'card' | 'wallet'
          rating?: number | null
          feedback?: string | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
          booking_type?: 'regular' | 'rental' | 'outstation' | 'airport'
          vehicle_type?: string
          rental_hours?: number | null
          pickup_otp?: string | null
          drop_otp?: string | null
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
          scheduled_time?: string | null
        }
        Update: {
          id?: string
          ride_code?: string
          customer_id?: string
          driver_id?: string | null
          pickup_latitude?: number
          pickup_longitude?: number
          pickup_address?: string
          pickup_landmark?: string | null
          destination_latitude?: number
          destination_longitude?: number
          destination_address?: string
          destination_landmark?: string | null
          status?: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          fare_amount?: number | null
          distance_km?: number | null
          duration_minutes?: number | null
          payment_status?: 'pending' | 'completed' | 'failed'
          payment_method?: 'cash' | 'card' | 'wallet'
          rating?: number | null
          feedback?: string | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
          booking_type?: 'regular' | 'rental' | 'outstation' | 'airport'
          vehicle_type?: string
          rental_hours?: number | null
          pickup_otp?: string | null
          drop_otp?: string | null
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
          scheduled_time?: string | null
        }
      }
      scheduled_bookings: {
        Row: {
          id: string
          customer_id: string
          booking_type: 'outstation' | 'rental' | 'airport'
          vehicle_type: string
          pickup_address: string
          destination_address: string
          pickup_landmark: string | null
          destination_landmark: string | null
          pickup_latitude: number
          pickup_longitude: number
          destination_latitude: number
          destination_longitude: number
          scheduled_time: string | null
          rental_hours: number | null
          special_instructions: string | null
          estimated_fare: number | null
          status: 'pending' | 'assigned' | 'confirmed' | 'cancelled' | 'completed'
          assigned_driver_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          booking_type: 'outstation' | 'rental' | 'airport'
          vehicle_type: string
          pickup_address: string
          destination_address: string
          pickup_landmark?: string | null
          destination_landmark?: string | null
          pickup_latitude: number
          pickup_longitude: number
          destination_latitude: number
          destination_longitude: number
          scheduled_time?: string | null
          rental_hours?: number | null
          special_instructions?: string | null
          estimated_fare?: number | null
          status?: 'pending' | 'assigned' | 'confirmed' | 'cancelled' | 'completed'
          assigned_driver_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          booking_type?: 'outstation' | 'rental' | 'airport'
          vehicle_type?: string
          pickup_address?: string
          destination_address?: string
          pickup_landmark?: string | null
          destination_landmark?: string | null
          pickup_latitude?: number
          pickup_longitude?: number
          destination_latitude?: number
          destination_longitude?: number
          scheduled_time?: string | null
          rental_hours?: number | null
          special_instructions?: string | null
          estimated_fare?: number | null
          status?: 'pending' | 'assigned' | 'confirmed' | 'cancelled' | 'completed'
          assigned_driver_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      rental_fares: {
        Row: {
          id: string
          vehicle_type: string
          package_name: string
          duration_hours: number
          km_included: number
          base_fare: number
          extra_km_rate: number
          extra_minute_rate: number
          is_popular: boolean
          discount_percent: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      fare_matrix: {
        Row: {
          id: string
          booking_type: string
          vehicle_type: string
          base_fare: number
          per_km_rate: number
          minimum_fare: number
          surge_multiplier: number
          cancellation_fee: number
          platform_fee: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      zones: {
        Row: {
          id: string
          name: string
          city: string
          state: string
          coordinates: any
          center_latitude: number
          center_longitude: number
          radius_km: number
          base_fare: number
          per_km_rate: number
          surge_multiplier: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      outstation_fares: {
        Row: {
          id: string
          vehicle_type: string
          base_fare: number
          per_km_rate: number
          toll_charges_included: boolean
          minimum_distance_km: number
          cancellation_fee: number
          driver_allowance_per_day: number
          daily_km_limit: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      airport_fares: {
        Row: {
          id: string
          vehicle_type: string
          hosur_to_airport_fare: number
          airport_to_hosur_fare: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      trip_completions: {
        Row: {
          id: string
          ride_id: string
          booking_type: string
          vehicle_type: string
          actual_distance_km: number
          actual_duration_minutes: number
          base_fare: number
          distance_fare: number
          time_fare: number
          surge_charges: number
          deadhead_charges: number
          platform_fee: number
          extra_km_charges: number
          driver_allowance: number
          total_fare: number
          fare_breakdown: any
          created_at: string
          updated_at: string
        }
      }
      live_locations: {
        Row: {
          id: string
          user_id: string
          latitude: number
          longitude: number
          heading: number | null
          speed: number | null
          accuracy: number | null
          updated_at: string
        }
      }
      payments: {
        Row: {
          id: string
          ride_id: string
          driver_id: string
          amount: number
          payment_type: 'cash' | 'digital'
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
      }
    }
  }
}