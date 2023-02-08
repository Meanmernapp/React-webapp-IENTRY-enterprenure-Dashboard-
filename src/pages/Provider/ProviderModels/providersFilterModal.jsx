import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import cancel from '../../../assets/images//ic-cancel.svg'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const options = ['WEEK 1', 'WEEK 2', 'WEEK3'];

const ProvidersFilterModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [value, setValue] = React.useState(options[0]);
    const [isActive, setIsActive] = useState(1)
    const [inputValue, setInputValue] = useState('');
    const { title, check } = props;

    const handleButton = (index) => {
        setIsActive(index)
    }
    return (
        <Modal
            className="providers-filter"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("filters")}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="docsModalBody">
                <div className="row">
                    <div className="col-8 leftSection">
                        <div className="heading-light ">{t("dates")}</div>

                        <ButtonGroup size="lg" className="buttonFilters">
                            <Button className={`filterButton ${isActive === 1 ? 'btn-active' : ''}`} onClick={() => handleButton(1)}>DAY</Button>
                            <Button className={`filterButton ${isActive === 2 ? 'btn-active' : ''}`} onClick={() => handleButton(2)}>MONTH</Button>
                            <Button className={`filterButton ${isActive === 3 ? 'btn-active' : ''}`} onClick={() => handleButton(3)}>WEAK</Button>
                            <Button className={`filterButton ${isActive === 4 ? 'btn-active' : ''}`} onClick={() => handleButton(4)}>YEAR</Button>
                        </ButtonGroup>
                        <div className="dropdownFilter">
                            <div>
                                <div className="dropdownFilters"></div>
                                <Autocomplete
                                    className="dropdownFilter"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={options}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField size="small" {...params} label={t("controlable")}
                                        sx={{
                                            textAlign: lCode === "ar" ? "right" : "left",
                                            "& 	.MuiOutlinedInput-notchedOutline": {
                                                textAlign: lCode === "ar" ? "right" : "left",
                                            },
                                            "& 	.MuiInputLabel-root": {
                                                fontSize: 12,
                                                left: lCode === "ar" ? "inherit" : "0",
                                                right: lCode === "ar" ? "1.75rem" : "0",
                                                transformOrigin: lCode === "ar" ? "right" : "left"
                                            }
                                        }} />}
                                />
                            </div>
                            <div>
                                <div className="dropdownFilters"></div>
                                <Autocomplete
                                    className="dropdownFilter"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={options}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField size="small" {...params} label={t("controlable")}
                                        sx={{
                                            textAlign: lCode === "ar" ? "right" : "left",
                                            "& 	.MuiOutlinedInput-notchedOutline": {
                                                textAlign: lCode === "ar" ? "right" : "left",
                                            },
                                            "& 	.MuiInputLabel-root": {
                                                fontSize: 12,
                                                left: lCode === "ar" ? "inherit" : "0",
                                                right: lCode === "ar" ? "1.75rem" : "0",
                                                transformOrigin: lCode === "ar" ? "right" : "left"
                                            }
                                        }} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 rightSection">
                        <div className="heading-light ">{t("dates")}</div>
                        <div>
                            <div className="dropdownFilters"></div>
                            <Autocomplete
                                className="dropdownFilter"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={options}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField size="small" {...params} label={t("controlable")}
                                    sx={{
                                        textAlign: lCode === "ar" ? "right" : "left",
                                        "& 	.MuiOutlinedInput-notchedOutline": {
                                            textAlign: lCode === "ar" ? "right" : "left",
                                        },
                                        "& 	.MuiInputLabel-root": {
                                            fontSize: 12,
                                            left: lCode === "ar" ? "inherit" : "0",
                                            right: lCode === "ar" ? "1.75rem" : "0",
                                            transformOrigin: lCode === "ar" ? "right" : "left"
                                        }
                                    }} />}
                            />
                        </div>
                        <div>
                            <div className="dropdownFilters"></div>
                            <Autocomplete
                                className="dropdownFilter"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={options}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField size="small" {...params} label={t("controlable")}
                                    sx={{
                                        textAlign: lCode === "ar" ? "right" : "left",
                                        "& 	.MuiOutlinedInput-notchedOutline": {
                                            textAlign: lCode === "ar" ? "right" : "left",
                                        },
                                        "& 	.MuiInputLabel-root": {
                                            fontSize: 12,
                                            left: lCode === "ar" ? "inherit" : "0",
                                            right: lCode === "ar" ? "1.75rem" : "0",
                                            transformOrigin: lCode === "ar" ? "right" : "left"
                                        }
                                    }} />}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>

    );
};

export default ProvidersFilterModal;