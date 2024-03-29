import React, { useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import cancel from '../../../../assets/images//ic-cancel.svg'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { t } from "i18next";
const options = ['WEEK 1', 'WEEK 2', 'WEEK3'];
const ProvidersFilterModal = (props) => {
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
                            <Button className={`filterButton ${isActive === 1 ? 'btn-active' : ''}`} onClick={() => handleButton(1)}>{t("day")}</Button>
                            <Button className={`filterButton ${isActive === 2 ? 'btn-active' : ''}`} onClick={() => handleButton(2)}>{t("month")}</Button>
                            <Button className={`filterButton ${isActive === 3 ? 'btn-active' : ''}`} onClick={() => handleButton(3)}>{t("weak")}</Button>
                            <Button className={`filterButton ${isActive === 4 ? 'btn-active' : ''}`} onClick={() => handleButton(4)}>{t("year")}</Button>
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
                                    renderInput={(params) => <TextField size="small" {...params} label="Controllable" />}
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
                                    renderInput={(params) => <TextField size="small" {...params} label="Controllable" />}
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
                                renderInput={(params) => <TextField size="small" {...params} label="Controllable" />}
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
                                renderInput={(params) => <TextField size="small" {...params} label="Controllable" />}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>

    );
};

export default ProvidersFilterModal;