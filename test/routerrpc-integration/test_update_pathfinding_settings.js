const asyncRetry = require('async/retry');
const {test} = require('@alexbosworth/tap');

const {getPathfindingSettings} = require('./../../');
const {spawnLnd} = require('./../macros');
const {updatePathfindingSettings} = require('./../../');
const {waitForTermination} = require('./../macros');

// Updating pathfinding settings should update the pathfinding configuration
test(`Get pathfinding settings`, async ({end, equal, fail, strictSame}) => {
  const {kill, lnd} = await asyncRetry({}, async () => await spawnLnd({}));

  try {
    await getPathfindingSettings({lnd});
  } catch (err) {
    // Get pathfinding settings is not supported in LND 0.12.1 and below
    if (err[0] === 501) {
      kill();

      await waitForTermination({lnd});

      return end();
    }
  }

  // Update all configuration values
  {
    await updatePathfindingSettings({
      lnd,
      baseline_success_rate: 70000,
      max_payment_records: 100,
      node_ignore_rate: 7000,
      penalty_half_life_ms: 460000,
    });

    const config = await getPathfindingSettings({lnd});

    const expected = {
      baseline_success_rate: 70000,
      max_payment_records: 100,
      node_ignore_rate: 7000,
      penalty_half_life_ms: 460000,
    };

    strictSame(config, expected, 'Got expected pathfinding config');
  }

  // Update only a single value
  {
    await updatePathfindingSettings({
      lnd,
      max_payment_records: 1e6,
    });

    const config = await getPathfindingSettings({lnd});

    const expected = {
      baseline_success_rate: 70000,
      max_payment_records: 1e6,
      node_ignore_rate: 7000,
      penalty_half_life_ms: 460000,
    };

    strictSame(config, expected, 'Update can change singular values');
  }

  kill();

  await waitForTermination({lnd});

  return end();
});
