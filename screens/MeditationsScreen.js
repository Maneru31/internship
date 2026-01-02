import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscription } from '../context/SubscriptionContext';
import MeditationCard from '../components/MeditationCard';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const MeditationsScreen = ({ navigation }) => {
  const { isSubscribed, unsubscribe } = useSubscription();

  const meditations = [
    {
      id: 1,
      title: 'Утренняя энергия',
      duration: 10,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      isPremium: false,
    },
    {
      id: 2,
      title: 'Глубокое расслабление',
      duration: 15,
      image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800',
      isPremium: false,
    },
    {
      id: 3,
      title: 'Снятие стресса',
      duration: 12,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      isPremium: true,
    },
    {
      id: 4,
      title: 'Концентрация и фокус',
      duration: 20,
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800',
      isPremium: true,
    },
    {
      id: 5,
      title: 'Медитация перед сном',
      duration: 25,
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      isPremium: true,
    },
    {
      id: 6,
      title: 'Внутренний покой',
      duration: 18,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      isPremium: true,
    },
  ];

  const handleCardPress = (meditation) => {
    if (meditation.isPremium && !isSubscribed) {
      navigation.navigate('Paywall');
    } else {
      // Здесь можно добавить навигацию к плееру медитации
      console.log('Playing meditation:', meditation.title);
    }
  };

  const handleMoodPress = () => {
    navigation.navigate('AIMood');
  };

  return (
    <LinearGradient
      colors={['#1F1F1F', '#2A1A4A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Добро пожаловать</Text>
              <Text style={styles.title}>ZenPulse</Text>
            </View>
            {!isSubscribed ? (
              <TouchableOpacity
                style={styles.premiumBadge}
                onPress={() => navigation.navigate('Paywall')}
              >
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  style={styles.premiumGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.premiumText}>Премиум</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.demoBadge}
                onPress={unsubscribe}
              >
                <Text style={styles.demoText}>Демо: Сбросить</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* AI Mood Feature */}
          <TouchableOpacity
            style={styles.aiMoodCard}
            onPress={handleMoodPress}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6', '#EC4899']}
              style={styles.aiMoodGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.aiMoodContent}>
                <View>
                  <Text style={styles.aiMoodTitle}>🤖 AI Настрой дня</Text>
                  <Text style={styles.aiMoodSubtitle}>
                    Получите персональную аффирмацию
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Meditations Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Медитации</Text>
            {!isSubscribed && (
              <Text style={styles.sectionSubtitle}>
                2 бесплатные • {meditations.filter(m => m.isPremium).length}{' '}
                премиум
              </Text>
            )}
          </View>

          {/* Meditations Grid */}
          <View style={styles.grid}>
            {meditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                title={meditation.title}
                duration={meditation.duration}
                image={meditation.image}
                isLocked={meditation.isPremium && !isSubscribed}
                onPress={() => handleCardPress(meditation)}
              />
            ))}
          </View>

          {/* Upgrade Banner if not subscribed */}
          {!isSubscribed && (
            <TouchableOpacity
              style={styles.upgradeBanner}
              onPress={() => navigation.navigate('Paywall')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#F59E0B', '#EF4444']}
                style={styles.upgradeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.upgradeBannerTitle}>
                  Разблокируйте все медитации 🔓
                </Text>
                <Text style={styles.upgradeBannerSubtitle}>
                  Доступ к {meditations.filter(m => m.isPremium).length}+ премиум
                  медитациям
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: isTablet ? 40 : 20,
    paddingBottom: isTablet ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isTablet ? 24 : 16,
    marginBottom: isTablet ? 32 : 24,
  },
  greeting: {
    fontSize: isTablet ? 18 : 16,
    color: '#9CA3AF',
    marginBottom: isTablet ? 8 : 4,
  },
  title: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  premiumBadge: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  premiumGradient: {
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 10,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '700',
  },
  demoBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: isTablet ? 16 : 12,
    paddingVertical: isTablet ? 10 : 8,
  },
  demoText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 14 : 12,
    fontWeight: '700',
  },
  aiMoodCard: {
    borderRadius: isTablet ? 20 : 16,
    overflow: 'hidden',
    marginBottom: isTablet ? 32 : 24,
    elevation: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  aiMoodGradient: {
    padding: isTablet ? 28 : 24,
  },
  aiMoodContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiMoodTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: isTablet ? 8 : 4,
  },
  aiMoodSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  arrowContainer: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 40 : 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: isTablet ? 20 : 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: isTablet ? 24 : 20,
    color: '#FFFFFF',
  },
  sectionHeader: {
    marginBottom: isTablet ? 24 : 20,
  },
  sectionTitle: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: isTablet ? 8 : 4,
  },
  sectionSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: '#9CA3AF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: isTablet ? 'space-between' : 'center',
    gap: isTablet ? 16 : 0,
  },
  upgradeBanner: {
    borderRadius: isTablet ? 20 : 16,
    overflow: 'hidden',
    marginTop: isTablet ? 24 : 20,
  },
  upgradeGradient: {
    padding: isTablet ? 28 : 24,
    alignItems: 'center',
  },
  upgradeBannerTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: isTablet ? 8 : 4,
    textAlign: 'center',
  },
  upgradeBannerSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
});

export default MeditationsScreen;
