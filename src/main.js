import loadYandexMap from "./scripts/pageCompany/map";
import signIn from "./scripts/autorization/SignIn";
import loadUser from "./scripts/loadPages/loadUser";
import searchItem from "./scripts/loadPages/search";
import branchLabel from "./scripts/loadPages/branchLabel";
import inputsValidity from "./scripts/loadPages/inputsValidity";

loadUser();
searchItem();
branchLabel();
inputsValidity();

if (document.title == "pageCompany") {
  loadYandexMap();
}
if (document.title == "Sign in") {
  signIn();
}
