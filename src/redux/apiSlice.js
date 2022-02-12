import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, BUY_FONTS } from "../constants";

const initialState = {
  tabs: [],
  myFonts: [],
  buyFonts: {},
  fontSelected: -1,
  tabSelected: BUY_FONTS,
};

export const getTabsData = createAsyncThunk("api/getTabsData", async () => {
  const response = await axios.get(`${API_URL}/tabs`);
  const responseJson = response.data.filter((tab) => tab.label !== undefined);
  return responseJson;
});

export const getBuyFontsData = createAsyncThunk(
  "api/getBuyFontsData",
  async () => {
    const response = await axios.get(`${API_URL}/fonts_b`);
    const responseJson = response.data;
    return responseJson;
  }
);

export const getMyFontsData = createAsyncThunk(
  "api/getMyFontsData",
  async () => {
    const response = await axios.get(`${API_URL}/fonts_a`);
    const responseJson = response.data.content;
    return responseJson;
  }
);

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    selectFont(state, action) {
      state.fontSelected = action.payload;
    },
    selectTab(state, action) {
      state.tabSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTabsData.fulfilled, (state, action) => {
      state.tabs = action.payload;
    });
    builder.addCase(getMyFontsData.fulfilled, (state, action) => {
      state.myFonts = action.payload;
    });
    builder.addCase(getBuyFontsData.fulfilled, (state, action) => {
      state.buyFonts = action.payload;
    });
  },
});

export const { selectFont, selectTab } = apiSlice.actions;

export default apiSlice.reducer;
