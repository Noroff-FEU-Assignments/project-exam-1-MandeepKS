const url = "https://tech.shopnorwaymks.no";
const endpoint = "/wp-json/wp/v2/pages?_embed";
const endpointForPaging = "/wp-json/wp/v2/pages?per_page=100";
const apiUrl = url + endpoint;
const apiUrlPaging = url +endpointForPaging;

const singlePostapiUrl = "https://tech.shopnorwaymks.no/wp-json/wp/v2/pages";
export {url, endpoint,apiUrl,singlePostapiUrl,apiUrlPaging}
