import React, {useState} from 'react'
import MUIDataTable from "mui-datatables";
const CustomDatatable = ({tableData}) => {
     const [dropDownProps, setDropDownProps] = useState({
    panel:'events',
    firstItem:'ALLOW EVENT',
    secondItem:'VIEW DETAILS'
  })
const columns = [
    {
      name: "NAME",
      label: "NAME",
      options: {
        filter: true,
      },
    },
    {
      name: "ZONE",
      label: "ZONE",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "HOST",
      label: "HOST",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "DATE",
      label: "DATE",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "OPTIONS",
      label: "OPTIONS",
      options: {
        filter: true,
        sort: false,
      },
    }
  ];

  const data = [
    {
      NAME: "Joe James",
      ZONE: "Test Corp",
      HOST: "Yonkers",
      DATE: "NY",
      OPTIONS: tableData.icon,
    }
  ];
  const options = {
    filterType: "checkbox",
  };
  // console.log(tableData)
  return (
    <div className='custom_dataTable'>
        <div className="table_title">
            <h4>{tableData[0].title}</h4>
            <span>{tableData[0].subTitle}</span>
        </div>
          <MUIDataTable
                    title={"type the name to filter"}
                    data={tableData[0].data}
                    columns={tableData[0].columns}
                    options={{
                      selectableRows: false, // <===== will turn off checkboxes in rows
                    }}
                  />
    </div>
  )
}

export default CustomDatatable