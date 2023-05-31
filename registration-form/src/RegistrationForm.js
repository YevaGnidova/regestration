import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/database'; 
import 'firebase/compat/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyAFhBxs3s4f4uv28MSPlOtGxw4gqN_1OC0",
    authDomain: "logowanie1-65f23.firebaseapp.com",
    projectId: "logowanie1-65f23",
    storageBucket: "logowanie1-65f23.appspot.com",
    messagingSenderId: "846438865067",
    appId: "1:846438865067:web:2132aa564fed7d84417fee",
    measurementId: "G-5YJZVGWH4T"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();


const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка на правильность данных (Walidacji danych)
    const isValidName = name.length >= 3 && name.length <= 12;
    const isValidAge = /^\d+$/.test(age) && parseInt(age) >= 14;
    const isValidEmail = email.includes('@');
    const isValidPassword = /[a-zA-Z]/.test(password) && /\d/.test(password);

    if (isValidName && isValidAge && isValidEmail && isValidPassword) {
      // Wysyłanie danych do Firebase
      database.ref('users').push({
        name,
        age,
        email,
        password,
      });

      // Czyszczenie pól formularza
      setName('');
      setAge('');
      setEmail('');
      setPassword('');
    } else {
      alert('Wprowadź poprawne dane.');
    }
  };

  useEffect(() => {
    // Pobieranie odniesienia do węzła 'users'
    const usersRef = database.ref('users');
  
    // Żądanie odczytu danych z bazy danych
    usersRef.on('value', (snapshot) => {
      // Robienie migawki danych
      const data = snapshot.val();
      console.log(data); // Wysyłanie danych do konsoli
    });
  
    // Anulowanie subskrypcji aktualizacji bazy danych, gdy komponent jest odmontowany
    return () => {
      usersRef.off('value');
    };
  }, []);

  useEffect(() => {
    //Ustalanie reguł dostępu
    firebase.database().ref().update({
      rules: {
        ".read": false,
        ".write": "auth != null"
      }
    });
  }, []);
  

  return (
    <div style={{ backgroundColor: 'lightorange', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: 'lightpink', padding: '10px' }}>
          <label>Imie: </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div style={{ backgroundColor: 'lightpink', padding: '10px' }}>
          <label>Wiek: </label>
          <input type="text" value={age} onChange={handleAgeChange} />
        </div>
        <div style={{ backgroundColor: 'lightpink', padding: '10px' }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div style={{ backgroundColor: 'lightpink', padding: '10px' }}>
          <label>Haslo: </label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" style={{ backgroundColor: 'lightgreen' }}>
        Zarejestrować 
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;