const TelegramBot = require('node-telegram-bot-api');
// const { BinanceChain } = require('@binance-chain/javascript-sdk');

const BOT_TOKEN = process.env.BOT_TOKEN;
const chatId = "-1001800847763";

// Connect to a Binance Chain node
// const binanceChain = new BinanceChain('https://bsc-dataseed1.binance.org:443');

const Web3 = require('web3');

// Create a new connection to the Binance Smart Chain
const w3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));

// Load the ABI for your smart contract
const contractABI = require('./abi.json');

// Set the contract address
const contractAddress = '0xd2d7289DB68395593D65101753Fec9450ddFB699';

// Create an instance of the contract
// const contract = new binanceChain.contract(contractABI, contractAddress);

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

bot.onText(/\/balance/, (message) => {
  // Get the chat ID and message ID of the message
  const chatId = message.chat.id;
  const messageId = message.message_id;

  // Get the balance of the contract
  w3.eth.getBalance(contractAddress, (error, result) => {
    if (error) {
      console.error(error);
      bot.sendMessage(
        chatId,
        "Sorry, there was an error getting the balance of the contract."
      );
    } else {
      // Send a message with the contract balance
      bot.sendMessage(chatId, `The balance of the contract is ${result} wei.`, {
        reply_to_message_id: messageId,
      });
    }
  });
});


module.exports = (req, res) => {
  res.send("Hello from Netlify! Your bot is now running.");
};
