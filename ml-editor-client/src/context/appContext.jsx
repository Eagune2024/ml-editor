import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(null);

  const initializeUser = (session) => {
    setSession(session);
    let username;
    if (session) {
      username = session.user.user_metadata.user_name;
    } else {
      username = localStorage.getItem("username") || '';
    }
    setUsername(username);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, []);


  return (
    <AppContext.Provider
      value={{
        username,
        session
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };