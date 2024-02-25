   /* --------------------------------------------
   import apiconnection is for accessing the api
   --------------------------------------------- 
   */
   import {apiUrl} from "./apiconnection.js";
   
   export const carouselInner = document.querySelector('.carousel-inner'); 
   export const prevBtn = document.querySelector("[data-action=prev]");
   export const nextBtn = document.querySelector("[data-action=next]");
   

   /* ---------------------------------- 
   this method is fetching the data
    from  Api
    -------------------------------*/
   export async function getBlogHome() {

     const response = await fetch(apiUrl);
     const blogposts = await response.json();
     if(!response.ok){
     console.log("Error: Bad connection,Jackets data are not fetching.");   
   }
     
    /* while fetching the data from api, we are removing loading h1 element from 
       index page */
     const html_loader = document.getElementById("loading");
     html_loader.remove();
     return blogposts;
    
   }
 
   /* ---------------------------------------
   this method adds the data (product-card) on html page
   ---------------------------------------- */
 
   function renderBlog(blogData) {
      /* 
         -----Wp:featuredmedia--
      -----------------------------------------
       This is wordpress path for accessing image.
       Bcoz of : colon, javascript not recognize colon.
       So, i convert wp:featuredmedia into string. 
      */   
      
      var image = 'wp:featuredmedia';
      var blogImage = blogData._embedded[image][0].link;
      var blogImageAlt = blogData._embedded[image][0].alt_text;
      
      const blogDate = new Date(blogData.date);
      const newDate = blogDate.getDate();
      const newMonth = blogDate.getMonth()+1; //we added +1 in  getMonth bcoz, this function start indexing with zero(0).
      const newYear = blogDate.getFullYear();

      const modifiedBlogDate = newDate+'/'+ newMonth +'/'+ newYear;
      
      

      const blogArticleElements = document.querySelector(".blog-cont4");
      blogArticleElements.innerHTML += `<a href="blog.html?id=${blogData.id}"
                                          <div class="feature-products-card blog-brief">   
                                             <div class="blog-image"><img src="${blogImage}" alt="${blogImageAlt}"></div>
                                             <div class="blog-info"> 
                                                   <p>${modifiedBlogDate}</p>
                                                <h4 class="ftr-prdt-name">${blogData.title.rendered}</h4>
                                                <div class="blog-text-brief">
                                                   <p>${blogData.excerpt.rendered}</p>
                                                </div>
                                             </div>
                                             
                                          </div>
                                       </a>`
                                                                   
   }  
 
 
   /* -------------------------------------------------
     
      ***********************************
      this method is render the list of blogs,
      with the help of for loop.
      ------------------------------------------------- */
   export async function renderBlogs(blogList) {
       try {
           for(let i=0; i<6; i++){
               renderBlog(blogList[i]);
            }
       } catch (error) {
          console.log("Error : " + error);
       }
       
  }
 
   /* -------------------------------------------- 
      THis function we can say main() ,  this function will be 
      run in index.js
      --------------------------------------------  */
   export async function blogcollectionHomePage(){
      const collectionOfblogs = await getBlogHome();
      renderBlogs(collectionOfblogs);
      renderCarouselblogs(collectionOfblogs);
      renderLatestHomeBlog(collectionOfblogs);
   }

   /*          --------------------------
               Landing Home Page Function
               ---------------------------   
      Latest blog rendering function, at home page
    */ 
   export async function renderLatestHomeBlog(singleBlog) {
      try{
         for(let i=0;i<1;i++){
            singleLatestHomeBlog(singleBlog[i]);
         }
      }catch (error) {
         console.log("Error : " + error);
      }
   }

   export async function singleLatestHomeBlog(blogData) {
      var image = 'wp:featuredmedia';
      var blogImage = blogData._embedded[image][0].link;
      var blogImageAlt = blogData._embedded[image][0].alt_text;

      const blogDate = new Date(blogData.date);
      const newDate = blogDate.getDate();
      const newMonth = blogDate.getMonth()+1; //we added +1 in  getMonth bcoz, this function start indexing with zero(0).
      const newYear = blogDate.getFullYear();

      const modifiedBlogDate = newDate+'/'+ newMonth +'/'+ newYear;
      
      const blogElements = document.querySelector(".home-container-1");
      blogElements.innerHTML +=`<div class="section_image"><img src="${blogImage}" alt="${blogImageAlt}"></div>
                                    <div class="section_content">
                                       <div class="date">${modifiedBlogDate}</div>
                                       <h1 class="heading">${blogData.title.rendered}</h1>
                                    <div class="ingress">
                                       ${blogData.excerpt.rendered}
                                    </div>
                                    <a class="readmore" href="blog.html?id=${blogData.id}">Read more</a>
                                 </div>`
   }
 
   /* ------------------------------------------
                     CAROUSEL SETUP                
      ------------------------------------------*/
   let currentSlide = 0;
   let numberofBlogs = 0;
   export async function renderCarouselblogs(blogList) {
      try {
            blogList.forEach(carouselSetup);
            numberofBlogs = blogList.length;
      } catch (error) {
         alert("Error : " + error);
      }
      
   }
   export async function carouselSetup(blogData){
      
      var image = 'wp:featuredmedia';
      var blogImage = blogData._embedded[image][0].link;
      var blogImageAlt = blogData._embedded[image][0].alt_text;

      const blogElements = document.querySelector(".carousel-inner");
      blogElements.innerHTML += `<a href="blog.html?id=${blogData.id}" class="blog-item">
                                    <div class="feature-products-card blog-slider">
                                       <div class="blog-image"><img src="${blogImage}" alt="${blogImageAlt}"></div>
                                       <div class="blog-info"> 
                                       <p>Blog article</p>
                                       <h4 class="ftr-prdt-name">${blogData.title.rendered}</h4>
                                       </div></div>
                                 </a>`
      
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);
   }

   export function nextSlide(){
      //numberofBlogs is a global variable. which tells blogs length
      let nextBlogslide = currentSlide + 1;
      if(nextBlogslide >= numberofBlogs){
         nextBlogslide = 0;
      }
      currentSlide = nextBlogslide;
      update();
      
   }
   export function prevSlide(){
      let previousSlide = currentSlide - 1;
      if(previousSlide < 0){
         previousSlide = numberofBlogs - 1;
      }
      currentSlide = previousSlide;
      update();
      
   }
   export function update(){
      let value = currentSlide * 40;
      var slider = document.querySelector('.carousel-inner').style.transform = `translateX(-${value}%)`;
      console.log(slider);
   }
   
   