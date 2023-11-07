import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [input, setInput] = useState();

  const fetchData = async () => {
    const result = await axios.get("/.netlify/functions/helloworld");
    alert(`message from server: ${result}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(input);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={input}
        onChange={handleInputChange}
      />
      <button type="submit"></button>
    </form>
  );
};

export default Form;
