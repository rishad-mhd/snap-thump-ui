import { Button, Container, Grid, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import roundArrowForward from '@iconify/icons-ic/round-arrow-forward';

import { APP_NAME } from '../../constant/config';

const AppName = styled(Typography)(() => ({
    background: 'linear-gradient(300deg, rgb(0 45 59) 0%, rgb(6 177 136) 25%, rgb(0 45 59) 50%, rgb(6 177 136) 75%, rgb(0 45 59) 100%) 0% 0% / 400%' ,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
}))

function Landing() {
    return (<>
        <Helmet>
            <title> Home | {APP_NAME} </title>
        </Helmet>

        <Container maxWidth="lg" sx={{ height: '75vh' }}>
            <Grid height='inherit' container alignItems={'center'} justifyContent='center'>
                <Grid item md={6} pt={2}>
                    <Stack alignItems='center' height='100%' justifyContent={'center'} >
                        <Typography textAlign='center' variant='h2'>
                            Create eye-catching thumbnails with
                        </Typography>
                        <AppName variant='h1'>{APP_NAME}</AppName>
                        <Button variant='contained'
                            size='large'
                            sx={{ mt: 2 }}
                            endIcon={
                                <Icon icon={roundArrowForward} />
                            }
                            LinkComponent={RouterLink}
                            to='/thumbnail/create'
                        >
                            Try for free
                        </Button>
                    </Stack>
                </Grid>
                <Grid item sx={{display:{xs:'none',lg:'block'}}}>
                    <img src='/assets/illustrations/home.png' alt='home'/>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}

export default Landing