// age_gte20_unix.circom
pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/bitify.circom"; // Num2Bits

template AgeAtLeast20_Unix(nBits) {
    // Inputs
    signal input birthday;  // private: Unix time (seconds)
    signal input today;     // public : Unix time (seconds)

    // --- Range constraints (avoid field wraparound tricks) ---
    component bBits = Num2Bits(nBits);
    bBits.in <== birthday;

    component tBits = Num2Bits(nBits);
    tBits.in <== today;

    // --- Compute delta and enforce delta >= THRESHOLD ---
    // Safe threshold = 20 years with up to 6 leap days: 631,238,400 seconds
    var THRESHOLD = 631238400;

    signal delta;
    delta <== today - birthday;

    signal slack;
    slack <== delta - THRESHOLD;

    // If slack is negative, this will fail (can't decompose into nBits).
    component sBits = Num2Bits(nBits);
    sBits.in <== slack;
}

// 64-bit seconds are十分 (Unix time fits well into 64 bits for現代日付)
component main { public [today] } = AgeAtLeast20_Unix(64);
