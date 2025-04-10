import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function Veggie({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const unsub = onSnapshot(messagesRef, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const handleSend = async () => {
    if (message) {
      await addDoc(messagesRef, {
        text: message,
        user: user.email,
        createdAt: Date.now()
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Bienvenue {user.email}</h2>
      <button onClick={() => auth.signOut()}>Déconnexion</button>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={handleSend}>Envoyer</button>
      <ul>
        {messages.map(m => <li key={m.id}>{m.user}: {m.text}</li>)}
      </ul>
    </div>
  );
}
