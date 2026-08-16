// Ensure Vite gets a compatible crypto.getRandomValues implementation.
// Some Node setups expose Web Crypto on crypto.webcrypto but not on the
// direct `crypto` module object that Vite checks during startup.
try {
  const nodeCrypto = require('node:crypto');
  const cryptoModule = require('crypto');

  if (nodeCrypto.webcrypto && typeof nodeCrypto.webcrypto.getRandomValues === 'function') {
    if (!cryptoModule.getRandomValues) {
      Object.defineProperty(cryptoModule, 'getRandomValues', {
        value: nodeCrypto.webcrypto.getRandomValues.bind(nodeCrypto.webcrypto),
        configurable: true,
        writable: true
      });
    }

    if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
      Object.defineProperty(globalThis, 'crypto', {
        value: nodeCrypto.webcrypto,
        configurable: true,
        writable: true
      });
    }
  }
} catch (e) {
  // ignore — if this fails, the real runtime error will still show up clearly
}
