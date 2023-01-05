import { onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataReference from "./dataReference";

const FetchData = () => {
  const [peopleData, setPeopleData] = useState([]);

  const ref = DataReference();

  // add query to collection
  const queryRef = query(ref, orderBy("std_id"));

  // async fetch data
  useEffect(() => {
    onSnapshot(queryRef, (snapshot) => {
      let people = [];
      snapshot.docs.forEach((person) => {
        people.push({ ...person.data(), id: person.id });
      });

      if (JSON.stringify(people) !== JSON.stringify(peopleData)) {
        setPeopleData(people);
      }
    });
  });

  return peopleData;
};

export default FetchData;
