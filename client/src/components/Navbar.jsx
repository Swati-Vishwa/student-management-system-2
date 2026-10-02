import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? "bg-orange-500 text-white" : "border border-orange-500 text-slate-300 hover:bg-orange-500/50"
  }`;

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-mist-900">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-3xl font-bold text-orange-500">
          ScholarSync
          <p className="text-xs text-gray-400">Student Management System</p>
        </Link>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>
            Student
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add Student
          </NavLink>
        </div>
      </nav>
    </header>
  );
}