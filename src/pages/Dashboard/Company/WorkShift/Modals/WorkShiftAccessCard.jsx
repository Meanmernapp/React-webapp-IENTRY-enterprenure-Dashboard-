/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//Create New Access Time for Work Shift
import { LocalizationProvider, TimePicker } from "@mui/lab";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
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
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import WorkShiftTreeView from "../WorkShiftTreeView";

// let day_arr = [];
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
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use state hook  for local state managment
  const [fromValue, setfromValue] = useState(new Date("2014-08-18T00:00:00"));
  const [toValue, setToValue] = useState(new Date("2014-08-18T00:00:00"));
  const [allDays, setAllDays] = useState(false);
  const [allTime, setAllTime] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [dayArray, setDayArray] = useState([])
  const [array, setArray] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderby, setOrderby] = useState("id");
  // constant varaible
  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: orderby,
  };

  // this function control select all id or unSelect all
  const handelZoneCheckAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = getAllItemIds(zoneData);
      setChecked(selectAllIds)
      console.log(checked)
    } else {
      setChecked([])
    }

  }
  // this funtion to look into all child and sub child and get return ids
  function getAllItemIds(data) {
    let ids = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      ids.push(`${item.id},${item.name}`);
      if (item.children && item.children.length > 0) {
        const childIds = getAllItemIds(item.children);
        ids = ids.concat(childIds);
      }
    }
    return ids;
  }

  //handle selected and unselected days list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    console.log(checked)
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //list of create access
  const handleCLick = async () => {
    let updateArray = [...array];
    for (let i = 0; i < checked.length; i++) {
      for (let j = 0; j < dayArray.length; j++) {
        let x = {
          zone: { id: checked[i] },
          day: { id: dayArray[j] },
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
        dayId: item?.day?.id,
        from: item?.from,
        to: item?.to,
        workShiftId: id,
        zoneId: item?.zone?.id.split(",", 1)[0],
      });
    });

    //create custom access time for work shift
    if (customSchdule.length > 0) {
      dispatch(CreateWorkShiftAccess(customSchdule)).then(() => {
        //get list of access time for work shift
        setChecked([])
        updateArray = []
        setArray([])
        setDayArray([])
        customSchdule = []
        dispatch(GetWorkTimeAccess({ id, contractPagination }));
        setAllTime(false)
        setfromValue();
        setToValue();

      })
    } else {
      toast.info("Select Zone, Days, Time")
    }
  };
  //select all days logic
  const selectAllDays = (event) => {
    setAllDays(event.target.checked)
    if (event.target.checked) {
      setDayArray([1, 2, 3, 4, 5, 6, 0])
    } else {
      setDayArray([])
    }

  };
  //select all time logic
  const handleAllTime = (event) => {
    if (event.target.checked) {
      setfromValue(new Date("2014-08-18T00:00:00"));
      setToValue(new Date("2014-08-18T23:59:59"));
    } else {
      setfromValue(new Date("2014-08-18T00:00:00"));
      setToValue(new Date("2014-08-18T00:00:00"));
    }
    setAllTime(!allTime);
  }

  // to handle days
  const handleDay = (event, dayValue) => {
    const value = parseInt(dayValue);
    const index = dayArray.indexOf(value);

    if (event.target.checked && index === -1) {
      setDayArray(prevArray => [...prevArray, value]);
    } else if (!event.target.checked && index !== -1) {
      setDayArray(prevArray => prevArray.filter(item => item !== value));
    }

  };


  return (
    <div className="pt-3 row pr-5">
      <div className="col-lg-6 work_shift_tree_view">
        <div className="d-flex align-items-center gap-2 ">

          <p className="heading_tree">{t("zones")}</p>
          <FormControlLabel className="grid-checkall"
            sx={{ paddingTop: "0.4rem" }}
            control={<Checkbox
              label="Label"
              checked={isAllChecked}
              onChange={handelZoneCheckAll}
              size="small" />} label={t("de_/_select_all")} />

        </div>

        <WorkShiftTreeView data={zoneData} onInputchange={handleCheck} isChecked={checked} />
      </div>
      <div className="col-lg-6">
        <div className="d-flex justify-content-between">
          <div>

            <span className="schedule-heading">SCHEDULE</span>
            <span className="schedule-heading-sub-heading">To open de doors.</span>
          </div>
          <div className="all-checkbox">
            <Checkbox
              className='grid-checkall checkbox'
              indeterminate={dayArray.length > 0 && (dayArray.length !== 7)}
              checked={allDays || (dayArray.length > 0 && (dayArray.length === 7))}
              onChange={selectAllDays}
              size='small'
            />{" "}
            {t("all_days")}
          </div>
        </div>
        <div
          className="main_content days_card"
          style={{
            background: "#e1e1e1",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div className="d-flex justify-content-between contract-custom-checkbox" style={{ paddingTop: "2px" }}>
            <article>
              <input
                type="checkbox"
                value={1}
                onChange={(e) => handleDay(e, "1")}
                checked={dayArray?.includes(1)}

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
                onChange={(e) => handleDay(e, "2")}
                checked={dayArray?.includes(2)}
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
                onChange={(e) => handleDay(e, "3")}

                checked={dayArray?.includes(3)}
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
                onChange={(e) => handleDay(e, "4")}
                checked={dayArray?.includes(4)}
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
                onChange={(e) => handleDay(e, "5")}
                checked={dayArray?.includes(5)}
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
                onChange={(e) => handleDay(e, "6")}
                checked={dayArray?.includes(6)}
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
                onChange={(e) => handleDay(e, "0")}
                checked={dayArray?.includes(0)}
              />
              <span className="days-text-style">
                S
                <br />
              </span>

            </article>
          </div>
        </div>
        <div className="col-md-12 p-0">
          <div className="mt-2 access_text">
            {/* <p>hours</p> */}
            <div className="all-checkbox">
              <Checkbox className='grid-checkall checkbox'
                checked={allTime}
                onChange={handleAllTime}
                size='small'
              />{" "}
              {t("all_time")}
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

          </div>
          <div className="btnDiv d-flex justify-content-end">
            <button
              className="custom_primary_btn_dark mt-3"
              style={{
                width: "100%",
                justifyContent: 'space-between',
                padding: "0rem 1rem"
              }}
              onClick={(e) => {
                handleCLick(e);
              }}
            >
              {t("add")}
              <AddIcon style={{ marginLeft: "10px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShiftAccessCard;
