import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const FilterPopus = ({ setModalShow }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  let orderbyArray = [1, 2, , 3, 4]
  const [orderby, setOrderby] = useState();
  const [sort, setSort] = useState();


  return (
    <div className="col-md-3 filter_parent">
      <p className="filter_header">
        {t('filters')}
        <CloseIcon
          style={{ marginTop: "10px", color: "red", cursor: "pointer" }}
          onClick={() => setModalShow(false)}
        />
      </p>
      <div
        className="filter_body"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="col-md-12">
          <p>{t('attributes')}</p>
          <Box
            style={{ marginTop: "20px !important" }}
            className="mt-2"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>{t('order_by')}</InputLabel>
               <Select size="small"
                value={orderby}
                label={t('order_by')}
                onChange={(e) => setOrderby(e.target.value)}
              >
                {
                  orderbyArray?.map(item => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box
            className="mt-2"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t('sort')}</InputLabel>
               <Select size="small"
                value={sort}
                label={t('sort')}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="asc">ASC</MenuItem>
                <MenuItem value="des">DES</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div >
  );
};

export default FilterPopus;
