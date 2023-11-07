import React, { useState } from "react";

const Form = () => {
  const [input, setInput] = useState()

  const handleSubmit = (e) =>{
    e.preventDefault();
    alert(input)
  }

  const handleInputChange = (e) =>{
    const value = e.target.value
    setInput(value)
    
  }


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
