/** All available paths on an Aleo node */
export type Path =
    `/testnet3/block/${number}` | '/testnet3/latest/block' | '/testnet3/latest/hash' |
    '/testnet3/latest/height' | '/testnet3/records/all' | '/testnet3/records/spent' |
    '/testnet3/records/unspent' | `/testnet3/statePath/${string}` | '/testnet3/transaction/broadcast' |
    `/testnet3/transaction/${string}` | `/testnet3/transactions/${number}`


/** All available Aleo node response types based on paths */
export type NodeResponse<P extends Path> = 
    P extends `/testnet3/block/${number}` ? Block :
    P extends '/testnet3/latest/block' ? Block :
    P extends '/testnet3/latest/hash' ? string :
    P extends '/testnet3/latest/height' ? number :
    P extends '/testnet3/records/all' ? unknown :
    P extends '/testnet3/records/spent' ? unknown :
    P extends '/testnet3/records/unspent' ? unknown :
    P extends `/testnet3/statePath/${string}` ? unknown :
    P extends '/testnet3/transaction/broadcast' ? unknown :
    P extends `/testnet3/transaction/${string}` ? Transaction :
    P extends `/testnet3/transactions/${number}` ? Transaction[] : unknown


export interface Block {
    /** The hash of this block. */
    block_hash: string
    /** The hash of the previous block. */
    previous_hash: string
    /** The header of this block. */
    header: Header
    /** The transactions in this block. */
    transactions: Transaction[]
    /** The signature for this block. */
    signature: string
}



interface Header {
    /** The Merkle root representing the blocks in the ledger up to the previous block. */
    previous_state_root: string
    /** The Merkle root representing the transactions in the block. */
    transactions_root: string
    /** The metadata of the block. */
    metadata: {
        /** The network ID of the block. */
        network: number
        /** The round that produced this block. */
        round: number
        /** The height of this block. */
        height: number
        /** The coinbase target for this block. */
        coinbase_target: number
        /** The proof target for this block. */
        proof_target: number
        /** The Unix timestamp (UTC) for this block. */
        timestamp: number
    },
}



export type Transaction = DeploymentTransaction | ExecutionTransaction


interface DeploymentTransaction {
    /** The type of the transaction. */
    type: 'deploy'
    /** The ID of the transaction. */
    id: string
    /** The transaction deployment publishes an Aleo program to the network.
     * - Only exists if the transaction type is `deploy`.
     */
    deployment: {
        /** The edition of the deployment. */
        edition: number
        /** The program of the deployment. */
        program: string
        /** The mapping of function names to their verifying key and certificate. */
        verifying_keys: {
            [key in string]?: [string, string]
        },
    }
    /** The transaction execution represents a call to an Aleo program 
     * - Only exists if the transaction type is `execute`.
     */
    execution: undefined
}


interface ExecutionTransaction {
    /** The type of the transaction. */
    type: 'execute'
    /** The ID of the transaction. */
    id: string
    /** The transaction deployment publishes an Aleo program to the network.
     * - Only exists if the transaction type is `deploy`.
     */
    deployment: undefined
    /** The transaction execution represents a call to an Aleo program 
     * - Only exists if the transaction type is `execute`.
     */
    execution: {
        /** The edition of the execution. */
        edition: number
        /** The transitions of the execution. */
        transitions: Transition[]
    }
}


interface Transition {
    /** The transition ID. */
    id: string
    /** The program ID. */
    program: ProgramID
    /** The function name. */
    function: string
    /** The transition inputs. */
    inputs: TransitionInput[]
    /** The transition outputs. */
    outputs: TransitionOutput[]
    /** The inputs for finalize. */
    finalize?: string[]
    /** The transition proof. */
    proof: string
    /** The transition public key. */
    tpk:string
    /** The transition commitment. */
    tcm: string
    /** The network fee. */
    fee: number
}



/** A program ID is of the form `{name}.{network}`. */
type ProgramID = `${string}.${string}`




type TransitionInput =
    TransitionInputConstant | TransitionInputPublic | TransitionInputPrivate |
    TransitionInputRecord | TransitionInputExternalRecord


/** The plaintext hash and (optional) plaintext. */
interface TransitionInputConstant {
    /** The type of the input */
    type: 'constant'
    /** The ID of the input */
    id: string
    /** The value of the input
     * - Can only exist if the input type is `constant`, `public`, or `private`
     */
    value: string | undefined
    tag: undefined
    origin: undefined
}
/** The plaintext hash and (optional) plaintext. */
interface TransitionInputPublic {
    /** The type of the input */
    type: 'public'
    /** The ID of the input */
    id: string
    /** The value of the input
     * - Can only exist if the input type is `constant`, `public`, or `private`
     */
    value: string | undefined
    tag: undefined
    origin: undefined
}
/** The ciphertext hash and (optional) ciphertext. */
interface TransitionInputPrivate {
    /** The type of the input */
    type: 'private'
    /** The ID of the input */
    id: string
    /** The value of the input
     * - Can only exist if the input type is `constant`, `public`, or `private`
     */
    value: string | undefined
    tag: undefined
    origin: undefined
}

/** The serial number, tag, and the origin of the record. */
interface TransitionInputRecord {
    /** The type of the input */
    type: 'record'
    /** The ID of the input */
    id: string
    value: undefined
    /** The tag of the input
     * - Only exists if the input type is `record`
     */
    tag: string
    /** The origin of the input
     * - Only exists if the input type is `record`
     */
    origin: { commitment: string } | { state_root: string }
}
/** The input commitment to the external record. Note: This is **not** the record commitment. */
interface TransitionInputExternalRecord {
    /** The type of the input */
    type: 'external_record'
    /** The ID of the input */
    id: string
    value: undefined
    tag: undefined
    origin: undefined
}




type TransitionOutput =
    TransitionOutputConstant | TransitionOutputPublic |  TransitionOutputPrivate | 
    TransitionOutputRecord |  TransitionOutputExternalRecord

/** The plaintext hash and (optional) plaintext. */
interface TransitionOutputConstant {
    /** The type of the output */
    type: 'constant'
    /** The ID of the output */
    id: string
    /** The value of the output */
    value?: string
    checksum: undefined
}
/** The plaintext hash and (optional) plaintext. */
interface TransitionOutputPublic {
    /** The type of the output */
    type: 'public'
    /** The ID of the output */
    id: string
    /** The value of the output */
    value?: string
    checksum: undefined
}
/** The ciphertext hash and (optional) ciphertext. */
interface TransitionOutputPrivate {
    /** The type of the output */
    type: 'private'
    /** The ID of the output */
    id: string
    /** The value of the output */
    value?: string
    checksum: undefined
}

/** The commitment, checksum, and (optional) record ciphertext. */
interface TransitionOutputRecord {
    /** The type of the output */
    type: 'record'
    /** The ID of the output */
    id: string
    /** The value of the output */
    value?: string
    /** The checksum of the output */
    checksum: string
}
/** The output commitment of the external record. Note: This is **not** the record commitment. */
interface TransitionOutputExternalRecord {
    /** The type of the output */
    type: 'external_record'
    /** The ID of the output */
    id: string
    value: undefined
    checksum: undefined
}