import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Veggie from "./components/Veggie";
import dotenv from "dotenv";
dotenv.config();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <div>{user ? <Veggie user={user} /> : <Login onLogin={setUser} />}</div>
  );
}

export default App;
