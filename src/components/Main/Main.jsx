import React, { useContext, useState, useEffect, useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import MicIcon from "@mui/icons-material/Mic";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Footer from "../Footer";
import "./Main.css";
import { Context } from "../../context/Context";
import ReactMarkdown from "react-markdown";
import { CSSTransition } from "react-transition-group";
import "./ResultAnimation.css"; // Import the CSS file for animations

const Main = ({ username }) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [showResultData, setShowResultData] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!loading && showResult) {
      setShowResultData(true);
    } else {
      setShowResultData(false);
    }
  }, [loading, showResult]);

  return (
    <div className="main-content">
      <div className="header">
        <div className="logo">
          S<span className="dynamic">AI</span>RIS{" "}
          <EmojiNatureIcon className="icon" />
        </div>
        <div id="username" className="username">
          Hello, {username}.
        </div>
        <div className="spacer"></div>
        <Avatar
          className="avatar"
          alt="User"
          src="https://w0.peakpx.com/wallpaper/229/806/HD-wallpaper-one-piece-gear-5-one-piece-monkey-d-luffy.jpg"
        />
      </div>
      {!showResult ? (
        <>
          <div className="main-screen">
            <span className="main-text anim-typewriter">
              HOW CAN I HELP YOU TODAY?
            </span>
          </div>
        </>
      ) : (
        <div className="result">
          <div className="result-title">
            <Avatar
              className="avatar"
              alt="User"
              src="https://w0.peakpx.com/wallpaper/229/806/HD-wallpaper-one-piece-gear-5-one-piece-monkey-d-luffy.jpg"
            />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            {loading ? (
              <div className="loader">
                <Box sx={{ width: 1000 }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              </div>
            ) : (
              <CSSTransition
                in={showResultData}
                timeout={300}
                classNames="result-text"
                unmountOnExit
                nodeRef={nodeRef}
              >
                <div
                  ref={nodeRef}
                  className={`result-text ${showResultData ? "show" : ""}`}
                >
                  <ReactMarkdown>{resultData}</ReactMarkdown>
                </div>
              </CSSTransition>
            )}
          </div>
        </div>
      )}
      <div className="input-section">
        <div className="input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a prompt here"
            className="input-field"
          />
          <div className="icon-buttons">
            <label className="icon-button">
              <input type="file" className="hidden" />
              <UploadIcon className="icon" />
            </label>
            <button className="icon-button">
              <MicIcon className="icon" />
            </button>
            <button onClick={() => onSent()} className="icon-button">
              <SendIcon className="icon" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
