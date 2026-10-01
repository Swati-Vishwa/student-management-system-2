import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true
    },
    age: {
      type: Number,
      min: [1, "Age must be positive"]
    },
    phone: {
      type: String,
      trim: true
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;