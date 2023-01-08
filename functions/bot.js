const Telegraf = require('telegraf');
const { BinanceChain } = require('@binance-chain/javascript-sdk');

//const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_TOKEN = "5963723556:AAGi_6gnn_Wk9s84hVZFTfQpEV9N52FcHqQ";

Use this token to access the HTTP API:
5963723556:AAGi_6gnn_Wk9s84hVZFTfQpEV9N52FcHqQ
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
// Connect to a Binance Chain node
const binanceChain = new BinanceChain('https://bsc-dataseed.binance.org/');

// Load the ABI for your smart contract
const contractABI = require('./abi.json');

// Set the contract address
const contractAddress = '0xd2d7289DB68395593D65101753Fec9450ddFB699';

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
    contract.methods.balanceOf('0xd2d7289DB68395593D65101753Fec9450ddFB699').call((error, result) => {
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
