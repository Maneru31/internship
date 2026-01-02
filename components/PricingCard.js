import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const PricingCard = ({
  title,
  price,
  period,
  savings,
  isPopular,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        isPopular && styles.popularCard,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isPopular && (
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.popularBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.popularText}>САМОЕ ВЫГОДНОЕ ✨</Text>
        </LinearGradient>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>
        {savings && <Text style={styles.savings}>{savings}</Text>}
      </View>
      <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: isTablet ? 18 : 14,
    padding: isTablet ? 20 : 16,
    marginBottom: isTablet ? 16 : 12,
    borderWidth: 2,
    borderColor: '#3A3A3A',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#8B5CF6',
    backgroundColor: '#3A2A5A',
  },
  popularCard: {
    borderColor: '#FFD700',
    marginTop: 20,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: isTablet ? -85 : -70 }],
    paddingHorizontal: isTablet ? 18 : 14,
    paddingVertical: isTablet ? 6 : 5,
    borderRadius: 16,
  },
  popularText: {
    color: '#1F1F1F',
    fontSize: isTablet ? 13 : 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '700',
    marginBottom: isTablet ? 8 : 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: isTablet ? 6 : 4,
  },
  price: {
    color: '#FFFFFF',
    fontSize: isTablet ? 32 : 28,
    fontWeight: '800',
  },
  period: {
    color: '#9CA3AF',
    fontSize: isTablet ? 16 : 14,
    marginLeft: 4,
  },
  savings: {
    color: '#10B981',
    fontSize: isTablet ? 14 : 13,
    fontWeight: '600',
  },
  radioButton: {
    width: isTablet ? 28 : 24,
    height: isTablet ? 28 : 24,
    borderRadius: isTablet ? 14 : 12,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#8B5CF6',
  },
  radioButtonInner: {
    width: isTablet ? 16 : 14,
    height: isTablet ? 16 : 14,
    borderRadius: isTablet ? 8 : 7,
    backgroundColor: '#8B5CF6',
  },
});

export default PricingCard;
