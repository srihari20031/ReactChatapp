import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./components/Welcome";
import ChatBox from "./components/ChatBox";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentuser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentuser) return <Navigate to="/" />;
    return children
  };

  return (
    <Router>
      {!currentuser && <Navbar /> }
      <Routes>
       {currentuser ? <Route index element={ <ChatBox /> } /> : <Route index element={<Welcome />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          exact
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
