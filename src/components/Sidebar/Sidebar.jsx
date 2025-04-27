import React, { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";
import MessageIcon from "@mui/icons-material/Message";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const { onSent, prevPrompts, setPrevPrompts, newChat } = useContext(Context);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const loadPrompt = async (prompt) => {
    // Check if the prompt already exists in the array
    if (!prevPrompts.includes(prompt)) {
      setPrevPrompts((prev) => [...prev, prompt]);
    }
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="top">
        <button onClick={toggleNavbar} className="icon-button menu-button">
          <MenuIcon className="icon" />
        </button>
        <button onClick={() => newChat()} className="icon-button new-chat">
          <AddIcon className="icon" />
          {expanded && <span>New Chat</span>}
        </button>
        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompts.map((item, index) => (
            <div
              onClick={() => loadPrompt(item)}
              key={index}
              className="icon-button recent-entry"
            >
              <MessageIcon className="icon" />
              <p>{item.slice(0, 18)}...</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <button className="icon-button">
          <HelpIcon className="icon" />
        </button>
        <button className="icon-button">
          <RefreshIcon className="icon" />
        </button>
        <button className="icon-button">
          <SettingsIcon className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
