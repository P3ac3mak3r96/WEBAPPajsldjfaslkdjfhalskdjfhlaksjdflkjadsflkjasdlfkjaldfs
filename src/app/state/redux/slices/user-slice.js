import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    language: 'de',
    maxClients: 10,
    theme: 'dark',
    soundEnabled: true
  },
  lastTrainingSessions: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSettings(state, action) {
      state.settings = {
        ...state.settings,
        ...action.payload
      };
    },
    addTrainingSession(state, action) {
      state.lastTrainingSessions.unshift({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      });
      // Behalte nur die letzten 10 Sessions
      state.lastTrainingSessions = state.lastTrainingSessions.slice(0, 10);
    },
    clearTrainingSessions(state) {
      state.lastTrainingSessions = [];
    }
  }
});

export const {
  updateSettings,
  addTrainingSession,
  clearTrainingSessions
} = userSlice.actions;

export default userSlice.reducer;
