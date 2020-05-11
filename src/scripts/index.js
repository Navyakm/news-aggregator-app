var options = {
    position: "fixed",
    right: "unset",
    left: "8px",
    bottom: "8px",
    time: "0.7s",
    mixColor: "#fff",
    backgroundColor: "#fff",
    buttonColorDark: "#100f2c",
    buttonColorLight: "#fff",

  };
  
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=4d19c8724b904ac6a0109ef21989f522";
  
  var searchBox = document.getElementById("search");
  searchBox.addEventListener("keypress", (event) => {
    var usersearch = document.getElementById("search").value;
  
    if (event.keyCode == 13) {
      console.log(usersearch);
      if (usersearch != "") {
        var searchUrl = `https://newsapi.org/v2/everything?q=${usersearch}&apiKey=4d19c8724b904ac6a0109ef21989f522`;
        beforeLoading();
        getNews(searchUrl);
      } else {
        console.log(usersearch);
        beforeLoading();
        getNews(url);
      }
    }
  });
  var loadingUntil;
  
  const beforeLoading = () => {
    document.querySelector("#news-section").style.display = "none";
    loadingUntil = setTimeout(afterLoading, 2000);
  };
  
  const afterLoading = () => {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#news-section").style.display = "block";
     };
  
  const getNews = async (url) => {
    const fetchData = await fetch(url);
    const result = await fetchData.json();
    console.log(result.articles[0].author);
  
    if (result.totalResults > 0) {
      var output = "";
      result.articles.forEach((element) => {
        output += `<li class="article">
                     <img class="article-img" src="${element.urlToImage}" alt="Image Not Availiable" style="width:60%;height:auto;padding:15px">
                     <h2 class="article-title" style="padding:15px">${element.title}</h2>
                     <p class="article-description" style="padding:15px">${element.description}</p>
                     <span class="article-author" style="padding:15px">Author:  ${element.author}</span> <br>
                     <br> <a href=${element.url} class="article-link btn btn-primary mb-1" target='_blank'><em>Read More At: ${element.source.name}</em></a></li>`;
      });
      output += "";
      document.getElementById("news-articles").innerHTML = output;
    } else if (result.articles.length == 0) {
      let noResultsFound = document.querySelector(".not-found");
      noResultsFound.innerHTML = "No article was found based on the search.";
    }
  };
  getNews(url);
  
  window.addEventListener("scroll", () => {
    const getval = window.scrollY;
    console.log(getval);
    if (getval >= 600) {
      document.getElementById("scrollToTop").style.display = "block";
    } else {
      document.getElementById("scrollToTop").style.display = "none";
    }
  });
  document.getElementById("scrollToTop").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  
  let searchBar = document.getElementById("search");
  searchBar.addEventListener("click", () => {
    searchBar.style.border = "3px solid rgba(51,102,255,0.7)";
  });
  searchBar.addEventListener("mouseout", () => {
    searchBar.style.border = "none";
    searchBar.style.borderBottom = "2px solid black";
    searchBar.style.isolation = "isolate";
  });
  
  