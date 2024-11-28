import { createSelector } from '@reduxjs/toolkit';

export const selectBluetoothState = state => state.bluetooth;

export const selectConnectedDevices = createSelector(
  selectBluetoothState,
  bluetooth => bluetooth.connectedDevices
);

export const selectConnectionStatus = createSelector(
  selectBluetoothState,
  bluetooth => bluetooth.connectionStatus
);

export const selectAvailableDevices = createSelector(
  selectBluetoothState,
  bluetooth => bluetooth.availableDevices
);

export const selectIsScanning = createSelector(
  selectBluetoothState,
  bluetooth => bluetooth.isScanning
);
