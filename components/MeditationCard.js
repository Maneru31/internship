import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isTablet = width > 768;
// Для планшетов: 2 колонки с учетом padding (40*2=80) и gap (16)
// Для телефонов: 1 колонка с учетом padding (20*2=40)
const CARD_WIDTH = isTablet ? (width - 80 - 16) / 2 : width - 40;

const MeditationCard = ({ title, duration, image, isLocked, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {isLocked && (
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={styles.lockOverlay}
          >
            <Text style={styles.lockIcon}>🔒</Text>
          </LinearGradient>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.duration}>{duration} min</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: width > 768 ? 200 : 160,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: width > 768 ? 48 : 36,
  },
  cardContent: {
    padding: width > 768 ? 20 : 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: width > 768 ? 20 : 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  duration: {
    color: '#9CA3AF',
    fontSize: width > 768 ? 16 : 14,
  },
});

export default MeditationCard;
