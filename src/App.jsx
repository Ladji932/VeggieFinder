import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login";
import Veggie from "./components/Veggie";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <div>{user ? <Dashboard user={user} /> : <Login onLogin={setUser} />}</div>
  );
}

export default App;
