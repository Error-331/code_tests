let john = { name: "John" };
let array = [ john ]; john = null;
// перезаписываем ссылку на объект
// объект john хранится в массиве, поэтому он не будет удалён сборщиком мусора
// мы можем взять его значение как array[0]

console.log(john);
console.log(array[0])
