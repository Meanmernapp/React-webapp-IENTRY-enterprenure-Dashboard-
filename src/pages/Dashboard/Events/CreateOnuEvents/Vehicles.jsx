
import React, { useEffect, useState } from 'react'
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';
import Add from "@mui/icons-material/Add";
import AddNewVehicle from './AddNewVehicle';
import { getAllVehiclesData } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import { useDispatch, useSelector } from 'react-redux';
import { saveOunVehiclesList, updateOunVehicleData } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import NoEvent from '../NoEvent';
import NotFoundDataWarning from '../../../../components/NotFoundDataWarning';

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicleData = useSelector(state => state?.EmployeeEventsSlice?.getAllVehiclesData);
  const ounVehiclesList = useSelector(state => state?.EmployeeEventsSlice?.ounVehiclesList);

  const [show, setShow] = useState(false);
  const [addVehiclequery, setAddVehicleQuery] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllVehiclesData());
    // setSelectedVehicle([])
  }, [])

  const handleselected = (vehicle) => {
    dispatch(saveOunVehiclesList([...ounVehiclesList, vehicle]))
    dispatch(updateOunVehicleData(vehicleData.filter(data => data.id !== vehicle.id)));
    setAddVehicleQuery("")
  }
  const handleVehicleInviteDelete = (vehicle) => {
    dispatch(saveOunVehiclesList(ounVehiclesList.filter(data => data.id !== vehicle.id)))
    dispatch(updateOunVehicleData([...vehicleData, vehicle]));

  }

  return (
    <>
      <div className="head1" style={{
        margin: "40px 40px 5px 40px",

      }}>
        <div className="searchVehicles">
          <input
            type="text"
            value={addVehiclequery}
            onChange={(e) => setAddVehicleQuery(e.target.value)}

          />
          <span class="search_btn">
            <button class="btn btn-default" type="button">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </span>
        </div>
        <button className="vehicleBtn" onClick={() => handleShow(true)}>
          ADD NEW VEHICLE
          <Add />
        </button>
        <AddNewVehicle
          show={show}
          onHide={() => handleClose(false)}
        />
      </div>
      <div className="searchItem" style={{ display: addVehiclequery !== '' ? "block" : "none", margin: "0 40px" }}>
        {
          vehicleData?.filter(vehicle => {
            if (addVehiclequery === '') {
              return vehicle;
            } else if (vehicle.brand.toLowerCase().includes(addVehiclequery.toLowerCase())) {
              return vehicle;
            }
          }).map(vehicle => (
            <div
              className='add_some_one_item'
              key={vehicle.id}
              onClick={() => handleselected(vehicle)}
            >
              <p>{vehicle.brand}</p>
            </div>
          ))
        }
      </div>
      {
        ounVehiclesList?.length > 0 ?
          <div className="eventTables vehicle_table" style={{ height: "25rem", margin: "0px 25px" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <th className='first-head'>brand</th>
                <th>sub-brand</th>
                <th>modal</th>
                <th>plates</th>
                <th>color</th>
                <th>s/n</th>
                <th className='last'>opt</th>
              </thead>
              {
                ounVehiclesList?.map(item => (
                  <tr key={item.id}>
                    <td className='first'>{item?.brand}</td>
                    <td>{item?.subBrand}</td>
                    <td>{item?.plate}</td>
                    <td>{item?.color}</td>
                    <td>{item?.serialNumber}</td>
                    <td>{item?.vin}</td>
                    <td className='last'>
                      <img
                        src={deleteIcon}
                        alt="delete"
                        onClick={() => handleVehicleInviteDelete(item)}
                      />
                    </td>
                  </tr>
                ))
              }
            </table>
          </div> :
          // <NoEvent title="incoming Events" />
          <>
            <NotFoundDataWarning text={"No Vehicles Data"} />
          </>
      }
    </>
  )
}

export default Vehicles