import { Routes, Route } from "react-router-dom";
import Auth from "./auth/auth";
import Autofill from "./search/autofill";
import Choice from "./choice/choice";
import Favcoins from "./fav/favcoins";
import Favstocks from "./fav/favstocks";
import Herosection from "./component/herosection";
import Mainpage from "./mainpage/mainpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
     
      <Route path="/choice" element={<Choice />} />
      <Route path="/favcoins" element={<Favcoins />} />
      <Route path="/favstocks" element={<Favstocks />} />
      <Route path="/home" element={<Herosection />} />
      <Route path="/mainpage/:symbol" element={<Mainpage />} />

    </Routes>
  );
}

export default App;