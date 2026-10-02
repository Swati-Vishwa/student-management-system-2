import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentForm from "./pages/StudentForm";
import StudentDetails from "./pages/StudentDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<StudentForm key="add" />} />
            <Route path="/edit/:id" element={<StudentForm key="edit" />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}