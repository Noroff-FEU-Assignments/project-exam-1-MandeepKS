
import { blogpostPage } from "./blogpost.js";
import { blogcollectionHomePage} from "./home.js";
import { blogscollectionPage } from "./postblogs.js";





/* "/" is index or home page on live server */
if(location.pathname === "/" || location.pathname === "/index.html"){
  blogcollectionHomePage();
  
}

if(location.pathname === "/bloglist" || location.pathname === "/bloglist.html"){
  blogscollectionPage();
}


if(location.pathname === "/blog" || location.pathname === "/blog.html"){
  blogpostPage();
}
