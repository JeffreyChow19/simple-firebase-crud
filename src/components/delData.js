import FetchData from "../servers/fetchData";
import React, { useRef } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const DelData = () => {
  const peopleData = FetchData();

  const inputStdId = useRef(null);

  const onSubmitHandler = (e) => {
    // prevent default
    e.preventDefault();

    // fetch data from form
    let std_id = inputStdId?.current?.value || "";

    // initialize person's id
    let personId = "";

    let found = false;
    let i = 0;
    while (i < peopleData.length && !found) {
      if (peopleData[i].std_id === std_id) {
        found = true;
        personId = peopleData[i].id;
        break;
      }
      i++;
    }

    if (found) {
      const delRef = doc(getFirestore(), "student", personId);

      deleteDoc(delRef)
        .then(() => {
          document.delForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
      found = false;
    } else {
      alert("Id not found");
    }
  };

  return (
    <>
      <h2>Delete Students</h2>
      <form name="delForm" onSubmit={onSubmitHandler}>
        <label htmlFor="std_id">
          Id :{" "}
          <input type="text" ref={inputStdId} name="std_id" required></input>
        </label>
        <br />
        <button type="submit">Delete Student</button>
      </form>
    </>
  );
};

export default DelData;
