// ** React
import { Fragment } from "react";

// ** Reactstrap
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Hooks
import { useSkin } from "../../../utility/hooks/useSkin";
import { useRTL } from "../../../utility/hooks/useRTL";
import { useLayout } from "../../../utility/hooks/useLayout";
import { useNavbarType } from "../../../utility/hooks/useNavbarType";

const LayoutTabContent = () => {
  const { skin, setSkin } = useSkin();
  const [isRTL, setIsRTL] = useRTL();
  const { layout, setLayout } = useLayout();
  const { navbarType, setNavbarType } = useNavbarType();

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Change UI</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} style={{ paddingTop: "2rem" }}>
              <h5>Mode</h5>
              <div className="d-flex">
                <div
                  className="form-check"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="radio"
                    id="dark"
                    name="ex1"
                    checked={skin === "dark"}
                    onClick={() => setSkin("dark")}
                  />
                  <Label className="form-check-label" for="dark">
                    Dark
                  </Label>
                </div>
                <div className="form-check" style={{ marginTop: ".5rem" }}>
                  <Input
                    type="radio"
                    id="light"
                    name="ex1"
                    checked={skin === "light"}
                    onClick={() => setSkin("light")}
                  />
                  <Label className="form-check-label" for="light">
                    Light
                  </Label>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ paddingTop: "2rem" }}>
              <h5>MISC</h5>
              <div className="d-flex">
                <div
                  className="form-check form-switch"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="switch"
                    id="rtl"
                    checked={isRTL}
                    onChange={(e) => setIsRTL(e.target.checked)}
                  />
                  <Label className="form-check-label" for="rtl">
                    RTL
                  </Label>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ paddingTop: "2rem" }}>
              <h5>Layout</h5>
              <div className="d-flex">
                <div
                  className="form-check"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="radio"
                    id="vertical"
                    name="layout"
                    checked={layout === "vertical"}
                    onClick={() => setLayout("vertical")}
                  />
                  <Label className="form-check-label" for="vertical">
                    Vertical
                  </Label>
                </div>
                <div className="form-check" style={{ marginTop: ".5rem" }}>
                  <Input
                    type="radio"
                    id="horizontal"
                    name="layout"
                    checked={layout === "horizontal"}
                    onClick={() => setLayout("horizontal")}
                  />
                  <Label className="form-check-label" for="horizontal">
                    Horizontal
                  </Label>
                </div>
              </div>
            </Col>
            <Col md={6} style={{ paddingTop: "2rem" }}>
              <h5>Navbar Type</h5>
              <div className="d-flex">
                <div
                  className="form-check"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="radio"
                    id="static"
                    name="navbar"
                    checked={navbarType === "static"}
                    onClick={() => setNavbarType("static")}
                  />
                  <Label className="form-check-label" for="static">
                    Static
                  </Label>
                </div>
                <div
                  className="form-check"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="radio"
                    id="sticky"
                    name="navbar"
                    checked={navbarType === "sticky"}
                    onClick={() => setNavbarType("sticky")}
                  />
                  <Label className="form-check-label" for="sticky">
                    Sticky
                  </Label>
                </div>
                <div
                  className="form-check"
                  style={{ marginRight: "2rem", marginTop: ".5rem" }}
                >
                  <Input
                    type="radio"
                    id="floating"
                    name="navbar"
                    checked={navbarType === "floating"}
                    onClick={() => setNavbarType("floating")}
                  />
                  <Label className="form-check-label" for="floating">
                    Floating
                  </Label>
                </div>
                <div className="form-check" style={{ marginTop: ".5rem" }}>
                  <Input
                    type="radio"
                    id="hidden"
                    name="navbar"
                    checked={navbarType === "hidden"}
                    onClick={() => setNavbarType("hidden")}
                  />
                  <Label className="form-check-label" for="hidden">
                    Hidden
                  </Label>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default LayoutTabContent;
