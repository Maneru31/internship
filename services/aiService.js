/**
 * AI Service для генерации персональных аффирмаций
 *
 * Текущая версия: Использует моки для демонстрации
 * Будущая версия: Интеграция с LLM (OpenAI GPT-4, Claude, и т.д.)
 */

import { getRandomAffirmation } from '../mocks/aiAffirmations';

// Конфигурация для будущей интеграции с LLM
const AI_CONFIG = {
  // TODO: Добавить при интеграции с реальным API
  // provider: 'openai', // 'openai', 'anthropic', 'google'
  // apiKey: process.env.OPENAI_API_KEY,
  // model: 'gpt-4',
  // maxTokens: 500,
  // temperature: 0.7,

  // Текущие настройки для моков
  useMock: true,
  mockDelay: 2000, // Имитация задержки API (мс)
  useRandomVariations: true, // Использовать случайные варианты аффирмаций
};

/**
 * Генерирует персональную аффирмацию на основе настроения
 *
 * @param {Object} mood - Объект настроения с id и label
 * @param {Object} options - Дополнительные опции (для будущего использования)
 * @returns {Promise<string>} - Сгенерированная аффирмация
 */
export async function generateAffirmation(mood, options = {}) {
  // Имитация задержки API
  await new Promise(resolve => setTimeout(resolve, AI_CONFIG.mockDelay));

  if (AI_CONFIG.useMock) {
    // ТЕКУЩАЯ ВЕРСИЯ: Возвращаем мок
    return getRandomAffirmation(mood.id, AI_CONFIG.useRandomVariations);
  }

  // БУДУЩАЯ ВЕРСИЯ: Вызов реального LLM API
  // return await callLLMAPI(mood, options);
}

/**
 * БУДУЩАЯ ФУНКЦИЯ: Вызов реального LLM API
 * Раскомментируйте и настройте при интеграции
 */
/*
async function callLLMAPI(mood, options) {
  const prompt = buildPrompt(mood, options);

  // Пример для OpenAI GPT-4
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: 'Вы - опытный медитационный гид и психолог. Создавайте короткие, вдохновляющие аффирмации на русском языке.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
*/

/**
 * БУДУЩАЯ ФУНКЦИЯ: Построение промпта для LLM
 */
/*
function buildPrompt(mood, options) {
  const moodDescriptions = {
    happy: 'радостным и энергичным',
    calm: 'спокойным и умиротворённым',
    stressed: 'в стрессе и напряжении',
  };

  const timeOfDay = new Date().getHours();
  const timeContext = timeOfDay < 12 ? 'утро' : timeOfDay < 18 ? 'день' : 'вечер';

  return `Создайте персональную медитационную аффирмацию для человека, который чувствует себя ${moodDescriptions[mood.id]}.

Контекст:
- Время суток: ${timeContext}
- Настроение: ${mood.label}
${options.userHistory ? `- История: пользователь медитирует ${options.userHistory.days} дней подряд` : ''}

Требования:
- 3-4 абзаца
- Вдохновляющий, но не слащавый тон
- Конкретные дыхательные практики
- На русском языке
- Использовать эмодзи в начале (1-2)

Структура:
1. Признание текущего состояния
2. Переосмысление/поддержка
3. Практическое действие (дыхание, визуализация)
4. Позитивное закрепление`;
}
*/

/**
 * БУДУЩАЯ ФУНКЦИЯ: Валидация API ключа
 */
/*
export function validateAIConfig() {
  if (!AI_CONFIG.useMock && !AI_CONFIG.apiKey) {
    throw new Error('AI API key is not configured. Please set OPENAI_API_KEY in environment variables.');
  }
  return true;
}
*/

/**
 * БУДУЩАЯ ФУНКЦИЯ: Переключение между моком и реальным API
 */
/*
export function toggleMockMode(useMock = true) {
  AI_CONFIG.useMock = useMock;
  console.log(`AI Service: ${useMock ? 'Mock' : 'Real API'} mode enabled`);
}
*/

// Экспорт конфига для отладки
export { AI_CONFIG };
