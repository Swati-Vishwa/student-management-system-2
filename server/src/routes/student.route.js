import { Router } from "express";
import { createStudent, getStudents, getStudent, updateStudent, deleteStudent } from "../controllers/student.controller.js";

const router = Router()

router.route('/').get(getStudents).post(createStudent)
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent)

export default router;