import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { ExchangePage } from "@/pages/ExchangePage";
import { ExchangeCurrency } from "@/pages/ExchangeCurrency";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/currency" element={<ExchangePage />} />
      <Route path="/exchange" element={<ExchangeCurrency />} />
    </Routes>
  );
}