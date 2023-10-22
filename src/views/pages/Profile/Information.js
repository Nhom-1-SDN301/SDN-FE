import React from "react";
import { Rss } from "react-feather";
import { CardBody } from "reactstrap";

const Information = ({ personalInfo }) => {
  return (
    <div>
      <p>
        <strong>Name:</strong> {personalInfo.name}
      </p>
      <p>
        <strong>Email:</strong> {personalInfo.email}
      </p>
      <p>
        <strong>Address:</strong> {personalInfo.address}
      </p>
      <p>
        <strong>Phone:</strong> {personalInfo.phone}
      </p>
      <p>
        <strong>Gender:</strong> {personalInfo.gender}
      </p>
    </div>
  );
};

export default Information;