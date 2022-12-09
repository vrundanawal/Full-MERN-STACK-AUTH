import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const populateData = async () => {
    const req = await fetch("http://localhost:1337/api/data", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json();
    console.log(data);
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
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
