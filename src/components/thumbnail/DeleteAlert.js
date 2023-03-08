import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

DeleteAlert.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    handleConfirm: PropTypes.func
}
function DeleteAlert({ open, handleClose, title, handleConfirm }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Do you want to delete this thumnail?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  onClick={handleClose}>Cancel</Button>
                <Button color='error' onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAlert