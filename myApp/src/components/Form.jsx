import React, { useEffect, useState } from "react";
import axios from "axios";
import waves from '../assets/waves.svg'
import boat from '../assets/boat.svg'

const Form = ({ url, provider, setForm }) => {
  const [input, setInput] = useState({ email: "", text: "" });
  const [status, setStatus] = useState({ status: false, data: "" });
  const [errors, setErrors] = useState({ email: "", text: "" });

  const fetchData = async (url) => {
    setStatus({ status: "loading", data: "" });
    try {
      const result = await axios.post(url, {
        email: input.email,
        text: input.text,
      });
      setStatus({ status: result.status, data: result.data });
      console.log(
        `message from server: ${result.data} Status ${result.status}`
      );
    } catch (error) {
      console.log("error", error);
      setStatus({ status: error.response.status, data: error.response.data });
      // const found = Object.values(error.response.data).find(el =>{return (el=='')})
      // console.log('?',error.response.data)
      // url != '/.netlify/functions/mailer' && fetchData('/.netlify/functions/mailer')
    } finally {
      // setStatus(false);
    }
    // fetch("/.netlify/functions/helloworld").then(res=>res.json()).then(data => alert(data.message))
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      email: !input.email
        ? "missing email!"
        : validateEmail()
        ? ""
        : "email is not valid",
      text: !input.text ? "missing text" : "",
    });
    input.email && input.text && validateEmail() && fetchData(url);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div id="order-background" onClick={() => setForm(false)}></div>
      {status.status !== "loading" ? (
        <div id="sending">
          <div>
            <img src={boat} id="boat" />
            <div>
            <img src={waves} className="waves" />
              <img src={waves} className="waves" />
              <img src={waves} className="waves" />
              <img src={waves} className="waves" />
            </div>
          </div>
          <p>SENDING MAIL...</p>
        </div>
      ) : status.status == 250 ? (
        <div id="sending">
          <p>Sucessfuly Sent!</p>
          <p>Check your email account</p>
        </div>
      ) : status.status == 500 ? (
        <div id="sending">
          <p>Mail is not sent</p>
          <p>{status.data}</p>
        </div>
      ) : (
        <div>
          <div id="header">
            <h3>{provider}</h3>
            <p onClick={() => setForm(false)}>X</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div id="inputs-holder">
              <label htmlFor="email">
                recipient's email
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                  className={`${errors.email ? "active" : ""}`}
                />
                <p>{errors.email}</p>
              </label>
              <label htmlFor="text">
                Text
                <input
                  type="text"
                  name="text"
                  value={input.text}
                  onChange={handleInputChange}
                  className={`${errors.text ? "active" : ""}`}
                />
                <p>{errors.text}</p>
              </label>
              <label htmlFor="text">
                Text
                <input
                  type="text"
                  name="text"
                  value={input.text}
                  disabled
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="text">
                Text
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={input.text}
                  disabled
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {/* <h4>email: {input.email}</h4>
      <h4>text: {input.text}</h4> */}
            <button type="submit">button</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
