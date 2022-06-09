
import Navbar1 from "./components/Navbar"
import {BrowserRouter,Route,Routes} from "react-router-dom"

import Homescreen from "./screens/Homescreen"
import Bookingscreen from "./screens/Bookingscreen";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen"
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen"
import Landingscreen from "./screens/Landingscreen";
function App() {
  return (
    <div className="App">
     <Navbar1/>
     <BrowserRouter>
     <Routes>
     <Route path="/home" element={<Homescreen/>} />
     <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen/>} />
     <Route path="/register" element={<Registerscreen/>}/>
     <Route path="/login" element={<Loginscreen/>}/>
     <Route path="/profile" element={<Profilescreen/>}/>
     <Route path="/admin" element={<Adminscreen/>}/>
   <Route path="/" element={<Landingscreen/>}/>
     </Routes>
   
     </BrowserRouter>

    </div>
  );
}

export default App;
