"use client";

import { categories } from "@data";
import { useEffect, useState } from "react";
import Worklist from "./Worklist";
import "@styles/Categories.scss";
import { Loader } from "./Loader";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [worklist, setWorklist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWorklist = async () => {
    const data = await fetch(`/api/work/list/${selectedCategory}`);
    setWorklist(data);
    setLoading(false);
  };

  useEffect(() => {
    getWorklist();
  }, [selectedCategory]);
  console.log("Worklist loaded", worklist);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="categories">
        {categories.map((item, index) => (
          <p
            onClick={() => {
              setSelectedCategory(item);
            }}
            className={`${item === selectedCategory ? "selected" : ""}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      <Worklist data={worklist} />
    </>
  );
};

export default Feed;
