// ** Reactstrap Imports
import { Card, CardBody, Col, Badge } from "reactstrap";

// ** Avatar
import Avatar from "@components/avatar";

import CardStudy from "../../../pages/Profile/CartStudy";

const CardTermProfile = ({ lg = "3", md = "6", bg }) => {
  return (
    <Col lg={lg} md={md}>
      <CardStudy />
    </Col>
  );
};

export default CardTermProfile;
