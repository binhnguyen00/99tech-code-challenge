import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { ExchangePage } from "@/pages/ExchangePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exchanges" element={<ExchangePage />} />
    </Routes>
  );
}