# node-vk

node.js module to work with vk.com and vkontakte.ru api for desktop/mobile applications

## Installation

`npm install vk`

## Usage

```javascript
var VkClient = require("vk").VkClient;

var vk = new VkClient("<your user's token here>");

vk.api('getProfiles', {uid: 2241140}, function(error, result) {
    console.log("Got args:");
    console.log(arguments);
});
```

## Authors
- Ian Babrou (ibobrik@gmail.com)

