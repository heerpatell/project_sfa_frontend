import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Screen21() {
  const navigate = useNavigate()
  const {pnumber, condition,lastRoundCumulativeComp} = useParams()
  
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
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
    // console.log(26, pnumber, condition)
    if (condition === "Fixed Condition") {
      setShowFc(true);
    }
    if (condition === "Service Charge") {
      setShowSC(true);
    }
    if (condition === "Pre-Tip") {
      setShowPre(true);
    }
    if (condition === "Post-Tip") {
      setShowPost(true);
    }
    verifyUser()
  },[])

const clickedNext = async() =>{
  console.log(30, pnumber, condition)
  await axios.post(`${REACT_APP_BACKEND_URL}/generate/postamount`,{'token':localStorage.getItem('token'), lastRoundCumulativeComp, pnumber, condition} ,{
    withCredentials: true,
  })
  .then((res)=>{

  })
  const categoryRes = await axios.post(`${REACT_APP_BACKEND_URL}/generate/getassignedcategory`, { pnumber, 'token': localStorage.getItem('token') }, { withCredentials: true });
  if(categoryRes.data.assignedCategory === 'Customer'){
    if(showPre || showPost){
      navigate(`/screen24/${pnumber}/${condition}/${lastRoundCumulativeComp}`)
    }else{
      navigate(`/screen27/${pnumber}/${condition}/${lastRoundCumulativeComp}`)
    }
  }else{
    navigate(`/screen22/${pnumber}/${condition}/${lastRoundCumulativeComp}`)
  } 
}
  return (
    <>
    <div style={{
          height: "100vh",
          backgroundColor: "aliceblue",
          color: "#6AD4DD",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}>
            <div style={{
            width: "50rem",
            display: "flex",
            flexDirection: "column",  
            gap: "1.4rem",
            fontSize: "1.4rem",
          }}>
            <div style={{
              color: "#1c1c1c",
              fontSize: "1.5rem",
              textAlign: "center",
            }}>
                <div style={{fontSize:'2rem'}}><u><b>POST-STUDY QUESTIONS</b></u></div>
                <div style={{
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#1c1c1c",
                textAlign: "left",
              }}>

              <div>Now you have completed the task. </div>
              <div>In the following pages, you will be asked to complete a short questionnaire. Please respond to each question as descriptively as possible. Your responses will assist us greatly in understanding this study.</div>
              
                <div
                style={{
                  fontSize: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
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
                    color: 'black',
                    backgroundColor: '#1c1c1c',
                    color:'aliceblue',
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
            </div>
    </div>
    </>
  )
}

export default Screen21
