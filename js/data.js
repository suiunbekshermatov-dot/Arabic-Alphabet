window.APP_DATA = {
  letters: [
    { letter: "ا", name: "Alif", transliteration: "a", example: "أسد", translation: "lion" },
    { letter: "ب", name: "Ba", transliteration: "b", example: "باب", translation: "door" },
    { letter: "ت", name: "Ta", transliteration: "t", example: "تفاح", translation: "apple" },
    { letter: "ث", name: "Tha", transliteration: "th", example: "ثعلب", translation: "fox" },
    { letter: "ج", name: "Jeem", transliteration: "j", example: "جمل", translation: "camel" },
    { letter: "ح", name: "Haa", transliteration: "h", example: "حصان", translation: "horse" },
    { letter: "خ", name: "Khaa", transliteration: "kh", example: "خبز", translation: "bread" },
    { letter: "د", name: "Dal", transliteration: "d", example: "دب", translation: "bear" },
    { letter: "ر", name: "Ra", transliteration: "r", example: "رمان", translation: "pomegranate" },
    { letter: "س", name: "Seen", transliteration: "s", example: "سمك", translation: "fish" },
    { letter: "ش", name: "Sheen", transliteration: "sh", example: "شمس", translation: "sun" },
    { letter: "ق", name: "Qaf", transliteration: "q", example: "قلم", translation: "pen" },
    { letter: "ك", name: "Kaf", transliteration: "k", example: "كتاب", translation: "book" },
    { letter: "ل", name: "Lam", transliteration: "l", example: "لوز", translation: "almond" },
    { letter: "م", name: "Meem", transliteration: "m", example: "موز", translation: "banana" },
    { letter: "ن", name: "Noon", transliteration: "n", example: "نجم", translation: "star" }
  ],
  vocabulary: [
    { arabic: "مرحبا", transliteration: "marhaban", english: "Hello", russian: "Привет", emoji: "👋", category: "greetings" },
    { arabic: "شكرا", transliteration: "shukran", english: "Thank you", russian: "Спасибо", emoji: "🙏", category: "daily expressions" },
    { arabic: "أحمر", transliteration: "ahmar", english: "Red", russian: "Красный", emoji: "🟥", category: "colors" },
    { arabic: "أزرق", transliteration: "azraq", english: "Blue", russian: "Синий", emoji: "🟦", category: "colors" },
    { arabic: "أسد", transliteration: "asad", english: "Lion", russian: "Лев", emoji: "🦁", category: "animals" },
    { arabic: "تفاحة", transliteration: "tuffaha", english: "Apple", russian: "Яблоко", emoji: "🍎", category: "fruits" },
    { arabic: "أمي", transliteration: "ummi", english: "My mother", russian: "Моя мама", emoji: "👩", category: "family" },
    { arabic: "مدرسة", transliteration: "madrasa", english: "School", russian: "Школа", emoji: "🏫", category: "school objects" },
    { arabic: "واحد", transliteration: "wahid", english: "One", russian: "Один", emoji: "1️⃣", category: "numbers" },
    { arabic: "كيف حالك؟", transliteration: "kayfa haluk?", english: "How are you?", russian: "Как дела?", emoji: "😊", category: "greetings" },
    { arabic: "هيا بنا", transliteration: "hayya bina", english: "Let us go", russian: "Пойдем", emoji: "🚶", category: "daily expressions" },
    { arabic: "كتاب", transliteration: "kitab", english: "Book", russian: "Книга", emoji: "📘", category: "school objects" }
  ],
  phrases: [
    { arabic: "أنا أحب العربية", transliteration: "ana uhibbu al-arabiyya", english: "I love Arabic" },
    { arabic: "أين المدرسة؟", transliteration: "ayna al-madrasa?", english: "Where is the school?" },
    { arabic: "هذا صديقي", transliteration: "hatha sadiqi", english: "This is my friend" }
  ],
  quiz: [
    {
      type: "meaning",
      question: "What does 'شكرا' mean?",
      options: ["Please", "Thank you", "Good morning", "Goodbye"],
      answer: "Thank you"
    },
    {
      type: "picture",
      question: "Choose the Arabic word for 🍎",
      options: ["تفاحة", "مدرسة", "أسد", "أحمر"],
      answer: "تفاحة"
    },
    {
      type: "listen",
      question: "Listen and choose the correct word",
      audioWord: "مرحبا",
      options: ["مرحبا", "كتاب", "شكرا", "أزرق"],
      answer: "مرحبا"
    },
    {
      type: "missing",
      question: "Fill missing letter: _لم (pen)",
      options: ["ق", "ك", "ش", "م"],
      answer: "ق"
    }
  ],
  puzzleWords: [
    { arabic: "قلم", letters: ["ل", "م", "ق"] },
    { arabic: "كتاب", letters: ["ت", "ب", "ا", "ك"] },
    { arabic: "أسد", letters: ["د", "أ", "س"] }
  ],
  leaderboard: [
    { name: "Lina", score: 4200, level: 8, badges: "🏅🏅🏅", lessons: 28, accuracy: 92, games: 40 },
    { name: "Omar", score: 3980, level: 7, badges: "🏅🏅", lessons: 25, accuracy: 89, games: 37 },
    { name: "Yara", score: 3600, level: 7, badges: "🏅🏅", lessons: 23, accuracy: 87, games: 34 },
    { name: "Adam", score: 3050, level: 6, badges: "🏅", lessons: 20, accuracy: 82, games: 30 },
    { name: "Mira", score: 2800, level: 5, badges: "🏅", lessons: 18, accuracy: 80, games: 25 }
  ],
  user: {
    name: "Little Learner",
    xp: 1200,
    level: 4,
    stars: 36,
    streak: 5,
    badges: ["Alphabet Hero", "Listening Star"],
    lessonsCompleted: 14,
    gamesPlayed: 22,
    weakAreas: ["colors", "fast listening"],
    strongest: ["letters", "animals"],
    vocabularyLearned: 45,
    dailyMinutes: 24,
    weeklyMinutes: 170
  },
  encouragement: ["Great job!", "Excellent!", "Well done!", "Try again!", "Let’s learn more Arabic!"]
};
