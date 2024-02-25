/* --------------------------------------------
 import apiconnection is for accessing the api
 --------------------------------------------- */
 import {singlePostapiUrl} from "./apiconnection.js";



 /* ---------------------------------- 
   this method is fetching the data
    from  Api
    -------------------------------*/
   export async function getBlog(id) {
     
    
     const response = await fetch(singlePostapiUrl + '/'+ id);
     const singlePost = await response.json();
     if (!response.ok){
       console.log("Error: Bad connection,Blog data are not fetching.");  
     }
 
     /* while fetching the data from api, we are removing loading h1 element from 
       collection page */
     const html_loader = document.getElementById("loading");
     html_loader.remove();
     return singlePost;
     
   }
 
  /* ---------------------------------------
   this method adds the product-card to html page
   ---------------------------------------- */
 
 function renderBlog(blogData) {
   /* 
   -----Wp:featuredmedia--
   -----------------------------------------
   This is wordpress path for accessing image.
   Bcoz of : colon, javascript not recognize colon.
   So, i convert wp:featuredmedia into string. 
   */

   var image = 'blog_post_layout_featured_media_urls';
   var blogImage = blogData[image].full[0];
  //  var blogImageAlt = blogData._embedded[image][0].alt_text;
  
   const blogDate = new Date(blogData.date);
   const newDate = blogDate.getDate();
   const newMonth = blogDate.getMonth()+1; //we added +1 in  getMonth bcoz, this function start indexing with zero(0).
   const newYear = blogDate.getFullYear();
 
   const modifiedBlogDate = newDate+'/'+ newMonth +'/'+ newYear;
   const blogArticleElements = document.querySelector(".blog-container-1");
   blogArticleElements.innerHTML += ` <div class="feature-products-card single-blogpost">
                                        <img src="${blogImage}" alt="${blogData.title.rendered}">
                                        <h4 class="ftr-prdt-name single-blog-title">${blogData.title.rendered}</h4>
                                        <span class="blog-description">
                                        <p>${blogData.content.rendered}</p>
                                        </span>
                                        <p>Posted:-> ${modifiedBlogDate}</p>
                                      </div>`
 }
 

 
  /* -------------------------------------------- 
     THis function we can say main() ,  this function will be 
      run in index.js
     --------------------------------------------  */
  export async function blogpostPage(){
    //make new url objects from web address-bar    
    try{
        const url = new URL(location.href);
        const id = url.searchParams.get("id");
        const singleBlog = await getBlog(id);
        renderBlog(singleBlog);

    } catch (error){
        alert("Error : Page not found!");
    }
 }
 
 