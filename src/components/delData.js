import FetchData from "../servers/fetchData";
import React, { useRef } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const DelData = () => {
  const { t } = useTranslation();

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
    <div className="w-[350px] h-fit border-2 border-solid rounded-[20px] border-black p-6 pb-12 m-6 dark:border-white">
      <h2 className="text-center font-bold text-[2em] mb-[20px] ">
        {t("delete")}
      </h2>
      <form
        name="delForm"
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center"
      >
        <label htmlFor="std_id" className="w-[85%]">
          <h3 className="font-semibold">{t("id")}</h3>
          <input
            className="w-[100%] border-[1.5px] rounded-[8px] border-gray-400 p-1 pl-3 mt-1"
            type="text"
            ref={inputStdId}
            placeholder="77788999"
            name="std_id"
            required
          ></input>
        </label>
        <br />
        <button
          className="bg-black text-white font-bold border-2 p-2 pl-6 pr-6 border-gray-400 rounded-[15px]"
          type="submit"
        >
          {t("delete")}
        </button>
      </form>
    </div>
  );
};

export default DelData;
