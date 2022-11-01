const { Router } = require("express");
const universities = require('./university/university.route.js')
const courses = require('./course/course.route')
const application = require('./application/application.route')
const course_class = require('./class/class.route')
const reviews = require('./review/review.route')
const users = require("./user/user.route");
const admin_admin = require("./admin/admin/admin-admin.route");
const admin_course = require("./admin/course/admin-course.route");
const admin_university = require('./admin/university/admin-university.route')
const admin_program = require('./admin/program/admin-program.route')
const admin_class = require('./admin/class/admin-class.route.js')
const admin_application = require('./admin/application/admin-application.route')







module.exports = () => {
  const router = Router();

  router.use('/university', universities)
  router.use('/course', courses)
  router.use('/application', application)
  router.use('/class', course_class)
  router.use("/user", users);
  router.use('/review', reviews)

  // admin routes
  router.use("/admin", admin_admin);
  router.use("/admin/course", admin_course);
  router.use("/admin/university", admin_university);
  router.use("/admin/program", admin_program);
  router.use('/admin/class', admin_class)
  router.use('/admin/applications', admin_application)






  return router;
};
