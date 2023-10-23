import React, { useState } from "react";
<<<<<<< HEAD:src/views/pages/Profile/Course.js
import { Info } from "react-feather";
import { Card, CardBody, Input, Row, Col } from "reactstrap";
import Select from 'react-select'

const options = [
  {
    value: "all",
    label: "All Courses",
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
=======

import { Input, Row, Col } from "reactstrap";
import CardTerm from "../../ui-elements/cards/advance/CardTerm";
>>>>>>> c60b25d074b2184d08af55e3901916642401ca1f:src/views/pages/Profile/Course.jsx

const Course = ({ courses }) => {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <Row>
        <Col xs="12" sm="6" md="6" lg="9"></Col>
        <Col xs="12" sm="6" md="6" lg="3">
          <Select
            options={options}
            value={options.find(o => o.value === filter)}
            onChange={(e) => setFilter(e.value)}
          />
          <Input
            type="select"
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="all">All Courses</option>
            <option value="recent">Recent</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Input>
        </Col>
      </Row>
      <div className="mt-3">
        <Row>
          {courses
            .filter((course) =>
              filter === "all" ? true : course.status === filter
            )
            .map((course, index) => (
              <CardTerm bg="#F2F3F3" lg="4" md="3" />
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Course;
