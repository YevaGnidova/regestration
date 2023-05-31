import firebase from 'firebase/compat/app'; // Обновленный импорт
import 'firebase/compat/database'; // Обновленный импорт
import 'firebase/compat/auth'; // Обновленный импорт

const firebaseConfig = {
  // ваша конфигурация
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
