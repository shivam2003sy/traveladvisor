import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("Attractions");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
        <div className="row m-1">
          <div className="col-md-2">
            <div className="date-bar d-flex align-items-center">
              <button className="btn btn-sm" style={{ outline: "none", boxShadow: "none" }}>
                <FontAwesomeIcon icon={faCalendarDays} />
                &nbsp; Enter dates
              </button>
            </div>
          </div>
          <div className="col-md-7 d-flex">
            <div className="search-bar d-flex align-items-center">
              <FontAwesomeIcon icon={faSearch} className="m-2" />
              <input
                type="text"
                placeholder="Where to?"
                value={searchValue}
                onChange={handleSearchChange}
                className="form-control border-0"
                style={{ outline: "none", boxShadow: "none" }}
              />
            </div>
          </div>

          <div className="col-md-3 text-md-end">
            <button className="filter btn btn-outline-secondary btn-sm">Filter</button>
            <select
              className="select custom-select"
              id="inputGroupSelect01"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="Attractions">Attractions</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
  );
};

export default Header;
