import { AppBar, Box, Button, IconButton, Link, Stack, styled, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import AccountPopover from './AccountPopover';
import Logo from '../../../components/logo/Logo';
// utils
import { bgBlur } from '../../../utils/cssStyles';
import { APP_NAME } from '../../../constant/config';
import useAuth from '../../../hooks/useAuth';
import Nav from '../nav';
import Iconify from '../../../components/iconify/Iconify';

const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    color: theme.palette.text.primary
    // [theme.breakpoints.up('lg')]: {
    //     width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    // },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    // minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        // minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));
const pages = [{ label: 'Create', path: '/thumbnail/create' }, { label: 'List', path: '/thumbnail/list' }, { label: 'About', path: '#' }, { label: 'Contact us', path: '#' }];

function Header() {
    const { user } = useAuth()
    const [openNav, setOpenNav] = useState()
    const onOpenNav = () => setOpenNav(true)
    const onCloseNav = () => setOpenNav(false)
    return (
        <StyledRoot>
            <StyledToolbar>
                <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                    <Logo />
                </Box>
                <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
                    <Typography variant='h3'>
                        {APP_NAME}
                    </Typography>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <Nav openNav={openNav} onCloseNav={onCloseNav} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                variant='text'
                                // onClick={handleCloseNavMenu}
                                LinkComponent={RouterLink}
                                to={page.path}
                                size='large'
                                sx={{ my: 2, display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                    {user ? <AccountPopover /> : <Button variant='contained' LinkComponent={RouterLink}
                        to={'/login'}>Login</Button>}
                    <IconButton
                        onClick={onOpenNav}
                        sx={{
                            mr: 1,
                            color: 'text.primary',
                            display: { md: 'none' },
                        }}
                    >
                        <Iconify icon="eva:menu-2-fill" />
                    </IconButton>

                </Stack>
            </StyledToolbar>
        </StyledRoot>
    )
}

export default Header