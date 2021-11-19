/**
 * 
 * TypeScript的类型系统非常强大，它允赋予我们是用其他类型来表达类型
 * 通过组合多种类型操作符，我们可以有效又易维护的方式来表示复杂操作和值。
 * 
 * 范性
 * any是一种特定的范型，使用它会导致丢失类型信息
 * 我们可以是使用另外一种灵活但又捕捉类型新的方式，就是类型变量
 * 
 */

// 基本类型
function numberTypeFunc(arg: number): number {
    return arg;
}

function stringTypeFunc(arg: string): string {
    return arg;
}
// anyscript
function anyTypeFunc(arg: any): any {
    return arg;
}

// 类型变量可以捕获传入参数类型并在后续使用这些类型信息
function typeVarFunc<Type>(arg: Type): Type {
    return arg;
}


// 使用类型变量的函数时需要传入类型，但你简单类型可以省略
// const a = typeVarFunc('123') 这样也可以
const a = typeVarFunc<string>('123');

// 数组
function typeVarArrayFunc<Type>(arg: Type[]): Type[] {
    return arg;
}

// 范型参数另外的表达方式
let myIdentity1: <Input>(arg: Input) => Input = typeVarFunc;
// 对象字面量形式
let myObjIdentity2: { <Type>(arg: Type): Type } = typeVarFunc;


// 也可以将复杂类型抽取为interface或者class
interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

let myIdentity: GenericIdentityFn<number> = typeVarFunc;


// 范型class， 参数列表
class GenericNumber<NumberType> {
    zeroValue: NumberType;
    add: (x: NumberType, y: NumberType) => NumberType;
}



/** 
 * keyof类型运算符
 * 抽取类型的所有属性返回union类型，或的形式
 */
type SomeType = { x: number; y: string };
// type T = string | number
type T = keyof SomeType;


/**
 * typeof运算符
 * 与js中的typeof运算符不同，对于基本类型也没有太大用处
 * 但它可以让我们方便的表达许多模式，比如用于 ReturnType 提取返回类型
 * ReturnType参数是functio的类型抽取出参数的返回类型。但是它无法接受functionin名称，需要通过typeof 函数名传入
 * type P = {
 *    x: number;
 *    y: number;
 * }
 */

function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;


/**
* 索引访问类型
* type I1 = string | number
* type I2 = string | number | boolean
* 
* number可以用于获取数组中的数据项，我们可以于typeof相结合
*/
type Person = { age: number; name: string; alive: boolean };
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
// type Person = {
//     name: string;
//     age: number;
// }
type Person = typeof MyArray[number];


/** 
 * 条件类型
 * 三元表达式
 */
//  SomeType extends OtherType ? TrueType : FalseType;