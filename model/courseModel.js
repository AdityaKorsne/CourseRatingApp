const joi = require("joi");

function checkProperties(newCourse) {
  const courseSchema = joi.object({
    course: joi.string().required(),
    courseId: joi.string().required(),
    mentor: joi.string().required(),
    job: joi.string().required(),
    averageRating: joi.string().required(),
  });
  return courseSchema.validate(newCourse);
}

function uniqueCourseIdValidation(newCourse, allCourses) {
  let course = allCourses.find((value) => value.courseId == newCourse.courseId);
  if (!course) return true;
  return false;
}

module.exports = { uniqueCourseIdValidation, checkProperties };
