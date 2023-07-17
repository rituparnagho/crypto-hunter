import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
// import HomePage from "./pages/HomePage";
// import CoinPage from "./pages/CoinPage";
import AlertCrypto from "./components/Alert/AlertCrypto";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const CoinPage = lazy(() => import("./pages/CoinPage"));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </Suspense>

        <AlertCrypto />
      </BrowserRouter>
    </div>
  );
}

export default App;
