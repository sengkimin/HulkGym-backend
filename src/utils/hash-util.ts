import crypto from "crypto";

export function generateHMACSHA512(message: string, secret: string) {
    var crypto = require('crypto-js');
    var hash = crypto.HmacSHA512(message, secret);
    return crypto.enc.Base64.stringify(hash);
}

export function validateTelegramData(initData: string, botToken: string) {
  const encoded = decodeURIComponent(initData);
  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken);

  const arr = encoded.split("&");
  const hashIndex = arr.findIndex((str) => str.startsWith("hash="));
  const hash = arr.splice(hashIndex)[0].split("=")[1];

  arr.sort((a, b) => a.localeCompare(b));
  const dataCheckString = arr.join("\n");

  const _hash = crypto
    .createHmac("sha256", secret.digest())
    .update(dataCheckString)
    .digest("hex");
  return _hash === hash;
}
