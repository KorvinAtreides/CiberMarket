import initializeClock from "./clocker";

export default function salesLabel(obj, id) {
  let divSale = document.getElementById(`divSale${id}`);
  divSale.innerHTML += `<h3>Sales!</h3><div></div>`;
  initializeClock(divSale, obj.sales);
}
