document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.getElementById('verifyButton');
    const resultDiv = document.getElementById('result');

    // Check if ethers is available
    if (typeof ethers === 'undefined') {
        console.error('Ethers library not loaded');
        resultDiv.className = 'error';
        resultDiv.style.display = 'block';
        resultDiv.textContent = 'Error: ethers library not loaded. Please check your internet connection.';
        return;
    }

    verifyButton.addEventListener('click', async () => {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask is not installed! Please install MetaMask first.');
            }

            resultDiv.className = 'loading';
            resultDiv.style.display = 'block';
            resultDiv.textContent = 'Connecting to MetaMask...';

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            resultDiv.textContent = `Connected to account: ${account}. Preparing signature request...`;

            // Get the chainId
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // Action & amount
            const action = "withdraw";
            const amount = "1000";

            // Create EIP-712 data structure
            const domain = {
                name: 'WalletVerifier',
                version: '1',
                chainId: chainId,
                verifyingContract: '0x0000000000000000000000000000000000000000' // Placeholder contract address
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

            // Current timestamp
            const timestamp = Math.floor(Date.now() / 1000);

            const value = {
                wallet: account,
                timestamp: timestamp,
                chainId: chainId,
                action: action,
                amount: amount
            };

            console.log('Ethers loaded:', typeof ethers);
            console.log('Using ethers version:', ethers.version);

            // Create a provider and signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Sign the message
            resultDiv.textContent = 'Please sign the message in MetaMask...';
            
            // Use ethers _signTypedData for EIP-712
            const signature = await signer._signTypedData(domain, types, value);

            // Display the result
            resultDiv.className = 'success';
            resultDiv.innerHTML = `
                <h3>Signature created successfully!</h3>
                <p><strong>Address:</strong> ${account}</p>
                <p><strong>Timestamp:</strong> ${new Date(timestamp * 1000).toLocaleString()}</p>
                <p><strong>Signature:</strong> ${signature}</p>
                <p>Verifying with server...</p>
            `;

            // Send signature to server for verification
            try {
                const response = await fetch('http://localhost:3000/verify-signature', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        signature,
                        address: account,
                        timestamp,
                        chainId: chainId,
                        action,
                        amount
                    })
                });
                
                const result = await response.json();
                
                // Update UI with verification result
                if (result.verified) {
                    resultDiv.innerHTML += `
                        <p class="verification-success">✅ Server Verification: Successful</p>
                        <p>Recovered address: ${result.recoveredAddress}</p>
                    `;
                } else {
                    resultDiv.innerHTML += `
                        <p class="verification-failed">❌ Server Verification: Failed</p>
                        <p>Error: ${result.error || 'The signature does not match this address'}</p>
                    `;
                }
            } catch (error) {
                resultDiv.innerHTML += `
                    <p class="verification-failed">❌ Error connecting to server: ${error.message}</p>
                `;
            }

            console.log('Signature:', signature);
            console.log('Address:', account);
            console.log('Timestamp:', timestamp);

        } catch (error) {
            console.error('Error:', error);
            resultDiv.className = 'error';
            resultDiv.style.display = 'block';
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });
});