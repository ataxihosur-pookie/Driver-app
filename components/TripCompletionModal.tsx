import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { CircleCheck as CheckCircle, MapPin, Clock, DollarSign, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface TripCompletionModalProps {
  visible: boolean;
  tripData: {
    distance: number;
    duration: number;
    fareBreakdown: {
      booking_type: string;
      vehicle_type: string;
      base_fare: number;
      distance_fare: number;
      time_fare: number;
      surge_charges: number;
      deadhead_charges: number;
      platform_fee: number;
     gst_on_charges: number;
     gst_on_platform_fee: number;
      extra_km_charges: number;
      driver_allowance: number;
      total_fare: number;
      details: {
        actual_distance_km: number;
        actual_duration_minutes: number;
        base_km_included?: number;
        extra_km?: number;
        per_km_rate: number;
        per_minute_rate?: number;
        surge_multiplier?: number;
        platform_fee_percent?: number;
        days_calculated?: number;
        daily_km_limit?: number;
        within_allowance?: boolean;
        package_name?: string;
      };
    };
    pickup_address: string;
    destination_address: string;
    booking_type: string;
    rental_hours?: number;
  };
  onClose: () => void;
}

export default function TripCompletionModal({
  visible,
  tripData,
  onClose,
}: TripCompletionModalProps) {
  const formatCurrency = (amount: number | undefined | null) => {
    // Handle all edge cases properly
    if (amount == null || amount === undefined) {
      return `₹0.00`;
    }
    
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return `₹0.00`;
    }
    
    return `₹${numericAmount.toFixed(2)}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <CheckCircle size={32} color="#10B981" />
              <Text style={styles.title}>Trip Completed!</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Trip Summary */}
          <View style={styles.tripSummary}>
            <View style={styles.summaryRow}>
              <MapPin size={20} color="#64748B" />
              <Text style={styles.summaryLabel}>Distance:</Text>
              <Text style={styles.summaryValue}>{tripData.distance.toFixed(2)} km (Actual)</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Clock size={20} color="#64748B" />
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>{tripData.duration} minutes (Actual)</Text>
            </View>
          </View>

          {/* Route Details */}
          <View style={styles.routeSection}>
            <Text style={styles.sectionTitle}>Route Details</Text>
            <View style={styles.addressContainer}>
              <View style={styles.addressItem}>
                <View style={[styles.addressDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.addressText}>{tripData.pickup_address}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.addressItem}>
                <View style={[styles.addressDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.addressText}>{tripData.destination_address}</Text>
              </View>
            </View>
          </View>

          {/* Fare Breakdown */}
          <View style={styles.fareSection}>
            <Text style={styles.sectionTitle}>Fare Breakdown</Text>
            
            {/* Base Fare - Always show */}
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>
                {tripData.fareBreakdown.details?.package_name || 
                 `${((tripData.fareBreakdown.booking_type || 'regular') + '').charAt(0).toUpperCase() + ((tripData.fareBreakdown.booking_type || 'regular') + '').slice(1)} Base Fare`}
                {tripData.fareBreakdown.details?.base_km_included && 
                 ` (${tripData.fareBreakdown.details?.base_km_included}km included)`}
              </Text>
              <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.base_fare)}</Text>
            </View>

            {/* Distance Charges - Only show if > 0 */}
            {tripData.fareBreakdown.distance_fare > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>
                  Distance Charges
                  {tripData.fareBreakdown.details?.extra_km && 
                   ` (${tripData.fareBreakdown.details?.extra_km.toFixed(1)}km × ₹${tripData.fareBreakdown.details?.per_km_rate}/km)`}
                </Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.distance_fare)}</Text>
              </View>
            )}

            {/* Time Charges - Only show if > 0 */}
            {tripData.fareBreakdown.time_fare > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>
                  Time Charges ({tripData.duration} min × ₹{tripData.fareBreakdown.details?.per_minute_rate || 0}/min)
                </Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.time_fare)}</Text>
              </View>
            )}

            {/* Deadhead Charges - Only show if > 0 */}
            {tripData.fareBreakdown.deadhead_charges > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>Deadhead Charges</Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.deadhead_charges)}</Text>
              </View>
            )}

            {/* Surge Charges - Only show if > 0 */}
            {tripData.fareBreakdown.surge_charges > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>
                  Surge Charges ({tripData.fareBreakdown.details?.surge_multiplier || 1}x)
                </Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.surge_charges)}</Text>
              </View>
            )}

            {/* Platform Fee - Only show if > 0 */}
            {tripData.fareBreakdown.platform_fee > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>Platform Fee</Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.platform_fee)}</Text>
              </View>
            )}

            {/* GST on Charges - Only show if > 0 */}
            {tripData.fareBreakdown.gst_on_charges > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>GST on Charges (5%)</Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.gst_on_charges)}</Text>
              </View>
            )}

            {/* GST on Platform Fee - Only show if > 0 */}
            {tripData.fareBreakdown.gst_on_platform_fee > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>GST on Platform Fee (18%)</Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.gst_on_platform_fee)}</Text>
              </View>
            )}

            {/* Extra KM Charges (Rental/Outstation) - Only show if > 0 */}
            {tripData.fareBreakdown.extra_km_charges > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>
                  Extra KM Charges ({tripData.fareBreakdown.details?.extra_km?.toFixed(1)}km × ₹{tripData.fareBreakdown.details?.per_km_rate}/km)
                </Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.extra_km_charges)}</Text>
              </View>
            )}

            {/* Driver Allowance (Outstation) - Only show if > 0 */}
            {tripData.fareBreakdown.driver_allowance > 0 && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>
                  Driver Allowance ({tripData.fareBreakdown.details?.days_calculated} days)
                </Text>
                <Text style={styles.fareValue}>{formatCurrency(tripData.fareBreakdown.driver_allowance)}</Text>
              </View>
            )}

            {/* Zone Information */}
            {tripData.fareBreakdown.details?.zone_detected && !tripData.fareBreakdown.details?.is_inner_zone && (
              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>Zone: {tripData.fareBreakdown.details?.zone_detected}</Text>
                <Text style={styles.fareValue}>
                  Outer Zone
                </Text>
              </View>
            )}

            {/* Trip Summary */}
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>
                Trip Summary: {tripData.distance.toFixed(1)}km in {tripData.duration}min
              </Text>
              <Text style={styles.fareValue}>
                {tripData.fareBreakdown.details?.within_allowance !== undefined 
                  ? (tripData.fareBreakdown.details?.within_allowance ? 'Within Package' : 'Extra Charges Applied')
                  : 'Regular Trip'
                }
              </Text>
            </View>

            <View style={styles.separator} />
            
            {/* Total Fare */}
            <View style={styles.totalFareItem}>
              <Text style={styles.totalFareLabel}>Total Fare</Text>
              <Text style={styles.totalFareValue}>
                {formatCurrency(tripData.fareBreakdown.total_fare)}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  closeButton: {
    padding: 8,
  },
  tripSummary: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 12,
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  routeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  addressContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    lineHeight: 20,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 5,
    marginVertical: 8,
  },
  fareSection: {
    marginBottom: 20,
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  fareLabel: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalFareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  totalFareLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalFareValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  doneButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});