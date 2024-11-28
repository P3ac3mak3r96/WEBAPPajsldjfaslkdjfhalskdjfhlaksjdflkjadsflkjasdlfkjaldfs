import { createSelector } from '@reduxjs/toolkit';

export const selectUserState = state => state.user;

export const selectUserSettings = createSelector(
  selectUserState,
  user => user.settings
);

export const selectLanguage = createSelector(
  selectUserSettings,
  settings => settings.language
);

export const selectMaxClients = createSelector(
  selectUserSettings,
  settings => settings.maxClients
);

export const selectLastTrainingSessions = createSelector(
  selectUserState,
  user => user.lastTrainingSessions
);
