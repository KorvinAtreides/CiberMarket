import carousels from "./scripts/mainPage/carousels";
import picturesCarousel from "./scripts/mainPage/picturesCarousel";
import checkbox from "./scripts/pageCatalog/checkbox";
import catalog from "./scripts/pageCatalog/catalog";
import searching from "./scripts/pageCatalog/searching";
import resetBtn from "./scripts/pageCatalog/resetBtn";
import confirmBtn from "./scripts/pageCatalog/confirmBtn";
import clickArrowOnCatalog from "./scripts/pageCatalog/clickArrowOnCatalog";
import loadYandexMap from "./scripts/pageCompany/map";
import branch from "./scripts/pageBranch/branch";
import cabinet from "./scripts/pageCabinet/cabinet";
import sendComment from "./scripts/pageProduct/sendComment";
import pageProduct from "./scripts/pageProduct/pageProduct";
import signIn from "./scripts/autorization/signIn";
import signUp from "./scripts/autorization/signUp";
import loadUser from "./scripts/loadPages/loadUser";
import searchItem from "./scripts/loadPages/search";
import branchLabel from "./scripts/loadPages/branchLabel";
import inputsValidity from "./scripts/loadPages/inputsValidity";
import toPageProduct from "./scripts/loadPages/toPageProduct";

if (document.title == "CiberMarket") {
  picturesCarousel();
  carousels();
}
if (document.title == "pageCompany") {
  loadYandexMap();
}
if (document.title == "Product Catalog") {
  catalog();
  checkbox();
  confirmBtn();
  resetBtn();
  searching();
  clickArrowOnCatalog();
}
if (document.title == "Branch") {
  branch();
}
if (document.title == "Personal Cabinet") {
  cabinet();
}
if (document.title == "Page Product") {
  sendComment();
  pageProduct();
}
if (document.title == "Sign in") {
  signIn();
}
if (document.title == "Sign Up") {
  signUp();
}

loadUser();
searchItem();
branchLabel();
inputsValidity();
toPageProduct();
