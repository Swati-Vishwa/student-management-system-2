import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addStudent, getStudent, updateStudent, getErrorMessage } from "../services/api";

const emptyForm = { name: "", email: "", rollNo: "", course: "", age: "", phone: "" };

const fields = [
  { name: "name", label: "Full name", required: true, placeholder: "Asha Sharma" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "asha@example.com" },
  { name: "rollNo", label: "Roll number", required: true, placeholder: "101" },
  { name: "course", label: "Course", required: true, placeholder: "BCA" },
  { name: "age", label: "Age", type: "number", placeholder: "20" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "9999999999" },
];

function Field({ label, name, type = "text", value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 ${error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
          }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function StudentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { data } = await getStudent(id);
        const s = data.data;
        setForm({
          name: s.name,
          email: s.email,
          rollNo: s.rollNo,
          course: s.course,
          age: s.age ?? "",
          phone: s.phone ?? "",
        });
      } catch (err) {
        setServerError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  //Validator
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.rollNo.trim()) e.rollNo = "Roll number is required";
    if (!form.course.trim()) e.course = "Course is required";
    if (form.age !== "" && Number(form.age) < 1) e.age = "Age must be a positive number";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    const payload = { ...form, age: form.age === "" ? undefined : Number(form.age) };

    try {
      setSaving(true);
      if (isEdit) await updateStudent(id, payload);
      else await addStudent(payload);
      navigate("/", {
        state: { success: isEdit ? "Student updated successfully." : "Student added successfully." },
      });
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-slate-500">Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Student" : "Add Student"}</h1>

      {serverError && (
        <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <Field
            key={f.name}
            {...f}
            value={form[f.name]}
            onChange={handleChange}
            error={errors[f.name]}
          />
        ))}

        <div className="mt-2 flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
          </button>
          <Link
            to="/"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm hover:bg-slate-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}