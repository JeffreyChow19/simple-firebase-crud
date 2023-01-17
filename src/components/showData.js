import React, { useState } from "react";
import FetchData from "../servers/fetchData";
import { useTranslation } from "react-i18next";

const ShowData = () => {
  const { t } = useTranslation();

  let peopleData = FetchData();

  const [searchQuery, setSearchQuery] = useState("");

  const search = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-fit max-w-5xl h-fit border-2 border-solid rounded-[20px] border-black p-12 pt-6 m-6 dark:border-white overflow-x-auto">
      <h2 className="text-center font-bold text-[2em] mb-[20px] ">
        {t("list")}
      </h2>
      <input
        type="text"
        className="w-[100%] border-[1.5px] rounded-[8px] border-gray-400 p-1 pl-3 mt-1 mb-3 dark:text-black"
        placeholder="Search anything here..."
        name="search-bar"
        onChange={(e) => search(e.target.value)}
      ></input>
      <table className="table-auto ">
        <tbody>
          <tr className=" border-b-[1px]">
            <th className="text-center pl-4 pr-4">{t("id")}</th>
            <th className="text-center pl-4 pr-4">{t("firstname")}</th>
            <th className="text-center pl-4 pr-4">{t("lastname")}</th>
            <th className="text-center pl-4 pr-4">{t("faculty")}</th>
            <th className="text-center pl-4 pr-4">{t("major")}</th>
          </tr>
          {peopleData
            .filter((person) => {
              return (
                person.std_id.match(searchQuery) ||
                person.firstname.toLowerCase().match(searchQuery) ||
                person.lastname.toLowerCase().match(searchQuery) ||
                person.faculty.toLowerCase().match(searchQuery) ||
                person.major.toLowerCase().match(searchQuery)
              );
            })
            .map((person, i) => {
              return (
                <tr key={i}>
                  <td className="pl-4 pr-4">{person.std_id}</td>
                  <td className="pl-4 pr-4">{person.firstname}</td>
                  <td className="pl-4 pr-4">{person.lastname}</td>
                  <td className="pl-4 pr-4">{person.faculty}</td>
                  <td className="pl-4 pr-4">{person.major}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowData;
