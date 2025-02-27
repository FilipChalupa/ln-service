const {test} = require('@alexbosworth/tap');

const {getWalletVersion} = require('./../../');
const {spawnLnd} = require('./../macros');
const {waitForTermination} = require('./../macros');

// Getting the wallet version should return the wallet version
test(`Get wallet version`, async ({end, equal, type}) => {
  const spawned = await spawnLnd({});

  try {
    const version = await getWalletVersion({lnd: spawned.lnd});

    type(version.build_tags, Array, 'Got array of build tags');
    type(version.commit_hash, 'string', 'Got commit hash string');
    type(version.is_autopilotrpc_enabled, 'boolean', 'Got autopilotrpc');
    type(version.is_chainrpc_enabled, 'boolean', 'Got chainrpc');
    type(version.is_invoicesrpc_enabled, 'boolean', 'Got invoicesrpc');
    type(version.is_signrpc_enabled, 'boolean', 'Got signrpc');
    type(version.is_walletrpc_enabled, 'boolean', 'Got walletrpc');
    type(version.is_watchtowerrpc_enabled, 'boolean', 'Got watchtowerrpc');
    type(version.is_wtclientrpc_enabled, 'boolean', 'Got wtclientrpc');
  } catch (err) {
    const [code, message] = err;

    equal(code, 501, 'Got unsupported error code');
    equal(message, 'VersionMethodUnsupported', 'Got unsupported error');
  }

  spawned.kill();

  await waitForTermination({lnd: spawned.lnd});

  return end();
});
