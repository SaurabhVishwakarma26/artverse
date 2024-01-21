"use client";

import Form from "@components/Form";
import Navbar from "@components/Navbar";
import { useState } from "react";

function EditWork() {
  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });
  return (
    <div>
      <Navbar />
      <Form type="Create" work={work} setWork={setWork} />
    </div>
  );
}

export default EditWork;
