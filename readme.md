# Project Title
This is simple template to run your project

## Getting Started
1) install all modules
npm i

## Install the package

https://www.npmjs.com/package/jsmp-infrastucture-cdp-task

```
npm i jsmp-infrastucture-cdp-task
```

## import appropriate method

```
import {lessThenAverage} from 'jsmp-infrastucture-cdp-task';
```
or
```
import {countElems} from 'jsmp-infrastucture-cdp-task';
```

## CODE to test package
```
 import {countElems, lessThenAverage} from 'jsmp-infrastucture-cdp-task';

 const arrayOfNumbers = [1, 3, 5, 6, 7, 12];

 lessThenAverage(arrayOfNumbers);
 // expected result [1, 3]
 
 const string = 'aaaAcAcbA';
 
 countElems(string);
 // expected result {a: 3, A: 3, c: 2, b: 1}
  
 ```

## Authors
Oleksandr Antonenko