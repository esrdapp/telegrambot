const TelegramBot = require('node-telegram-bot-api');
// const Telegraf = require('telegraf');
const { BinanceChain } = require('@binance-chain/javascript-sdk');

const BOT_TOKEN = process.env.BOT_TOKEN;

// Connect to a Binance Chain node
const binanceChain = new BinanceChain('https://bsc-dataseed1.binance.org:443');

// Load the ABI for your smart contract
const contractABI = require('./abi.json');

// Set the contract address
const contractAddress = '0xd2d7289DB68395593D65101753Fec9450ddFB699';

// Create an instance of the contract
const contract = new binanceChain.contract(contractABI, contractAddress);

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

bot.start((ctx) => {
  ctx.reply('Welcome! Type "/balance" to retrieve a contract balance, or "/totalSupply" to retrieve the total supply of the token.');
});

bot.on('text', (ctx) => {
  const message = ctx.update.message.text;

  if (message.toLowerCase() === '/balance') {
    // Get the balance of the contract
    contract.methods.balanceOf('0xd2d7289DB68395593D65101753Fec9450ddFB699').call((error, result) => {
      if (error) {
        ctx.reply('Error: ' + error);
      } else {
        ctx.reply('Contract balance: ' + result);
      }
    });
  } else if (message.toLowerCase() === '/totalSupply') {
    // Get the total supply of the token
    contract.methods.totalSupply().call((error, result) => {
      if (error) {
        ctx.reply('Error: ' + error);
      } else {
        ctx.reply('Total supply: ' + result);
      }
    });
  } else {
    ctx.reply('Invalid command. Type "/balance" or "/totalSupply".');
  }
});

bot.launch();

module.exports = (req, res) => {
  res.send('Hello from Netlify! Your bot is now running.');
};
