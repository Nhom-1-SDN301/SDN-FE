import React, { useState } from "react";
import { AlignJustify, Rss, Info } from "react-feather";
import { Card, CardImg, CardBody, Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import Information from "./Information";
import Course from "./Course";
import { Box } from "@mui/material";

const ProfileBody = () => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const personalInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, City, Country",
    phone: "123-456-7890",
    gender: "Male",
  };

  const courses = [
    { name: "Course 1", created: "2023-01-15", students: 50, status: "recent" },
    { name: "Course 2", created: "2022-10-20", students: 30, status: "in-progress" },
    { name: "Course 3", created: "2022-08-05", students: 70, status: "completed" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Card>
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div>
              <Nav className="mb-0" pills style={{ paddingLeft: "15px" }}>
                <NavItem>
                  <NavLink
                    className={`fw-bold ${
                      activeTab === "info" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("info")}
                  >
                    <span className="d-none d-md-block">Information</span>
                    <Rss className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`fw-bold ${
                      activeTab === "course" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("course")}
                  >
                    <span className="d-none d-md-block">Course</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </Card>
      <Card>
        <CardBody>
          {activeTab === "info" && <Information personalInfo={personalInfo} />}
          {activeTab === "course" && <Course courses={courses} />}
        </CardBody>
      </Card>
    </Box>
      
  );
};

export default ProfileBody;