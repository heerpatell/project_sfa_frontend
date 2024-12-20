import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Screen15() {
  const navigate = useNavigate();
  let { pnumber, condition, currentround } = useParams();
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [effort, setEffort] = useState();
  if (currentround == 0) {
    currentround = "Practice Round";
  }
  const verifyUser = () => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/generate/getlink`,{'token': localStorage.getItem('token')}, {
        withCredentials: true,
      })
      .then(async(res) => {
        console.log(21, res.data);
        if (res.data.msg === "access denied") {
          navigate("/notfound");
        }else{
        await axios
      .post(
        `${REACT_APP_BACKEND_URL}/generate/geteffortlevel`,
        { pnumber, currentround,'token': localStorage.getItem('token') },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(36, res.data.effort);
        setEffort(res.data.effort);
      });
        }
        
      })
      .catch((e) => {
        navigate("/notfound");
      });
  };
  useEffect(() => {
    verifyUser() 
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
  }, []);

  const clickedNext = () => {
    if (condition === "Post-Tip") {
      navigate(`/screen16/${pnumber}/${condition}/${currentround}`);
    } else {
      navigate(`/screen18/${pnumber}/${condition}/${currentround}`);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "aliceblue",
          color: "#1c1c1c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
              fontSize: "2.3rem",
              textAlign: "center",
            }}
          >
            <div style={{ paddingBottom: "1.3rem", fontSize: '3rem' }}>
            <u style={{ textTransform: "uppercase" }}>
            {
      currentround === 'Practice Round' ? (
        <b>CUSTOMER PAYOFF &nbsp;|&nbsp; {currentround}</b>
      ) : (
        <b>CUSTOMER PAYOFF &nbsp;|&nbsp; ROUND {currentround}</b>
      )
    }
            </u>

            </div>
            <div
              style={{
                textAlign: "left",
                color: "#1c1c1c",
                fontSize: "2.3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                As a Customer, recall, your payoff in this round is calculated as
                follows:{" "}
              </div>
              {showFC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service
                  </div>
                  <div>Where, </div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200{" "}
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service, which in turn is
                    determined by the Worker’s effort level. That is, the higher
                    the effort level the Worker chooses to serve you, the higher
                    your level of satisfaction with the Worker’s service.
                  </div>
                </div>
              )}
              {showSC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service – Service
                    Charge Paid to the Worker
                  </div>
                  <div>Where,</div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200
                  </div>
                  <div style={{ textAlign: "center" }}>
                    Service Charge Paid to the Worker = 40
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service minus the service
                    charge paid to the Worker. Your level of satisfaction with
                    the Worker’s service is determined by the Worker’s effort
                    level. That is, the higher the effort level the Worker
                    chooses to serve you, the higher your level of satisfaction
                    with the Worker’s service.
                  </div>
                  <div>
                    Please note that you will pay a fixed amount of service
                    charge of 40 tokens to the Worker in each round, regardless
                    of how the Worker serves you.
                  </div>
                </div>
              )}
              {/* {showPre && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service – Tip Paid
                    to the Worker
                  </div>
                  <div>Where,</div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service minus the tip paid to
                    the Worker. Your level of satisfaction with the Worker’s
                    service is determined by the Worker’s effort level. That is,
                    the higher the effort level the Worker chooses to serve you,
                    the higher your level of satisfaction with the Worker’s
                    service.
                  </div>
                  <div>
                    Please note that you will decide how much to tip the Worker
                    in each round. The amount of tip can range from zero up to
                    80 tokens. That is, you can tip nothing, can tip a maximum
                    of 80 tokens, or can tip anywhere in between. Importantly,
                    you tip the Worker after he/she serves you.
                  </div>
                </div>
              )} */}

              {showPost && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service – Tip Paid
                    to the Worker
                  </div>
                  <div>Where,</div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service minus the tip paid to
                    the Worker. Your level of satisfaction with the Worker’s
                    service is determined by the Worker’s effort level. That is,
                    the higher the effort level the Worker chooses to serve you,
                    the higher your level of satisfaction with the Worker’s
                    service.
                  </div>
                  <div>
                    Please note that you will decide how much to tip the Worker
                    in each round. The amount of tip can range from zero up to
                    80 tokens. That is, you can tip nothing, can tip a maximum
                    of 80 tokens, or can tip anywhere in between. Importantly,
                    you tip the Worker after he/she serves you.
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div style={{ color: "#1c1c1c", fontSize:'2.3rem' }}><b>Worker Effort Level</b></div>
                <div>
                  In this round, the Worker that you are paired with has chosen
                  the effort level: <b><span style={{ color: "#1c1c1c", fontSize:'2.3rem' }}><b>{effort}</b></span></b>
                </div>
              </div>
                <br/>
              <div
                style={{
                  fontSize: "2.3rem",
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
  );
}

export default Screen15;
