import React from "react";
import { connect } from "react-redux";
import thunks from "../../store/thunks";
import SmallStudenCard from "../student/SmallStudenCard";
const SingleCampus = ({ campus, students, history, destroy }) => {
  return (
    <main className="single-campus-view">
      <section className="single-campus-info">
        <div className="image-with-info">
          <section className="single-view-img">
            <img src={campus.imageUrl} className="campus-img" />
          </section>
          <section className="single-campus-name-bio">
            <h1>{campus.name}</h1>
            <p className="campus-description">{campus.description}</p>
            <section className="tools">
              <h3>{campus.address}</h3>
              <div className="campus-btns">
                <button
                  className="single-view-edit"
                  onClick={() => history.push(`/campuses/update/${campus.id}`)}
                >
                  edit
                </button>
                <button
                  className="single-view-delete"
                  onClick={() => destroy(campus)}
                >
                  delete
                </button>
              </div>
            </section>
          </section>
        </div>
      </section>

      <section className="students-on-campus">
        <div className="campus-view-sub-header">
          <h2>Students on campus</h2>
          <button
            className="add-btn"
            onClick={() => history.push(`/campuses/update/${campus.id}`)}
          >
            Add Student
          </button>
        </div>
        <ul className="students-on-campus-list">
          {students.length
            ? students.map((student) => (
                <SmallStudenCard key={student.id} student={student} />
              ))
            : "No students are currentley enrolled"}
        </ul>
      </section>
    </main>
  );
};

export default connect(
  (state, otherProps) => {
    const campus =
      state.campuses.find(
        (campus) => campus.id === otherProps.match.params.id * 1
      ) || {};
    const students =
      state.students.filter((student) => student.campusId === campus.id) || [];
    const { history } = otherProps;
    return {
      campus,
      students,
      history,
    };
  },
  (dispatch, { history }) => {
    const { unregisterStudent } = thunks.student;
    const { destroyCampus } = thunks.campus;
    return {
      unregister: (id) => dispatch(unregisterStudent(id)),
      destroy: (campus) => dispatch(destroyCampus(campus, history)),
    };
  }
)(SingleCampus);
