// Partial Call Fuction - JavaScript !
const pApply = (fn, ...cache) => (...args) => {
  const all = cache.concat(args);
  return all.length >= fn.length ? fn(...all) : pApply(fn, ...all);
};

//Curry function
const curryF = (fn) => (...args) => {
  if (fn.length > args.length) { 
    const callBinded = fn.bind(null, ...args); 
    return curryF(callBinded)
  } else {
    return fn(...args)    
  }
}

//Curry with prototype as Method 

Function.prototype.curry = function() {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function() {
      return fn.apply(this, args.concat(
        Array.prototype.slice.call(arguments)));
    };
  };

//Compose function

const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );

//Compose my choose || easier to understand what's going on !)

function compose() {
    var fns = Array.prototype.slice.call(arguments)
        ;

    return function() {
        var args = Array.prototype.slice.call(arguments)
            , fn = fns[fns.length-1]
            , i = fns.length - 1 // -1 because the last function is special
            , result = null
            ;

        result = fn.apply(fn, args);
        while (i--) {
            fn = fns[i];
            result = fn.apply(fn, [result]);
        }
        
        return result;
    }
}

// which lets us do
var isNumberAfterNextOdd = compose(isOdd, nextNumber, nextNumber);

isNumberAfterNextOdd(7);  // outputs: true
isNumberAfterNextOdd(8);  // outputs: false
