import { Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { store } from '../../app/state/redux/store';
import { deviceDiscovered, deviceConnected, deviceDisconnected } from '../../app/state/redux/slices/bluetoothSlice';

class BluetoothService {
  constructor() {
    this.manager = new BleManager();
    this.connectedDevices = new Map();
    this.isScanning = false;
  }

  async initialize() {
    try {
      const state = await this.manager.state();
      if (state !== 'PoweredOn') {
        throw new Error('Bluetooth is not powered on');
      }
      return true;
    } catch (error) {
      console.error('Bluetooth initialization failed:', error);
      throw error;
    }
  }

  async startScan() {
    if (this.isScanning) return;

    try {
      this.isScanning = true;
      await this.manager.startDeviceScan(
        null, // null means scan for all services
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.error('Scan error:', error);
            this.stopScan();
            return;
          }

          if (device && this.isValidDevice(device)) {
            const deviceInfo = {
              id: device.id,
              name: device.name || 'Unknown Device',
              rssi: device.rssi,
              manufacturer: device.manufacturerData
            };
            store.dispatch(deviceDiscovered(deviceInfo));
          }
        }
      );
    } catch (error) {
      console.error('Start scan failed:', error);
      this.isScanning = false;
      throw error;
    }
  }

  stopScan() {
    if (this.isScanning) {
      this.manager.stopDeviceScan();
      this.isScanning = false;
    }
  }

  async connectToDevice(deviceId) {
    try {
      const device = await this.manager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      
      // Set up device listeners
      device.onDisconnected((error, disconnectedDevice) => {
        this.handleDisconnection(disconnectedDevice.id);
      });

      // Store connected device
      this.connectedDevices.set(deviceId, device);
      
      const deviceInfo = {
        id: device.id,
        name: device.name || 'Unknown Device',
        rssi: device.rssi
      };
      
      store.dispatch(deviceConnected(deviceInfo));
      return deviceInfo;
    } catch (error) {
      console.error('Connection failed:', error);
      throw error;
    }
  }

  async disconnectDevice(deviceId) {
    const device = this.connectedDevices.get(deviceId);
    if (device) {
      try {
        await device.cancelConnection();
        this.connectedDevices.delete(deviceId);
        store.dispatch(deviceDisconnected(deviceId));
      } catch (error) {
        console.error('Disconnection failed:', error);
        throw error;
      }
    }
  }

  async sendData(deviceId, data) {
    const device = this.connectedDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not connected');
    }

    try {
      // Implement your data sending protocol here
      // Example:
      const service = '1234';  // Your service UUID
      const characteristic = '5678';  // Your characteristic UUID
      
      await device.writeCharacteristicWithResponse(
        service,
        characteristic,
        this.encodeData(data)
      );
    } catch (error) {
      console.error('Send data failed:', error);
      throw error;
    }
  }

  // Helper methods
  isValidDevice(device) {
    // Implement your device filtering logic here
    // Example: Check for specific service UUIDs or name patterns
    return true;
  }

  encodeData(data) {
    // Implement your data encoding logic here
    // Convert your data structure to base64 string
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  handleDisconnection(deviceId) {
    this.connectedDevices.delete(deviceId);
    store.dispatch(deviceDisconnected(deviceId));
  }

  // Group command methods
  async sendGroupCommand(groupId, command) {
    const state = store.getState();
    const group = state.modes.tempGroups.find(g => g.id === groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }

    const commands = group.clients.map(clientId => 
      this.sendData(clientId, {
        ...command,
        groupId,
        timestamp: Date.now()
      })
    );

    try {
      await Promise.all(commands);
      return true;
    } catch (error) {
      console.error('Group command failed:', error);
      throw error;
    }
  }
}

export default new BluetoothService();
