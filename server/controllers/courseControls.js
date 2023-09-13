import Course from "../models/courses.js";
import Syllabus from "../models/syllabus.js";

function containsObject(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].courseName === obj.courseName &&
      list[i].courseCode === obj.courseCode &&
      list[i].semester === obj.semester &&
      list[i].courseType === obj.courseType
    ) {
      return true;
    }
  }
  return false;
}

export const addCourse = async (req, res) => {
  try {
    const course = req.body;
    const dept = await Course.findOne({
      department: course.department,
    });

    if (dept === null) {
      const data = {
        courseName: course.courseName,
        courseCode: course.courseCode,
        courseType: course.courseType,
        semester: course.semester,
      };
      await Course.create({
        department: course.department,
        courses: [data],
      });
      return res
        .status(200)
        .json({ message: "Course Added Successfully.", successful: true });
    }

    if (containsObject(course, dept.courses)) {
      return res.status(409).json({
        message: `Course with name ${course.courseName} and course code ${course.courseCode} already exists`,
        successful: false,
      });
    }

    dept.courses.push({
      courseName: course.courseName,
      courseCode: course.courseCode,
      semester: course.semester,
      courseType: course.courseType,
    });
    dept.save();

    return res.status(200).json({
      message: `Course with name ${course.courseName} and course code ${course.courseCode} has been added.`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).json({
      course,
      message: `${course.length} courses found.`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const updateSingleCourse = async (req, res) => {
  try {
    const { course, modifiedCourse } = req.body;

    const courseInDB = await Course.findOne({ department: course.department });
    for (let i = 0; i < courseInDB.courses.length; i++) {
      if (courseInDB.courses[i].courseCode === course.courseCode) {
        for (let j = 0; j < courseInDB.courses.length; j++) {
          if (
            i !== j &&
            courseInDB.courses[j].courseCode === modifiedCourse.courseCode
          ) {
            return res.status(403).json({
              message: `Course with course code ${modifiedCourse.courseCode} already exists in the database.`,
              successful: false,
            });
          }
        }
        courseInDB.courses[i].courseCode = modifiedCourse.courseCode;
        courseInDB.courses[i].semester = modifiedCourse.semester;
        courseInDB.courses[i].courseName = modifiedCourse.courseName;
        courseInDB.courses[i].courseType = modifiedCourse.courseType;
        await courseInDB.save();
        return res
          .status(200)
          .json({ message: "Course updated successfully.", successful: true });
      }
    }

    return res
      .status(404)
      .json({ message: "Course not found.", successful: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again",
      successful: false,
    });
  }
};
export const deleteSingleCourse = async (req, res) => {
  try {
    const course = req.body;
    const courseInDB = await Course.findOne({ department: course.department });

    const courses = courseInDB.courses;

    const temp = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].courseCode !== course.courseCode) {
        temp.push(courses[i]);
      }
    }
    courseInDB.courses = temp;
    await courseInDB.save();
    return res
      .status(200)
      .json({ message: "Course successfully deleted", successful: true });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const uploadSyllabus = async (req, res) => {
  try {
    const syllabusInDB = await Syllabus.findOne({
      department: req.body.department,
    });

    if (syllabusInDB === null) {
      console.log("i am here");
      console.log(1);
      await Syllabus.create({
        department: req.body.department,
        syllabus: [
          {
            fileName: req.body.fileName,
            filePath: req.file.path,
            semester: req.body.semester,
          },
        ],
      });
      console.log(syllabusInDB);
      return res
        .status(200)
        .json({ message: "Syllabus uploaded successfully", successful: true });
    }
    const syllabus = syllabusInDB.syllabus;

    console.log(2);
    for (let i = 0; i < syllabus.length; i++) {
      if (syllabus[i].fileName === req.body.fileName) {
        syllabus[i].fileName = req.body.fileName;
        syllabus[i].semester = req.body.semester;
        syllabus[i].filePath = req.file.filePath;
        syllabus[i].updatedAt = new Date();
        await syllabusInDB.save();
        return res.status(200).json({
          message: "Syllabus uploaded successfully",
          successful: true,
        });
      }
    }
    //
    console.log(3);
    syllabusInDB.syllabus = [
      ...syllabusInDB.syllabus,
      {
        fileName: req.body.fileName,
        semester: req.body.semester,
        filePath: req.file.path,
        uploadData: new Date(),
      },
    ];
    await syllabusInDB.save();
    return res
      .status(200)
      .json({ message: "Syllabus uploaded successfully", successful: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again",
      successful: false,
    });
  }
};
