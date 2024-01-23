import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import History from "./Components/History";
import Login from "./Components/Login";
import Menu from "./Components/Menu";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import { ExpensesProvider } from "./context/ExpenseContext";
import Services from "./Components/Services";
import Register from "./Components/Register";
import { UserProvider } from "./context/UserContext";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [menuViewer, setMenuViewer] = useState(false);

  const onMenuClicked = () => {
    setMenuViewer(!menuViewer);
  };
  return (
    <>
      <ExpensesProvider>
        <UserProvider>
          <BrowserRouter>
            {window.innerWidth > 750 ? (
              <Menu />
            ) : (
              <div className="py-8 px-1 absolute md:block " onClick={onMenuClicked}>
                <FaBars />
                <div
                  className={
                    menuViewer
                      ? "translate-x-0 duration-500"
                      : "translate-x-[-100px] duration-700"
                  }
                >
                  {menuViewer && <Menu />}
                </div>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/myHistory" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ExpensesProvider>
    </>
  );
}

export default App;
