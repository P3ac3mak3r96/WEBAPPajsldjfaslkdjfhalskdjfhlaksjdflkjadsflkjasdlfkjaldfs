import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  connectedDevices: [],
  isScanning: false,
  error: null,
  connectionStatus: 'disconnected', // 'disconnected' | 'connecting' | 'connected'
  availableDevices: []
};

export const scanForDevices = createAsyncThunk(
  'bluetooth/scanForDevices',
  async (_, { rejectWithValue }) => {
    try {
      // Implementation would come from BluetoothService
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const connectToDevice = createAsyncThunk(
  'bluetooth/connectToDevice',
  async (deviceId, { rejectWithValue }) => {
    try {
      // Implementation would come from BluetoothService
      return { deviceId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    deviceDiscovered(state, action) {
      const device = action.payload;
      if (!state.availableDevices.find(d => d.id === device.id)) {
        state.availableDevices.push(device);
      }
    },
    deviceConnected(state, action) {
      const device = action.payload;
      state.connectedDevices.push(device);
      state.connectionStatus = 'connected';
    },
    deviceDisconnected(state, action) {
      const deviceId = action.payload;
      state.connectedDevices = state.connectedDevices.filter(d => d.id !== deviceId);
      if (state.connectedDevices.length === 0) {
        state.connectionStatus = 'disconnected';
      }
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(scanForDevices.pending, (state) => {
        state.isScanning = true;
      })
      .addCase(scanForDevices.fulfilled, (state, action) => {
        state.isScanning = false;
        state.availableDevices = action.payload;
      })
      .addCase(scanForDevices.rejected, (state, action) => {
        state.isScanning = false;
        state.error = action.payload;
      })
      .addCase(connectToDevice.pending, (state) => {
        state.connectionStatus = 'connecting';
      })
      .addCase(connectToDevice.fulfilled, (state, action) => {
        state.connectionStatus = 'connected';
      })
      .addCase(connectToDevice.rejected, (state, action) => {
        state.connectionStatus = 'disconnected';
        state.error = action.payload;
      });
  }
});

export const { deviceDiscovered, deviceConnected, deviceDisconnected, clearError } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
