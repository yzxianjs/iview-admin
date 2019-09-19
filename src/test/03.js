let arr = ['typename', 'reid', 'topid', 'sortrank'];
console.log(arr.join(','));
arr.map(item => `'${item}'`).join(',');

console.log(`,?`.repeat(arr.length).substring(1));