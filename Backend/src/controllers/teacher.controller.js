import { Teacher } from '../models/Teacher.js';

export const getTeachers = async (req, res) => {
  try {
    const { subject } = req.query;
    const where = {};

    if (subject) where.subject = subject;

    const teachers = await Teacher.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { name, qualification, experience, subject } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const teacher = await Teacher.create({
      name,
      qualification,
      experience,
      subject,
      imageUrl,
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, qualification, experience, subject } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    let imageUrl = teacher.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await teacher.update({
      name: name || teacher.name,
      qualification: qualification || teacher.qualification,
      experience: experience || teacher.experience,
      subject: subject || teacher.subject,
      imageUrl,
    });

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    await teacher.destroy();
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
