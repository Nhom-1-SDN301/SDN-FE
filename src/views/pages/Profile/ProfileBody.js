import React, { useState } from "react";
import { AlignJustify, Rss, Info } from "react-feather";
import {
  Card,
  CardImg,
  CardBody,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
  CardSubtitle,
  Col, 
  Row
} from "reactstrap";
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
    {
      name: "Course 2",
      created: "2022-10-20",
      students: 30,
      status: "in-progress",
    },
    {
      name: "Course 3",
      created: "2022-08-05",
      students: 70,
      status: "completed",
    },
  ];

  const Streaks = [
    {name: "3-day streak", image:"https://quizlet.com/static/achievements/badge-Day.svg", time:"Earned 01/08/22", number:"3" }, 
    {name: "5-day streak", image:"https://quizlet.com/static/achievements/badge-Day.svg", time:"Earned 19/08/22", number:"5" }, 
    {name: "7-day streak", image:"https://quizlet.com/static/achievements/badge-Day.svg", time:"Earned 18/09/22", number:"7" }, 
    {name: "10-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"10" }, 
    {name: "20-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"20" }, 
    {name: "30-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"30" }, 
    {name: "45-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"45" }, 
    {name: "60-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"60" }, 
    {name: "70-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"70" }, 
    {name: "80-day streak", image:"https://quizlet.com/static/achievements/locked-badge-Day.svg", time:"", number:"80" }
  ];

  const [showAll, setShowAll] = useState(false);
  const displayedStreaks = showAll ? Streaks : Streaks.slice(0, 4);


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
      {activeTab === "info" && <Information personalInfo={personalInfo} />}
      {activeTab === "course" && <Course courses={courses} />}

      <h4 className="mt-4 mb-2 fw-bolder">Streaks</h4>
      <Card className="p-4">
        <CardBody>
          <h4 className="mb-2">Daily Streaks</h4>
          <Row>
              {
                displayedStreaks.map((streak, index) => (
                  <Col className="text-center mt-3" lg="3" md="6" key={index}>
                    <div style={{ position: "relative" }}>
                      <img src={streak?.image} alt={streak?.name} />
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color:"black", 
                          fontWeight:"bolder", 
                          fontSize:"large"
                        }}
                      >
                        {streak?.number}
                      </span>
                    </div>
                    <CardTitle>{streak?.name}</CardTitle>
                    <CardSubtitle>{streak?.time}</CardSubtitle>
                  </Col>
                ))
              }
          </Row>
          <Row className="text-center mt-3">
            <div className="d-flex justify-content-center">
              <Button
                color="info"
                style={{ width: "120px" }}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "View less" : "View all"}
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>


    </Box>
  );
};

export default ProfileBody;
