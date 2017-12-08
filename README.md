# knx-dpts-baos

Simple library to work with KNX datapoints in JS. Supports DPT1-18, as KNX BAOS 830 ETS database. Thanks to [knx-datapoints](https://github.com/Rafelder/knx-datapoints) package and Rafelder as it is based on his library but much simplified.

# Usage

```javascript
const dpts = require('./knx-dpts-baos');

// assuming data is Buffer<0x00>/Buffer<0x01>
dpts.dpt1.toJS(data);

// returns Buffer<0x01>
dpts.dpt1.fromJS(true);

// float. data=Buffer<0x0c 0xf1>, result=25.3
dpts.dpt9.toJS(data);

// returns Buffer<0x0c 0xf1>
dpts.dpt9.fromJS(25.3); 
```