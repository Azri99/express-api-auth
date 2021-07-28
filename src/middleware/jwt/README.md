#JWT

```
Header.Payload.Signnature
```

* Header { alg : 'HMAC, SHA256 or RSA', type : 'jwt' } -> base64Url

* Payload  [View](https://www.iana.org/assignments/jwt/jwt.xhtml) -> base64Url

Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.


* Signature
```
 HMACSHA256(
  base64UrlEncode(header) 
  + "." 
  + base64UrlEncode(payload),
  secret)
```