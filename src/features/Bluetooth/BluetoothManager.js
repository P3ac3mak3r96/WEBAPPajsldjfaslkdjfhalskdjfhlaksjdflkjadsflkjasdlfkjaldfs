import BluetoothService from '../../services/bluetooth/BluetoothService';
import { store } from '../../app/state/redux/store';
import {
  deviceDiscovered,
  deviceConnected,
  deviceDisconnected
} from '../../app/state/redux/slices/bluetoothSlice';

class BluetoothManager {
  constructor() {
    this.service = BluetoothService;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await this.service.initialize();
      this.isInitialized = true;
      this.setupEventListeners();
    } catch (error) {
      console.error('BluetoothManager initialization failed:', error);
      throw error;
    }
  }

  setupEventListeners() {
    // Setup any global Bluetooth event listeners here
  }

  async startScan() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.service.startScan();
  }

  stopScan() {
    return this.service.stopScan();
  }

  async connectToDevice(deviceId) {
    return this.service.connectToDevice(deviceId);
  }

  async disconnectDevice(deviceId) {
    return this.service.disconnectDevice(deviceId);
  }

  // Mode specific methods
  async startTrainingMode(mode, groups) {
    for (const group of groups) {
      await this.configureGroup(group);
    }
  }

  async configureGroup(group) {
    const { settings, clients } = group;
    
    const command = {
      mode: settings.mode,
      color: settings.color,
      minInterval: settings.minInterval,
      maxInterval: settings.maxInterval,
      sound: settings.sound
    };

    await this.service.sendGroupCommand(group.id, command);
  }

  async stopTrainingMode() {
    const state = store.getState();
    const groups = state.modes.tempGroups;

    for (const group of groups) {
      await this.service.sendGroupCommand(group.id, { type: 'STOP' });
    }
  }
}

export default new BluetoothManager();
