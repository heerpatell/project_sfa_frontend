import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function QuestionScale({ question, name, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value); 
  };

  const verifyUser = () => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/generate/getlink`, { 'token': localStorage.getItem('token') }, {
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
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ color: "#1c1c1c", marginBottom: "0.5rem" }}>{question}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Array.from({ length: 7 }, (_, i) => i + 1).map(value => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`${name}-${value}`}
              name={name}
              value={value}
              checked={selectedValue === value.toString()}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor={`${name}-${value}`}
              style={{
                display: "block",
                padding: "0.5rem",
                cursor: "pointer",
                border: "none",
                borderRadius: "3px",
                textAlign: "center",
                backgroundColor: selectedValue === value.toString() ? "#1c1c1c" : "white",
                color: selectedValue === value.toString() ? "white" : "black",
              }}
            >
              {value}
            </label>
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.2rem', color: '#1c1c1c', fontSize: '2.3rem', paddingBottom: '0.5rem' }}>
        <div>Not at all</div>
        <div>Somewhat</div>
        <div>Very much</div>
      </div>
      <hr />
      <br />
    </div>
  );
}

function Screen24() {
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();
  const { pnumber, condition, lastRoundCumulativeComp } = useParams();
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleScaleChange = (name, value) => {
    setResponses(prev => ({ ...prev, [name]: value }));
  };

  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    if (condition === "Fixed Condition") setShowFc(true);
    if (condition === "Service Charge") setShowSC(true);
    if (condition === "Pre-Tip") setShowPre(true);
    if (condition === "Post-Tip") setShowPost(true);
  }, [condition]);

  useEffect(() => {
    // Check if all required responses are filled
    if (responses.TipReason_Effort && responses.TipReason_SocialImage && responses.TipReason_SocialNorm) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [responses]);


  const clickedNext = () => {
    console.log("Responses:", responses);
    axios
      .post(`${REACT_APP_BACKEND_URL}/generate/saveresponsesforscreen23`, { pnumber, 'token': localStorage.getItem('token'), condition, ...responses }, {
        withCredentials: true,
      })
      .then((res)=>{
        console.log(125, res.data)
        navigate(`/screen25c/${pnumber}/${condition}/${lastRoundCumulativeComp}`);
      })
      .catch((error) => {
        console.error("Error saving responses", error);
      });
  };

  const allQuestionsAnswered = () => {
    const requiredQuestions = ["TipReason_Effort", "TipReason_SocialImage", "TipReason_SocialNorm"];
    return requiredQuestions.every((question) => responses[question] !== undefined);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "aliceblue",
        color: "#1c1c1c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          height:'max-content',
          width: "100rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem",
          fontSize: "2.3rem",
        }}
      >
        <div
          style={{
            color: "#1c1c1c",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          <u><b>POST-STUDY QUESTIONS</b></u>
        </div>
        <div
          style={{
            fontSize: "2.3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "2rem",
            color: "#1c1c1c",
            textAlign: "left",
          }}
        >
          <div>
            <QuestionScale
              question="1. To what extent was the tip you chose to pay the Worker affected by their effort level? "
              name="TipReason_Effort"
              onChange={(value) => handleScaleChange("TipReason_Effort", value)}
            />
            <QuestionScale
              question="2. To what extent was the tip you chose to pay the Worker affected by the social pressure to tip? "
              name="TipReason_SocialImage"
              onChange={(value) => handleScaleChange("TipReason_SocialImage", value)}
            />
            <QuestionScale
              question="3. To what extent was the tip you chose to pay the Worker affected by how other Customers normally tip Workers?"
              name="TipReason_SocialNorm"
              onChange={(value) => handleScaleChange("TipReason_SocialNorm", value)}
            />
          </div>

          <div
            style={{
              fontSize: "2.3rem",
              display: "flex",
              flexDirection: "column",
              color:'#1c1c1c',
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
                cursor: isNextEnabled ? 'pointer' : 'not-allowed',
                opacity: isNextEnabled ? 1 : 0.5,
                margin: 'auto',
                marginTop: '2rem',
                width: '8rem',
                borderRadius: '0.2rem',
                height: '4rem',
                fontSize: '2.3rem',
                color: 'aliceblue',
                backgroundColor: '#1c1c1c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={allQuestionsAnswered() ? clickedNext : undefined} 
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Screen24;