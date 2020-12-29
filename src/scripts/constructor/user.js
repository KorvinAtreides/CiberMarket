export default function User(name, pass) {
  this.name = name;
  this.pass = pass;
  this.getType = function () {
    return this.name;
  };
  this.getDate = function () {
    return this.pass;
  };
}
