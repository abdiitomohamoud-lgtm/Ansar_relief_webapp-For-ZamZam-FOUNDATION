import { io } from 'socket.io-client';
import { store } from '../store';
import {
  markDonationsCacheStale,
  markCampaignsCacheStale,
  markNeedsRefresh
} from '../store/slices';

class RealtimeService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second delay
  }

  connect() {
    if (this.socket) return;

    this.socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
      reconnection: true,
      reconnectionDelay: this.reconnectDelay,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Connection events
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.isConnected = false;
      this.handleDisconnect(reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleConnectionError(error);
    });

    // Donation updates
    this.socket.on('donation:new', (donation) => {
      store.dispatch(markDonationsCacheStale());
      this.notifyUser('New donation received', {
        body: `Thank you for your donation of $${donation.amount} to ${donation.campaign.name}`,
        icon: '/icons/donation.png'
      });
    });

    this.socket.on('donation:status', (update) => {
      store.dispatch(markDonationsCacheStale());
      this.notifyUser('Donation status updated', {
        body: `Your donation status has been updated to: ${update.status}`,
        icon: '/icons/status.png'
      });
    });

    // Campaign updates
    this.socket.on('campaign:update', (campaign) => {
      store.dispatch(markCampaignsCacheStale());
      if (campaign.isSubscribed) {
        this.notifyUser('Campaign Update', {
          body: `${campaign.name} has been updated with new information`,
          icon: '/icons/campaign.png'
        });
      }
    });

    this.socket.on('campaign:milestone', (data) => {
      store.dispatch(markCampaignsCacheStale());
      this.notifyUser('Campaign Milestone', {
        body: `${data.campaign.name} has reached ${data.milestone}% of its goal!`,
        icon: '/icons/milestone.png'
      });
    });

    // Profile updates
    this.socket.on('profile:update', (update) => {
      store.dispatch(markNeedsRefresh());
      this.notifyUser('Profile Updated', {
        body: 'Your profile information has been updated successfully',
        icon: '/icons/profile.png'
      });
    });

    // Impact updates
    this.socket.on('impact:update', (impact) => {
      store.dispatch(markNeedsRefresh());
      this.notifyUser('Impact Update', {
        body: `Your donations have helped ${impact.beneficiaries} beneficiaries!`,
        icon: '/icons/impact.png'
      });
    });
  }

  handleDisconnect(reason) {
    if (reason === 'io server disconnect') {
      // Server initiated disconnect, attempt reconnect
      this.reconnect();
    }
  }

  handleConnectionError(error) {
    this.reconnectAttempts++;
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnect();
      }, this.reconnectDelay);
      // Exponential backoff
      this.reconnectDelay *= 2;
    } else {
      console.error('Max reconnection attempts reached');
      // Notify user about connection issues
      this.notifyUser('Connection Error', {
        body: 'Unable to maintain real-time connection. Please refresh the page.',
        icon: '/icons/error.png'
      });
    }
  }

  reconnect() {
    if (!this.socket) return;
    this.socket.connect();
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
    this.isConnected = false;
  }

  // Subscribe to specific campaign updates
  subscribeToCampaign(campaignId) {
    if (!this.isConnected) return;
    this.socket.emit('campaign:subscribe', { campaignId });
  }

  // Unsubscribe from campaign updates
  unsubscribeFromCampaign(campaignId) {
    if (!this.isConnected) return;
    this.socket.emit('campaign:unsubscribe', { campaignId });
  }

  // Join a specific donation room for updates
  joinDonationRoom(donationId) {
    if (!this.isConnected) return;
    this.socket.emit('donation:join', { donationId });
  }

  // Leave a donation room
  leaveDonationRoom(donationId) {
    if (!this.isConnected) return;
    this.socket.emit('donation:leave', { donationId });
  }

  // Helper method to show notifications
  notifyUser(title, options = {}) {
    // Check if notifications are supported and permitted
    if (!('Notification' in window)) return;

    const showNotification = () => {
      new Notification(title, {
        ...options,
        badge: '/icons/badge.png',
        tag: options.tag || 'ansar-relief',
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false
      });
    };

    if (Notification.permission === 'granted') {
      showNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  }
}

// Create and export a singleton instance
const realtimeService = new RealtimeService();
export default realtimeService; 