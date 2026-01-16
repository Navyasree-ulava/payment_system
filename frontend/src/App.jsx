import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TransferResult } from "./pages/TransferResult";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/transfer-result" element={<TransferResult />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App