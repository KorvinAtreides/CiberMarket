export default function postRequest(info, object) {
  fetch(`http://localhost:3000/${info}`, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: object,
  });
}
