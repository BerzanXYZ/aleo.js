# Aleo.js
### Aleo JavaScript API

- 🚀 It has all the features you need while building a dApp on Aleo!
- 🛰️ A standardized way to develop something great!
- 🛸 Written in TypeScript to offer a safer experience!

> The library just started to be developed, so it's not complete yet.






<br/>







### Build Aleo dApps, easily.
```js
import { Connection } from 'aleo'

// Create a new Connection object
const connection = new Connection('http://0.0.0.0:4180')

// Get the latest block
const latestBlock = await connection.getLatestBlock()

// Get the genesis block
const genesisBlock = await connection.getBlock(0)

// Get the hash of the latest block
const latestHash = await connection.getLatestHash()

// Get the height of the latest block
const latestHeight = await connection.getLatestHeight()

// Get the transaction with given TX ID
const transaction = await connection.getTransaction('at1r9wercd6fsjm58klkqt8jrug55w4sgpj6tmcg0myk5n3nh5h5cyq589zfu')

// Get all the transactions on the genesis block
const transactions = await connection.getTransactions(0)
```





<br/>






### Documentation, as you type.

![](https://raw.githubusercontent.com/BerzanXYZ/aleo.js/main/docs/images/screenshot_1.png)






<br/>






### Installation
You can install `Aleo.js` with your favorite package manager.


#### NPM
```
npm install aleo
```

#### Yarn
```
yarn add aleo
```

#### PNPM
```
pnpm install aleo
```





<br/>






### Development
You need [Node.JS](https://nodejs.org/) and [Git](https://git-scm.com/) installed.

Clone the repository.
```
git clone https://github.com/BerzanXYZ/aleo.js.git
```

Install the dependencies.
```
yarn install
```

🎉 Your development environment is ready!






<br>






### Bugs
If you find any bug, please create a pull request.





<br/>





> Made with ❤️ by Berzan