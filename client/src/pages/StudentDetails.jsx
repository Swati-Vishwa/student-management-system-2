import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudent, getErrorMessage } from "../services/api";

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</dt>
      <dd className="mt-1 text-sm">{value || "—"}</dd>
    </div>
  );
}

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getStudent(id);
        setStudent(data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="text-center text-slate-500">Loading...</p>;

  if (error)
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        <Link to="/" className="mt-4 inline-block text-orange-500 hover:underline">
          ← Back to students
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-sm text-slate-500">Roll No: {student.rollNo}</p>
        </div>
        <Link
          to={`/edit/${student._id}`}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          Edit
        </Link>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <Detail label="Email" value={student.email} />
        <Detail label="Course" value={student.course} />
        <Detail label="Age" value={student.age} />
        <Detail label="Phone" value={student.phone} />
        <Detail label="Added on" value={new Date(student.createdAt).toLocaleDateString()} />
        <Detail label="Last updated" value={new Date(student.updatedAt).toLocaleDateString()} />
      </dl>

      <Link to="/" className="mt-8 inline-block text-orange-500 hover:underline">
        ← Back to students
      </Link>
    </div>
  );
}