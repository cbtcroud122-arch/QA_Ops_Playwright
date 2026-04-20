let message1:string= "Hello World";//directly convert to Stringbut throw compiletime error but throw compiletime error
console.log("Before==> "+message1);
let num :number = 23;//directly convert to number data type but throw compiletime error
console.log("number val ==> "+num);

//message1 = 75;//Type 'number' is not assignable to type 'string' == Error

//if we don't know data type we can use 'any' keyword so TS will automatically convert it

let note :any = "This is Typescript example";
note = 74; // note is String initially but as datatype = any it converted to number on reassignment
let isActiveVal:boolean = true;

let arraytest1 : number[] = [3,56,78,9];
// To run this Typescript file first we have to compile it using tsc command
//tsc DemoTS.ts then it will create new JS file with same name then run JS file 
//node DemoTS.js

//but TS file is directly running without compile tsc -- Need to learn on this 