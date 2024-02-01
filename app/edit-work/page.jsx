"use client";

import Form from "@components/Form";
import Navbar from "@components/Navbar";
import { useState } from "react";

const EditWork = () => {
  return (
    <div>
      <Navbar />
      <Form type="Edit" work={work} setWork={setWork} />
    </div>
  );
};

export default EditWork;
