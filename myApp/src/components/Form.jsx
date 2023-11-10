import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [input, setInput] = useState({ email: "", text: "" });

  const fetchData = async () => {
    try {
      const result = await axios.post("/.netlify/functions/mailer", {
        email: input.email,
        text: input.text,
      });
      console.log(`message from server: ${result.data}`);
      alert(result.data)
    } catch (error) {
      console.log(error);
      alert(error.response.data)
    }
    // fetch("/.netlify/functions/helloworld").then(res=>res.json()).then(data => alert(data.message))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Username</label>
      <input
        type="text"
        id="email"
        name="email"
        value={input.email}
        onChange={handleInputChange}
      />
      <label htmlFor="text">Text</label>
      <input
        type="text"
        id="text"
        name="text"
        value={input.text}
        onChange={handleInputChange}
      />
      <h4>email: {input.email}</h4>
      <h4>text: {input.text}</h4>
      <button type="submit">button</button>
    </form>
  );
};

export default Form;
