import React, { useState, useEffect } from 'react'
import { Toast, Button } from 'react-bootstrap';


const ErrorHandling = ({ errorHandle, message }) => {
    const [showCustom1, setShowCustom1] = useState(false);


    useEffect(() => {
        if (errorHandle === false) {
            setShowCustom1(!showCustom1)
        }
    }, [errorHandle])

    return (
        <>
            <Toast
                className={errorHandle === false ? "d-flex bg-danger text-white fw-bold align-items-center " :
                    "d-flex bg-success text-white fw-bold align-items-center "}
                show={showCustom1}
                onClose={() => setShowCustom1(false)}
                delay={3000}
                autohide>
                <Toast.Body>{message}</Toast.Body>
                <Button
                    variant=""
                    onClick={() => setShowCustom1(false)}
                    className="btn-close ms-auto me-2"></Button>
            </Toast>
        </>
    )
}

export default ErrorHandling