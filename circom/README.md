# Circom

## Discription

`circom/circuit/ageCheck.circom` is a circuit to zk proof that the driver is older than 20 with privte input of birthday and public input of today's date.

Output will be saved in a directory `circom/work/ageCheck`. verifyAge function of API sever uses this output to make ZKP.

## commands

To make circom and snarkjs commands simple, I use a shell scripts created for the circom exercises in the University of Tokyo Blockchain Open Lecture.


```bash
./zkall ageCheck 12   // execute all the following steps

./zkkey.sh ageCheck 12
./zkbuild.sh ageCheck
./zkprove.sh ageCheck hash
./zkverify.sh ageCheck
```
