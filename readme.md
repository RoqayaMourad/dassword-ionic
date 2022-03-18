# Dassword 🔐

The first Decentralized password manager, dassword.com

 

## Why centralized storage is bad for your sensitive data? 🔑📄
 
When you use a password manager or any other vault app, you store your data on a specific location (local or private cloud) this have some critical problems. your important data is centralized, meaning that  **whoever controls the location controls the content**. The controller can change the content, completely replace it, or just take it away. 
That makes your data vulnerable to attacks, exploitation, and loss. 

This makes centralized storage [local or remote] not optimal for storing important data, each has it's downsides

#### Storage

**Remote or Cloud**: Denied access to data or data deletion because of billing issues or even policy changes or what ever the service provider says, **You're completely reliant on who is holding your data**

**Local**: Vulnerable to hacks, MITM attacks or just accidental data lose



## But With Dassword your data is:

 - ✅ **Secure**: and your master password never stored or transmitted.

 - ✅ **Persistent**: Stored on the IPFS and Filecoin Network to ensure it's availability.

 - ✅ **Provable Ownership**: Where you own your data the same way you own your FIL or bitcoin in your wallet, (wallet integration is coming soon).

 - ✅ **Trustless**: Does not require you to trust the password manager company to know your data is safe.

 - ✅ **Open source**: and open for anyone to study and analyze it's codebase.

## What you can do with Dassword ? 🔐

**Dassword** manages your passwords across websites and apps while being secure and reliable
You can store your credit cards, personal files, personal notes, and sensitive files


## How it works ?

![enter image description here](https://res.cloudinary.com/dqnnyl8x7/image/upload/v1647573924/4_knrdce.png)

![enter image description here](https://res.cloudinary.com/dqnnyl8x7/image/upload/v1647573924/6_nha0jo.png)

![enter image description here](https://res.cloudinary.com/dqnnyl8x7/image/upload/v1647573924/5_cwyvcy.png)


## FEATURES ⚙

- Automated IPFS sync.
- Save documents.
- Save personal Notes.
- Save credit cards.
- Create Password records.
- Generate password.
- Auto fetch website icon.
- Realtime item filtering.
- Create a strong and unique password for each site.
- Temporary local storage Encryption.
- Strong encryption Base on AES256 & SHA-3.
- SHA-1 based password authentication.
- Zero-knowledge architecture.
- Open Source Security and code transparency.

## Technologies ? 🔨

**Web3**: **IPFS** , **Filecoin**

**Front-end**  : Angular 14 

**Mobile**  : Ionic 6 with Capacitor

**Backend**  : Nodejs with PostgreSQL 14 ‍💻


## How it implements IPFS & Filecoin ?

- Backend as IPFS relay to store data to IPFS and retrieve it.
- Web3.storage as a service,  which uses the decentralized storage provided by the Filecoin ⨎ network, and rewards nodes based on storage.
- Automatically replicate your data across a network of storage providers. and verify the integrity of your data, enabled by Filecoin’s cryptographic proof system.



## What's next for Dassword ? 

There are few steps next to be market ready:
1. Adding general features.
2. Adding more security features:
	- Even more security layers, PGP E2EE encryption.
	- Salted login.
3. Cross-Platform Application:
	- iOS application.

Submitted to [Faber Web3 Hackathon](https://devpost.com/software/dassword)

![enter image description here](https://res.cloudinary.com/dqnnyl8x7/image/upload/v1647588449/Dassword_built_black_faber_left_2_oibwpm.png)


## Testing the app

### You can get started by visiting
https://dassword.com/app/

or by building from the source code here, git clone the project then run

    ionic serve


To change the API endpoint across the app go to
https://github.com/RoqayaMourad/dassword-ionic/blob/master/src/app/services/api/api.ts#L10

and changing

    url: string = 'https://dassword.com/api';


