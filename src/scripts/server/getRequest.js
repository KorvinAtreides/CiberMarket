export default function getRequest(info) {
  let request = new XMLHttpRequest();
  request.open("GET", `http://localhost:3000/${info}`, false);
  request.send();
  let status = request.status;
  let responseObj = request.response;
  return {
    status: status,
    object: responseObj,
  };
}
