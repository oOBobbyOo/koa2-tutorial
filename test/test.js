const query = require('../services/query')

query('SELECT * FROM tmp_mota_yt_email WHERE status=?', ['-4'], function(
  err,
  results,
  fields
) {
  console.log(results)
})
