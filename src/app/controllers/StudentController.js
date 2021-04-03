import Student from '../models/Student'

class StudentController {
  async list(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async listSubjects(req, res) {
    const {subjects} = await Student.findByPk(req.params.id);

    return res.json(subjects);
  }

  async index(req, res) {
    const student = await Student.findByPk(req.params.id);

    return res.json(student);
  }

  async indexSituation(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const {subjects} = studentExists;

    let relatory = { name: studentExists.name, subjects: [] };

    subjects.map((subject) => {
      const finalGrade = subject.grades.reduce((a, b) => a + b, 0);
      relatory.subjects.push({
        name: subject.name,
        finalGrade,
        situation: finalGrade >= 60 ? "Approved" : "Repproved",
      });
    });

    return res.json(relatory);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({where: {name: req.body.name}})

    if(studentExists) {
      return res.status(400).json({error: 'Student already exists.'})
    }

    const {id, name} = await Student.create(req.body); 
    
    return res.json({id, name});
  }

  async storeSubject(req, res) {
    const {name} = req.body;
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const subjects = studentExists.subjects;
    
    const newSubjects = subjects !== null ? [...subjects, {name, grades: []}] : [{name, grades: []}]

    await Student.update({subjects: newSubjects},{where: {id: req.params.id}})
    
    return res.json(newSubjects);
  }

  async storeSubjectGrades(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const {subjects} = studentExists;

    const subjectIndex = subjects.findIndex(e => e.name == req.query.subject);

    if(subjectIndex !== -1) {
      subjects[subjectIndex].grades = req.body.grades;
    }
    else {
      return res.status(404).json({error: 'Subject not found.'})
    }

    await Student.update({subjects}, {where: {id: req.params.id}});

    return res.json(subjects);
  }

  async updateSubject(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const {subjects} = studentExists;

    const subjectIndex = subjects.findIndex(e => e.name == req.body.name);

    if(subjectIndex !== -1) {
      subjects[subjectIndex] = req.body;
    }
    else {
      return res.status(404).json({error: 'Subject not found.'})
    }

    await Student.update({subjects}, {where: {id: req.params.id}});

    return res.json(subjects);
  }

  async updateStudent(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const student = await studentExists.update(req.body);

    return res.json(student);
  }

  async removeStudent(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    await studentExists.destroy();

    return res.send();
  }

  async removeSubject(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if(!studentExists) {
      return res.status(404).json({error: "Student not found."})
    }

    const {subjects} = studentExists;

    const subjectIndex = subjects.findIndex(e => e.name == req.query.subject);

    if(subjectIndex !== -1) {
      subjects.splice(subjectIndex, 1);
    }
    else {
      return res.status(404).json({error: 'Subject not found.'})
    }
    
    await Student.update({subjects}, {where: {id: req.params.id}});

    return res.json(subjects);
  }
}

export default new StudentController();