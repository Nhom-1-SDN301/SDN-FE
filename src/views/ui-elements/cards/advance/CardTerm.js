import { Badge, Card, CardBody, Col, Container, Row } from "reactstrap";
import { studySetApi } from "../../../../@core/api/quiz";
import Avatar from "@components/avatar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardTerm = ({ lg = "3", md = "6", bg }) => {
  const [studySets, setStudySets] = useState([]);
  const linkToFlashCard = `/flash-card`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studySetApi.getAllStudySetByUserId();
        if (response.status === 200) {
          const data = response.data.data.studySet.studySets;
          setStudySets(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách study set:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        {studySets.map((studySet) => (
          <Col lg="3" md="6" key={studySet.id}>
            <Link to={`${linkToFlashCard}/${studySet._id}`}>
              <Card className="card-congratulations-medal">
                <CardBody
                  className="d-flex flex-column justify-content-between"
                  style={{ height: 150, backgroundColor: bg }}
                >
                  <div>
                    <h5 style={{ fontWeight: 'bold' }}>{studySet.title}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <Avatar
                      size="sm"
                      img={
                        studySet.userId.picture
                      }
                    />
                    <h6 style={{ margin: "0 0 0 .5rem" }}>{studySet.userId.fullName}</h6>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardTerm;
