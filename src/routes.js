import {Router} from 'express';
import Student from './app/models/Student';

import StudentController from './app/controllers/StudentController'

const routes = new Router();

// List students
routes.get("/students", StudentController.list);

// List subjects
routes.get("/students/:id/subjects", StudentController.listSubjects);

// Index student
routes.get("/students/:id", StudentController.index);

// Index student situation
routes.get("/students/:id/situation", StudentController.indexSituation);

// Add a new student using the request body information
routes.post("/students", StudentController.store);

// Add a new subject
routes.post("/students/:id/subjects", StudentController.storeSubject);

// Add student grades
routes.post("/students/:id/grades", StudentController.storeSubjectGrades);

// Change subject informations
routes.put("/students/:id/subjects", StudentController.updateSubject);

// Change student informations
routes.put("/students/:id", StudentController.updateStudent);

// Remove student
routes.delete("/students/:id", StudentController.removeStudent);

// Remove subject
routes.delete("/students/:id/subjects", StudentController.removeSubject);

export default routes;