import eosjs2 from 'eosjs2'

const rpc = new eosjs2.Rpc.JsonRpc('http://api.cypherglass.com:8888')
const signatureProvider = new eosjs2.SignatureProvider(['5KjqjTzThHK9Ns8GdCefEAuvV9DqGVtphaVqhR2QqhYkJzitVnH'])
const api = new eosjs2.Api({ rpc, signatureProvider })

export default class eosJs2Connect {
  constructor(contractName, contractSender) {
    this.contractName = contractName
    this.contractSender = contractSender
  }

  getTableRows = table => {
    return rpc.get_table_rows(this.contractName, this.contractSender, table)
  }

  pushTransaction = (action, data) => {
    return api.pushTransaction({
      blocksBehind: 3,
      expireSeconds: 10,
      actions: [{
        account: this.contractName,
        name: action,
        authorization: [{
          actor: this.contractSender,
          permission: 'active'
        }],
        data: {
          ...data
        }
      }]
    })
  }
}
