const {addPeer} = require('lightning');
const {authenticatedLndGrpc} = require('lightning');
const {broadcastChainTransaction} = require('lightning');
const {cancelHodlInvoice} = require('lightning');
const {cancelPendingChannel} = require('lightning');
const {changePassword} = require('lightning');
const {closeChannel} = require('lightning');
const {connectWatchtower} = require('lightning');
const {createChainAddress} = require('lightning');
const {createHodlInvoice} = require('lightning');
const {createInvoice} = require('lightning');
const {createSeed} = require('lightning');
const {createSignedRequest} = require('invoices');
const {createUnsignedRequest} = require('invoices');
const {createWallet} = require('lightning');
const {decodePaymentRequest} = require('lightning');
const {deleteForwardingReputations} = require('lightning');
const {deleteFailedPayAttempts} = require('lightning');
const {deleteFailedPayments} = require('lightning');
const {deletePayment} = require('lightning/lnd_methods');
const {deletePayments} = require('lightning');
const {diffieHellmanComputeSecret} = require('lightning');
const {disableChannel} = require('lightning/lnd_methods');
const {disconnectWatchtower} = require('lightning');
const {enableChannel} = require('lightning');
const {fundPendingChannels} = require('lightning');
const {fundPsbt} = require('lightning');
const {getAccessIds} = require('lightning');
const {getAutopilot} = require('lightning');
const {getBackup} = require('lightning');
const {getBackups} = require('lightning');
const {getChainBalance} = require('lightning');
const {getChainFeeEstimate} = require('lightning');
const {getChainFeeRate} = require('lightning');
const {getChainTransactions} = require('lightning');
const {getChannel} = require('lightning');
const {getChannelBalance} = require('lightning');
const {getChannels} = require('lightning');
const {getClosedChannels} = require('lightning');
const {getConnectedWatchtowers} = require('lightning');
const {getFeeRates} = require('lightning');
const {getForwardingConfidence} = require('lightning');
const {getForwardingReputations} = require('lightning');
const {getForwards} = require('lightning');
const {getHeight} = require('lightning');
const {getIdentity} = require('lightning');
const {getInvoice} = require('lightning');
const {getInvoices} = require('lightning');
const {getLockedUtxos} = require('lightning');
const {getMethods} = require('lightning');
const {getNetworkCentrality} = require('lightning');
const {getNetworkGraph} = require('lightning');
const {getNetworkInfo} = require('lightning');
const {getNode} = require('lightning');
const {getPathfindingSettings} = require('lightning');
const {getPayment} = require('lightning');
const {getPayments} = require('lightning');
const {getPeers} = require('lightning');
const {getPendingChainBalance} = require('lightning');
const {getPendingChannels} = require('lightning');
const {getPublicKey} = require('lightning');
const {getRouteConfidence} = require('lightning');
const {getRouteThroughHops} = require('lightning');
const {getRouteToDestination} = require('lightning');
const {getSweepTransactions} = require('lightning');
const {getTowerServerInfo} = require('lightning');
const {getUtxos} = require('lightning');
const {getWalletInfo} = require('lightning');
const {getWalletStatus} = require('lightning');
const {getWalletVersion} = require('lightning');
const {grantAccess} = require('lightning');
const {isDestinationPayable} = require('lightning');
const {lockUtxo} = require('lightning');
const {openChannel} = require('lightning');
const {openChannels} = require('lightning');
const {parsePaymentRequest} = require('invoices');
const {pay} = require('lightning');
const {payViaPaymentDetails} = require('lightning');
const {payViaPaymentRequest} = require('lightning');
const {payViaRoutes} = require('lightning/lnd_methods');
const {prepareForChannelProposal} =  require('lightning');
const {probeForRoute} = require('lightning');
const {proposeChannel} = require('lightning');
const {recoverFundsFromChannel} = require('lightning');
const {recoverFundsFromChannels} = require('lightning');
const {removePeer} = require('lightning');
const {requestChainFeeIncrease} = require('lightning');
const {restrictMacaroon} = require('./macaroons');
const {revokeAccess} = require('lightning');
const {routeFromChannels} = require('bolt07');
const {sendToChainAddress} = require('lightning');
const {sendToChainAddresses} = require('lightning');
const {sendToChainOutputScripts} = require('lightning');
const {setAutopilot} = require('lightning');
const {settleHodlInvoice} = require('lightning');
const {signBytes} = require('lightning');
const {signMessage} = require('lightning');
const {signPsbt} = require('lightning/lnd_methods');
const {signTransaction} = require('lightning');
const {stopDaemon} = require('lightning');
const {subscribeToBackups} = require('lightning');
const {subscribeToBlocks} = require('lightning');
const {subscribeToChainAddress} = require('lightning');
const {subscribeToChainSpend} = require('lightning');
const {subscribeToChannels} = require('lightning');
const {subscribeToForwardRequests} = require('lightning');
const {subscribeToForwards} = require('lightning');
const {subscribeToGraph} = require('lightning');
const {subscribeToInvoice} = require('lightning');
const {subscribeToInvoices} = require('lightning');
const {subscribeToOpenRequests} = require('lightning');
const {subscribeToPastPayment} = require('lightning');
const {subscribeToPastPayments} = require('lightning/lnd_methods');
const {subscribeToPayViaDetails} = require('lightning');
const {subscribeToPayViaRequest} = require('lightning');
const {subscribeToPayViaRoutes} = require('lightning');
const {subscribeToPeers} = require('lightning/lnd_methods');
const {subscribeToProbeForRoute} = require('lightning');
const {subscribeToTransactions} = require('lightning');
const {subscribeToWalletStatus} = require('lightning');
const {unauthenticatedLndGrpc} = require('lightning');
const {unlockUtxo} = require('lightning');
const {unlockWallet} = require('lightning');
const {updateChainTransaction} = require('lightning');
const {updateConnectedWatchtower} = require('lightning');
const {updatePathfindingSettings} = require('lightning');
const {updateRoutingFees} = require('lightning');
const {verifyBackup} = require('lightning');
const {verifyBackups} = require('lightning');
const {verifyBytesSignature} = require('lightning');
const {verifyMessage} = require('lightning');

