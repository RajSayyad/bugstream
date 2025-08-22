import "../stylesheets/application.scss";
import "plyr-react/plyr.css";
import ReactRailsUJS from "react_ujs";
import App from "../src/App";

import { setAuthHeaders } from "../src/apis/axios";

setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = (name) => {
  return componentsContext[name];
};