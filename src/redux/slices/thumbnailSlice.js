import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: null,
    images: [],
    currentPage: 0,
    pageSize: 5,
    total: 0
}

export const counterSlice = createSlice({
    name: 'thumbnail',
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
        setThumbnail(state, action) {
            const { images, currentPage, total, pageSize } = action.payload;
            state.images = images;
            state.currentPage = currentPage;
            state.total = total;
            state.pageSize = pageSize;
            state.loading = false;
            state.error = null;
        },
        setError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading, setError, setThumbnail } = counterSlice.actions


export default counterSlice.reducer