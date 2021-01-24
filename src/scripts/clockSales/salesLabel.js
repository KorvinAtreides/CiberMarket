import initializeClock from "./clocker";

export default function salesLabel(obj, id) {
  document.getElementById(
    `divSale${id}`
  ).innerHTML += `<h3>Sales!</h3><div></div>`;
  initializeClock(document.getElementById(`divSale${id}`), obj.sales);
}
