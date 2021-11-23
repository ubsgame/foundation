pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;

library strings {
    struct slice {
        uint _len;
        uint _ptr;
    }

    function memcpy(uint dest, uint src, uint len) private pure {
        for (; len >= 32; len -= 32) {
            assembly {
                mstore(dest, mload(src))
            }
            dest += 32;
            src += 32;
        }

        uint mask = 256 ** (32 - len) - 1;
        assembly {
            let srcpart := and(mload(src), not(mask))
            let destpart := and(mload(dest), mask)
            mstore(dest, or(destpart, srcpart))
        }
    }

    function toSlice(string memory self) internal pure returns (slice memory) {
        uint ptr;
        assembly {
            ptr := add(self, 0x20)
        }
        return slice(bytes(self).length, ptr);
    }

    function concat(slice memory self, slice memory other) internal pure returns (string memory) {
        string memory ret = new string(self._len + other._len);
        uint retptr;
        assembly {retptr := add(ret, 32)}
        memcpy(retptr, self._ptr, self._len);
        memcpy(retptr + self._len, other._ptr, other._len);
        return ret;
    }

    function join(slice memory self, slice[] memory parts) internal pure returns (string memory) {
        if (parts.length == 0)
            return "";

        uint length = self._len * (parts.length - 1);
        for (uint i = 0; i < parts.length; i++)
            length += parts[i]._len;

        string memory ret = new string(length);
        uint retptr;
        assembly {retptr := add(ret, 32)}

        for (i = 0; i < parts.length; i++) {
            memcpy(retptr, parts[i]._ptr, parts[i]._len);
            retptr += parts[i]._len;
            if (i < parts.length - 1) {
                memcpy(retptr, self._ptr, self._len);
                retptr += self._len;
            }
        }

        return ret;
    }

    function stringToBytes(string memory source) internal pure returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    function equal(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length == 0 && bytes(b).length == 0) {
            return true;
        }
        
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return stringToBytes(a) == stringToBytes(b);
        }
    }
    
    function uint2String(uint256 i) internal pure returns (string c) {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0) {
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        c = string(bstr);
    }
}

library SafeMath {

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0);
        uint256 c = a / b;

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
}

