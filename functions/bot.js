const Telegraf = require('telegraf');
const { BinanceChain } = require('@binance-chain/javascript-sdk');

const BOT_TOKEN = process.env.BOT_TOKEN;

// Connect to a Binance Chain node
const binanceChain = new BinanceChain('https://dataseed1.defibit.io/');

// Load the ABI for your smart contract
const contractABI = require('./abi.json');

// Set the contract address
const contractAddress = '0x12345...';

// Create an instance of the contract
const contract = new binanceChain.contract(contractABI, contractAddress);

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome! Type "get balance" to retrieve a contract balance, or "get totalSupply" to retrieve the total supply of a token.');
});

bot.on('text', (ctx) => {
  const message = ctx.update.message.text;

  if (message.toLowerCase() === 'get balance') {
    // Get the balance of the contract
    contract.methods.balanceOf('0x12345...').call((error, result) => {
      if (error) {
        ctx.reply('Error: ' + error);
      } else {
        ctx.reply('Contract balance: ' + result);
      }
    });
  } else if (message.toLowerCase() === 'get totalSupply') {
    // Get the total supply of the token
    contract.methods.totalSupply().call((error, result) => {
      if (error) {
        ctx.reply('Error: ' + error);
      } else {
        ctx.reply('Total supply: ' + result);
      }
    });
  } else {
    ctx.reply('Invalid command. Type "get balance" or "get totalSupply".');
  }
});

bot.launch();

module.exports = (req, res) => {
  res.send('Hello from Netlify! Your bot is now running.');
};
