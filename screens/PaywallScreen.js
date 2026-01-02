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
import PricingCard from '../components/PricingCard';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

const PaywallScreen = ({ navigation }) => {
  const { selectedPlan, setSelectedPlan, subscribe } = useSubscription();

  const benefits = [
    { icon: '🧘', text: 'Безлимитный доступ ко всем медитациям' },
    { icon: '🤖', text: 'AI-генерация персональных аффирмаций' },
    { icon: '🎵', text: 'Премиальная библиотека звуков' },
    { icon: '📊', text: 'Трекинг прогресса и статистика' },
    { icon: '🌙', text: 'Режим глубокого сна' },
    { icon: '✨', text: 'Новые медитации каждую неделю' },
  ];

  const handleSubscribe = () => {
    subscribe();
    navigation.navigate('Meditations');
  };

  return (
    <LinearGradient
      colors={['#1F1F1F', '#2A1A4A', '#1F1F1F']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899', '#F59E0B']}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.headerIcon}>🧘‍♀️</Text>
            </LinearGradient>
            <Text style={styles.headerTitle}>ZenPulse Premium</Text>
            <Text style={styles.headerSubtitle}>
              Откройте путь к внутренней гармонии
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsContainer}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.pricingTitle}>Выберите ваш план</Text>

            <PricingCard
              title="Годовая подписка"
              price="₽4,990"
              period="год"
              savings="Экономия 60%! Всего ₽416/мес"
              isPopular={true}
              isSelected={selectedPlan === 'yearly'}
              onPress={() => setSelectedPlan('yearly')}
            />

            <PricingCard
              title="Месячная подписка"
              price="₽990"
              period="мес"
              savings={null}
              isPopular={false}
              isSelected={selectedPlan === 'monthly'}
              onPress={() => setSelectedPlan('monthly')}
            />
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleSubscribe}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Попробовать бесплатно 7 дней</Text>
              <Text style={styles.ctaSubtext}>
                Затем {selectedPlan === 'yearly' ? '₽4,990/год' : '₽990/мес'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Отмена в любое время. Никаких обязательств.
          </Text>
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
    paddingHorizontal: isTablet ? 60 : 20,
    paddingBottom: isTablet ? 40 : 20,
  },
  header: {
    alignItems: 'center',
    marginTop: isTablet ? 40 : 20,
    marginBottom: isTablet ? 40 : 30,
  },
  iconGradient: {
    width: isTablet ? 120 : 100,
    height: isTablet ? 120 : 100,
    borderRadius: isTablet ? 60 : 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isTablet ? 24 : 20,
  },
  headerIcon: {
    fontSize: isTablet ? 60 : 50,
  },
  headerTitle: {
    fontSize: isTablet ? 40 : 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: isTablet ? 16 : 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: isTablet ? 20 : 18,
    color: '#D1D5DB',
    textAlign: 'center',
    paddingHorizontal: isTablet ? 60 : 20,
  },
  benefitsContainer: {
    marginBottom: isTablet ? 40 : 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isTablet ? 20 : 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: isTablet ? 20 : 16,
    borderRadius: isTablet ? 16 : 12,
  },
  benefitIcon: {
    fontSize: isTablet ? 28 : 24,
    marginRight: isTablet ? 16 : 12,
  },
  benefitText: {
    fontSize: isTablet ? 18 : 16,
    color: '#FFFFFF',
    flex: 1,
  },
  pricingContainer: {
    marginBottom: isTablet ? 32 : 24,
  },
  pricingTitle: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: isTablet ? 28 : 24,
  },
  ctaButton: {
    marginBottom: isTablet ? 24 : 16,
    borderRadius: isTablet ? 20 : 16,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  ctaGradient: {
    paddingVertical: isTablet ? 24 : 20,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: isTablet ? 8 : 4,
  },
  ctaSubtext: {
    fontSize: isTablet ? 16 : 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  footer: {
    fontSize: isTablet ? 16 : 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: isTablet ? 20 : 10,
  },
});

export default PaywallScreen;
