import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getStudents, deleteStudent, getErrorMessage } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";

export default function Home() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.success || "");
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const { data } = await getStudents();
        if (!ignore) {
          setStudents(data.data);
          setError("");
        }
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [refresh]);

  const confirmDelete = async () => {
    try {
      await deleteStudent(toDelete._id);
      setSuccess(`${toDelete.name} was deleted.`);
      setRefresh((r) => r + 1);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setToDelete(null);
    }
  };

  const q = search.toLowerCase();
  const filtered = students.filter((s) =>
    [s.name, s.rollNo, s.course, s.email].some((v) => v?.toLowerCase().includes(q))
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-bold text-orange-400 ">Student Data</h1>
          <p className="text-md text-slate-500">{students.length} total records</p>
        </div>
        <Link
          to="/add"
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          + Add Student
        </Link>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, roll number, course or email..."
        className="mt-6 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />

      {success && (
        <div className="mt-4 flex items-center justify-between rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} aria-label="Dismiss">✕</button>
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <p className="mt-10 text-center text-slate-500">Loading students...</p>
      ) : filtered.length === 0 && !error ? (
        <p className="mt-10 text-center text-slate-500">
          {students.length === 0 ? "No students yet. Add your first one!" : "No students match your search."}
        </p>
      ) : (
        filtered.length > 0 && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Roll No</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">{s.rollNo}</td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3">{s.course}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="space-x-3 px-4 py-3 text-right whitespace-nowrap">
                      <Link to={`/students/${s._id}`} className="text-indigo-600 hover:underline">
                        View
                      </Link>
                      <Link to={`/edit/${s._id}`} className="text-amber-600 hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => setToDelete(s)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      <ConfirmModal
        open={Boolean(toDelete)}
        title="Delete student?"
        message={toDelete ? `This will permanently remove ${toDelete.name}.` : ""}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}