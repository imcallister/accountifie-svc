var GeneralLedger = require('../../../models/generalLedger');
var LedgerRequestHandler = require('../../../helpers/ledgerRequestHandler');

/**
 * @api {post} /gl/:LEDGER_ID/transaction/:TRANSACTION_ID/upsert upsert
 * @apiGroup Transaction
 * @apiVersion v1.0.0
 *
 * @apiDescription
 *   Update a transaction's details, or insert the transaction if it doesn't exist.
 *
 * @apiUse TransactionParams
 * @apiUse TransactionResponse
 */
module.exports = new LedgerRequestHandler({
  mapParamsToBody: { 'transactionId': 'id' },
  validateBody: GeneralLedger.schema.transaction,
  commitLedger: true
}).handle(function (options, cb) {
  var body = options.body;
  var ledger = options.ledger;

  ledger.addOrUpdateTransaction({
    rawTransaction: body
  });
  cb(null, ledger.toJson());
});
