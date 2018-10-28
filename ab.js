var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        arr = str.split('#');
        console.log("收到的信息为:"+arr);
            max = arr[0];
            min = arr[1];
            number = arr[2];
            nervos.appchain.getBlockByNumber(arr[3]||'latest').then(block=>{
                var str = block.hash.slice(2);
                var iter = makeIterator(str);
                var count = 0;
                var num = 1;
                while(num < max - min){
                    num *= 2;
                    num += 1;
                    count += 1;
                }
                var icount = 0;
                var result = [];
                while(icount < number){
                    var n = 0;
                    while(true){
                        n += iter.next();
                        for(var i = 0; i < count; i++){
                            n *= 2;
                            n += iter.next();
                        }
                        if(n >= min && n <= max){
                            result.push(n);
                            n = 0;
                            icount ++;
                            break;
                        }else{
                            n = 0;
                        }
                    }
                }
                strr=result.join(',');
				console.log("产生的随机数序列为"+strr+'\n');
                strr=[strr,block.header.number].join('#');
                console.log("使用的区块number属性为"+block.header.number+'\n');
                conn.sendText(strr);
            }).catch(e=>console.log(e))
        
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)

console.log("WebSocket建立完毕")

const Nervos= require('@nervos/chain').default

const nervos = Nervos('https://node.cryptape.com')

function makeIterator(s){
    var nextIndex = 0;
    var array = makeArr(s);
    return{
    	next:function(){
            if(nextIndex==array.length){
                s = sha256(s);
                array = makeArr(s);
                nextIndex = 0;
            }
            return array[nextIndex++];
        }
    }
}

function makeArr(str){
    var arr = [];
    for(var i = 0; i < 64; i ++){
        if(str[i]<'4'||str[i]>'b'){arr[2*i]=0;}else{arr[2*i]=1}
        if(str[i]=='1'||str[i]=='2'||str[i]=='5'||str[i]=='6'||str[i]=='9'||str[i]=='a'||str[i]=='d'||str[i]=='e'){arr[2*i+1]=1;}else{arr[2*i+1]=0}
    }
    return arr;
}

function debug(max,min,number){
    nervos.appchain.getBlockByNumber('latest').then(block=>{
        var str = block.hash.slice(2);
        var iter = makeIterator(str);
        var count = 0;
        var num = 1;
        while(num < max - min){
            num *= 2;
            num += 1;
            count += 1;
        }
        var icount = 0;
        var result = [];
        while(icount < number){
    	   var n = 0;
            while(true){
                n += iter.next();
                for(var i = 0; i < count; i++){
                    n *= 2;
                    n += iter.next();
                }
                if(n >= min && n <= max){
                    result.push(n);
                    n = 0;
                    icount ++;
                    break;
                }else{
                    n = 0;
                }
            }
        }
        console.log(result.join('-'));
        return result.join('-');
    }).catch(e=>console.log(e))
}





function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; 
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	

	var hash = sha256.h = sha256.h || [];

	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];


	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' 
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' 
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return;
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	

	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); 
		var oldHash = hash;

		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;

			var w15 = w[i - 15], w2 = w[i - 2];


			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
				+ ((e&hash[5])^((~e)&hash[6]))
				+ k[i]
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) 
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) 
					)|0
				);

			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) 
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); 
			hash = [(temp1 + temp2)|0].concat(hash); 
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};
