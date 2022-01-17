import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITunesResponse, SearchResponse } from "./search.api";
import axios from "axios";
import { createAppThunk, RootState } from "../../app/store";

interface SearchState {
  searchTerm: string;
  pendingAPIRequests: number;
  page: number;
  results: ITunesResponse[];
}

const initialState: SearchState = {
  searchTerm: "",
  pendingAPIRequests: 0,
  page: -1,
  results: [],
};

type SearchResults =
  | { status: "welcome" }
  | { status: "loading" }
  | { status: "none" }
  | { status: "list"; results: ITunesResponse[] };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchForTerm.pending, (state, action) => {
      state.searchTerm = action.meta.arg;
      state.page = 1;
      state.pendingAPIRequests++;
    });

    builder.addCase(searchForTerm.fulfilled, (state, action) => {
      state.page++;
      state.pendingAPIRequests--;
      state.results = action.payload.results;
    });

    builder.addCase(searchForTerm.rejected, (state, action) => {
      state.page = 1;
      state.pendingAPIRequests--;
      state.results = [];
    });
  },
});

export const searchForTerm = createAppThunk(
  "search/term",
  async (term: string, { getState }) => {
    const { page } = getState();
    const response = await axios.get<SearchResponse>(`api/search`, {
      params: { term, page },
    });

    return response.data;
  }
);

export const searchResultsSelector = (state: RootState): SearchResults => {
  if (!state.searchTerm) return { status: "welcome" };
  if (state.pendingAPIRequests > 0) return { status: "loading" };
  if (!state.results.length) return { status: "none" };
  return {
    status: "list",
    results: state.results,
  };
};

export default searchSlice.reducer;
