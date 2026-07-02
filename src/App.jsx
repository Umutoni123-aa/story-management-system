import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import StoryList from "./pages/StoryList";
import AddStory from "./pages/AddStory";
import StoryDetails from "./pages/StoryDetails";
import EditStory from "./pages/EditStory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerify from "./pages/OtpVerify";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<StoryList />} />
          <Route path="/add" element={<ProtectedRoute><AddStory /></ProtectedRoute>} />
          <Route path="/stories/:id" element={<ProtectedRoute><StoryDetails /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditStory /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OtpVerify />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
