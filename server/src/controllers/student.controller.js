import Student from "../models/student.model.js";
import APIError from "../utils/API-Errors.js";
import APIResponse from "../utils/API-Response.js";

//POST
export const createStudent = async (req, res) => {
  const student = await Student.create(req.body)
  console.log(req.body)
  res.status(201).json(new APIResponse(201  , student, 'Student added successfully'))
}

//GET
export const getStudents = async (req, res) => {
  const students = await Student.find().sort({createdAt: -1})
  res.json(new APIResponse(200, students, "Students fetched successfully"))
}

//GET single student
export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id)
  if(!student) throw new APIError(404, "Student not found")
  res.json(new APIResponse(200, student, "Student fetched"))
}

//PUT
export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true
  })
  if (!student) throw new APIError(404, "Student not found");
  res.json(new APIResponse(200, student, "Student updated"))  
}

//DELETE
export const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id)
  if (!student) throw new APIError(404, "Student not found");
  res.json(new APIResponse(200, null, "Student deleted"))
}