/** TASK
 * Provide 3 unique implementations of the following function in JavaScript.
 * Input: `n` - any integer
 * Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.
 * Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

var sum_to_n_a = function (n: number): number {
  let result: number = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

var sum_to_n_b = function (n: number): number {
  let result: number = 0;
  let i: number = 1;
  while (i <= n) {
    result += i;
    i++;
  }
  return result;
};

var sum_to_n_c = function (n: number): number {
  const result: number = (n * (n + 1)) / 2;
  return result;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));