var assert = require('assert');
var apa = require('../apa.js');

describe('addition', function() {
	it('positive + positive', function() {
		assert.equal(apa.apsum("5628945656", "3465465978"), "9094411634", 'positive + positive failed')
	});
	it('positive + negative', function() {
		assert.equal(apa.apsum("8750283", "-532235099"), "-523484816", 'positive + negative failed')
	});
	it('negative + positive', function() {
		assert.equal(apa.apsum("-384714", "9999"), "-374715", 'negative + positive failed')
	});
	it('negative + negative', function() {
		assert.equal(apa.apsum("-6", "-7"), "-13", 'negative + negative failed')
	});
	it('zero + number', function() {
		assert.equal(apa.apsum("585", "0"), "585", 'zero + number failed')
	});
	it('NaN', function() {
		assert.throws( function() { apa.apsum("asd", "123"); }, Error, 'doesn\'t throw NaN on invalid input')
	});
})

describe('subtraction', function() {
	it('positive - positive', function() {
		assert.equal(apa.apsub("5628945656", "3465465978"), "2163479678", 'positive - positive failed')
	});
	it('positive - negative', function() {
		assert.equal(apa.apsub("8750283", "-532235099"), "540985382", 'positive - negative failed')
	});
	it('negative - positive', function() {
		assert.equal(apa.apsub("-384714", "9999"), "-394713", 'negative - positive failed')
	});
	it('negative - negative', function() {
		assert.equal(apa.apsub("-6", "-7"), "1", 'negative - negative failed')
	});
	it('zero - number', function() {
		assert.equal(apa.apsub("0", "400"), "-400", 'zero - number failed')
	});
	it('NaN', function() {
		assert.throws( function() { apa.apsum("//", "123"); }, Error, 'doesn\'t throw NaN on invalid input')
	});
})

describe('multiplication', function() {
	it('positive * positive', function() {
		assert.equal(apa.apmul("5125", "3465"), "17758125", 'positive * positive failed')
	});
	it('positive * negative', function() {
		assert.equal(apa.apmul("123", "-321"), "-39483", 'positive * negative failed')
	});
	it('zero * number', function() {
		assert.equal(apa.apmul("0", "1"), "0", 'zero * number failed')
	});
	it('NaN', function() {
		assert.throws( function() { apa.apsum("", ""); }, Error, 'doesn\'t throw NaN on invalid input')
	});
})

