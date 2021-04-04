import React from "react";
import { connect, useDispatch } from "react-redux";
import UpdateCampusForm from "./forms/UpdateCampusForm";
import StudentRow from "../student/StudentRow";
import AddStudentCampusForm from "./forms/AddStudentCampusForm";

const UpdateCampus = ({ campus, history, students }) => {
  return (
    <main className="update-view" id="update-campus-view">
      <h1>Update campus</h1>
      <UpdateCampusForm campus={campus} history={history} />
      <h2>Students on Campus</h2>
      <AddStudentCampusForm students={students} campus={campus} />
      <ul className="edit-students-on-campus">
        {Object.keys(campus).includes("students")
          ? campus.students.map((student) => (
              <StudentRow key={student.id * 10} student={student} />
            ))
          : "No Students "}
      </ul>
    </main>
  );
};

export default connect(({ campuses, students }, { match, history }) => {
  const campus =
    campuses.find((campus) => campus.id === match.params.id * 1) || {};
  return {
    campus,
    students,
    history,
  };
})(UpdateCampus);
