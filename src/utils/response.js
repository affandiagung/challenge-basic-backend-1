function ok(res, data = {}) {
  return res.json({ ok: true, data });
}

function err(res, status, errCode, msg) {
  return res.status(status).json({
    ok: false,
    err: errCode,
    msg
  });
}

module.exports = { ok, err };


