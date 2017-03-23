import HookedWalletSubprovider from "web3-provider-engine/subproviders/hooked-wallet.js";
import LedgerWallet from "./LedgerWallet";
import HttpProvider from "web3/lib/web3/httpprovider.js"

export default async function (rpcUrl) {
    const ledger = new LedgerWallet();
    await ledger.init();
    const LedgerWalletSubprovider = new HookedWalletSubprovider(ledger);

    // This convenience method lets you handle the case where your users browser doesn't support U2F
    // before adding the LedgerWalletSubprovider to a providerEngine instance.
    LedgerWalletSubprovider.isSupported = ledger.isU2FSupported;
    LedgerWalletSubprovider.ledger = ledger;
    var Web3 = require('web3');
    var ProviderEngine = require('web3-provider-engine');
    var RpcSubprovider = require('web3-provider-engine/subproviders/rpc');

    var engine = new ProviderEngine();
    var web3 = new Web3(engine);
    engine.addProvider(LedgerWalletSubprovider);
    engine.addProvider(new HttpProvider(
      rpcUrl || "https://kovan.infura.io:443"    
    ));
    engine.start();
    return web3;
};
