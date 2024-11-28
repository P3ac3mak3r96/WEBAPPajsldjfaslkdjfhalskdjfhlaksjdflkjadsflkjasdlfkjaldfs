import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customModes: [],
  activeMode: null,
  tempGroups: [], // Für Mode Creator
  selectedConfigType: null, // 'group' | 'individual'
};

const modesSlice = createSlice({
  name: 'modes',
  initialState,
  reducers: {
    setActiveMode(state, action) {
      state.activeMode = action.payload;
    },
    addCustomMode(state, action) {
      state.customModes.push({
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString()
      });
    },
    updateCustomMode(state, action) {
      const index = state.customModes.findIndex(mode => mode.id === action.payload.id);
      if (index !== -1) {
        state.customModes[index] = {
          ...state.customModes[index],
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteCustomMode(state, action) {
      state.customModes = state.customModes.filter(mode => mode.id !== action.payload);
    },
    setTempGroups(state, action) {
      state.tempGroups = action.payload;
    },
    addTempGroup(state, action) {
      state.tempGroups.push(action.payload);
    },
    updateTempGroup(state, action) {
      const index = state.tempGroups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.tempGroups[index] = action.payload;
      }
    },
    deleteTempGroup(state, action) {
      state.tempGroups = state.tempGroups.filter(group => group.id !== action.payload);
    },
    clearTempGroups(state) {
      state.tempGroups = [];
    },
    setConfigType(state, action) {
      state.selectedConfigType = action.payload;
    }
  }
});

export const {
  setActiveMode,
  addCustomMode,
  updateCustomMode,
  deleteCustomMode,
  setTempGroups,
  addTempGroup,
  updateTempGroup,
  deleteTempGroup,
  clearTempGroups,
  setConfigType
} = modesSlice.actions;

export default modesSlice.reducer;
