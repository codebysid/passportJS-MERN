import { useState } from 'react';
import './App.css';
import { Registration } from './components/Registration';
import { Login } from './components/Login';

function App() {
      const [login, setLogin] = useState(false)
      let hobbies = [
        "Cricket",
        "Gaming",
        "Travelling",
        "Singing",
        "Dancing",
        "Music"
      ]
  return (
    <div className="App">
      {
      login ? 
      <Login 
        hobbies={hobbies}
        /> 
        : <Registration
        hobbies={hobbies}
        login = {login}
        setLogin = {setLogin}
        />
        }
    </div>
  );
}

export default App;
