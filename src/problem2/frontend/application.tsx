import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { CurrencyTable } from "@/pages/CurrencyTable";
import { ExchangeCurrency } from "@/pages/ExchangeCurrency";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/currency" element={<CurrencyTable />} />
      <Route path="/exchange" element={<ExchangeCurrency />} />
    </Routes>
  );
}