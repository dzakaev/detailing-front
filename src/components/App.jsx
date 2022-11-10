import SignInPage from "./Pages/SignIn/SignInPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import { useSelector } from "react-redux";
import ExpensesPage from "./Pages/Expenses/ExpensesPage";
import JournalPage from "./Pages/JournalPage/JournalPage";
import ClientPage from "./Pages/ClientPage";
import ReportPage from './Pages/Report/ReportPage';

function App() {

  const token = useSelector((state) => state.application.token);

  return (
    <Routes>
      <Route
        path="/expenses"
        element={!token ? <Navigate to="/signIn" /> : <ExpensesPage />}
      />
      <Route
        path="/journal"
        element={!token ? <Navigate to="/signIn" /> : <JournalPage />}
      />
      <Route
        path="/client"
        element={!token ? <Navigate to="/signIn" /> : <ClientPage />}
      />
      <Route
        path="/report"
        element={!token ? <Navigate to="/signIn" /> : <ReportPage />}
      />
      <Route
        path="/signIn"
        element={token ? <Navigate to="/journal" /> : <SignInPage />}
      />
      <Route
        path="/"
        element={!token ? <Navigate to="/signIn" /> : <Header />}
      />
    </Routes>
  );
}

export default App;
