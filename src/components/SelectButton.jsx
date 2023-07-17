import React from "react";
import "./SelectButton.css";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
      }}
      onClick={onClick}
      className="selected_button"
    >
      {children}
    </span>
  );
};

export default SelectButton;
