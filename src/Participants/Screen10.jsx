import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Screen10() {
  const { pnumber, condition } = useParams();
  const navigate = useNavigate();

  const clickedNext = () => {
    axios.post(`${REACT_APP_BACKEND_URL}/generate/screen11reachedcountincrease`,{'token': localStorage.getItem('token')},{
      withCredentials:true
    })  
    .then(async(res)=>{
      if(res.data.msg == 'activeAtMoment'){
        console.log(15, res.data)
      }
      console.log(17, res.data)
      navigate(`/screen11/${pnumber}/${condition}/${res.data.activeatpg11}`);
    })
  };
  const verifyUser = () => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/generate/getlink`,{'token': localStorage.getItem('token')}, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(21, res.data);
        if (res.data.msg === "access denied") {
          navigate("/notfound");
        }
      })
      .catch((e) => {
        navigate("/notfound");
      });
  };
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "aliceblue",
          color: "#1c1c1c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            fontSize: "1.4rem",
          }}
        >
          <div
            style={{
              color: "#1c1c1c",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            <b>Starting Page</b>
          </div>
          <div style={{ fontSize: "1.2rem" }}>Let's start!</div>
          <div style={{ fontSize: "1.2rem" }}>
              You have completed the practice round.
          </div>
          <div style={{ fontSize: "1.2rem" }}>
              From the moment you enter the next screen, the real stage of the study starts.
          </div>

          <div style={{ fontSize: "1.2rem" }}>
            Please click ‘Next’ to continue.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                cursor: 'pointer',
                margin: 'auto',
                marginTop: '2rem',
                width: '5rem',
                borderRadius: '0.2rem',
                height: '3rem',
                fontSize: '1.4rem',
                color: 'aliceblue',
                backgroundColor: '#1c1c1c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={clickedNext}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Screen10;
