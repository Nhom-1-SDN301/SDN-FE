// ** Reactstrap Imports
import { Card, CardBody, Col, Badge } from "reactstrap";

// ** Avatar
import Avatar from "@components/avatar";

const CardTerm = ({ lg = "3", md = "6", bg }) => {
  return (
    <Col lg={lg} md={md}>
      <Card className="card-congratulations-medal">
        <CardBody
          className="d-flex flex-column justify-content-between"
          style={{ height: 150, backgroundColor: bg }}
        >
          <div>
            <h5>Tên học phần</h5>
            <Badge color="primary">145 Terms</Badge>
          </div>
          <div className="d-flex align-items-center">
            <Avatar
              size="sm"
              img="/src/assets/images/portrait/small/avatar-s-11.jpg"
            />
            <h6 style={{ margin: "0 0 0 .5rem" }}>nguyenan202</h6>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardTerm;
