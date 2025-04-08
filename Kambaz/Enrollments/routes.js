import Database from "../Database/index.js";
import * as enrollmentDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.get("/api/users/current/courses", async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          return res.status(401).send("Not logged in");
        }
      
        try {
          const enrollments = await enrollmentDao.findEnrollmentsByStudent(currentUser._id);
          const courses = enrollments.map((e) => e.course);
          res.json(courses);
        } catch (err) {
          console.error(err);
          res.status(500).send("Server error fetching enrolled courses");
        }
      });
}