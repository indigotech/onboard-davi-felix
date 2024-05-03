# Taqtile's Onboarding - Mobile development

- Project's Name: Onboarding mobile
- Project's Description: Introduction to Mobile Development concepts using practical applications

# Environment and tools

The tools necessary to make the project run are:

- **Android Studio Electric Eel | 2022.1.1 Patch 1**, which makes it possible to run applications on Android Devices
  - Android SDK 11.0
  - Android API 30
- **Xcode v15.3**, which makes it possible to run the application in IOS devices
  - IOS 17.4
- **NodeJS v18.20.2**

The project is built using **ReactNative v0.74.1** with **Typescript** and the setup was made using the `react-native CLI` with the `react-native-template-typescript` template.

Additionally, for linting and formatting, `eslint` and `prettier` are being used, which work better with the help of its corresponding text editor extensions.

# Steps to run and debug

1. Clone se repository and move into the folder

```bash

git clone https://github.com/indigotech/onboard-davi-felix
cd onboard-davi-felix

```

2. Change node version to 18.20.2 (assuming nvm is installed, if not consider this step as "Installing NodeJS v18.20.2")

```bash

nvm use 18

```

3. Install dependencies

```bash

npm install

```

4. Install the corresponding Android SDK version on Android Studio and then create a Virtual Device for emulation

5. Install the corresponding IOS version on Xcode

6. Install dependencies for IOS project

```bash
cd ios/
bundle install
bundle exec pod install
```

7. Start the app

```bash
npm start
```

8. Initialize the applications pressing `i` to run on IOS or `a` to run on Android

That's it! From now on, just enjoy the app!
