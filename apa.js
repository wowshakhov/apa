const base = 10;

/**
 * Calculates arbitrary precision sum of two numbers
 * @param  {string} str1 Integer number with an optional preceding plus or minus sign
 * @param  {string} str2 Integer number with an optional preceding plus or minus sign
 * @return {string} Sum: str1 + str2 
 */
function apsum(str1, str2) {
    // check if operands are numeric
    checkArgs(str1, str2);
    let x = [];
    let y = [];
    // convert string to array
    if (str1.length > 1) { 
        x = str1.split('').reverse();
    } else {
        x[0] = str1[0];
    }
    if (str2.length > 1) {
        y = str2.split('').reverse();
    } else {
        y[0] = str2[0];
    }
    let s = [];
    // handle minus signs
    if (str1[0] === '-' && str2[0] !== '-') {
        return apsub(str2, str1.substring(1));
    }
    if (str1[0] !=='-' && str2[0] === '-') {
        return apsub(str1, str2.substring(1));
    }
    if (str1[0] === '-' && str2[0] === '-') {
        return '-' + apsum(str1.substring(1), str2.substring(1));
    }
    let length = Math.max(x.length, y.length);
    let ds = 0;
    // convert array elements to numbers
    for (let i = 0; i < length; ++i) {
        if (!x[i]) x[i] = 0;
        if (!y[i]) y[i] = 0;
        // calculate one digit of sum and carry
        ds = Number(x[i]) + Number(y[i]) + ds;
        if (ds >= base) {
            ds -= base;
            s[i] = ds;
            ds = 1;
        } else {
            s[i] = ds;
            ds = 0;
        }
    }
    // add carry as a digit
    if (ds) {
        s.push(ds);
    }
    // convert to string
    s = s.reverse();
    s = s.join('');
    if (s === '0') {
        return '0';
    }
    return removeLeadingZeroes(s);
}

/**
 * Removes leading zeroes from a string
 * @param  {string} str1
 * @return {string} str1 without leading zeroes
 */

function removeLeadingZeroes(s) {
    let count = 0;
    let it = 0;
    while (s[it++] === '0') {
        count++;
    }
    s = s.substring(count);
    if (s.length === 0) {
        return '0';
    }
    return s;
}

/**
 * Checks if arguments are valid integer numbers with or without minus sign 
 * @param  {string} str1 
 * @param  {string} str2 
 * @throws {Error} If str1 or str2 isn't a number
 */
function checkArgs(str1, str2) {
    if (!str1.match(/^(\-)?\d+$/) || !str2.match(/^(\-)?\d+$/)) { 
        throw new Error('NaN');
    }
}

/**
 * Calculates arbitrary precision difference of two numbers
 * @param  {string} str1 Integer number with an optional preceding plus or minus sign
 * @param  {string} str2 Integer number with an optional preceding plus or minus sign
 * @return {string} Difference str1 - str2
 */
function apsub(str1, str2) {
    checkArgs(str1, str2);
    let xl = str1.length;
    let yl = str2.length;
    let less = 0;
    if (str1[0] === '-' && str2[0] !=='-') {
        return '-' + apsum(str1.substring(1), str2);
    }
    if (str1[0] !=='-' && str2[0] === '-') {
        return apsum(str1, str2.substring(1));
    }
    if (str1[0] === '-' && str2[0] === '-') {
        return apsub(str2.substring(1), str1.substring(1));
    }
    // swap terms if necessary
    if ((xl < yl) || ((xl === yl) && (str1 < str2))) {
        let t = str1;
        str1 = str2;
        str2 = t;
        less = 1;
    }
    let x = str1.split('').reverse();
    let y = str2.split('').reverse();
    let s = [];
    let dd = 0;
    let length = Math.max(xl, yl);

    for (let i = 0; i < length; ++i) {
        if (!x[i]) x[i] = 0;
        if (!y[i]) y[i] = 0;
        dd = Number(x[i]) - Number(y[i]) + dd;
        if (dd < 0) {
            dd += base;
            s[i] = dd;
            dd = -1;
        } else {
            s[i] = dd;
            dd = 0;
        }
    }
    s = s.reverse();
    s = s.join('');
    s =  removeLeadingZeroes(s);
    if (less) {
        s *= -1;
    }
    return s;

}

/**
 * Auxiliary function for apmul
 * @param  {string} str1 Integer number with an optional preceding plus or minus sign
 * @param  {string} multiplier Integer number with an optional preceding plus or minus sign\
 * @param  {string} shift Number of trailing zeroes in the result
 * @return {string} Product str1 * multiplier with trailing zeroes
 */
function _apmul(str1, multiplier, shift) {
    let x = str1.split('').reverse();
    let s = [];
    let ds = 0;
    let length = x.length;
    for (let i = 0; i < length; ++i) {
        if (!x[i]) x[i] = 0;
        ds = Number(x[i]) * multiplier + ds;
        // calculate carry for multiplication
        if (ds >= base) {
            s[i] = ds % base;
            ds = Math.floor(ds / base);
        } else {
            s[i] = ds;
            ds = 0;
        }
    }
    if (ds) {
        s.push(ds);
    }
    for (let i = 0; i < shift; ++i) {
        s.unshift(0);
    }
    s = s.reverse();
    s = s.join('');
    return s;
}

/**
 * Calculate arbitrary precision product of two numbers
 * @param  {string} str1 Integer number with an optional preceding plus or minus sign
 * @param  {string} str2 Integer number with an optional preceding plus or minus sign
 * @return {string} Product str1 * str2
 */
function apmul(x, y) {
    checkArgs(x, y);
    let s = 0;
    let less = 0;
    // handle minus signs
    if (x[0] === '-') {
        x = x.substring(1);
        less ^= 1;
    }
    if (y[0] === '-') {
        y = y.substring(1);
        less ^= 1;
    }
    let length = y.length;
    // multiply the 1st term by one digit of the 2nd term and add to the result with trailing zeroes
    for (let i = 0; i < length; ++i) {
        s = apsum(s.toString(), _apmul(x, y[length - i - 1], i));
    }
    s = removeLeadingZeroes(s);
    if (less) {
        s = '-' + s;
    }
    if (s.length === 0) return '0';
    return s;
}

module.exports = {
    apsum,
    apsub,
    apmul
};
