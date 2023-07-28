import { useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";
import { UserData } from "./types";

export function App() {
  const [userData, setUserData] = useState<UserData>();

  return userData ? (
    <NotesPage userData={userData} />
  ) : (
    <LoginPage setUserData={setUserData} />
  );
}
