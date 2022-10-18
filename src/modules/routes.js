const { Router } = require("express");
const universities = require('./university/university.route.js')
const courses = require('./course/course.route')
const application = require('./application/application.route')







module.exports = () => {
  const router = Router();

  router.use('/university', universities)
  router.use('/course', courses)
  router.use('/application', application)


  return router;
};
