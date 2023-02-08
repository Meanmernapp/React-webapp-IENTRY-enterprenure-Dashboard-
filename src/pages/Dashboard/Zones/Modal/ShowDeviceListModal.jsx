import React from "react";
import { useSelector } from "react-redux";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import deviceMarker from '../../../../assets/images/ic-marker.svg'
import { useDrag } from 'react-dnd'
import { type } from "@testing-library/user-event/dist/type";
import { Monitor } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const ShowDeviceListModal = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  const { zoneDetailFatherAndChild } = useSelector(state => state.EmployeeZonesSlice)
  // console.log(zoneDetailFatherAndChild)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: '123' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  return (
    <div class="modal" id="showdevice_listModal" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>

          {/* <!-- Modal body --> */}
          <div class="modal-body">
            <div className="container">
              <div className="text-center">
                <h1>{t("devices")}</h1>
              </div>
              {
                zoneDetailFatherAndChild?.devices?.map((item, index) => {

                  return (
                    // <Draggable className="list_drag_device">
                    <p>
                      {/* <i class="fa fa-map-marker" aria-hidden="true"></i> */}
                      <img src={deviceMarker} alt="" width="15px" height="26px" style={{
                        marginRight: '10px',
                        border: isDragging ? "5px solid yellow" : "0px",

                      }}
                        ref={drag}
                      />
                      PDA 1
                      <span>
                        A
                        <img src={iccancel} alt="" />
                      </span>
                    </p>
                    // </Draggable>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDeviceListModal;
