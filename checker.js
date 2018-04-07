$(function () {

	var $changePwdDiv = $('div.change-password');

	var pwdWarning = '<div class="warning" id="pwd-exposed" style="margin-top: 15px; display:none;">This password has been exposed <span id="pwned-count" /> times in the <a href="https://haveibeenpwned.com">Have I been pwned?</a> breaches. You should choose another.</div>'

	var isOcelot = function () {
		return (typeof fb.config != 'undefined');
	};

	var isUserOptions = function () {
		return (typeof $changePwdDiv != 'undefined');
	};

	if (isOcelot() && isUserOptions()) {

		var $pwdField1 = $('input#new-password');
		var $modalContent = $('div.change-password div.modal-contents')
		$modalContent.append(pwdWarning);
		var $warning = $('div#pwd-exposed');
		var $pwnedCount = $('span#pwned-count');

		$pwdField1.blur(function (evt) {
			var enc = new TextEncoder('utf-8');
			var denc = new TextDecoder();
			var encoded = enc.encode(evt.target.value);
			var prom = crypto.subtle.digest('SHA-1', encoded);
			prom.then(function (result) {
				var hash = hex(result).toUpperCase();
				var hashPrefix = hash.substring(0, 5);

				var $req = $.get('https://api.pwnedpasswords.com/range/' + hashPrefix);
				$req.done(function (data) {
					var pwnedCount = checkPwdHash(hash, data);
					if (pwnedCount > 0) {
						$pwnedCount.html(pwnedCount);
						$warning.show();
					} else {
						$warning.hide();
					}
				});
				$req.fail(function (err) {
					console.log(err);
				});
			});
		});

		function hex(buffer) {
			var hexCodes = [];
			var view = new DataView(buffer);
			for (var i = 0; i < view.byteLength; i += 4) {
				var value = view.getUint32(i)
				var stringValue = value.toString(16)
				var padding = '00000000'
				var paddedValue = (padding + stringValue).slice(-padding.length)
				hexCodes.push(paddedValue);
			}
			return hexCodes.join("");
		}

		function checkPwdHash(hash, data) {
			var lines = data.split('\n');
			for (var i = 0; i < lines.length; i++) {
				var hashBits = lines[i].split(':');
				if (hash.endsWith(hashBits[0])) {
					return hashBits[1];
				}
			}
			return 0;
		}

	}

});