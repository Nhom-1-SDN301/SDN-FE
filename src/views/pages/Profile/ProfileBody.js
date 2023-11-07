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
<<<<<<< HEAD
=======
  Row,
  Col,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
>>>>>>> ef66c7f430d94beacc0325f784e121cb82418c6d
} from "reactstrap";
import Information from "./Information";
import Course from "./Course";
import { Box, CardContent } from "@mui/material";

const ProfileBody = () => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const selectAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    toggle();
  };

  const achievements = [
    {
      src: "https://quizlet.com/static/achievements/badge-StudiedWithFlashcards.svg",
      alt: "Flash Card",
      title: "Flash Card",
      subtitle: "21 tháng 4, 2023",
      contentcard: "Get rewarded for learning with Flashcards for the first time!"
    },
    {
      src: "https://quizlet.com/static/achievements/badge-StudiedWithLearn.svg",
      alt: "Learn",
      title: "Learn",
      subtitle: "06 tháng 4, 2023",
      contentcard: "Get rewarded for learning with Learn for the first time!"
    },
    {
      src: "https://quizlet.com/static/achievements/badge-NightOwl.svg",
      alt: "NightOwl",
      title: "Night Owl",
      subtitle: "23 tháng 8, 2023",
      contentcard: "Get rewarded for learning with Night Owl for the first time!"
    },
    {
      src: "https://quizlet.com/static/achievements/badge-EarlyBird.svg",
      alt: "EarlyBird",
      title: "Early Bird",
      subtitle: "03 tháng 11, 2023",
      contentcard: "Get rewarded for learning with Early Bird for the first time!"
    },
    {
      src: "https://quizlet.com/static/achievements/badge-StudiedWithTest.svg",
      alt: "Test",
      title: "Test",
      subtitle: "15 tháng 6, 2023",
      contentcard: "Get rewarded for learning with Test for the first time!"
    },
  ];

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
<<<<<<< HEAD
      {activeTab === "info" && <Information personalInfo={personalInfo} />}
      {activeTab === "course" && <Course courses={courses} />}
=======
      <Card>
        <CardBody>
          {activeTab === "info" && <Information personalInfo={personalInfo} />}
          {activeTab === "course" && <Course courses={courses} />}
        </CardBody>
      </Card>

      <h4 className="mt-4 mb-2">
        <b>Studying</b>
      </h4>
      <Card>
        <CardBody>
          <Row>
            {achievements.map((achievement, index) => (
              <Col
                key={index}
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => selectAchievement(achievement)}
              >
                <img src={achievement.src} alt={achievement.alt} />
                <CardTitle>{achievement.title}</CardTitle>
                <CardSubtitle>{achievement.subtitle}</CardSubtitle>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
        <ModalBody className="text-center">
          {selectedAchievement && (
            <>
            <CardTitle><h3><b>{selectedAchievement.title}</b></h3></CardTitle>
              <img
                src={selectedAchievement.src}
                alt={selectedAchievement.alt}
              />
              <CardSubtitle><h4><b>{selectedAchievement.subtitle}</b></h4></CardSubtitle>
              <CardContent>{selectedAchievement.contentcard}</CardContent>
            </>
            
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
>>>>>>> ef66c7f430d94beacc0325f784e121cb82418c6d
    </Box>
  );
};

export default ProfileBody;
