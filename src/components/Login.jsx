import { useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onLogin(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 💾 Stocker l'utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString()
          // Tu peux ajouter ici d'autres champs (nom, photo, rôle, etc)
        });

        onLogin(user);
      }
    } catch (error) {
      console.error("Erreur lors de l’authentification ou l’enregistrement :", error.message);
      alert("Erreur : " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">{isLogin ? "Se connecter" : "S'inscrire"}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer'}}>
        {isLogin ? "Pas de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
      </p>
    </form>
  );
}