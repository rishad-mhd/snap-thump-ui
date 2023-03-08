import { Autocomplete, Button, Chip, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { Link } from "react-router-dom";

import { APP_NAME } from "../../constant/config";
import FilePickerSimple from "../../components/file-picker/FilePickerSimple";
import axios from "../../utils/axiosInstance";
import ThumbnailGrid from "../../components/thumbnail/ThumbnailGrid";
import urlToPromise from "../../utils/urlToPromise";

const sizes = [200, 300, 400, 500, 600]


function CreateThumbnail() {

    const outPutRef = useRef(null)
    const [data, setData] = useState()
    const thumbnails = useMemo(()=>data?.thumbnailUrls,[data])

    const thumbnailSchema = Yup.object().shape({
        sizes: Yup.array().min(1, "Sizes must have at least one item").required('Sizes is required'),
        image: Yup.mixed().required('File is required'),
    });

    const { setValue, handleSubmit, getValues, formState: { errors, } } = useForm(
        {
            resolver: yupResolver(thumbnailSchema),
            defaultValues: { sizes: [200, 400, 600] }
        }
    )

    const handleDrop = useCallback((acceptedFiles) => {
        setValue('image', acceptedFiles[0], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }, [setValue]);

    

    const handleDownload = (images) => {
        const now = Date.now()
        const zip = new JSZip();

        images.forEach((image) => {
            zip.file(`${now}_image_${image.size}.png`, urlToPromise(image.url), { base64: true });
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `images_${now}.zip`);
        });
    };

    const onSubmit = (values) => {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item, i) => {
                    formData.append(`${key}[${i}]`, item)
                })
                return
            }
            formData.append(key, value)
        })

        axios.post('/api/v1/thumbnail', formData).then((res) => {
            setData(res.data)
            setTimeout(() => {
                outPutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 500);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <Helmet>
                <title> Create Thumbnail | {APP_NAME} </title>
            </Helmet>
            <Container maxWidth='md'>
                <Typography variant="h2" mb={2} textAlign={'center'}>
                    Resize your image
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FilePickerSimple error={Boolean(errors.image)} handleDrop={handleDrop} />
                    <Container maxWidth='sm'>

                        <Stack mt={5} spacing={3}>
                            <Typography variant="subtitle1">
                                Choose your sizes
                            </Typography>
                            <Autocomplete
                                options={sizes}
                                multiple
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip key={index} variant="filled" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                onChange={(e, value) => {
                                    setValue('sizes', value, {
                                        shouldValidate: true, shouldDirty: true, shouldTouch: true,
                                    })
                                }}
                                defaultValue={getValues().sizes}
                                getOptionLabel={(option) => String(option)}
                                renderInput={(params) =>
                                    <TextField
                                        label='Sizes'
                                        helperText={errors.sizes && errors.sizes.message}
                                        error={Boolean(errors.sizes)}
                                        {...params} />}

                            />
                            <Button type="submit" variant="contained" size='large'>Submit</Button>
                        </Stack>

                    </Container>
                </form>
                {thumbnails ?
                    <Stack mt={10} spacing={5}>
                        <Typography ref={outPutRef} variant="h2">
                            Your thumbnails has been generated!
                        </Typography>
                        <Stack direction={'row'} spacing={2} mb={2}>

                            <ThumbnailGrid images={thumbnails} />
                        </Stack>
                        <Stack justifyContent={'center'} spacing={2} direction={'row'}>
                            <Button variant="contained" onClick={()=>handleDownload(thumbnails)}>Download</Button>
                            <Button variant="contained" LinkComponent={Link} to={`/thumbnail/${data?._id}`}>View</Button>
                        </Stack>
                    </Stack>
                    : <></>}
            </Container>
        </>
    )
}

export default CreateThumbnail