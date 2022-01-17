import {
  AsyncThunkPayloadCreator,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import searchReducer from "../features/search/search.slice";

export const store = configureStore({
  reducer: searchReducer,
});

export type RootState = ReturnType<typeof searchReducer>;

export type AppDispatch = typeof store.dispatch;

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function createAppThunk<Returned = void, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>
) {
  return createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
    typePrefix,
    payloadCreator
  );
}