module.exports = {
  addPeer,
  authenticatedLndGrpc,
  broadcastChainTransaction,
  cancelHodlInvoice,
  cancelPendingChannel,
  changePassword,
  closeChannel,
  connectWatchtower,
  createChainAddress,
  createHodlInvoice,
  createInvoice,
  createSeed,
  createSignedRequest,
  createUnsignedRequest,
  createWallet,
  decodePaymentRequest,
  deleteFailedPayAttempts,
  deleteFailedPayments,
  deleteForwardingReputations,
  deletePayment,
  deletePayments,
  diffieHellmanComputeSecret,
  disableChannel,
  disconnectWatchtower,
  enableChannel,
  fundPendingChannels,
  fundPsbt,
  getAccessIds,
  getAutopilot,
  getBackup,
  getBackups,
  getChainBalance,
  getChainFeeEstimate,
  getChainFeeRate,
  getChainTransactions,
  getChannel,
  getChannelBalance,
  getChannels,
  getClosedChannels,
  getConnectedWatchtowers,
  getFeeRates,
  getForwardingConfidence,
  getForwardingReputations,
  getForwards,
  getHeight,
  getIdentity,
  getInvoice,
  getInvoices,
  getLockedUtxos,
  getMethods,
  getNetworkCentrality,
  getNetworkGraph,
  getNetworkInfo,
  getNode,
  getPathfindingSettings,
  getPayment,
  getPayments,
  getPeers,
  getPendingChainBalance,
  getPendingChannels,
  getPublicKey,
  getRouteConfidence,
  getRouteThroughHops,
  getRouteToDestination,
  getSweepTransactions,
  getTowerServerInfo,
  getUtxos,
  getWalletInfo,
  getWalletStatus,
  getWalletVersion,
  grantAccess,
  isDestinationPayable,
  lockUtxo,
  openChannel,
  openChannels,
  parsePaymentRequest,
  pay,
  payViaPaymentDetails,
  payViaPaymentRequest,
  payViaRoutes,
  prepareForChannelProposal,
  probeForRoute,
  proposeChannel,
  recoverFundsFromChannel,
  recoverFundsFromChannels,
  removePeer,
  requestChainFeeIncrease,
  restrictMacaroon,
  revokeAccess,
  routeFromChannels,
  sendToChainAddress,
  sendToChainAddresses,
  sendToChainOutputScripts,
  setAutopilot,
  settleHodlInvoice,
  signBytes,
  signMessage,
  signPsbt,
  signTransaction,
  stopDaemon,
  subscribeToBackups,
  subscribeToBlocks,
  subscribeToChainAddress,
  subscribeToChainSpend,
  subscribeToChannels,
  subscribeToForwardRequests,
  subscribeToForwards,
  subscribeToGraph,
  subscribeToInvoice,
  subscribeToInvoices,
  subscribeToOpenRequests,
  subscribeToPastPayment,
  subscribeToPastPayments,
  subscribeToPayViaDetails,
  subscribeToPayViaRequest,
  subscribeToPayViaRoutes,
  subscribeToPeers,
  subscribeToProbeForRoute,
  subscribeToTransactions,
  subscribeToWalletStatus,
  unauthenticatedLndGrpc,
  unlockUtxo,
  unlockWallet,
  updateChainTransaction,
  updateConnectedWatchtower,
  updatePathfindingSettings,
  updateRoutingFees,
  verifyBackup,
  verifyBackups,
  verifyBytesSignature,
  verifyMessage,
};
