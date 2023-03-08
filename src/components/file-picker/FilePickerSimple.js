import React from "react";
import PropTypes from 'prop-types';
import { Button, Stack, styled, Typography, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Icon } from '@iconify/react';
import outlineFileUpload from '@iconify/icons-ic/outline-file-upload';
import { motion } from "framer-motion"

const RootStyle = styled('div')(({ theme }) => ({
    border: "3px dashed #ccc",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    // height: 200,
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    "&:focus": {
        outline: "none",
    },
}));

const ImageStyled = styled('img')(() => ({
    height: 200,
    width: 200,
    objectFit: 'contain'
}))

FilePickerSimple.propTypes = {
    handleDrop: PropTypes.func,
    error: PropTypes.bool
}

function FilePickerSimple({ handleDrop, error, ...other }) {
    const theme = useTheme()
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop: handleDrop,
        accept: "image/*",
        multiple: false,
        ...other
    });

    return (
        <RootStyle sx={{
            background: error && theme.palette.error.lighter,
            borderColor: error && theme.palette.error.main
        }} {...getRootProps()} >
            <input {...getInputProps()} />
            <Stack alignItems={'center'} p={5}>
                {acceptedFiles.length ? acceptedFiles.map((file, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}>
                        <ImageStyled
                            src={URL.createObjectURL(file)}
                            alt='file' />
                    </motion.div>
                ))
                    : <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <Icon fontSize={100} color={theme.palette.primary.main} icon={outlineFileUpload} />
                    </motion.div>
                }
                <Typography variant="h4">
                    {isDragActive ? "Drop your files here" : "Drag and drop file here, or click to select files"}
                </Typography>
                <Button sx={{ mt: 2 }} variant="contained" size="large">
                    Browse
                </Button>
            </Stack>

        </RootStyle>
    )

}

export default FilePickerSimple