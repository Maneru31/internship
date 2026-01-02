# 🤖 Интеграция с LLM - Руководство

## Текущее состояние

**Версия:** MVP с моками
**Статус:** ✅ Полностью функциональна для демонстрации

Приложение использует **мок-ответы** для генерации аффирмаций. Это позволяет:
- Демонстрировать функционал без API ключей
- Работать оффлайн
- Мгновенные ответы без лимитов
- Контроль качества контента

## Архитектура для LLM

```
User → AIMoodScreen → aiService.js → [MOCK / LLM API] → Response
                          ↓
                   aiAffirmations.js (моки)
```

### Файловая структура:

```
internship/
├── mocks/
│   └── aiAffirmations.js      # Мок-данные (18+ вариантов)
├── services/
│   └── aiService.js            # Сервис с логикой (готов к LLM)
└── screens/
    └── AIMoodScreen.js         # UI (не зависит от реализации)
```

## План миграции на реальный LLM

### Фаза 1: Подготовка (Готово ✅)

- [x] Создана архитектура с разделением
- [x] Мок-данные вынесены в отдельный файл
- [x] Сервис aiService.js готов к расширению
- [x] UI не зависит от источника данных

### Фаза 2: Выбор провайдера LLM

#### Вариант A: OpenAI GPT-4 (Рекомендуется)

**Плюсы:**
- Высокое качество генерации на русском
- Стабильное API
- Хорошая документация

**Минусы:**
- Платно ($0.03/1K tokens)
- Требует интернет

**Код для интеграции:**

```javascript
// services/aiService.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callOpenAI(mood, options) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Вы - опытный медитационный гид.
        Создавайте короткие (3-4 абзаца), вдохновляющие аффирмации
        на русском языке с эмодзи в начале.`
      },
      {
        role: 'user',
        content: `Создайте аффирмацию для человека в настроении: ${mood.label}`
      }
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
```

#### Вариант B: Claude (Anthropic)

**Плюсы:**
- Отличное качество на русском
- Хороший контекст (200K tokens)
- Безопасность

**Минусы:**
- Дороже чем GPT-4
- Меньше примеров

**Код для интеграции:**

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function callClaude(mood, options) {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Создайте медитационную аффирмацию для человека,
      который чувствует себя ${mood.label.toLowerCase()}.`
    }],
  });

  return message.content[0].text;
}
```

#### Вариант C: Google Gemini

**Плюсы:**
- Бесплатная квота
- Мультимодальность
- Хорошее API

**Минусы:**
- Качество на русском хуже
- Новое API

#### Вариант D: Локальная LLM (Ollama)

**Плюсы:**
- Полностью бесплатно
- Работает оффлайн
- Приватность

**Минусы:**
- Требует мощное железо
- Качество ниже чем GPT-4
- Нужен backend сервер

### Фаза 3: Установка зависимостей

```bash
# Для OpenAI
npm install openai

# Для Claude
npm install @anthropic-ai/sdk

# Для Google Gemini
npm install @google/generative-ai

# Для управления env переменными
npm install react-native-dotenv
```

### Фаза 4: Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# .env
OPENAI_API_KEY=sk-...
# или
ANTHROPIC_API_KEY=sk-ant-...
# или
GOOGLE_API_KEY=...

# Режим: 'mock' или 'production'
AI_MODE=mock
```

Добавьте в `.gitignore`:
```
.env
.env.local
.env.production
```

### Фаза 5: Обновление aiService.js

```javascript
// services/aiService.js

import { getRandomAffirmation } from '../mocks/aiAffirmations';
import OpenAI from 'openai';
import { OPENAI_API_KEY, AI_MODE } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const AI_CONFIG = {
  mode: AI_MODE || 'mock', // 'mock' или 'production'
  mockDelay: 2000,
  provider: 'openai', // 'openai', 'anthropic', 'google'
  model: 'gpt-4',
  maxTokens: 500,
  temperature: 0.7,
};

export async function generateAffirmation(mood, options = {}) {
  if (AI_CONFIG.mode === 'mock') {
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, AI_CONFIG.mockDelay));
    return getRandomAffirmation(mood.id, true);
  }

  // Production: используем реальный LLM
  return await callLLM(mood, options);
}

async function callLLM(mood, options) {
  const prompt = buildPrompt(mood, options);

  try {
    const response = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('LLM API Error:', error);
    // Fallback на мок при ошибке
    return getRandomAffirmation(mood.id, true);
  }
}

const SYSTEM_PROMPT = `Вы - опытный медитационный гид и психолог с 20-летним стажем.

Ваша задача - создавать короткие, вдохновляющие медитационные аффирмации
на русском языке для приложения ZenPulse.

Требования к аффирмациям:
- Длина: 3-4 абзаца
- Тон: вдохновляющий, но не слащавый
- Включить: конкретные дыхательные практики
- Использовать: 1-2 эмодзи в начале
- Язык: только русский

Структура:
1. Признание текущего состояния пользователя
2. Переосмысление/поддержка
3. Практическое действие (дыхание, визуализация)
4. Позитивное закрепление

Примеры хороших аффирмаций смотрите в документации.`;

function buildPrompt(mood, options) {
  const timeOfDay = new Date().getHours();
  const timeContext = timeOfDay < 12 ? 'утро' : timeOfDay < 18 ? 'день' : 'вечер';

  const moodDescriptions = {
    happy: 'радостным и энергичным',
    calm: 'спокойным и умиротворённым',
    stressed: 'в стрессе и напряжении',
  };

  return `Создайте персональную медитационную аффирмацию.

Контекст:
- Время суток: ${timeContext}
- Настроение пользователя: ${mood.label} (${moodDescriptions[mood.id]})
${options.userHistory ? `- Статистика: ${options.userHistory.days} дней медитаций` : ''}

Создайте уникальную, поддерживающую аффирмацию специально для этого состояния.`;
}
```

### Фаза 6: Тестирование

```javascript
// Для тестирования переключите режим
// В .env: AI_MODE=production

// Или программно:
import { AI_CONFIG } from './services/aiService';
AI_CONFIG.mode = 'production'; // Использовать реальный LLM
AI_CONFIG.mode = 'mock';       // Использовать моки
```

### Фаза 7: Оптимизация

#### Кеширование ответов

```javascript
// services/cache.js
const cache = new Map();

export function getCachedAffirmation(moodId) {
  return cache.get(moodId);
}

export function setCachedAffirmation(moodId, text) {
  cache.set(moodId, {
    text,
    timestamp: Date.now(),
    expiresIn: 3600000, // 1 час
  });
}
```

#### Ограничение частоты запросов

```javascript
// services/rateLimiter.js
let lastRequestTime = 0;
const MIN_INTERVAL = 3000; // 3 секунды между запросами

export function canMakeRequest() {
  const now = Date.now();
  if (now - lastRequestTime < MIN_INTERVAL) {
    return false;
  }
  lastRequestTime = now;
  return true;
}
```

#### Обработка ошибок

```javascript
async function callLLM(mood, options) {
  try {
    // ... код вызова API
  } catch (error) {
    if (error.status === 429) {
      // Rate limit exceeded
      console.warn('Rate limit exceeded, using mock');
      return getRandomAffirmation(mood.id, true);
    }

    if (error.status === 401) {
      // Invalid API key
      console.error('Invalid API key');
      throw new Error('AI service not configured');
    }

    // Другие ошибки - fallback на мок
    return getRandomAffirmation(mood.id, true);
  }
}
```

## Стоимость использования

### OpenAI GPT-4

- **Цена:** ~$0.03 за 1K входных tokens, ~$0.06 за 1K выходных
- **Средний запрос:** ~150 входных + 400 выходных tokens = ~$0.03
- **1000 пользователей/день:** ~$30/день = ~$900/месяц

### Оптимизация затрат:

1. **Кеширование:** Хранить популярные ответы
2. **GPT-3.5-turbo:** В 10 раз дешевле ($0.003/1K tokens)
3. **Batch processing:** Группировать запросы
4. **Fallback на моки:** При превышении лимита

## Рекомендуемая стратегия

### Этап 1: MVP (Текущий)
- ✅ Использовать моки
- ✅ Отличный UX
- ✅ Нулевая стоимость

### Этап 2: Beta
- Добавить OpenAI GPT-3.5-turbo
- 90% моки + 10% реальный AI (A/B тест)
- Собрать метрики (качество, стоимость)

### Этап 3: Production
- Hybrid: кеш + GPT-4 для новых запросов
- Мониторинг затрат
- Graceful fallback на моки

## Чеклист интеграции

- [ ] Выбрать провайдера LLM
- [ ] Получить API ключ
- [ ] Установить SDK
- [ ] Настроить .env
- [ ] Обновить aiService.js
- [ ] Протестировать в dev
- [ ] Добавить error handling
- [ ] Добавить rate limiting
- [ ] Добавить кеширование
- [ ] Протестировать в production
- [ ] Настроить мониторинг
- [ ] Добавить аналитику

## Безопасность

### ⚠️ Важно:

1. **Никогда не коммитить .env** в git
2. **Использовать env переменные** для API ключей
3. **Rate limiting** на клиенте и сервере
4. **Валидация входных данных**
5. **Мониторинг затрат**

### Для production:

```javascript
// Добавить валидацию
function validateMood(mood) {
  const validMoods = ['happy', 'calm', 'stressed'];
  if (!validMoods.includes(mood.id)) {
    throw new Error('Invalid mood');
  }
}

// Добавить sanitization
function sanitizeInput(text) {
  // Удалить потенциально опасные символы
  return text.replace(/[<>]/g, '');
}
```

## Мониторинг и аналитика

```javascript
// Логировать использование
function logAIUsage(mood, responseTime, tokensUsed, cost) {
  analytics.track('ai_affirmation_generated', {
    mood: mood.id,
    responseTime,
    tokensUsed,
    estimatedCost: cost,
    provider: AI_CONFIG.provider,
    model: AI_CONFIG.model,
  });
}
```

## Дополнительные ресурсы

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Claude API Docs](https://docs.anthropic.com/)
- [React Native Env Setup](https://github.com/goatandsheep/react-native-dotenv)

## Контакты для помощи

При возникновении вопросов:
1. Проверьте документацию провайдера
2. Откройте issue в GitHub
3. Обратитесь к команде разработки

---

**Статус:** 📘 Документация готова к использованию
**Последнее обновление:** 2026-01-02
