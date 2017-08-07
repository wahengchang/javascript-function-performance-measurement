var colors = require('colors');

const fun = (max = 1000) => {
    let count = 0
    for( let i =0; i<max; i++){count +=1}
    return count
}

const funPromise = (max = 1000) => {
    let count = 0
    for( let i =0; i<max; i++){count +=1}
    return Promise.resolve(count)
}

const funCallback = (max = 1000, cb) => {
    let count = 0
    for( let i =0; i<max; i++){count +=1}
    cb(count)
}

const class1 = {
    fun, funPromise, funCallback
}


/* _*_*_*_*_*_ Print _*_*_*_*_*/

console.log(colors.green('\n*_*_*_*_*_*_*_*_* Preformance Injection *_*_*_*_*_*_*_*_*'))
const allNameSpace = Object.getOwnPropertyNames(class1)
console.log(colors.green('Property:', allNameSpace))

allNameSpace.forEach( (nameSpace)=>{
    console.log(colors.green('      ', `typeof class1[${nameSpace}]: `, typeof class1[nameSpace]))
} )


/* _*_*_*_*_*_ Preformance Injection _*_*_*_*_*/
allNameSpace.forEach( (nameSpace)=>{
    var temp = class1[nameSpace]
    class1[nameSpace] = function(){

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

        console.log(colors.cyan(`           *_*_*_ function ${nameSpace} _*_*_*`))
        console.log(colors.cyan('           RAM         : ', (m1['rss'] - m0['rss']) / 1048576, 'mb'))
        console.log(colors.cyan('           HeapTotal   : ', (m1['heapTotal'] - m0['heapTotal']) / 1048576, 'mb'))
        console.log(colors.cyan('           HeapUsed    : ', (m1['heapUsed'] - m0['heapUsed']) / 1048576, 'mb'))
        console.log(colors.cyan('           External    : ', (m1['external'] - m0['external']) / 1048576, 'mb'))
        console.log(colors.cyan('           CPU         : ', (diffCPU.user + diffCPU.system) /1000000, 's'))
        console.log(colors.cyan('           Spend time  : ', (new_time - old_time), 'ms'))
        return returnResult
    }
})

/* _*_*_*_*_*_ Operation _*_*_*_*_*/

class1.funCallback(5000, (res1) => {
    console.log( '      class1.funCallback(5000, cb):    ', res1)
    console.log('       class1.fun(10): ', class1.fun(5000))  

    class1.funPromise(5000).then(
        (res2) => { console.log('      class1.funPromise(5000):    ', res2)  }
    )
})
