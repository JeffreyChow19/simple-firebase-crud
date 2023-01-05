import React from "react";
import FetchData from "../servers/fetchData";

const ShowData = () => {
  let peopleData = FetchData();
  return (
    <>
      <h2>Table of students</h2>
      <table className="table-auto">
        <tbody>
          <tr>
            <th>Student Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Faculty</th>
            <th>Major</th>
          </tr>
          {peopleData.map((person, i) => {
            return (
              <tr key={i}>
                <td>{person.std_id}</td>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td>{person.faculty}</td>
                <td>{person.major}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ShowData;
