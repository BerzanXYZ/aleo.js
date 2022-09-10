import fetch from "node-fetch"
import { Block, NodeResponse, Path, Transaction } from "./connection.types"


/** Errors object has all available errors to be thrown */
const Errors = {
    NotAllowedMethod: new Error(
        'Method is not allowed!',
        { cause: `The node you're making requests doesn't use the latest version of Aleo software. Or you made a mistaken request.` }
    ),
    Network: new Error(
        'No connection to the node!',
        { cause: `Possible cases are: You're not connected to the internet, the node you're making requests doesn't exist, or the connection is blocked by CORS policy.` }
    ),
    Unknown: new Error(
        'An unknown error has occured!',
        { cause: `It is a new error. Or you made a mistake not expected.` }
    )
}


/** The main class enables making requests to Aleo blockchain */
export class Connection {
    /**
     * # Aleo.js
     * ## `Connection`
     * - The main class enables making requests to Aleo blockchain
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * ```
     */
    constructor(endpoint: string) {
        this._nodeOrigin = new URL(endpoint).origin
    }

    /** Holds the URL origin of given node */
    private _nodeOrigin: string

    
    /** Makes get requests to `this._nodeOrigin` with given path */
    private async _get<P extends Path>(path: P): Promise<NodeResponse<P>> {
        try {
            const res = await fetch(this._nodeOrigin + path)
            if(res.ok) {
                return res.json()
            } else {
                throw Errors.NotAllowedMethod
            }
        } catch(e: any) {
            switch(e.message) {
                case 'Failed to fetch': throw Errors.Network
                default: throw e
            }
        }
    }



    /**
     * # Aleo.js
     * ## `getBlock`
     * - The method returns the block at given block height
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get the block at height 0
     * const block = await connection.getBlock(0)
     * 
     * 
     * ```
     */
    async getBlock(blockHeight: number): Promise<Block> {
        return this._get(`/testnet3/block/${blockHeight}`)
    }


    /**
     * # Aleo.js
     * ## `getLatestBlock`
     * - The method returns the latest block on the blockchain
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get the latest block
     * const latestBlock = await connection.getLatestBlock()
     * 
     * 
     * ```
     */
    async getLatestBlock(): Promise<Block> {
        return this._get('/testnet3/latest/block')
    }



    /**
     * # Aleo.js
     * ## `getLatestHash`
     * - The method returns the hash of the latest block on the blockchain
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get the hash of the latest block
     * const latestHash = await connection.getLatestHash()
     * 
     * 
     * ```
     */
    async getLatestHash(): Promise<string> {
        return this._get('/testnet3/latest/hash')
    }



    /**
     * # Aleo.js
     * ## `getLatestHeight`
     * - The method returns the height of the latest block on the blockchain
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get the height of the latest block
     * const latestHeight = await connection.getLatestHeight()
     * 
     * 
     * ```
     */
    async getLatestHeight(): Promise<number> {
        return this._get('/testnet3/latest/height')
    }


    /**
     * # Aleo.js
     * ## `getTransaction`
     * - The method returns the transaction with given TX ID
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get the transaction with given TX ID
     * const tx = await connection.getTransaction('at1r9wercd6fsjm58klkqt8jrug55w4sgpj6tmcg0myk5n3nh5h5cyq589zfu')
     * 
     * 
     * ```
     */
    async getTransaction(txId: string): Promise<Transaction> {
        return this._get(`/testnet3/transaction/${txId}`)
    }



    /**
     * # Aleo.js
     * ## `getTransactions`
     * - The method returns the transactions on the block with given block height
     * 
     * ## Example
     * ```ts
     * // Declare a new Connection object
     * const connection = new Connection('http://0.0.0.0:4180')
     * 
     * // Get all the transactions on the block with given height
     * const txs = await connection.getTransactions(0)
     * 
     * 
     * ```
     */
    async getTransactions(blockHeight: number): Promise<Transaction[]> {
        return this._get(`/testnet3/transactions/${blockHeight}`)
    }
}