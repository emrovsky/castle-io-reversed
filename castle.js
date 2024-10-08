ie = function(n) {
                return Math['random']() * n | 0
            }
me = function(n) {
                return (n & 15).toString(16)
            }

ve = function(n) {
                return ("0" + (n & 255).toString(16)).slice(-2)
            }
be = function(n) {
                for (var t = "", e = 0, r = n; e < r.length; e++) {
                    var i = r[e];
                    t += ve(i)
                }
                return t
            }
ye = function(n, e) {
                for (var r = Math['min'](Math['pow'](2, 8 * e) - 1, n), i = "", o = 2 * e; 0 < r; )
                    i = ve(r) + i,
                    r >>>= 8;
                if (o)
                    for (; i.length < o; )
                        i = "0" + i;
                return i
            }
pa = function(n, t) {
                return le(n.slice(1), t) + t
            }
le = function(n, t) {
                for (var e = [], r = 0, i = 0, o = n.split(""); i < o.length; i++) {
                    var u = o[i];
                    u = parseInt(u, 16) ^ parseInt(t.charAt(r), 16),
                    e.push(u.toString(16)),
                    r = (r + 1) % t.length
                }
                return e.join("")
            }
Hu = function(n, t) {
                var e = n.length;
                return Array.prototype.unshift.apply(n, Array.prototype.splice.call(n, t % e, e)),
                n
            }
Vu = function(n, t) {
                return Hu(n.split(""), t).join("")
            }

Gu = function(n, t, e, r) {
                var i = Vu(n.slice(0, t), parseInt(e, 16));
                return le(r, i)
            }

ge = function(n) {
                var t = n.match(/.{2}/g)
                  , e = "";
                if (t)
                    for (var r = 0, i = t; r < i.length; r++) {
                        var o = i[r];
                        e += String.fromCharCode(parseInt(o, 16) & 255)
                    }
                return e
            }

// for hashing site key
de = function(n) {
    n = n.slice(3)
    for (var t = "", e = 0; e < n.length; e++)
        t += ve(n.charCodeAt(e));
    return t
}
// for hashing site key


// for c data
la = function(n) {
                var e = Math['floor'](n / 1e3 - 1535000000);
                return e = Math['max'](Math['min'](e, 268435455), 0),
                be([e >> 24, e >> 16, e >> 8, e])
            }
da = function(n) {
                var t = parseInt(n.toString().slice(-3), 10);
                return ye(t, 2)
            }
va = function(n, t) {
                var e = me(ie(15));
                return pa(n, e) + pa(t, e)
               }
// for c data



//for a data
ve = function(n) {
                return ("0" + (n & 255).toString(16)).slice(-2)
            }
ie = function(n) {
                return Math['random']() * n | 0
            }
//for a data



//last function for encryption :3
zu = function(t) {
                var e = btoa(t);
                return null == e ? null : e.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
            }
//last function for encryption :3



// vm function - its not vm, just function name lol :)
castle_token = function(t, e, r) {
                timestamp = Date.now()
                x = la(timestamp)
                y = da(timestamp)
                c = va(x, y)
                a = ve(ie(256))

                s = '1d03010b00140574722d54521e052781c683c12d1835023e0a47f4004f0269f6b8d45704a5e8b2885f0c007f67016f4d6f7a696c6c612f352e30202857696e646f7773204e542031302e303b2057696e36343b2078363429204170706c655765624b69742f3533372e333620284b48544d4c2c206c696b65204765636b6f29204368726f6d652f3132392e302e302e30205361666172692f3533372e33366c0866666638353066397703078b009407663636623134629c5a414e474c4520284e56494449412c204e5649444941204765466f7263652052545820343037302053555045522028307830303030323738332920446972656374334431312076735f355f302070735f355f302c20443344313129a41330312e30312e313937302030323a30303a3030af0800b521c5b106cb00d301dd9224e700eb03f7513d5c8e38ffa26a8a03000c0f4575726f70652f497374616e62756c140874722d54522c747257040e5a65508f0d070291b4027472bf020240000000000000000000000000000000000000000000000000000000000000000000404040404040000000000000000000000000400000000000000000000000ff', // fingerprint
                i = Gu(c, 4, c.charAt(3), s),
                f = Gu(t, 8, t.charAt(9), c + i),
                u = ve((o = e + r + "4903" + t + f).length),
                s = le(o + u, a),
                c = ge(a + s)
                return zu(c)
            }
// vm function ^^


function create_castle_token(__cuid,site_key){
    return castle_token(__cuid,'09', de(site_key))
}


