pragma solidity ^0.4.0;
contract Ballot {
    bytes32 public iadress=0xae77fedcbb9fa8c828627144b20f08e6dae57d8fe140c290bf674f0bb17b91fa;
    int[128] public result;
    bytes32 public bi;
    int[5] array;
    function get() public returns (int[128]) {
        iadress = sha256(abi.encodePacked(iadress));
        for(uint i=0;i<32;i++){
            array[0]=int(iadress[i]);
            array[1]=array[0]%4;
            array[0]=array[0]/4;
            array[2]=array[0]%4;
            array[0]=array[0]/4;
            array[3]=array[0]%4;
            array[0]=array[0]/4;
            array[4]=array[0]%4;
            for(uint j=1;j<5;j++){
                if(array[j]==0||array[j]==3){
                    result[4*i+j-1]=0;
                }else{
                    result[4*i+j-1]=1;
                }
            }
        }
        return result;
    }
    
    function get3(int min,int max,int number) returns(int[]){
        int[] a;
        uint i;
        uint num = uint(number);
        if(min > max){
            
            for(i=0;i<num;i++){
                a[i]=0;
            }
        }else if(min == max){
            for(i=0;i<num;i++){
                a[i]=min;
            }
        }else{
            uint mins=uint(max-min);
            uint count = 0;
            uint icount = 1;
            uint k = 1;
            while(k<mins){
                k *= 2;
                icount += 1;
            }
            i = 0;
            while(count<num){
                this.get();
                if(i + icount >= num){
                    continue;
                }
                
            }
        }
    }
    
    
    
}
