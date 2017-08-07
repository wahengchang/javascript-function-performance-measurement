# javascript-function-performance-measurement
It is an example of modifying an object of functions collection, with performace check.


#### Suitable object
```js
const class1 = {
    fun: (max = 1000) => {
            let count = 0
            for( let i =0; i<max; i++){count +=1}
            return count
        }
}
```
### Performace injection
```js

var temp = class1['fun']
class1['fun'] = function(){

    /*_*_*_*_ Init _*_*_*/
    var old_time = new Date();
    var m0 = process.memoryUsage()
    var c0 = process.cpuUsage()

    var returnResult = temp.apply(this,arguments);

    /*_*_*_*_ Finished _*_*_*/
    var new_time = new Date();
    var m1 = process.memoryUsage()
    var c1 = process.cpuUsage()
    var diffCPU = process.cpuUsage(c0)

    console.log(`           *_*_*_ function ${fun} _*_*_*`)
    console.log('           RAM         : ', (m1['rss'] - m0['rss']) / 1048576, 'mb')
    console.log('           HeapTotal   : ', (m1['heapTotal'] - m0['heapTotal']) / 1048576, 'mb')
    console.log('           HeapUsed    : ', (m1['heapUsed'] - m0['heapUsed']) / 1048576, 'mb')
    console.log('           External    : ', (m1['external'] - m0['external']) / 1048576, 'mb')
    console.log('           CPU         : ', (diffCPU.user + diffCPU.system) /1000000, 's')
    console.log('           Spend time  : ', (new_time - old_time), 'ms')
    return returnResult
}
```

## Result
```
           *_*_*_ function funCallback _*_*_*
           RAM         :  0.28125 mb
           HeapTotal   :  0.5 mb
           HeapUsed    :  0.29491424560546875 mb
           External    :  0 mb
           CPU         :  0.00137 s
           Spend time  :  2 ms
```


## Run
```
$ npm install 
$ node example
```
