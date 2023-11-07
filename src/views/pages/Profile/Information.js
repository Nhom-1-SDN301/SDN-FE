import React from "react";
import { Rss } from "react-feather";
import { Card, CardBody } from "reactstrap";

// ** Redux import
import { useSelector } from "react-redux";

const Information = ({ personalInfo }) => {
  const auth = useSelector((state) => state.auth);

<<<<<<< HEAD
  return (
    <Card>
      <CardBody>
        <div>
          <p>
            <strong>Name:</strong> {auth?.user?.fullName}
          </p>
          <p>
            <strong>Email:</strong> {auth?.user?.email}
          </p>
          <p>
            <strong>Address:</strong> {auth?.user?.address}
          </p>
          <p>
            <strong>Phone:</strong> {auth?.user?.phone}
          </p>
          <p>
            <strong>Gender:</strong> {auth?.user?.gender ? "Male" : "Female"}
          </p>
        </div>
      </CardBody>
    </Card>
=======
  return ( 
    <div>
      <p>
        <strong>Name:</strong> {auth?.user?.fullName}
      </p>
      <p>
        <strong>Email:</strong> {auth?.user?.email}
      </p>
      <p>
        <strong>Address:</strong> {auth?.user?.address}
      </p>
      <p>
        <strong>Phone:</strong> {auth?.user?.phone}
      </p>
      <p>
        <strong>Gender:</strong> {auth?.user?.gender ? "Male" : "Female"}
      </p>
    </div>
>>>>>>> ef66c7f430d94beacc0325f784e121cb82418c6d
  );
};

export default Information;
