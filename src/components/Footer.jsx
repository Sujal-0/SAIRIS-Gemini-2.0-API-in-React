import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <span>Copyright ⓒ {year} SAIRIS. All rights reserved.</span>
    </div>
  );
};

export default Footer;