contract Ownable {

    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only allow owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract SeroInterface {

    bytes32 private topic_sero_issueToken     =  0x3be6bf24d822bcd6f6348f6f5a5c2d3108f04991ee63e80cde49a8c4746a0ef3;
    bytes32 private topic_sero_balanceOf      =  0xcf19eb4256453a4e30b6a06d651f1970c223fb6bd1826a28ed861f0e602db9b8;
    bytes32 private topic_sero_send           =  0x868bd6629e7c2e3d2ccf7b9968fad79b448e7a2bfb3ee20ed1acbc695c3c8b23;
    bytes32 private topic_sero_currency       =  0x7c98e64bd943448b4e24ef8c2cdec7b8b1275970cfe10daf2a9bfa4b04dce905;
    bytes32 private topic_sero_setCallValues  =  0xa6cafc6282f61eff9032603a017e652f68410d3d3c69f0a3eeca8f181aec1d17;
    bytes32 private topic_sero_setTokenRate   =  0x6800e94e36131c049eaeb631e4530829b0d3d20d5b637c8015a8dc9cedd70aed;

    /**
    * @dev convert bytes 32 to string
    * @param  x the string btyes32
    */
    function bytes32ToString(bytes32 x) public pure returns (string) {
        uint charCount = 0;
        bytes memory bytesString = new bytes(32);
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            } else if (charCount != 0){
                break;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        
        }
        return string(bytesStringTrimmed);
    }
    
    /**
    * @dev issue the token
    * @param _total the totalsupply of the token
    * @param _currency the currency ot the token
    */
    function sero_issueToken(uint256 _total,string memory _currency) internal returns (bool success){
        bytes memory temp = new bytes(64);
        assembly {
            mstore(temp, _currency)
            mstore(add(temp, 0x20), _total)
            log1(temp, 0x40, sload(topic_sero_issueToken_slot))
            success := mload(add(temp, 0x20))
        }
        return;
    }
    
    /**
    * @dev transfer the token or ticket to the receiver
    * @param _receiver the address of receiver
    * @param _currency the currency of token 
    * @param _amount the amount of token
    * @param _category the category of the ticket
    * @param _ticket the Id of the ticket
    */
    function sero_send(address _receiver, string memory _currency, uint256 _amount, string memory _category, bytes32 _ticket)internal returns (bool success){
        bytes memory temp = new bytes(160);
        assembly {
            mstore(temp, _receiver)
            mstore(add(temp, 0x20), _currency)
            mstore(add(temp, 0x40), _amount)
            mstore(add(temp, 0x60), _category)
            mstore(add(temp, 0x80), _ticket)
            log1(temp, 0xa0, sload(topic_sero_send_slot))
            success := mload(add(temp, 0x80))
        }
        return;
    }
    
    /**
    * @dev transfer the token to the receiver
    * @param _receiver the address of receiver
    * @param _currency the currency of token 
    * @param _amount the amount of token
    */
    function sero_send_token(address _receiver, string memory _currency, uint256 _amount)internal returns (bool success){
        return sero_send(_receiver,_currency,_amount,"",0);
    }
    
    /**
    * @dev set the call method params
    * @param _currency the crurrency of the token
    * @param _amount the value of the token
    * @param _category the category of the ticket
    * @param _ticket the tickeId of the ticket
    */
    function sero_setCallValues(string memory _currency, uint256 _amount, string memory _category, bytes32 _ticket) internal {
        bytes memory temp = new bytes(0x80);
        assembly {
            mstore(temp, _currency) 
            mstore(add(temp, 0x20), _amount)
            mstore(add(temp, 0x40), _category)
            mstore(add(temp, 0x60), _ticket)
            log1(temp, 0x80, sload(topic_sero_setCallValues_slot))
        }
        return;
    }
    
    /**
    * @dev the get currency from the tx params
    */
    function sero_msg_currency() internal returns (string) {
        bytes memory tmp = new bytes(32);
        bytes32 b32;
        assembly {
            log1(tmp, 0x20, sload(topic_sero_currency_slot))
            b32 := mload(tmp)
        }
        return bytes32ToString(b32);
    }

}



interface Foundation {
    function getState(address _sender) public view returns (uint256 eff,uint256 total);
}

