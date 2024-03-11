import './App.css';
import Chatbot from './components/chatbox/chatbot';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/login';
import SignUp from './pages/signup';
import Error from './pages/Error';
// import useUserStore from "./store";
// import AppInitializationComponent from './components/authentication';

function App() {
  return (
    <div className="App">
      <AppInitializationComponent />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
