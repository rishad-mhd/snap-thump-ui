import styled from '@emotion/styled';
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const APP_BAR_MOBILE = 60;
const APP_BAR_DESKTOP = 70;

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

function HomeLayout() {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}

export default HomeLayout