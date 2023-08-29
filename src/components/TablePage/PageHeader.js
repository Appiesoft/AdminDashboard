import React from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({
    title,
    searchItem,
    handleExportPdf,
    handleExportCSV,
    handlePrintPdf,
    openTableOption,
    setOpenTableOption,
    link,
    action,
    children,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <div className="d-flex justify-content-between mx-2 my-1">
                <div className="d-flex gap-2 ps-0 my-1">
                    <h4 className="page-title color">{title}</h4>
                    <div
                        className="d-none d-sm-flex align-items-center rounded border align-self-center"
                        style={{ height: 'fit-content' }}>
                        <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                className="border-0"
                                onChange={(e) => {
                                    searchItem(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="col-sm-6 d-flex my-1 pe-0 align-self-center gap-1 justify-content-end">
                    {children}
                    {link && (
                        <OverlayTrigger placement="auto" overlay={<Tooltip id="tooltip-auto">Add {title}</Tooltip>}>
                            <span
                                className="text-center p-1 border rounded-2 tableOption color"
                                onClick={() => {
                                    navigate(`/${link}`);
                                    dispatch(action());
                                }}>
                                <i class="bi bi-plus-lg fs-4 fw-bold"></i>
                            </span>
                        </OverlayTrigger>
                    )}
                    <OverlayTrigger placement="auto" overlay={<Tooltip id="overlay-example">Export Pdf</Tooltip>}>
                        <span className="text-center p-1 border rounded-2 tableOption color" onClick={handleExportPdf}>
                            <i className="bi bi-file-earmark-pdf fs-4"></i>
                        </span>
                    </OverlayTrigger>
                    <OverlayTrigger placement="auto" overlay={<Tooltip id="overlay-example">Export CSV</Tooltip>}>
                        <span className="text-center p-1 border rounded-2 tableOption color" onClick={handleExportCSV}>
                            <i className="bi bi-file-earmark-x fs-4"></i>
                        </span>
                    </OverlayTrigger>
                    <OverlayTrigger placement="auto" overlay={<Tooltip id="overlay-example">Print</Tooltip>}>
                        <span className="text-center p-1 border rounded-2 tableOption color" onClick={handlePrintPdf}>
                            <i className="bi bi-printer fs-4"></i>
                        </span>
                    </OverlayTrigger>
                    <OverlayTrigger placement="auto" overlay={<Tooltip id="overlay-example">Table Options</Tooltip>}>
                        <span
                            className="text-center p-1 border rounded-2 tableOption color"
                            onClick={() => setOpenTableOption(!openTableOption)}>
                            <i className="bi bi-gear fs-4"></i>
                        </span>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="d-flex d-sm-none justify-content-center gap-2 mx-2">
                <div
                    className="d-flex align-items-center rounded border align-self-center"
                    style={{ height: 'fit-content' }}>
                    <span className="mdi mdi-magnify ms-1" style={{ fontSize: 'large' }}></span>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search..."
                            className="border-0"
                            onChange={(e) => {
                                searchItem(e.target.value);
                            }}
                        />
                    </InputGroup>
                </div>
            </div>
        </>
    );
};

export default PageHeader;
