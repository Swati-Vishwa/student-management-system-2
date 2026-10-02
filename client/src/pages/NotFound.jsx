import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-slate-500">This page doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block text-orange-500 hover:underline">
        Go to students
      </Link>
    </div>
  );
}