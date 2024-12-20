import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Screen25() {
  const {pnumber, condition,lastRoundCumulativeComp} = useParams()
  const [response, setResponse] = useState('')

  const navigate = useNavigate()

  const handleResponse = (event) => {
    setResponse(event.target.value);
  };

  const clickedNext = async() => {
    await axios.post(`${REACT_APP_BACKEND_URL}/generate/postresponse`,{pnumber, condition, response, 'token': localStorage.getItem('token')},{withCredentials:true})
    .then((res)=>{
      console.log(19)
      navigate(`/screen27/${pnumber}/${condition}/${lastRoundCumulativeComp}`)
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

  useEffect(()=>{
    verifyUser()
  },[])
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "#6AD4DD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          height:'max-content',
          width: "190rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem",
          fontSize: "2.3rem",
        }}
      >
        <div
          style={{
            color: "aliceblue",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          <u>POST STUDY QUESTIONS</u> 
        </div>
        <div
          style={{
            fontSize: "2.3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "2rem",
            color: "#6AD4DD",
            textAlign: "left",
          }}
        >
          <div>
          Recall that you played the role of Customer today.
          </div>
          <div style={{paddingBottom:'0.3rem'}}>
          Given your experience today, please describe the reasons why you chose the amount of tips to pay the Worker? 
            </div>
            <textarea
              value={response}
              onChange={handleResponse}
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
                resize: "vertical",
              }}
            />
          <div
              style={{
                cursor: 'pointer',
                margin: 'auto',
                marginTop: '2rem',
                width: '5rem',
                borderRadius: '0.2rem',
                height: '3rem',
                fontSize: '2.3rem',
                color: 'black',
                backgroundColor: '#6AD4DD',
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
  );
}

export default Screen25;
