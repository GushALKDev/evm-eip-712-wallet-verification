const fs = require('fs');
const path = require('path');

// Correct paths - node_modules is at the project root, not in src
const ethersSource = path.join(__dirname, '../node_modules/ethers/dist/ethers.umd.min.js');
const ethersDestination = path.join(__dirname, 'ethers-5.7.2.umd.min.js');

console.log('Source path:', ethersSource);
console.log('Destination path:', ethersDestination);

// Copy the file
try {
  if (!fs.existsSync(ethersSource)) {
    throw new Error(`Source file does not exist: ${ethersSource}`);
  }
  
  fs.copyFileSync(ethersSource, ethersDestination);
  console.log('✓ ethers.js successfully copied to src directory');
} catch (error) {
  console.error('Error copying ethers.js:', error);
  process.exit(1);
}