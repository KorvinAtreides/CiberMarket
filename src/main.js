import carousels from "./scripts/mainPage/carousels";
import picturesCarousel from "./scripts/mainPage/picturesCarousel";
import checkbox from "./scripts/pageCatalog/checkbox";
import searching from "./scripts/pageCatalog/searching";
import resetBtn from "./scripts/pageCatalog/resetBtn";
import confirmBtn from "./scripts/pageCatalog/confirmBtn";
import loadYandexMap from "./scripts/pageCompany/map";
import signIn from "./scripts/autorization/signIn";
import signUp from "./scripts/autorization/signUp";
import loadUser from "./scripts/loadPages/loadUser";
import searchItem from "./scripts/loadPages/search";
import branchLabel from "./scripts/loadPages/branchLabel";
import inputsValidity from "./scripts/loadPages/inputsValidity";

loadUser();
searchItem();
branchLabel();
inputsValidity();

if (document.title == "CiberMarket") {
  picturesCarousel();
  carousels();
}
if (document.title == "pageCompany") {
  loadYandexMap();
}
if (document.title == "Product Catalog") {
  checkbox();
  confirmBtn();
  resetBtn();
  searching();
}
if (document.title == "Sign in") {
  signIn();
}
if (document.title == "Sign Up") {
  signUp();
}
