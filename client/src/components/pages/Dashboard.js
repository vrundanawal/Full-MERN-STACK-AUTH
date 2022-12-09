import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  const populateData = async () => {
    const req = await fetch("http://localhost:1337/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  };
  //to verify user is logged in or not
  useEffect(() => {
    //get the token
    const token = localStorage.getItem("token");
    //check the token with decoded value
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        //window.location.href = "/";
        history.replace("/login");
      } else {
        //when user is exists then populate the data
        populateData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //updateQuoteHandler
  const updateQuoteHandler = async (event) => {
    event.preventDefault();

    const req = await fetch("http://localhost:1337/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Your quote : {quote || "No quote found"}</h1>
      <form onSubmit={updateQuoteHandler}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update quote" />
      </form>
    </div>
  );
};

export default Dashboard;
