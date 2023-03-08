import { Box, Button, Container, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { saveAs } from 'file-saver';
import JSZip from 'jszip'


import axios from '../../utils/axiosInstance'
import { APP_NAME } from '../../constant/config'
import ThumbnailGrid from '../../components/thumbnail/ThumbnailGrid';
import urlToPromise from '../../utils/urlToPromise';


function ThumbnailDetails() {

    const { id } = useParams()
    const [thumbnail, setThumbnail] = useState()
    const images = useMemo(() => thumbnail?.thumbnailUrls, [thumbnail])

    const handleDownload = () => {
        const now = Date.now()
        const zip = new JSZip();

        images.forEach((image) => {
            zip.file(`${now}_image_${image.size}.png`,urlToPromise(image.url), { base64: true });
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `images_${now}.zip`);
        });
    };

    useEffect(() => {
        const controller = new AbortController()
        axios.get(`/api/v1/thumbnail/${id}`, { signal: controller.signal }).then((res) => {
            setThumbnail(res.data.image)
        }).catch((e) => {
            console.log(e);
        })
        return () => {
            controller.abort()
        }
    }, [id])

    return (
        <>
            <Helmet>
                <title> Thumbnail Details | {APP_NAME} </title>
            </Helmet>
            <Container maxWidth='lg'>
                <Typography variant="h3" textAlign={'center'} gutterBottom>
                    Thumbnail Details
                </Typography>
                <Container maxWidth='md'>
                    <Stack alignItems={'center'} spacing={2}>
                        <Box component={'img'} src={thumbnail?.originalUrl} sx={{ borderRadius: 2 }} alt="" />
                        <Typography variant="h5" gutterBottom>
                            Original file: {thumbnail?.filename}
                        </Typography>
                    </Stack>
                </Container>
                <Stack direction='row' mt={5} mb={3} spacing={5} justifyContent='center' alignItems={'center'}>
                    <Typography variant="h3" textAlign={'center'} gutterBottom>
                        Generated Thumbnails
                    </Typography>
                    <Stack>
                        <Button variant='contained' onClick={handleDownload}>Download</Button>
                    </Stack>
                </Stack>
                
                <ThumbnailGrid images={images} />
            </Container>
        </>
    )
}

export default ThumbnailDetails



