const Nervos= require('@nervos/chain').default


const nervos = Nervos('https://node.cryptape.com')
nervos.appchain.getBlockByNumber('0x29a6b6').then(block=>console.log(block))
