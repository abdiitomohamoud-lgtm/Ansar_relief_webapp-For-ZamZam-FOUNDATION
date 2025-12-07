/**
 * Cart Schema
 * @typedef {Object} Cart
 * @property {string} _id - Unique identifier for the cart
 * @property {string} userId - Reference to the user
 * @property {Object[]} items - Items in the cart
 * @property {string} items.type - Item type (donation, sponsorship, product)
 * @property {string} items.id - Reference to the item
 * @property {number} items.quantity - Item quantity
 * @property {number} items.amount - Item amount
 * @property {string} items.currency - Currency code
 * @property {string} items.name - Item name
 * @property {string} items.description - Item description
 * @property {string} items.image - Item image URL
 * @property {Object} items.metadata - Additional item metadata
 * @property {number} subtotal - Cart subtotal
 * @property {number} tax - Cart tax
 * @property {number} total - Cart total
 * @property {Date} lastUpdated - Last update timestamp
 * @property {Date} createdAt - Creation timestamp
 */

export const cartSchema = {
  _id: String,
  userId: String,
  items: [{
    type: String,
    id: String,
    quantity: Number,
    amount: Number,
    currency: String,
    name: String,
    description: String,
    image: String,
    metadata: Object
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  lastUpdated: Date,
  createdAt: Date
};

// Cart item types enum
export const CartItemType = {
  DONATION: 'donation',
  SPONSORSHIP: 'sponsorship',
  PRODUCT: 'product'
};

// Cart actions enum
export const CartAction = {
  ADD: 'add',
  REMOVE: 'remove',
  UPDATE: 'update',
  CLEAR: 'clear'
}; 