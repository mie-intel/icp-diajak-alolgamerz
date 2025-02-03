<div align="center">

# **PactLock**

v1.0.0

<i>The Future of Secure and Immutable Contract</i>

</div>

## Background

Our products is build based on this several issues

- The Supreme Court (Mahkamah Agung) adjudicated 2.283 cases in total involving breach of contract (wanprestasi) [https://putusan3.mahkamahagung.go.id]. Wanprestasi leads by some major causes, such as poorly organized contracts, unethical individuals, and corrupt practices (Wagiu et al., 2023).

## What We Offer?

Introducing PactLock, an innovative web 3.0 solution that leverages blockchain technology to provide a secure and immutable place for contract discussions, storage, and management. Our product utilizes decentralized storage so that all contracts are permanently archived and accessible only to authorized parties, ensuring transparency and security. We guarantee the integrity, permanence, and security of all digital agreements by harnessing blockchain’s trustless infrastructure for contract-making and management into a more transparent and efficient process.

## Main Features

- **Secure Contract Meetings:** A blockchain-powered meeting space for discussing contracts with a verifiable digital trail.

* **Immutable Contract Archiving:** Decentralized storage ensures contracts remain permanent, tamper-proof, and accessible only to authorized parties.

* **Smart Contract Cancellation:** Contracts can only be revoked through a formal cancellation contract, maintaining legal clarity and transparency.

## How it Works?

On our website, user can make a `contract` to some of other user. This conract is like an folders that contain immutable confidental data about those group of users. This will be usefull if some user want to avoid manipulation after make an aggreement with the others.

Inside that contract, you can add some `documents` / `meeting records`.

- Documents

  User can add some documents like pdf file inside their contracts.

- Meeting Records

  User can arrange a meeting with the others in the same contracts. And after that, you can save your meeting records here.

## Prerequisites

- NPM > 23.0.0
- dfx
- Internet Identity

## How to run?

1. Clone the repository using

   ```
   git clone git@github.com:mie-intel/icp-diajak-alolgamerz.git
   ```

2. Go to the root folder, then install all packages using

   ```
   npm i
   ```

3. Also go to the `/be` and `/fe` folder inside `/src` directory. Then install all dependency using

   ```
   npm i
   ```

4. Now, the website can be accessed at `http://localhost:3000`. Enter your identity and then log in with your account through the website

## Steps

1. Create new account on the website. Enter your email, businessName, phone number, and password

2. After that, Log In to your account and now you will be able to see your dashboard

3. The website will have `4` main pages.

   - **Dashboard**

     For viewing every related information about your upcoming meeting and contract list

   - **Account**

     For viewing your account data.

   - **Contracts**

     For viewing all your contracts

   - **New Contracts**

     To create new contracts

### Dashboard

You can view your upcoming meetings, your pending contracts, and all of your contracts here. You can also view the details of your contracts. Click on one of your contracts and you will see it there.

Inside that pages, if your contract is not finalized yet, you will be able to accept or reject it.

The first time you enter the site, you will see a dashboard containing all of your pages.

And then, you can also add new items to your contract by pressing `Add New Item` button

### Account

You can view your account data here. And than, you can log out from your account there.

### Contracts

You can view all of your contracts there. Inside it, you can select one of your contracts and view the details. And lastly, you can also create new contract item there.

### New Contracts

You can create new contracts with several other user here. This will generate new contracts and you can start making some immutable documents.

## Contributor

1. Atila Ghulwani Altamis (Back End Developer)
2. Radhya Cahya Kusuma (Stream Developer)
3. Polikarpus Arya Pradhanika (Front End Developer)
4. Rai Kana Abhimatta (UI Designer)
5. Naura Khairunnisa Zayana (Business Development)

# Azle Hello World

- [Installation](#installation)
- [Deployment](#deployment)

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Please remember that Azle is in beta and thus it may have unknown security vulnerabilities due to the following:

- Azle is built with various software packages that have not yet reached maturity
- Azle does not yet have multiple independent security reviews/audits
- Azle does not yet have many live, successful, continuously operating applications deployed to ICP

## Installation

> Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

You will need [Node.js 20](#nodejs-20) and [dfx](#dfx) to develop ICP applications with Azle:

### Node.js 20

It's recommended to use nvm to install Node.js 20:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install 20
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

### dfx

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.22.0 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

## Deployment

To create and deploy a simple sample application called `hello_world`:

```bash
# create a new default project called hello_world
npx azle new hello_world --http-server --experimental
cd hello_world
```

```bash
# install all npm dependencies including azle
npm install
```

```bash
# start up a local ICP replica
dfx start --clean
```

In a separate terminal in the `hello_world` directory:

```bash
# deploy your canister
dfx deploy
```

If you would like your canister to autoreload on file changes:

```bash
AZLE_AUTORELOAD=true dfx deploy
```

View your frontend in a web browser at `http://[canisterId].raw.localhost:8000`.

To obtain your application's [canisterId]:

```bash
dfx canister id backend
```

Communicate with your canister using any HTTP client library, for example using `curl`:

```bash
curl http://[canisterId].raw.localhost:8000/db
curl -X POST -H "Content-Type: application/json" -d "{ \"hello\": \"world\" }" http://[canisterId].raw.localhost:8000/db/update
```
