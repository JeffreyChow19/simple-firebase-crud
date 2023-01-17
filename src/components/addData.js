import React, { useRef } from "react";
import FetchData from "../servers/fetchData";
import DataReference from "../servers/dataReference";
import { addDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const AddData = () => {
  const { t } = useTranslation();

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

    const ftiMajors = [
      "Chemical Engineering",
      "Engineering Physics",
      "Industrial Engineering",
      "Engineering Management",
      "Bioengineering and Chemurgy",
      "Food Engineering",
    ];

    const sbmMajors = ["Management", "Entrepreneurship"];
    const noMajors = [];

    let target = e.target.value;
    let faculty = "";

    document.getElementById(
      "majorOptions"
    ).innerHTML = `<option value="">None</option>`;
    switch (target) {
      case "STEI":
        faculty = steiMajors;
        break;
      case "FTI":
        faculty = ftiMajors;
        break;
      case "SBM":
        faculty = sbmMajors;
        break;
      default:
        faculty = noMajors;
        break;
    }

    faculty.forEach((major) => {
      document.getElementById(
        "majorOptions"
      ).innerHTML += `<option value="${major}">${major}</option>`;
    });
  };

  return (
    <div className="w-[350px] h-fit border-2 border-solid rounded-[20px] border-black dark:border-white p-6 pb-12 m-6">
      <h2 className="text-center font-bold text-[2em] mb-[20px] ">
        {t("add")}
      </h2>
      <form
        name="addForm"
        className="flex flex-col items-center"
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="firstname" className="w-[85%]">
          <h3 className="font-semibold">{t("firstname")}</h3>
          <input
            type="text"
            className="w-[100%] border-[1.5px] rounded-[8px] border-gray-400 p-1 pl-3 mt-1 dark:text-black"
            ref={inputFirstName}
            name="firstname"
            placeholder="John"
            required
          ></input>
        </label>
        <br />
        <label htmlFor="lastname" className="w-[85%]">
          <h3 className="font-semibold">{t("lastname")}</h3>
          <input
            type="text"
            className="w-[100%] border-[1.5px] rounded-[8px] border-gray-400 p-1 pl-3 mt-1 dark:text-black"
            ref={inputLastName}
            placeholder="Doe"
            name="lastname"
            required
          ></input>
        </label>
        <br />
        <label
          htmlFor="faculty"
          className="w-[85%]"
          onChange={OnFacultyChanged}
        >
          <h3 className="font-semibold">{t("faculty")}</h3>
          <select
            className="w-[100%] border-[1.5px] text-black dark:text-black rounded-[8px] border-gray-400 p-1 pl-2 mt-1"
            name="faculty"
            id="facultyOptions"
            ref={inputFaculty}
            required
          >
            <option value="">None</option>
            <option value="STEI">STEI</option>
            <option value="FTI">FTI</option>
            <option value="SBM">SBM</option>
          </select>
        </label>
        <br />
        <label htmlFor="major" className="w-[85%]">
          <h3 className="font-semibold">{t("major")}</h3>
          <select
            className="w-[100%] border-[1.5px] text-black dark:text-black rounded-[8px] border-gray-400 p-1 pl-2 mt-1"
            name="major"
            id="majorOptions"
            ref={inputMajor}
            required
          >
            <option value="">None</option>
          </select>
        </label>
        <br />
        <label htmlFor="std_id" className="w-[85%]">
          <h3 className="font-semibold">{t("id")}</h3>
          <input
            className="w-[100%] border-[1.5px] pl-3 rounded-[8px] border-gray-400 p-1 mt-1 dark:text-black"
            type="text"
            ref={inputStdId}
            placeholder="77788999"
            name="std_id"
            required
          ></input>
        </label>
        <br />
        <button className="bg-black text-white font-bold border-2 p-2 pl-6 pr-6 border-gray-400 rounded-[15px]">
          {t("add")}
        </button>
      </form>
    </div>
  );
};

export default AddData;
