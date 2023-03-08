import React from 'react'
import Lottie from "lottie-react";
import { Stack, styled } from '@mui/material';
import loadingAnimation from "./loadingAnimation.json";

const Main = styled(Stack)(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));
function LoadingScreen() {

    return (
        <Main >
            <Lottie animationData={loadingAnimation} style={{ width: 600 }} loop />
        </Main>
    )
}

export default LoadingScreen