/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//Create New Access Time for Work Shift
import { LocalizationProvider, TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getZonetree } from "../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { GetWorkTimeAccess } from "../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { CreateWorkShiftAccess } from "../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import moment from "moment";
import { toast } from "react-toastify";

let day_arr = [];
const WorkShiftAccessCard = ({
  heading1,
  heading2,
  update,
  isAddemployee,
  id
}) => {




  // use hook importer
  let dispatch = useDispatch();
  const zoneData = useSelector(getZonetree);

  // use state hook  for local state managment
  const [fromValue, setfromValue] = useState(new Date("2014-08-18T21:11:54"));
  const [toValue, setToValue] = useState(new Date("2014-08-18T21:11:54"));
  const [allDays, setAllDays] = useState(false);
  const [allTime, setAllTime] = useState(false);
  const [checked, setChecked] = useState([]);

  //handle selected and unselected days list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderby, setOrderby] = useState("id");
    let contractPagination = {
      order: true,
      page: page,
      size: rowsPerPage,
      sortBy: orderby,
    };
    // End Pagination
  

  //list of create access
  const [array, setArray] = useState([]);
  const handleCLick = async () => {
    const updateArray = [...array];
    for (let i = 0; i < checked.length; i++) {
      for (let j = 0; j < day_arr.length; j++) {
        let x = {
          zone: { id: checked[i]},
          day: { id: day_arr[j] },
          from: moment(fromValue).format("HH:mm:ss"),
          to: moment(toValue).format("HH:mm:ss"),
        };
        updateArray.push(x);
      }
    }
    setArray(updateArray);
    let customSchdule = [];
    updateArray?.map((item) => {
      customSchdule.push({
        workShift:{id: id},
        zone: { id: item?.zone?.id.split(",",1)[0] },
        day: { id: item?.day?.id },
        from: item?.from,
        to: item?.to,
      });
    });
   
    //create custom access time for work shift
    if(customSchdule.length !== 0){
      dispatch(CreateWorkShiftAccess(customSchdule)).then(()=>{
      //get list of access time for work shift
        dispatch(GetWorkTimeAccess({ id, contractPagination }));
      })
    }else{
      toast.info("Select Zone, Days, Time")
    } 
  };

  //select all days logic
  const selectAllDays = (event) => {
    if (event.target.checked) {
      day_arr = [1, 2, 3, 4, 5, 6, 0];
    } else {
      day_arr = [];
    }
    setAllDays(!allDays);
  };

  //select all time logic
  const handleAllTime = (event) => {
    if (event.target.checked) {
      setfromValue(new Date(-2211769692000));
      setToValue(new Date(-2211683293000));
    } else {
      setfromValue();
      setToValue();
    }
    setAllTime(!allTime);
  }
 
  //all below functions use for handle select or unselect day
  const handleMon = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleTue = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleWed = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleThur = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleFri = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleSat = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  }; const handleSun = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };

  return (
    <div className="pt-3 row pr-5">
      <div className="col-lg-6">
        <div className={heading1 === "zones" ? "access_text" : "work_text"}>
          <p>{heading1}</p>
        </div>

        <div className="checkboxes_m">
          {zoneData &&
            zoneData.map((item) => {
              return (
                <ol>
                  <li>
                    <i
                      className="fa fa-angle-right angeL_rights"
                      aria-hidden="true"
                    ></i>
                    <input
                      type="checkbox"
                      value={`${item?.id},${item?.name}`}
                      onChange={handleCheck}
                    />
                    <span className="sm_res">{item?.name}</span>
                  </li>
                  {item?.children &&
                    item?.children.map((childItem) => {
                      return (
                        <ul>
                          <li>
                            <i
                              className="fa fa-angle-right angeL_rights"
                              aria-hidden="true"
                            ></i>
                            <input
                              type="checkbox"
                              value={`${childItem?.id},${childItem?.name}`}
                              onChange={handleCheck}
                            />
                            <span className="sm_res">{childItem?.name}</span>

                            <ul className="nested_checkbox">
                              {childItem &&
                                childItem?.children.map((grandChild) => {
                                  return (
                                    <li>
                                      <input
                                        type="checkbox"
                                        value={`${grandChild?.id},${grandChild?.name}`}
                                        onChange={handleCheck}
                                      />
                                      <span className="sm_ress">
                                        {grandChild?.name}
                                      </span>
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        </ul>
                      );
                    })}
                </ol>
              );
            })}
        </div>
      </div>
      <div className="col-lg-6">
      <span className="schedule-heading">SCHEDULE</span>
      <span className="schedule-heading-sub-heading">To open de doors.</span>
        <div
          className="main_content days_card"
          style={{
            background: "#e1e1e1",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div className="d-flex justify-content-between contract-custom-checkbox" style={{paddingTop:"2px"}}>
            <article>
              <input
                type="checkbox"
                value={1}
                onChange={handleMon}
                checked={allDays ? allDays : null}
              />
              
                <span className="days-text-style" >
                  M
                  <br />
                </span>
              
            </article>
            <article>
              <input
                type="checkbox"
                value={2}
                onChange={handleTue}
                checked={allDays ? allDays : null}
              />
             
                <span className="days-text-style">
                  T
                  <br />
                </span>
         
            </article>
            <article>
              <input
                type="checkbox"
                value={3}
                onChange={handleWed}
                checked={allDays ? allDays : null}
              />
         
                <span className="days-text-style">
                  W
                  <br />
                </span>
            
            </article>
            <article>
              <input
                type="checkbox"
                value={4}
                onChange={handleThur}
                checked={allDays ? allDays : null}
              />
       
                <span className="days-text-style">
                  T
                  <br />
                </span>
             
            </article>
            <article>
              <input
                type="checkbox"
                value={5}
                onChange={handleFri}
                checked={allDays ? allDays : null}
              />
      
                <span className="days-text-style">
                  F
                  <br />
                </span>
           
            </article>
            <article>
              <input
                type="checkbox"
                value={6}
                onChange={handleSat}
                checked={allDays ? allDays : null}
              />
        
                <span className="days-text-style">
                  S
                  <br />
                </span>
          
            </article>
            <article>
              <input
                type="checkbox"
                value={0}
                onChange={handleSun}
                checked={allDays ? allDays : null}
              />
        
                <span className="days-text-style">
                  S
                  <br />
                </span>
       
            </article>
          </div>

          <div className="all_checkbox">
            <input type="checkbox" checked={allDays} onChange={selectAllDays} />{" "}
            ALL Days
          </div>
        </div>

        <div className="col-md-12 p-0">
          <div className="mt-5 access_text">
            <p>hours</p>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => (
                    <TextField size="small" style={{ width: "100%" }} {...props} />
                  )}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label="FROM"
                  value={fromValue}
                  onChange={(newValue) => {
                    setfromValue(newValue);
                    // console.log({ newValue });
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => (
                    <TextField size="small" style={{ width: "100%" }} {...props} />
                  )}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label="TO"
                  value={toValue}
                  onChange={(newValue) => {
                    setToValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="all_checkbox">
              <input
                type="checkbox"
                checked={allTime}
                onChange={handleAllTime}
              />{" "}
              ALL Time
            </div>
          </div>
          <div className="btnDiv d-flex justify-content-end">
            <Button
              className="add-access-btn"
              onClick={(e) => {
                handleCLick(e);
              }}
            >
              ADD ACCESS
              <AddIcon style={{ marginLeft: "10px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShiftAccessCard;
