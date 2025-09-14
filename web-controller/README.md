# eip1056 test frontend

This web-controller and ../api directory was created based on [did-vc published on GitHub](https://github.com/ka-sasaki-sti/did-vc). It is a full-stack application implementing Decentralized Identifiers (DID) and Verifiable Credentials (VC) using EIP/ERC-1056.

You need to run this server when you want to issue DID document and check functions around DID and VC. Otherwise, you don't have to run this server.

It runs on http://localhost:3002

## Overview

- **Backend**: API server using NestJS (api/)
- **Frontend**: Web application using React + TypeScript + Material-UI (web-controller/)
- **Blockchain**: Ethereum Sepolia testnet (uses pre-deployed smart contracts)
- **DID Standard**: EIP/ERC-1056 (EthrDID)
- **VC Standard**: Verifiable Credentials in JWT format

## Features

- DID creation, registration, and resolution
- Verifiable Credentials issuance and verification
- Web-based UI (DID management, VC issuance, VC verification)


## Setup Procedure

```bash
npm install
npm run dev
```

## Using the Application

Access `http://localhost:3002` in your browser and follow these steps to use the application:

1. **Step 0**: Verify Current DID - Display DID information set via environment variables
2. **Step 1**: DID Registration - Register a DID on the blockchain
3. **Step 2**: DID Resolution - Retrieve and verify the registered DID document
4. **Step 3**: VC Issuance - Issue a Verifiable Credential
5. **Step 4**: VC Verification - Verify the issued VC on the verification page


-------

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
