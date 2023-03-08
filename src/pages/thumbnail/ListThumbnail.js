import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
// mock
import { APP_NAME } from '../../constant/config'
import { setError, setLoading, setThumbnail } from '../../redux/slices/thumbnailSlice';
import axios from '../../utils/axiosInstance';
import { fDateTime } from '../../utils/formatTime';
import DeleteAlert from '../../components/thumbnail/DeleteAlert';
import ThumbnailListHead from './ThumbnailListHead';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'file', label: 'File', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'createdAt', label: 'Created At', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: false },
];

// ----------------------------------------------------------------------





function ListThumbnail() {

    const dispatch = useDispatch()
    const {enqueueSnackbar}=useSnackbar()
    const [page, setPage] = useState(0);
    const [deleteThumbnail, setDeleteThumbnail] = useState({ show: false, id: null });

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { images, total, loading } = useSelector(state => state.thumbnail)




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleDelete = (id) => {
        axios.delete(`/api/v1/thumbnail/${id}`)
            .then((res) => {
                console.log(res.data);
                setDeleteThumbnail({ show: false, id: null })
                enqueueSnackbar(res.data.message,{variant:'success'})
                fetchData()
            })
            .catch((e) => {
                enqueueSnackbar(e.response.data.message,{variant:'error'})
            })
    }

    const fetchData = async (controller) => {
        dispatch(setLoading());
        try {
            const response = await axios.get('/api/v1/thumbnail',
                {
                    params: {
                        currentPage: page,
                        pageSize: rowsPerPage,
                    },
                    signal: controller?.signal
                });
            dispatch(
                setThumbnail({
                    images: response.data.images,
                    currentPage: page,
                    total: response.data.total,
                })
            );
        } catch (err) {
            dispatch(setError(err.message));
        }
    };
    
    useEffect(() => {
        const controller = new AbortController()

        fetchData(controller);

        return () => {
            controller.abort()
        }
    }, [page, rowsPerPage, dispatch]);


    return (<>
        <Helmet>
            <title> List Thumbnail | {APP_NAME} </title>
        </Helmet>
        <Container maxWidth='md'>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Thumbnails
                </Typography>
                <Button LinkComponent={RouterLink} to='/thumbnail/create' variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Create
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <ThumbnailListHead
                                headLabel={TABLE_HEAD}
                            />
                            <TableBody>
                                {images.map((row) => {
                                    const { _id: id, filename, createdAt, originalUrl } = row;

                                    return (
                                        <TableRow hover key={id} tabIndex={-1} role="checkbox">

                                            <TableCell component="th" scope="row" >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar variant='rounded' sx={{ width: 66, height: 66 }} alt={filename} src={originalUrl} />
                                                </Stack>
                                            </TableCell>

                                            <TableCell component={RouterLink} to={`/thumbnail/${id}`} align="left">
                                                <Typography variant="subtitle2" noWrap>
                                                    {filename}
                                                </Typography></TableCell>

                                            <TableCell align="left">{fDateTime(createdAt)}</TableCell>

                                            <TableCell align="center">
                                                <Button
                                                    sx={{ color: 'error.main' }}
                                                    startIcon={<Iconify icon={'eva:trash-2-outline'} />}
                                                    onClick={() => setDeleteThumbnail({ show: true, id })}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>

                            {(loading || !images.length) && <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <Paper
                                            sx={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Typography variant="h6" paragraph>
                                                {loading ? "Loading..." : "Not found"}
                                            </Typography>

                                        </Paper>
                                    </TableCell>
                                </TableRow>
                            </TableBody>}
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
        <DeleteAlert
            open={deleteThumbnail.show}
            handleClose={() => setDeleteThumbnail({ show: false, id: null })}
            handleConfirm={() => handleDelete(deleteThumbnail.id)}
            title='Are you sure?' />
    </>
    )
}

export default ListThumbnail