/* Recommended solution
function nextBigger(n){
  console.log(n);
  var chars = n.toString().split('');
  var i = chars.length-1;
  while(i > 0) {
    if (chars[i]>chars[i-1]) break;
    i--;
  }
  if (i == 0) return -1;
  var suf = chars.splice(i).sort();
  var t = chars[chars.length-1];
  for (i = 0; i < suf.length; ++i) {
    if (suf[i] > t) break;
  }
  chars[chars.length-1] = suf[i]
  suf[i] = t;
  var res = chars.concat(suf);
  var num = parseInt(res.join(''));
  console.log("->" +num);
  return num;
}
*/

function nextBigger(n) {
  const arr = Array.from(n.toString());
  let min_value = 9;
  let min_index;
  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] >= arr[i + 1]) continue;

    for (let j = arr.length - 1; j > i; j--) {
      if (min_value < arr[j] || arr[j] <= arr[i]) continue;
      min_value = arr[j];
      min_index = j;
    }

    const temp = arr[i];
    arr[i] = arr[min_index];
    arr[min_index] = temp;

    const arr_part2_sorted = arr.slice(i + 1, arr.length).sort();
    const arr_part1 = arr.slice(0, i + 1);
    return +arr_part1.concat(arr_part2_sorted).join("");
  }
  return -1;
}
console.log(397827696480);
console.log(nextBigger(397827696480));
