import React, { useRef } from "react";
import FetchData from "../servers/fetchData";
import DataReference from "../servers/dataReference";
import { addDoc } from "firebase/firestore";

const AddData = () => {
  const ref = DataReference();
  const peopleData = FetchData();

  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputFaculty = useRef(null);
  const inputMajor = useRef(null);
  const inputStdId = useRef(null);

  const onSubmitHandler = (e) => {
    // prevent default
    e.preventDefault();

    // fetch data from form
    let firstname = inputFirstName?.current?.value || "";
    let lastname = inputLastName?.current?.value || "";
    let faculty = inputFaculty?.current?.value || "";
    let major = inputMajor?.current?.value || "";
    let std_id = inputStdId?.current?.value || "";

    // check if id is double
    let double = false;
    let i = 0;
    while (i < peopleData.length && !double) {
      if (peopleData[i].std_id === std_id) {
        alert("Id is double!");
        double = true;
        break;
      }
      i++;
    }

    if (!double) {
      addDoc(ref, {
        firstname: firstname,
        lastname: lastname,
        faculty: faculty,
        major: major,
        std_id: std_id,
      })
        .then(() => {
          document.addForm.reset();
          console.log("succeded append data");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // will change using API
  const OnFacultyChanged = (e) => {
    // list of majors
    const steiMajors = [
      "Informatics Engineering",
      "Information System and Technology",
      "Electrical Engineering",
      "Telecommunication Engineering",
      "Biomedical Engineering",
      "Power Engineering",
    ];

    let target = e.target.value;
    console.log(target);

    document.getElementById(
      "majorOptions"
    ).innerHTML = `<option value="">None</option>`;
    switch (target) {
      case "STEI":
        steiMajors.forEach((major) => {
          document.getElementById(
            "majorOptions"
          ).innerHTML += `<option value="${major}">${major}</option>`;
        });
        break;
      case "FTI":
        break;
      case "FTMD":
        break;
      case "SBM":
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h2>Add Students</h2>
      <form name="addForm" onSubmit={onSubmitHandler}>
        <label htmlFor="firstname">
          FirstName :{" "}
          <input
            type="text"
            ref={inputFirstName}
            name="firstname"
            required
          ></input>
        </label>
        <br />
        <label htmlFor="lastname">
          LastName :{" "}
          <input
            type="text"
            ref={inputLastName}
            name="lastname"
            required
          ></input>
        </label>
        <br />
        <label htmlFor="faculty" onChange={OnFacultyChanged}>
          Faculty :{" "}
          {/* <input type="text" ref={inputFaculty} name="faculty" required></input> */}
          <select
            name="faculty"
            id="facultyOptions"
            ref={inputFaculty}
            required
          >
            <option value="">None</option>
            <option value="STEI">STEI</option>
            <option value="FTI">FTI</option>
            <option value="FTMD">FTMD</option>
            <option value="SBM">SBM</option>
          </select>
        </label>
        <br />
        <label htmlFor="major">
          Major :{" "}
          {/* <input type="text" ref={inputMajor} name="major" required></input> */}
          <select name="major" id="majorOptions" ref={inputMajor} required>
            <option value="">None</option>
          </select>
        </label>
        <br />
        <label htmlFor="std_id">
          Id :{" "}
          <input type="text" ref={inputStdId} name="std_id" required></input>
        </label>
        <br />
        <button>Add Student</button>
      </form>
    </>
  );
};

export default AddData;
