function apsum(str1, str2) {

	if (!str1.match(/^(\+|-)?\d+$/) || !str2.match(/^(\+|-)?\d+$/)) { throw new Error('NaN'); }

	var x = []; 
	var y = [];

	if (str1.length > 1) { x = str1.split("").reverse(); } else { x[0] = str1[0]; }
	if (str2.length > 1) { y = str2.split("").reverse(); } else { y[0] = str2[0]; }
	var s = [];

	if (str1[0] == '-' && str2[0] != '-') { str1 = str1.substring(1); return apsub(str2, str1); }
	if (str1[0] != '-' && str2[0] == '-') { str2 = str2.substring(1); return apsub(str1, str2); }
	if (str1[0] == '-' && str2[0] == '-') { str1 = str1.substring(1); str2 = str2.substring(1); return -apsum(str1, str2); }

	var length = Math.max(x.length, y.length);
	var ds = 0;

	x = x.map(function(n) { return Number(n); } );
	y = y.map(function(n) { return Number(n); } );
	
	for (var i = 0; i < length; ++i) {
		if (!x[i]) x[i] = 0;
		if (!y[i]) y[i] = 0;
		ds = x[i] + y[i] + ds;
		if (ds >= 10) {
			ds -= 10;
			s[i] = ds;
			ds = 1;
		}
		else {
			s[i] = ds;
			ds = 0;
		}
	}
	if (ds) s.push(ds);
	s = s.reverse();
	s = s.join("");
	if (s == "0") return "0";
	var count = 0;
	var it = 0;
	while (s[it++] == '0') { count++; }
	s = s.substring(count);
	return s;
}

function apsub(str1, str2) {

	if (!str1.match(/^(\+|-)?\d+$/) || !str2.match(/^(\+|-)?\d+$/)) { throw new Error('NaN'); }

	var xl = str1.length;
	var yl = str2.length;
	var less = 0;
	
	if (str1[0] == '-' && str2[0] != '-') { str1 = str1.substring(1); return -apsum(str1, str2); }
	if (str1[0] != '-' && str2[0] == '-') { str2 = str2.substring(1); return apsum(str1, str2); }
	if (str1[0] == '-' && str2[0] == '-') { str1 = str1.substring(1); str2 = str2.substring(1); return apsub(str2, str1); }

	if ( (xl < yl) || ( (xl == yl) && (str1 < str2)) ) { 
		var t;
		t = str1;
		str1 = str2;
		str2 = t;
		less = 1;
	}

	var x = str1.split("").reverse();
	var y = str2.split("").reverse();
	var s = [];
	var dd = 0;
	var length = Math.max(xl, yl);

	x = x.map(function(n) { return Number(n); } );
	y = y.map(function(n) { return Number(n); } );
	for (var i = 0; i < length; ++i) {
		if (!x[i]) x[i] = 0;
		if (!y[i]) y[i] = 0;
		dd = x[i] - y[i] + dd;
		if (dd < 0) {
			dd += 10;
			s[i] = dd;
			dd = -1;
		}
		else {
			s[i] = dd;
			dd = 0;
		}
	}
	s = s.reverse();
	s = s.join("");
	var count = 0;
	var it = 0;
	while (s[it++] == '0') { count++; }
	s = s.substring(count);
	if (less) s *= -1;
	if (s.length == 0) return 0;	
	return s;

}

function _apmul(str1, multiplier, shift) {
	var x = str1.split("").reverse();
	var s = [];
	var ds = 0;
	var length = x.length;
	x = x.map(function(n) { return Number(n); } );
	for (var i = 0; i < length; ++i) {
		if (!x[i]) x[i] = 0;
		ds = x[i] * multiplier + ds;
		if (ds >= 10) {
			s[i] = ds % 10;
			ds = Math.floor(ds / 10);
		}
		else {
			s[i] = ds;
			ds = 0;
		}
	}
	if (ds) s.push(ds);
	for (var i = 0; i < shift; ++i) {
		s.unshift(0);
	}
	s = s.reverse();
	s = s.join("");
	return s;
}

function apmul(x, y) {

	if (!x.match(/^(\+|-)?\d+$/) || !y.match(/^(\+|-)?\d+$/)) { throw new Error('NaN'); }

	var s = 0;
	var less = 0;
	if (x[0] == '-') { x = x.substring(1); less ^= 1; }
	if (y[0] == '-') { y = y.substring(1); less ^= 1; }
	var length = y.length;
	for (var i = 0; i < length; ++i) {
		s = apsum(s.toString(), _apmul(x, y[length - i - 1], i));
	}
	var count = 0;
	var it = 0;
	while (s[it++] == '0') { count++; }
	s = s.substring(count);
	if (less) { s *= -1; }
	if (s.length == 0) return 0;
	return s;
}

function test() {
	for (var i = -200; i < 200; i++) { 
		for (var j = -200; j < 200; j++) {
			if (apsum(i.toString(), j.toString()) != i + j) alert("sum: i=" + i + "; j=" + j + "; result= " + apsum(i.toString(), j.toString()));
			if (apsub(i.toString(), j.toString()) != i - j) alert("dif: i=" + i + "; j=" + j + "; result= " + apsub(i.toString(), j.toString()));
			if (apmul(i.toString(), j.toString()) != i * j) alert("mul: i=" + i + "; j=" + j + "; result= " + apmul(i.toString(), j.toString()));
		}
	}
}

module.exports = {
	apsum,
	apsub,
	apmul
};

