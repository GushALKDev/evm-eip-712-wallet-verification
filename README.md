# EIP-712 Wallet Verification 🔐

> A secure wallet verification system with dual-layer signature checking (frontend + backend) using EIP-712 signatures.

## Overview 📝

This project implements a complete wallet verification system using the EIP-712 signing standard. It features both frontend and backend signature verification for enhanced security. The frontend allows users to connect their Web3 wallet and sign a structured message, while the backend verifies the signature's authenticity.

## Gas-Free Authorization ⛽️

This system provides a secure way to verify wallet ownership and user intent without requiring any blockchain transactions or gas fees. Key benefits include:

- **Zero Gas Costs**: Users only need to sign messages, not execute transactions
- **Instant Verification**: No need to wait for block confirmations
- **Off-Chain Security**: Cryptographically secure without touching the blockchain
- **Cost-Effective**: Perfect for frequent authorizations and identity checks
- **User-Friendly**: Simpler UX without transaction complexity

## Features ⭐

- Web3 wallet connection
- EIP-712 typed data signing
- Dual-layer signature verification:
  - Frontend verification for immediate feedback
  - Backend verification for security enforcement
- Simple and clean user interface
- Compatible with MetaMask and other EIP-1193 providers
- Express.js backend server for signature validation

## Technology Stack 🛠

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - ethers.js v5.7.2
- Backend:
  - Node.js
  - Express.js
  - ethers.js
- Standards:
  - EIP-712
  - JSON RPC

## Project Structure 📁

```
evm-eip-712-wallet-verification/
|── src/
│    ├── index.html
│    ├── styles.css
│    ├── app.js
│    ├── build.js
│    ├── ethers-5.7.2.umd.min.js
│    └── server.js
├── package.json
└── README.md
```

## Getting Started 🚀

1. Clone the repository
```bash
git clone https://github.com/GushALKDev/evm-eip-712-wallet-verification.git
cd evm-eip-712-wallet-verification
```

2. Install dependencies
```bash
yarn install
```

3. Build the project
```bash
yarn build
```

4. Start the client (in one terminal)
```bash
yarn start_client
```

5. Start the server (in another terminal)
```bash
yarn start_server
```

6. Navigate to http://127.0.0.1:8080 in your browser

## Usage 💡

1. Click the "Connect & Sign" button
2. Approve the wallet connection in your Web3 wallet
3. Sign the typed data message when prompted
4. View the verification result on screen

## Requirements 📋

- Modern web browser
- Web3 wallet (MetaMask recommended)
- Local web server for development

## Verification Process 🔒

The signature verification happens in two steps:

1. Frontend verification (immediate):
   - Validates the signature structure
   - Checks the signer's address matches the connected wallet
   
2. Backend verification (secure):
   - Re-validates the signature cryptographically
   - Ensures the message hasn't been tampered with
   - Confirms the signer's authorization

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 📧

Project Link: [https://github.com/GushALKDev/evm-eip-712-wallet-verification](https://github.com/GushALKDev/evm-eip-712-wallet-verification)
