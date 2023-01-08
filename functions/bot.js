const Telegraf = require('telegraf');
const { Extra, Markup } = require('telegraf');
const { Web3 } = require('web3');

exports.handler = async (event, context) => {
  // Connect to an Ethereum node
  const web3 = new Web3(new Web3.providers.HttpProvider('https://hpbnode.com'));

  // Load the ABI for your smart contract
  const contractABI = require('./abi.json');

  // Set the contract address
  const contractAddress = '0x12345...';

  // Create an instance of the contract
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const bot = new Telegraf(process.env.BOT_TOKEN);

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

  return {
    statusCode: 200,
    body: 'Bot launched',
  };
};
