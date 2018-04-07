# manuscript-customizations
holding place for various customizations for manuscript

## [manuscript-pwned-password](checker.js)
Customization code for FogBugz and Manuscript to check the provided password against the Have I been pwned? API's [Pwned Password](https://haveibeenpwned.com/API/v2#PwnedPasswords) interface.

Check the Have I been pwned? API to find the number of times the provided password appears in breaches collected by [Have I been pwned?](https://haveibeenpwned.com).

The code uses the [range search](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) method, and performs all the hashing and comparison in the browser, so the password in question is never sent over the wire. The [cryptoraphic methods](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) aren't fully supported in all browsers, so this code may not work in some older or mobile browsers.

### Usage

In the Customizations screen of your FogBugz/Manuscript site, add a new customization with the following content:

```
name:          Pwned Password checker
description:   checks the Pwned Passwords API from Have I Been Pwned? (https://haveibeenpwned.com) to see if the provided password has been pwned
author:        cori schlegel
version:       1.0.0.0

js:
{{include the contents of checker.js here }}
```

It's probably most effective if you require the customization for all users.

## manuscript-use-markdown
TBC (to be coded)
