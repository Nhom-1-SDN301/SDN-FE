import React, { useState } from "react";

import { Input, Row, Col } from "reactstrap";

import Select from "react-select";

import CardTerm from "../../ui-elements/cards/advance/CardTerm";

const options = [
  {
    value: "all",
    label: "All courses",
  },
  {
    value: "recent",
    label: "Recent",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const Course = ({ courses }) => {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <Row>
        <Col xs="12" sm="6" md="6" lg="9"></Col>
        <Col xs="12" sm="6" md="6" lg="3">
          <Select
            options={options}
            value={options.find((o) => o.value === filter)}
            onChange={(e) => setFilter(e.value)}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <Row>
          {courses
            .filter((course) =>
              filter === "all" ? true : course.status === filter
            )
            .map((course, index) => (
              <CardTerm lg="4" md="3" />
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Course;
