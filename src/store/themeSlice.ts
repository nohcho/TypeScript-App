import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  themeMode: string;
}

const initialState: SettingsState = {
  themeMode: (localStorage.getItem("theme") as string) || "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
      localStorage.setItem("theme", state.themeMode);
    },
  },
});

export const { setThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
