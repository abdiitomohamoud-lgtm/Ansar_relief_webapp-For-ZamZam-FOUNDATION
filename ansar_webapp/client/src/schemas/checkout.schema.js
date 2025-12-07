/**
 * Checkout Schema
 * @typedef {Object} Checkout
 * @property {string} _id - Unique identifier for the checkout session
 * @property {string} userId - Reference to the user
 * @property {Object[]} items - Items in the checkout
 * @property {string} items.type - Item type (donation, sponsorship, product)
 * @property {string} items.id - Reference to the item
 * @property {number} items.amount - Item amount
 * @property {string} items.currency - Currency code
 * @property {string} items.name - Item name
 * @property {string} items.description - Item description
 * @property {Object} shipping - Shipping information
 * @property {string} shipping.method - Shipping method
 * @property {number} shipping.cost - Shipping cost
 * @property {Object} shipping.address - Shipping address
 * @property {Object} payment - Payment information
 * @property {string} payment.method - Payment method
 * @property {string} payment.status - Payment status
 * @property {string} payment.transactionId - Transaction ID
 * @property {Object} donor - Donor information
 * @property {string} donor.name - Donor name
 * @property {string} donor.email - Donor email
 * @property {string} donor.phone - Donor phone
 * @property {boolean} donor.anonymous - Anonymous donation flag
 * @property {string} donor.message - Optional message
 * @property {number} subtotal - Subtotal amount
 * @property {number} tax - Tax amount
 * @property {number} total - Total amount
 * @property {string} status - Checkout status
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const checkoutSchema = {
  _id: String,
  userId: String,
  items: [{
    type: String,
    id: String,
    amount: Number,
    currency: String,
    name: String,
    description: String
  }],
  shipping: {
    method: String,
    cost: Number,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    }
  },
  payment: {
    method: String,
    status: String,
    transactionId: String
  },
  donor: {
    name: String,
    email: String,
    phone: String,
    anonymous: Boolean,
    message: String
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String,
  createdAt: Date,
  updatedAt: Date
};

// Checkout status enum
export const CheckoutStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

// Shipping methods enum
export const ShippingMethod = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  PICKUP: 'pickup'
};

// Payment methods enum
export const CheckoutPaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
  CRYPTO: 'crypto'
}; 