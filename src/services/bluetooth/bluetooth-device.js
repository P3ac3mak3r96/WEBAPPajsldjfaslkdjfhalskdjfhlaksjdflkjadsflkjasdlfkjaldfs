class BluetoothDevice {
  constructor(device) {
    this.id = device.id;
    this.name = device.name || 'Unknown Device';
    this.rssi = device.rssi;
    this.services = new Map();
    this.characteristics = new Map();
    this.isConnected = false;
    this.lastCommand = null;
    this.commandQueue = [];
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  // LED Control Methods
  async setLEDColor(color) {
    return this.sendCommand({
      type: 'LED_COLOR',
      payload: color
    });
  }

  async setLEDMode(mode, params = {}) {
    return this.sendCommand({
      type: 'LED_MODE',
      payload: {
        mode,
        ...params
      }
    });
  }

  async startBlinking(interval, color) {
    return this.sendCommand({
      type: 'BLINK_START',
      payload: {
        interval,
        color
      }
    });
  }

  async stopBlinking() {
    return this.sendCommand({
      type: 'BLINK_STOP'
    });
  }

  // Sound Control Methods
  async playSound(soundId, volume = 1.0) {
    return this.sendCommand({
      type: 'PLAY_SOUND',
      payload: {
        soundId,
        volume
      }
    });
  }

  async stopSound() {
    return this.sendCommand({
      type: 'STOP_SOUND'
    });
  }

  // Command Queue Management
  async sendCommand(command) {
    this.commandQueue.push(command);
    return this.processCommandQueue();
  }

  async processCommandQueue() {
    if (this.commandQueue.length === 0) return;

    const command = this.commandQueue[0];
    try {
      // Actual command sending would happen here through the BLE service
      this.lastCommand = command;
      this.commandQueue.shift();
      this.retryCount = 0;
      return true;
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        return this.processCommandQueue();
      }
      throw error;
    }
  }

  // State Management
  updateState(newState) {
    Object.assign(this, newState);
  }

  disconnect() {
    this.isConnected = false;
    this.commandQueue = [];
    this.lastCommand = null;
    this.retryCount = 0;
  }
}

export default BluetoothDevice;
