/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array
  
  ### Question
  
  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.
  
  For example
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
  
  > View on GitHub: https://tsch.js.org/898
*/


/* _____________ Your Code Here _____________ */
// y元组循环中false不能作为key值，直接会被跳过，所以在循环中需要转换为字符串[key in T[number]as `${key}`]: true
// type Includes<T extends readonly any[], U> = {
//     [key in T[number]as `${key}`]: true
// }[U] extends true ? true : false
// Equal方法返回的是type不是值，所以判断布尔量需要转换为： Equal<F, U> extends true
type Includes<T extends readonly any[], U> = T["length"] extends 0 ? false : (T extends [infer F, ...infer REST] ? (Equal<F, U> extends true ? true : Includes<REST, U>) : never)

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type res = [true] extends [boolean] ? true : false

type cases = [
    Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
    Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
    Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
    Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
    Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
    Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
    Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
    Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
    Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
    Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

