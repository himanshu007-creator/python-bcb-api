import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CurrencyIdList from "./components/CurrencyIdList";
import CurrencyList from "./components/CurrencyList";
import CurrencyId from "./components/CurrencyId";
import CurrencyType from "./components/CurrencyType";
import Currency from "./components/Currency";
function App() {
  return (
    <div>
      <Navbar />
      {/* <CurrencyIdList />
      <CurrencyList />
      <CurrencyId />
       */}
      {/* <CurrencyType /> */}
      <Currency />
    </div>
  );
}
export default App;
