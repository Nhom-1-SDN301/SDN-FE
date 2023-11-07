// ** Reactstrap
import { Card, Col, Row } from "reactstrap";

// ** Components
import HeadClasses from "./HeadClasses";
import ClassItem from "./ClassItem";

// ** Third libs

const Classes = ({ data, setData, filter, setFilter }) => {
  return (
    <div>
      <HeadClasses setData={setData} filter={filter} setFilter={setFilter} />
      <Row style={{ marginTop: "3rem" }}>
        {data.map((klass) => (
          <ClassItem
            key={klass._id}
            id={klass._id}
            image={klass?.picture}
            name={klass?.name}
            author={klass?.user}
          />
        ))}
      </Row>
    </div>
  );
};

export default Classes;
