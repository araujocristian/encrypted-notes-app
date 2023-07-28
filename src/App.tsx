import {useState} from 'react'
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";


export function App() {
  const [userData, setUserData] = useState<{
    username: string;
    passphrase: string;
  }>()

  return userData ? <NotesPage /> : <LoginPage setUserData={setUserData} />;
}
