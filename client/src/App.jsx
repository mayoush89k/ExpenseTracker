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

function App() {
  return (
    <>
      <ExpensesProvider>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/myHistory" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
      </ExpensesProvider>
    </>
  );
}

export default App;
