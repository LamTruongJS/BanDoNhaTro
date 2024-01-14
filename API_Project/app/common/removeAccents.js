function removeAccents(str) {
  let newStr = str.split(" ").join("").toLowerCase();
  return newStr
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"]+/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
module.exports = removeAccents;
