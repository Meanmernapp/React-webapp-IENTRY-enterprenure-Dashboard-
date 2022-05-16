import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Tab,
  Table,
} from "react-bootstrap";

const FilterModal = ({ show, onHide }) => {
  const [showModal, setShowModal] = useState(false);
  const [week, setWeek] = useState();
  const [year, setYear] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    setWeek(e.target.value);
  };
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg={7}>
              <Row>
                <span
                  style={{
                    fontSize: "19px",
                    color: "#707070",
                  }}
                >
                  DATES
                </span>
                <div className="container-fluid">
                  <div
                    className="btn-group w-100"
                    style={{
                      border: "0.5px solid #707070",
                      borderRadius: "8px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-light btn-lg "
                      style={{ padding: "10px" }}
                    >
                      DAY
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-lg"
                      style={{ padding: "10px" }}
                    >
                      MONTH
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-lg "
                      style={{ padding: "10px" }}
                    >
                      WEEK
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-lg "
                      style={{ padding: "10px" }}
                    >
                      YEAR
                    </button>
                  </div>
                </div>
              </Row>
              <Row className="gy-4">
                <Col>
                  <div className="usrdata_form">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={week}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={5}>
              <span style={{ fontSize: "19px", color: "#707070" }}>
                ATTRIBUTES
              </span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
