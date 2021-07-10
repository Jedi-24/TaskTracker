// unimportant    import React from 'react'
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./button";
const Header = ({ title, onClickAdd, showAddTask }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
          onChick={onClickAdd}
        />
      )}
    </header>
  );
};
Header.defaultProps = {
  title: "hell",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
