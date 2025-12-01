import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './StudentForm.css';

function StudentForm() {
  const [submitData, setSubmitData] = React.useState([]);

  const studentForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      gender: "",
      age: "",
      techs: [],
      country: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string()
        .required("Firstname is mandatory")
        .max(7, "Maximum 10 letters allowed"),
      lastname: Yup.string().required("Lastname is mandatory"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/,
          "Password must include uppercase, lowercase, number, special character and 8-16 chars"
        ),
      gender: Yup.string().required("Gender is required"),
      age: Yup.number()
        .required("Age is required")
        .test("checkAge", "Not eligible", function (value) {
          const gender = this.parent.gender;
          if (gender === "male" && value === 25) return true;
          if (gender === "female" && value === 21) return true;
          return false;
        }),
      country: Yup.string().required("Country is required"),
      techs: Yup.array().min(1, "Select at least one technology"),
    }),

    onSubmit: (values, { resetForm }) => {
      setSubmitData([...submitData, values]);
      resetForm();
    },
  });

  const handleTechChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      studentForm.setFieldValue("techs", [...studentForm.values.techs, value]);
    } else {
      studentForm.setFieldValue(
        "techs",
        studentForm.values.techs.filter((t) => t !== value)
      );
    }
  };

  return (
    <div className="container mt-3 p-3 shadow rounded border-1 border-dark">
      <h1 className="mb-4">Student Form</h1>
      <form onSubmit={studentForm.handleSubmit}>
        <div className="mb-3">
          <label>Firstname:</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            onChange={studentForm.handleChange}
            onBlur={studentForm.handleBlur}
            value={studentForm.values.firstname}
          />
          {studentForm.touched.firstname && studentForm.errors.firstname && (
            <div className="text-danger">{studentForm.errors.firstname}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Lastname:</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            onChange={studentForm.handleChange}
            onBlur={studentForm.handleBlur}
            value={studentForm.values.lastname}
          />
          {studentForm.touched.lastname && studentForm.errors.lastname && (
            <div className="text-danger">{studentForm.errors.lastname}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={studentForm.handleChange}
            value={studentForm.values.password}
          />
          {studentForm.touched.password && studentForm.errors.password && (
            <div className="text-danger">{studentForm.errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Gender:</label> <br />
          {["male", "female", "others"].map((g) => (
            <div className="form-check form-check-inline" key={g}>
              <input
                type="radio"
                name="gender"
                value={g}
                className="form-check-input"
                onChange={studentForm.handleChange}
                checked={studentForm.values.gender === g}
              />
              <label className="form-check-label">{g}</label>
            </div>
          ))}
          {studentForm.touched.gender && studentForm.errors.gender && (
            <div className="text-danger">{studentForm.errors.gender}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            className="form-control"
            onChange={studentForm.handleChange}
            value={studentForm.values.age}
          />
          {studentForm.touched.age && studentForm.errors.age && (
            <div className="text-danger">{studentForm.errors.age}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Technologies:</label> <br />
          {["HTML", "CSS", "Javascript", "Nodejs", "Angularjs", "Reactjs"].map(
            (tech) => (
              <div className="form-check form-check-inline" key={tech}>
                <input
                  type="checkbox"
                  name="techs"
                  value={tech}
                  className="form-check-input"
                  onChange={handleTechChange}
                  checked={studentForm.values.techs.includes(tech)}
                />
                <label className="form-check-label">{tech}</label>
              </div>
            )
          )}
          {studentForm.touched.techs && studentForm.errors.techs && (
            <div className="text-danger">{studentForm.errors.techs}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Country:</label>
          <select
            name="country"
            className="form-select"
            onChange={studentForm.handleChange}
            value={studentForm.values.country}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="America">America</option>
            <option value="Sweden">Sweden</option>
            <option value="UK">UK</option>
          </select>
          {studentForm.touched.country && studentForm.errors.country && (
            <div className="text-danger">{studentForm.errors.country}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Show Data
        </button>
        <button
          type="reset"
          className="btn btn-secondary"
          onClick={() => studentForm.resetForm()}
        >
          Clear Data
        </button>
      </form>

      {submitData.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Technologies</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {submitData.map((data, i) => (
              <tr key={i}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.gender}</td>
                <td>{data.age}</td>
                <td>{data.techs.join(", ")}</td>
                <td>{data.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentForm;
