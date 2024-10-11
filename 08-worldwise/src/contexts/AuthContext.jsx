import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLogin: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return { ...state, user: action.payload, isLogin: true };
    case "user/logout":
      return { ...state, user: null, isLogin: false };
    default:
      throw new Error("Action unknown");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthContextProvider({ children }) {
  const [{ user, isLogin }, dispatch] = useReducer(reducer, initialState);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "user/login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