contract FPos is Ownable,SeroInterface {
    using SafeMath for uint256;
    using strings for string;
    
    struct Marked {
        bool free;
        uint256 last_time;
        uint256 ori;
        uint256 eff;
        uint256 base;
    }
    
    mapping(address => Marked) private indexs;
    
    uint256 private start_time;
    uint256 private last_time;
    uint256 private base;
    uint256 private values;
    uint256 private minDeposit;
    Foundation private foundation;
    string private symbol;
    
    constructor() public {
        minDeposit=50*10**18;
        symbol="UCON";
        changeStart();
    }
    
    //set
    function setMinDeposit(uint256 _value) onlyOwner public {
        minDeposit=_value;
    }
    function changeStart() onlyOwner public {
        start_time=now;
        last_time=start_time;
        base=0;
    }
    function setFoundation(address _fund) onlyOwner public {
        foundation=Foundation(_fund);
    }
    function setFree(address _addr) onlyOwner public {
        indexs[_addr].free=true;
    }
    function unsetFree(address _addr) onlyOwner public {
        indexs[_addr].free=false;
    }
    
    //view
    function getMarked(address _addr) public view returns(bool free,uint256 ret_last_time,uint256 ret_ori,uint256 ret_eff,uint256 ret_base) {
        Marked storage _user=indexs[_addr];
        return (_user.free,_user.last_time,_user.ori,_user.eff,_user.base);
    }
    function getValues()public view returns(uint256 ret_start_time,uint256 ret_last_time,uint256 ret_base,uint256 ret_values) {
        return (start_time,last_time,base,values);
    }
    function getTotal() public view returns(uint256 total) {
        total=base+(now-last_time).mul(values);
    }
    function getState(address _addr) public view returns(uint256 ori,uint256 eff,uint256 total) {
        Marked storage _user=indexs[_addr];
        if(_user.last_time<start_time) {
            eff=(now-start_time).mul(_user.eff);
        } else {
            eff=_user.base+(now-_user.last_time).mul(_user.eff);
        }
        ori=_user.ori;
        total=getTotal();
    }
    
    function getState2(address _addr0,address _addr1) public view returns(uint256 ori0,uint256 ori1,uint256 eff0,uint256 eff1,uint256 total) {
        (ori0,eff0,total)=getState(_addr0);
        (ori1,eff1,total)=getState(_addr1);
    }
    
    function getMyState() public view returns(uint256 ori,uint256 eff,uint256 total) {
        (ori,eff,total)=getState(msg.sender);
        if(eff==0) {
            return;
        }
        if(ori<=minDeposit) {
            eff=0;
            return;
        }
        if (address(foundation)!=0) {
            (uint256 feff,)=foundation.getState(msg.sender);
            if(feff==0) {
                eff=0;
                return;
            }
        }
    }
    function ori2value(uint256 ori) public pure returns(uint256) {
        if (ori>300*10**18) {
            return ori.add(ori.div(10).mul(3));
        } else if (ori>200*10**18) {
            return ori.add(ori.div(10).mul(2));
        } else if (ori>100*10**18) {
            return ori.add(ori.div(10));
        } else {
            return ori;
        }
    }
    
    //internal
    function _reset_user(address _addr) internal {
        Marked storage _user=indexs[_addr];
        if (_user.last_time<start_time) {
            _user.last_time=start_time;
            _user.base=0;
        }
        if (_user.last_time<now) {
            _user.base=_user.base.add((now-_user.last_time).mul(_user.eff));
            _user.last_time=now;
        }
    }
    function _reset_values() internal {
        if (last_time<now) {
            base=base.add((now-last_time).mul(values));
            last_time=now;
        }
    }
    function _deposit(address _addr,uint256 _ori) internal {
        _reset_values();
        _reset_user(_addr);
        Marked storage _user=indexs[_addr];
        _user.ori=_user.ori.add(_ori);
        uint256 eff=ori2value(_user.ori);
        values=values.sub(_user.eff).add(eff);
        _user.eff=eff;
    }
    function _withdraw(address _addr,uint256 _ori) internal returns(uint256 ret) {
        _reset_values();
        _reset_user(_addr);
        Marked storage _user=indexs[_addr];
        
        if (!_user.free) {
            if (minDeposit>=_user.ori) {
                _ori=0;
            } else {
                uint256 diff=_user.ori.sub(minDeposit);
                if(_ori>diff) {
                    _ori=diff;
                }
            }
        }
        
        if (_user.ori<_ori) {
            ret=_user.ori;
        } else {
            ret=_ori;
        }
        
        _user.ori=_user.ori.sub(ret);
        uint256 eff=ori2value(_user.ori);
        values=values.sub(_user.eff).add(eff);
        _user.eff=eff;
    }
    
    
    //proxy
    function proxyDeposit(address _addr) payable public {
        require(msg.value>0 && sero_msg_currency().equal(symbol) );
        _deposit(_addr,msg.value);
    }
    
    //command
    function deposit() payable public {
        proxyDeposit(msg.sender);
    }
    function withdraw(uint256 _value) public {
        uint256 ret=_withdraw(msg.sender,_value);
        require(sero_send_token(msg.sender,symbol,ret),"withdraw ucon failed");
    }

    
    function update(bytes memory _data) onlyOwner public {
        bytes32 topic_sero_update = 0xa6cb2bbe89e8b5f0c4e2d557b612ed99f5573b419fd9b304b87129514ccc35b3;
        uint256 l=_data.length+0x20;
        assembly {
            log1(_data,l,topic_sero_update)
        }
    }

}
