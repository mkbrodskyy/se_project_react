import React, { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    // get the name and value of the input because event.target is the input
    const { value, name } = event.target;
    // set the value into the object using the name
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange };
}

export default useForm;
