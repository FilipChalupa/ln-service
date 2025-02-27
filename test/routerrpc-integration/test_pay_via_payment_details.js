const {test} = require('@alexbosworth/tap');

const {addPeer} = require('./../../');
const {createCluster} = require('./../macros');
const {createInvoice} = require('./../../');
const {decodePaymentRequest} = require('./../../');
const {delay} = require('./../macros');
const {getHeight} = require('./../../');
const {getInvoice} = require('./../../');
const {getInvoices} = require('./../../');
const {getWalletVersion} = require('./../../');
const {payViaPaymentDetails} = require('./../../');
const {setupChannel} = require('./../macros');
const {waitForRoute} = require('./../macros');

const start = new Date().toISOString();
const tlvData = '0000';
const tlvType = '65537';
const tokens = 100;

// Paying an invoice should settle the invoice
test(`Pay`, async ({end, equal, rejects, strictSame}) => {
  const cluster = await createCluster({});

  const {lnd} = cluster.control;

  const channel = await setupChannel({
    lnd,
    generate: cluster.generate,
    to: cluster.target,
  });

  const remoteChan = await setupChannel({
    generate: cluster.generate,
    generator: cluster.target,
    lnd: cluster.target.lnd,
    to: cluster.remote,
  });

  await addPeer({
    lnd,
    public_key: cluster.remote.public_key,
    socket: cluster.remote.socket,
  });

  const height = (await getHeight({lnd})).current_block_height;
  const invoice = await createInvoice({tokens, lnd: cluster.remote.lnd});

  const {features} = await decodePaymentRequest({
    lnd,
    request: invoice.request,
  });

  const expectedHops = [
    {
      channel: channel.id,
      channel_capacity: 1000000,
      fee: 1,
      fee_mtokens: '1000',
      forward: invoice.tokens,
      forward_mtokens: (BigInt(invoice.tokens) * BigInt(1e3)).toString(),
      public_key: cluster.target.public_key,
    },
    {
      channel: remoteChan.id,
      channel_capacity: 1000000,
      fee: 0,
      fee_mtokens: '0',
      forward: invoice.tokens,
      forward_mtokens: '100000',
      public_key: cluster.remote.public_key,
    },
  ];

  await waitForRoute({
    lnd,
    destination: cluster.remote.public_key,
    tokens: invoice.tokens,
  });

  try {
    const paid = await payViaPaymentDetails({
      features,
      lnd,
      destination: cluster.remote.public_key,
      payment: invoice.payment,
      tokens: invoice.tokens,
    });
  } catch (err) {
    strictSame(err, [503, 'PaymentRejectedByDestination']);
  }

  try {
    const tooSoonCltv = await payViaPaymentDetails({
      features,
      lnd,
      destination: cluster.remote.public_key,
      id: invoice.id,
      max_timeout_height: height + 46,
      payment: invoice.payment,
      tokens: invoice.tokens,
    });

    equal(tooSoonCltv, null, 'Should not be able to pay a too soon CLTV');
  } catch (err) {
    strictSame(err, [503, 'PaymentPathfindingFailedToFindPossibleRoute'], 'Fail');
  }

  try {
    const paid = await payViaPaymentDetails({
      features,
      lnd,
      destination: cluster.remote.public_key,
      id: invoice.id,
      max_timeout_height: height + 90,
      messages: [{type: tlvType, value: tlvData}],
      payment: invoice.payment,
      tokens: invoice.tokens,
    });

    equal(paid.confirmed_at > start, true, 'Confirm date was received');
    equal(paid.fee, 1, 'Fee tokens paid');
    equal(paid.fee_mtokens, '1000', 'Fee mtokens tokens paid');
    equal(paid.id, invoice.id, 'Payment hash is equal on both sides');
    equal(paid.mtokens, '101000', 'Paid mtokens');
    equal(paid.secret, invoice.secret, 'Paid for invoice secret');

    paid.hops.forEach(n => {
      equal(n.timeout === height + 40 || n.timeout === height + 43, true);

      delete n.timeout;

      return;
    });

    strictSame(paid.hops, expectedHops, 'Hops are returned');
  } catch (err) {
    equal(err, null, 'No error is thrown when payment is attempted');
  }

  {
    const {payments} = await getInvoice({
      id: invoice.id,
      lnd: cluster.remote.lnd,
    });

    if (!!payments) {
      const [payment] = payments;

      if (!!payment && !!payment.messages.length) {
        const [message] = payment.messages;

        equal(message.type, tlvType, 'Got TLV type');
        equal(message.value, tlvData, 'Got TLV value');
      }
    }
  }

  {
    const {invoices} = await getInvoices({lnd: cluster.remote.lnd});

    const [{payments}] = invoices;

    if (!!payments.length) {
      const [payment] = payments;

      if (!!payment && !!payment.messages.length) {
        const [message] = payment.messages;

        equal(message.type, tlvType, 'Got TLV type');
        equal(message.value, tlvData, 'Got TLV value');
      }
    }
  }

  await cluster.kill({});

  return end();
});
