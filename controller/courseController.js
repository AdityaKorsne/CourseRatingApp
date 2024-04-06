const express = require("express");
const router = express.Router();

const data = require("../database/courses.json");
const validator = require("../model/courseModel");
const fs = require("fs");

const app = express();
//new

app.use(router);

router.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

//FETCH ALL COURSES
router.get("/courses", (req, res) => {
  res.status(200).send(data);
});

//FETCH COURSE BY ID
router.get("/course/:id", (req, res) => {
  const courseId = req.params.id;
  let courseById = data.airtribe.find(
    (eachData) => eachData.courseId == courseId
  );
  if (!courseById)
    res.status(404).json({
      Status: "Failed",
      Message: `Course with courseId ${courseId} not found`,
    });
  else res.status(200).send(courseById);
});

//DELETE COURSE BY ID
router.delete("/course/:id", (req, res) => {
  const courseId = req.params.id;
  const courseById = data.airtribe.find(
    (eachData) => eachData.courseId == courseId
  );
  console.log(courseById);
  if (!courseById)
    res.status(404).json({
      Status: "Failed",
      Message: `Course with courseId ${courseId} not found.`,
    });
  else {
    const existData = data;
    const modifiedData = existData.airtribe;
    const index = modifiedData.indexOf(courseById);

    modifiedData.splice(index, 1); //DELETE THE ELEMENT AT GIVEN INDEX AND ALTER THE ORIGINAL ARRAY
    console.log(data.airtribe);
    fs.writeFileSync(
      "./database/courses.json",
      JSON.stringify(existData, null, 2),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );

    res.status(200).json({
      Status: "Successful",
      Message: `Course with id ${courseId} deleted.`,
    });
  }
});

// CREATE COURSE
router.post("/course", (req, res) => {
  let newCourse = req.body;
  const existData = data;
  const allCourses = existData.airtribe;
  const checkSchema = validator.checkProperties(newCourse);
  if (checkSchema.error) {
    res.status(400).send(checkSchema.error.message);
  } else if (!validator.uniqueCourseIdValidation(newCourse, allCourses)) {
    res.status(400).json({
      Status: "Failed",
      Message: `courseId ${newCourse.courseId} already exists.`,
    });
  } else {
    console.log(allCourses);
    allCourses.push(newCourse);
    console.log(allCourses);
    fs.writeFileSync(
      "./database/courses.json",
      JSON.stringify(existData, null, 2),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );
    res.status(200).json({ Status: "successful", Message: "course added" });
  }
});

// UPDATE COURSE
router.patch("/course/:id", (req, res) => {
  const id = req.params.id;
  const index = data.airtribe.findIndex((value) => value.courseId == id);

  if (index == -1) {
    res.status(400).json({
      Status: "failed",
      Message: `Course with courseId ${id} not exists`,
    });
  } else {
    const existData = data;
    const updateData = data.airtribe;
    Object.assign(updateData[index], req.body);
    fs.writeFileSync(
      "./database/courses.json",
      JSON.stringify(existData, null, 2),
      { encoding: "utf-8", flag: "w" }
    );
    res
      .status(200)
      .json({ Status: "Successful", Message: "Course updated successfully" });
  }
});

// GET COURSES BASED ON AVERAGERATING
router.get("/courses/rating/:num", (req, res) => {
  const rating = req.params.num;
  const filterData = data.airtribe.filter(
    (value) => parseFloat(value.averageRating) > parseFloat(rating)
  );
  res.status(200).send(filterData);
});

module.exports = router;
