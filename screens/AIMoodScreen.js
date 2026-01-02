import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const AIMoodScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [affirmation, setAffirmation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    {
      id: 'happy',
      emoji: '😊',
      label: 'Радостный',
      color: ['#F59E0B', '#FBBF24'],
    },
    {
      id: 'calm',
      emoji: '😌',
      label: 'Спокойный',
      color: ['#3B82F6', '#60A5FA'],
    },
    {
      id: 'stressed',
      emoji: '😰',
      label: 'В стрессе',
      color: ['#EF4444', '#F87171'],
    },
  ];

  // Функция для генерации аффирмации (мок с имитацией API вызова)
  const generateAffirmation = async (mood) => {
    setIsGenerating(true);
    setSelectedMood(mood);
    setAffirmation('');

    // Имитация API запроса к LLM
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Мок-ответы для разных настроений (в реальном приложении здесь будет вызов LLM API)
    const affirmations = {
      happy: `✨ Ваша радость — это маяк света в этом мире.\n\nСегодня вы излучаете позитивную энергию, которая вдохновляет окружающих. Ваша улыбка имеет силу изменить чей-то день к лучшему.\n\nПозвольте этому чувству наполнить каждую клеточку вашего тела. Вы заслуживаете всей радости, которую испытываете, и даже больше.\n\nДышите глубоко, улыбайтесь широко, и пусть этот день принесёт вам ещё больше поводов для счастья.`,

      calm: `🌊 В тишине вашего разума рождается истинная мудрость.\n\nВаше спокойствие — это не слабость, а великая сила. В моменты покоя вы находите ясность и понимание.\n\nПозвольте этому чувству умиротворения распространиться по всему телу. Вы — остров спокойствия в океане жизни.\n\nДышите медленно и глубоко. С каждым вдохом вы обретаете больше покоя, с каждым выдохом отпускаете напряжение.`,

      stressed: `💪 Вы сильнее, чем думаете, и способны преодолеть любые трудности.\n\nСтресс — это временное состояние, не ваша сущность. Вы уже прошли через многое и вышли победителем.\n\nСейчас самое время сделать паузу. Позвольте себе отдохнуть. Не всё нужно решать прямо сейчас.\n\nДышите. Один шаг за раз. Вы справитесь. Вы всегда справляетесь. И эта ситуация не исключение.`,
    };

    setAffirmation(affirmations[mood.id]);
    setIsGenerating(false);
  };

  const handleMoodSelect = (mood) => {
    generateAffirmation(mood);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setAffirmation('');
  };

  return (
    <LinearGradient
      colors={['#1F1F1F', '#2A1A4A', '#1F1F1F']}
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Назад</Text>
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.iconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.titleIcon}>🤖</Text>
            </LinearGradient>
            <Text style={styles.title}>AI Настрой дня</Text>
            <Text style={styles.subtitle}>
              Выберите своё настроение, и AI создаст персональную аффирмацию
            </Text>
          </View>

          {/* Mood Selection */}
          {!affirmation && !isGenerating && (
            <View style={styles.moodContainer}>
              <Text style={styles.moodQuestion}>Как вы себя чувствуете?</Text>
              <View style={styles.moodGrid}>
                {moods.map((mood) => (
                  <TouchableOpacity
                    key={mood.id}
                    style={styles.moodCard}
                    onPress={() => handleMoodSelect(mood)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={mood.color}
                      style={styles.moodGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                      <Text style={styles.moodLabel}>{mood.label}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Generating State */}
          {isGenerating && (
            <View style={styles.generatingContainer}>
              <ActivityIndicator size="large" color="#8B5CF6" />
              <Text style={styles.generatingText}>
                AI создаёт вашу аффирмацию...
              </Text>
              <Text style={styles.generatingSubtext}>
                Анализируем ваше настроение
              </Text>
            </View>
          )}

          {/* Affirmation Display */}
          {affirmation && !isGenerating && (
            <View style={styles.affirmationContainer}>
              <View style={styles.affirmationCard}>
                <LinearGradient
                  colors={
                    selectedMood
                      ? selectedMood.color
                      : ['#8B5CF6', '#EC4899']
                  }
                  style={styles.affirmationHeader}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.affirmationMoodEmoji}>
                    {selectedMood?.emoji}
                  </Text>
                  <Text style={styles.affirmationMoodLabel}>
                    {selectedMood?.label}
                  </Text>
                </LinearGradient>

                <View style={styles.affirmationContent}>
                  <Text style={styles.affirmationText}>{affirmation}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetButtonText}>
                    Попробовать снова
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#8B5CF6', '#EC4899']}
                    style={styles.homeButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.homeButtonText}>
                      Вернуться к медитациям
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingHorizontal: isTablet ? 60 : 20,
    paddingBottom: isTablet ? 40 : 20,
  },
  header: {
    marginTop: isTablet ? 20 : 16,
    marginBottom: isTablet ? 24 : 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#8B5CF6',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: isTablet ? 48 : 40,
  },
  iconContainer: {
    width: isTablet ? 100 : 80,
    height: isTablet ? 100 : 80,
    borderRadius: isTablet ? 50 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isTablet ? 24 : 20,
  },
  titleIcon: {
    fontSize: isTablet ? 50 : 40,
  },
  title: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: isTablet ? 16 : 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isTablet ? 18 : 16,
    color: '#D1D5DB',
    textAlign: 'center',
    paddingHorizontal: isTablet ? 60 : 20,
    lineHeight: isTablet ? 28 : 24,
  },
  moodContainer: {
    marginBottom: isTablet ? 32 : 24,
  },
  moodQuestion: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: isTablet ? 32 : 24,
  },
  moodGrid: {
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: isTablet ? 'space-around' : 'center',
    gap: isTablet ? 20 : 16,
  },
  moodCard: {
    flex: isTablet ? 1 : undefined,
    borderRadius: isTablet ? 24 : 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    maxWidth: isTablet ? undefined : '100%',
  },
  moodGradient: {
    padding: isTablet ? 40 : 32,
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: isTablet ? 64 : 48,
    marginBottom: isTablet ? 16 : 12,
  },
  moodLabel: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  generatingContainer: {
    alignItems: 'center',
    paddingVertical: isTablet ? 80 : 60,
  },
  generatingText: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: isTablet ? 24 : 20,
  },
  generatingSubtext: {
    fontSize: isTablet ? 16 : 14,
    color: '#9CA3AF',
    marginTop: isTablet ? 12 : 8,
  },
  affirmationContainer: {
    marginTop: isTablet ? 24 : 20,
  },
  affirmationCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: isTablet ? 24 : 20,
    overflow: 'hidden',
    marginBottom: isTablet ? 32 : 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  affirmationHeader: {
    padding: isTablet ? 28 : 24,
    alignItems: 'center',
  },
  affirmationMoodEmoji: {
    fontSize: isTablet ? 56 : 48,
    marginBottom: isTablet ? 12 : 8,
  },
  affirmationMoodLabel: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  affirmationContent: {
    padding: isTablet ? 32 : 28,
  },
  affirmationText: {
    fontSize: isTablet ? 20 : 18,
    lineHeight: isTablet ? 36 : 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  actionButtons: {
    gap: isTablet ? 16 : 12,
  },
  resetButton: {
    backgroundColor: '#3A3A3A',
    paddingVertical: isTablet ? 18 : 16,
    borderRadius: isTablet ? 16 : 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
  },
  homeButton: {
    borderRadius: isTablet ? 16 : 12,
    overflow: 'hidden',
  },
  homeButtonGradient: {
    paddingVertical: isTablet ? 18 : 16,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 18 : 16,
    fontWeight: '700',
  },
});

export default AIMoodScreen;
