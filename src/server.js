const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/verify-signature', async (req, res) => {
  try {
    const { 
      signature, 
      address, 
      timestamp, 
      chainId,
      action,
      amount
    } = req.body;

    console.log("Request body", req.body);

    // Recreate the same EIP-712 data that was used for signing
    const domain = {
      name: 'WalletVerifier',
      version: '1',
      chainId: chainId,
      verifyingContract: '0x0000000000000000000000000000000000000000'
    };

    const types = {
      Verification: [
        { name: 'wallet', type: 'address' },
        { name: 'timestamp', type: 'uint256' },
        { name: 'chainId', type: 'uint256' },
        { name: 'action', type: 'string' },
        { name: 'amount', type: 'string' }
      ]
    };

    const value = {
      wallet: address,
      timestamp: parseInt(timestamp, 10),
      chainId: chainId,
      action: action,
      amount:amount
    };

    // Check if signature hasn't expired (optional)
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - value.timestamp > 3600) { // 1 hour validity
      return res.status(400).json({ 
        verified: false, 
        error: 'Signature expired' 
      });
    }

    // Recover signer's address using ethers
    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types,
      value,
      signature
    );

    // Compare recovered address with provided address
    const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();

    res.json({
      verified: isValid,
      recoveredAddress,
      message: isValid 
        ? 'Signature verification successful!' 
        : 'Signature verification failed!'
    });

  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({ 
      verified: false, 
      error: error.message 
    });
  }
});