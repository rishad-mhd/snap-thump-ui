import { Box, Stack, styled, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'


const ThumbnailSingle = styled(Box)(({ theme }) => ({
    objectFit: 'contain',
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadiusMd,
}))


ThumbnailGrid.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
}


function ThumbnailGrid({ images }) {
    return (
        <Stack
            spacing={2}
            alignItems={'center'}
            justifyContent='center'
            direction={'row'} flexWrap='wrap'>
            {images?.map((image, index) => (
                <Stack key={index} alignItems={'center'}>
                    <ThumbnailSingle
                        component={'img'}
                        src={image.url}
                        loading="lazy"
                        alt=''
                    />
                    <Typography variant='h6'>Size: {image.size}</Typography>
                </Stack>
            ))}
        </Stack>
    )
}

export default ThumbnailGrid