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
  Row,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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

  const Streaks = [
    {
      name: "3-day streak",
      image: "https://quizlet.com/static/achievements/badge-Day.svg",
      time: "Earned 01/08/22",
      number: "3",
    },
    {
      name: "5-day streak",
      image: "https://quizlet.com/static/achievements/badge-Day.svg",
      time: "Earned 19/08/22",
      number: "5",
    },
    {
      name: "7-day streak",
      image: "https://quizlet.com/static/achievements/badge-Day.svg",
      time: "Earned 18/09/22",
      number: "7",
    },
    {
      name: "10-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "10",
    },
    {
      name: "20-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "20",
    },
    {
      name: "30-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "30",
    },
    {
      name: "45-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "45",
    },
    {
      name: "60-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "60",
    },
    {
      name: "70-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "70",
    },
    {
      name: "80-day streak",
      image: "https://quizlet.com/static/achievements/locked-badge-Day.svg",
      time: "",
      number: "80",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const displayedStreaks = showAll ? Streaks : Streaks.slice(0, 4);

  // set modal Streaks
  const [isModalOpenStreaks, setIsModalOpenStreaks] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);

  const openModal = (streak) => {
    setSelectedStreak(streak);
    setIsModalOpenStreaks(true);
  };

  const closeModal = () => {
    setIsModalOpenStreaks(false);
    setSelectedStreak(null);
  };

  const weeklyStreaks = [
    {
      name: "3-week streak",
      image: "	https://quizlet.com/static/achievements/badge-Week.svg",
      time: "Earned 08/08/22",
      number: "3",
    },
    {
      name: "5-week streak",
      image: "	https://quizlet.com/static/achievements/badge-Week.svg",
      time: "Earned 03/10/22",
      number: "5",
    },
    {
      name: "10-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "10",
    },
    {
      name: "20-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "20",
    },
    {
      name: "30-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "30",
    },
    {
      name: "40-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "40",
    },
    {
      name: "52-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "52",
    },
    {
      name: "60-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "60",
    },
    {
      name: "70-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "70",
    },
    {
      name: "80-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "80",
    },
    {
      name: "90-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "90",
    },
    {
      name: "104-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "104",
    },
    {
      name: "125-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "125",
    },
    {
      name: "156-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "156",
    },
    {
      name: "175-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "175",
    },
    {
      name: "204-week streak",
      image: "	https://quizlet.com/static/achievements/locked-badge-Week.svg",
      time: "",
      number: "204",
    },
  ];

  const [showAllStreak, setShowAllStreak] = useState(false);
  const displayedWeeklyStreaks = showAllStreak
    ? weeklyStreaks
    : weeklyStreaks.slice(0, 4);

  // set modal weeklyStreaks
  const [isModalOpenWeeklyStreaks, setIsModalOpenWeeklyStreaks] =
    useState(false);
  const [selectedWeeklyStreaks, setSelectedWeeklyStreaks] = useState(null);

  const openModalWeeklyStreaks = (weeklyStreaks) => {
    setSelectedWeeklyStreaks(weeklyStreaks);
    setIsModalOpenWeeklyStreaks(true);
  };

  const closeModalWeeklyStreaks = () => {
    setIsModalOpenWeeklyStreaks(false);
    setSelectedWeeklyStreaks(null);
  };

  const studied = [
    {
      name: "Studied first set",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 09/12/22",
      number: "1",
    },
    {
      name: "3 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 28/12/22",
      number: "3",
    },
    {
      name: "5 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 28/12/22",
      number: "5",
    },
    {
      name: "10 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 14/01/23",
      number: "10",
    },
    {
      name: "25 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 14/02/23",
      number: "25",
    },
    {
      name: "50 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 21/04/23",
      number: "50",
    },
    {
      name: "75 sets studied",
      image: "	https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 22/09/23",
      number: "75",
    },
    {
      name: "100 sets studied",
      image: "https://quizlet.com/static/achievements/badge-SetsStudied.svg",
      time: "Earned 06/11/23",
      number: "100",
    },
    {
      name: "150 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "150",
    },
    {
      name: "250 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "250",
    },
    {
      name: "300 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "300",
    },
    {
      name: "400 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "400",
    },
    {
      name: "450 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "450",
    },
    {
      name: "500 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "500",
    },
    {
      name: "700 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "700",
    },
    {
      name: "900 sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "900",
    },
    {
      name: "1k sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "1k",
    },
    {
      name: "2k sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "2k",
    },
    {
      name: "2.5k sets studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-SetsStudied.svg",
      time: "",
      number: "2.5k",
    },
  ];

  const [showAllStudied, setShowAllStudied] = useState(false);
  const displayedStudied = showAllStudied ? studied : studied.slice(0, 4);

  // set modal studied
  const [isModalOpenStudied, setIsModalOpenStudied] = useState(false);
  const [selectedStudied, setSelectedStudied] = useState(null);

  const openModalStudied = (studied) => {
    setSelectedStudied(studied);
    setIsModalOpenStudied(true);
  };

  const closeModalStudied = () => {
    setIsModalOpenStudied(false);
    setSelectedStudied(null);
  };

  const roundStudied = [
    {
      name: "Studied first round",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "1",
    },
    {
      name: "3 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "3",
    },
    {
      name: "5 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "5",
    },
    {
      name: "10 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "10",
    },
    {
      name: "25 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "25",
    },
    {
      name: "50 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "50",
    },
    {
      name: "75 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "75",
    },
    {
      name: "100 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "100",
    },
    {
      name: "150 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "150",
    },
    {
      name: "200 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "200",
    },
    {
      name: "250 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "250",
    },
    {
      name: "300 rounds studied",
      image:
        "https://quizlet.com/static/achievements/locked-badge-RoundsStudied.svg",
      time: "",
      number: "300",
    },
  ];

  const [showAllRoundStudied, setShowAllRoundStudied] = useState(false);
  const displayedRoundStudied = showAllRoundStudied
    ? roundStudied
    : roundStudied.slice(0, 4);

    // set modal roundStudied
  const [isModalOpenRoundStudied, setIsModalOpenRoundStudied] = useState(false);
  const [selectedRoundStudied, setSelectedRoundStudied] = useState(null);

  const openModalRoundStudied = (roundStudied) => {
    setSelectedRoundStudied(roundStudied);
    setIsModalOpenRoundStudied(true);
  };

  const closeModalRoundStudied = () => {
    setIsModalOpenRoundStudied(false);
    setSelectedRoundStudied(null);
  };

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
      {activeTab === "info" && <Information personalInfo={personalInfo} />}
      {activeTab === "course" && <Course courses={courses} />}

      <h4 className="mt-4 mb-2 fw-bolder">Streaks</h4>
      <Card className="p-4">
        <CardBody>
          <h4 className="mb-2">Daily Streaks</h4>
          <Row>
            {displayedStreaks.map((streak, index) => (
              <Col
                className="text-center mt-3"
                lg="3"
                md="6"
                key={index}
                onClick={() => openModal(streak)}
              >
                <div style={{ position: "relative" }}>
                  <img src={streak?.image} alt={streak?.name} />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "x-large",
                    }}
                  >
                    {streak?.number}
                  </span>
                </div>
                <CardTitle>{streak?.name}</CardTitle>
                <CardSubtitle>{streak?.time}</CardSubtitle>
              </Col>
            ))}
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

          {/* modal Streaks*/}

          <Modal isOpen={isModalOpenStreaks} toggle={closeModal}>
            <ModalHeader>{selectedStreak?.name}</ModalHeader>
            <ModalBody
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <img src={selectedStreak?.image} alt={selectedStreak?.name} />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "x-large",
                  }}
                >
                  {selectedStreak?.number}
                </span>
              </div>
              <CardTitle>{selectedStreak?.name}</CardTitle>
              <CardSubtitle>{selectedStreak?.time}</CardSubtitle>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* ------------ */}

          <h4 className="mb-2" style={{ marginTop: "5rem" }}>
            Weekly streaks
          </h4>
          <Row>
            {displayedWeeklyStreaks.map((weeklyStreak, index) => (
              <Col
                className="text-center mt-3"
                lg="3"
                md="6"
                key={index}
                onClick={() => openModalWeeklyStreaks(weeklyStreak)}
              >
                <div style={{ position: "relative" }}>
                  <img src={weeklyStreak?.image} alt={weeklyStreak?.name} />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "x-large",
                    }}
                  >
                    {weeklyStreak?.number}
                  </span>
                </div>
                <CardTitle>{weeklyStreak?.name}</CardTitle>
                <CardSubtitle>{weeklyStreak?.time}</CardSubtitle>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-3">
            <div className="d-flex justify-content-center">
              <Button
                color="info"
                style={{ width: "120px" }}
                onClick={() => setShowAllStreak(!showAllStreak)}
              >
                {showAllStreak ? "View less" : "View all"}
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>

      {/* modal weekly Streaks*/}

      <Modal isOpen={isModalOpenWeeklyStreaks} toggle={closeModalWeeklyStreaks}>
        <ModalHeader>{selectedWeeklyStreaks?.name}</ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={selectedWeeklyStreaks?.image}
              alt={selectedWeeklyStreaks?.name}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "black",
                fontWeight: "bolder",
                fontSize: "x-large",
              }}
            >
              {selectedWeeklyStreaks?.number}
            </span>
          </div>
          <CardTitle>{selectedWeeklyStreaks?.name}</CardTitle>
          <CardSubtitle>{selectedWeeklyStreaks?.time}</CardSubtitle>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModalWeeklyStreaks}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* ------------ */}

      <h4 className="mb-2 fw-bolder" style={{ marginTop: "6rem" }}>
        Lifetime
      </h4>
      <Card className="p-4">
        <CardBody>
          <h4 className="mb-2">Sets studied</h4>
          <Row>
            {displayedStudied.map((studied, index) => (
              <Col className="text-center mt-3" lg="3" md="6" key={index}>
                <div
                  style={{ position: "relative" }}
                  onClick={() => openModalStudied(studied)}
                >
                  <img src={studied?.image} alt={studied?.name} />
                  <span
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "49%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "x-large",
                    }}
                  >
                    {studied?.number}
                  </span>
                </div>
                <CardTitle>{studied?.name}</CardTitle>
                <CardSubtitle>{studied?.time}</CardSubtitle>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-3">
            <div className="d-flex justify-content-center">
              <Button
                color="info"
                style={{ width: "120px" }}
                onClick={() => setShowAllStudied(!showAllStudied)}
              >
                {showAllStudied ? "View less" : "View all"}
              </Button>
            </div>
          </Row>

          {/* modal studied*/}

          <Modal isOpen={isModalOpenStudied} toggle={closeModalStudied}>
            <ModalHeader>{selectedStudied?.name}</ModalHeader>
            <ModalBody
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <img src={selectedStudied?.image} alt={selectedStudied?.name} />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "x-large",
                  }}
                >
                  {selectedStudied?.number}
                </span>
              </div>
              <CardTitle>{selectedStudied?.name}</CardTitle>
              <CardSubtitle>{selectedStudied?.time}</CardSubtitle>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModalStudied}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* ------------ */}

          <h4 className="mb-2" style={{ marginTop: "5rem" }}>
            Rounds studied
          </h4>
          <Row>
            {displayedRoundStudied.map((roundStudied, index) => (
              <Col className="text-center mt-3" lg="3" md="6" key={index} onClick={() => openModalRoundStudied(roundStudied)}>
                <div style={{ position: "relative" }}>
                  <img src={roundStudied?.image} alt={roundStudied?.name} />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "x-large",
                    }}
                  >
                    {roundStudied?.number}
                  </span>
                </div>
                <CardTitle>{roundStudied?.name}</CardTitle>
                <CardSubtitle>{roundStudied?.time}</CardSubtitle>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-3">
            <div className="d-flex justify-content-center">
              <Button
                color="info"
                style={{ width: "120px" }}
                onClick={() => setShowAllRoundStudied(!showAllRoundStudied)}
              >
                {showAllRoundStudied ? "View less" : "View all"}
              </Button>
            </div>
          </Row>

           {/* modal round studied*/}

           <Modal isOpen={isModalOpenRoundStudied} toggle={closeModalRoundStudied}>
            <ModalHeader>{selectedRoundStudied?.name}</ModalHeader>
            <ModalBody
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <img src={selectedRoundStudied?.image} alt={selectedRoundStudied?.name} />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: "x-large",
                  }}
                >
                  {selectedRoundStudied?.number}
                </span>
              </div>
              <CardTitle>{selectedRoundStudied?.name}</CardTitle>
              <CardSubtitle>{selectedRoundStudied?.time}</CardSubtitle>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModalRoundStudied}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* ------------ */}

        </CardBody>
      </Card>
    </Box>
  );
};

export default ProfileBody;
