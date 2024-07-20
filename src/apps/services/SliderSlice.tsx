import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import slider from "../../dataTypes/types/slider";
import { ISliderImage, ISliders } from "../../dataTypes/interfaces/sliders";
// ___________________________________________________________

const initState: ISliders = {
    imageList: [],
    imageListLenght: 0,
    count: 0,
    errorMessage: null
}

const sliderSlice = createSlice({
    name: 'slider',
    initialState: initState,

    reducers: {

        getSlider: (state, action: PayloadAction<ISliderImage[]>) => {
            state.imageList = action.payload;
            state.imageListLenght = state.imageList.length;
            state.count = 1;
            state.errorMessage = null
        },

        setError: (state, action: PayloadAction<any>) => {
            state.imageList = [];
            state.imageListLenght = 0;
            state.count = 0;
            state.errorMessage = action.payload
        },

        nextSlider: (state) => {
            if (state.count < state.imageListLenght) {
                state.count += 1
            } else {
                state.count = 1
            }

        }
    }
});


export default sliderSlice.reducer;
export const { getSlider, nextSlider, setError } = sliderSlice.actions;

