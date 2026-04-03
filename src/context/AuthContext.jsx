import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const VALID_USERS = [
  {
    login: "Piotrek2137",
    password: "KochamKonie123!",
    name: "Piotrek",
    event: {
      date: "03 Kwietnia 2026",
      dayOfWeek: "Piątek",
      time: "18:00",
      timeNote: "punktualnie",
      place: "Hula Hop",
      placeNote: "ul. Żytnia 8",
      isoDate: "2026-04-03T18:00:00",
    },
  },
  {
    login: "KochamPiwo",
    password: "KochamPiwo2137!",
    name: "Piwosze",
    event: {
      date: "10 Kwietnia 2026",
      dayOfWeek: "Piątek",
      time: "13:30",
      timeNote: "po zajęciach",
      place: "Do ustalenia",
      placeNote: "może plener",
      isoDate: "2026-04-10T13:30:00",
    },
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const storedAuth = localStorage.getItem("beer_invitation_auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed);
      } catch {
        localStorage.removeItem("beer_invitation_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (loginInput, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = VALID_USERS.find(
          (u) =>
            u.login.toLowerCase() === loginInput.toLowerCase() &&
            u.password === password,
        );

        if (foundUser) {
          const userData = {
            login: foundUser.login,
            name: foundUser.name,
            event: foundUser.event,
          };
          localStorage.setItem(
            "beer_invitation_auth",
            JSON.stringify(userData),
          );
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error("Nieprawidłowy login lub hasło"));
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem("beer_invitation_auth");
    localStorage.removeItem("beer_invitation_rsvp");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
