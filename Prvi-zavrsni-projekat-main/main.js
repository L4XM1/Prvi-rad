
/*------Email Sub alert-----*/

function validateAndSbscribe() {
  document.getElementById("subscribe-btn").addEventListener("click", function () {
    let email = document.getElementById("inputEmail").value;
    let reg = /\S+@\S+\.\S+/;

    if (email.match(reg)) {
      alert("Thank you for Subscribing! Our fresh new blog posts will be waiting for you at: " + email)
    }
    else {
      alert("Please enter valid e-mail format: name@email.com")
    }

  }
  )
}
validateAndSbscribe();

/*------------blog inner------*/

const blog = [{
  "hashId": "#blogPost1",
  "title": "Explore Serbia: Top Destinations To Visit",
  "author": "@Hulk",
  "category": "Destinations",
  "date": new Date("2011-11-11").toDateString().substr(3),
  "description": "New or already known destinations in Serbia and the Balkans in a different way. If you are curious enough to explore new destinations for your active holiday, you are in the right place. Staying in nature and recreation will help you ease the difficulties that a modern lifestyle brings. Satisfy the need for movement, that will bring you satisfaction and joy.",
  "image": "src=\"images/explore_serbia.jpg\" alt=\"explore Serbia\"",
  "comments": [],
}
  ,
{
  hashId: "#blogPost2",
  title: "Travel Trends To Watch For In 2020",
  author: "@CatWoman",
  category: "Destinations",
  date: new Date("2020-02-02").toDateString().substr(3),
  description: "I'm baby marfa seitan pug adaptogen before they sold out. Meh glossier food truck, art party knausgaard sriracha YOLO tofu swag deep v migas. Sartorial hell of kinfolk single-origin coffee stumptown everyday carry prism etsy trust fund hexagon tousled iPhone. Umami raclette activated charcoal distillery etsy vaporware.",
  image: "src=\"images/travel_trends.jpg\" alt=\"fashonable girl standing in an ally\"",
  comments: ["cool", "nice"],
},
{
  hashId: "#blogPost3",
  title: "How To Have Completely Stress Free Vacation",
  author: "@TonyStark",
  category: "Travel tips",
  date: new Date("2012-12-21").toDateString().substr(3),
  description: "Cupcake ipsum dolor sit amet chocolate bar. Gummi bears icing powder chocolate cake pastry cupcake croissant oat cake chocolate. Halvah bonbon dessert lollipop jujubes. Sugar plum soufflé candy topping ice cream caramels macaroon cake icing. Cake lollipop cupcake tootsie roll sweet roll chocolate bar.",
  image: "src=\"images/sress_free_vacation.png\" alt=\"calm sandy beach\"",
  comments: ["This is cool.", "Thanks, this article is the bomb!", "Awesome!"],

},
{
  hashId: "#blogPost4",
  title: "6 Reasons To Choose A Hotel Over Airbnb",
  author: "@Hulk",
  category: "Travel tips",
  date: new Date("1988-09-02").toDateString().substr(3),
  description: "Black jack hearties yard dance the hempen jig six pounders carouser Plate Fleet log salmagundi Yellow Jack. Marooned dead men tell no tales spanker careen mizzenmast haul wind dance the hempen jig fathom clap of thunder port. Trysail red ensign Letter of Marque furl skysail hogshead capstan ballast holystone scurvy.",
  image: "src=\"images/airbnb_vs_hotel.png\" alt=\"hotel room\"",
  comments: [],
}
]




let blogContent = "";
for (let value in blog) {
  let post =
    `<div> <article class="container card blog-card rounded-0 mb-2 pl-3"> <div class="row mt-1"> <div class="col-md-6"> <img class="card-img-top mb-2" ${blog[value].image} height= "300"> </div> <div class="col-md-6"> <h5 class="blog-title"> <em> ${blog[value].title} </em> </h5> <p class="mt-2 mb-3 blog-date"><em> ${blog[value].date} </em></p> <p class= "card-text"> ${blog[value].description} </p><button class="custom-btn2 btn" id = "blog-btn" ><a href= ${blog[value].hashId} >Read more</a></button> </div></div><hr class="blog-hr mt-2" /><div class="row"> <div class="d-flex justify-content-between col-sm-12 col-lg-6"><p><img width="25" src="images/person-outline.svg" alt="author" /><span class="text-muted pr-4"> <em> ${blog[value].author} </em></span></p> <p><img width="25" src="images/folder-open-outline.svg" alt="category" /> <span class="text-muted pr-4"> <em> ${blog[value].category} </em></span></p><p><img width= "25" src= "images/chatbubble-ellipses-outline.svg" alt= "comments"/><span class="text-muted pr-4"> <em> ${blog[value].comments.length} </em></span></p></div></div> </article> </div>`;

  blogContent += post;

}

document.querySelector(".blog-main").innerHTML = blogContent;



/*-------------categories----------------------------*/
function categories() {
  let destinations = 0;
  let tips = 0;
  let vacation = 0;
  for (item in blog) {
    switch (blog[item].category) {
      case "Destinations":
        destinations++;
        break;
      case "Travel tips":
        tips++;
        break;
      case "Summer vacation":
        vacation++;
        break;
    }
  }
  document.getElementById("destinations").textContent += "(" + destinations + ")";
  document.getElementById("tips").textContent += "(" + tips + ")";
  document.getElementById("vacation").textContent += "(" + vacation + ")";
}
categories();


/*------------------load blogPost1-------------*/


function loadBlogPage() {
  let btn = document.getElementById("blog-btn");
  btn.addEventListener("click", function () {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("blog-post").innerHTML = this.responseText;
      }
    }
    request.open("get", "blogPost1.html");
    request.send();

    /*-------------------- show comments ------------------*/
    $(document).ready(function () {
      var request = $.ajax({
        type: "GET",
        url: "http://localhost:3000/blogPostComments",
      });
      request.done(function (data) {
        $.each(data, function (key, value) {
          $("#commentsNew").append(`<div class="d-flex comments">
            <img
              class="d-flex align-self-start"
              src= "${value.avatar}"
              alt="avatar"
              width="70"
            />
        
            <p class="comment">
              ${value.comment}
            </p>
          </div>`);
        });
      });
      request.fail(function (err) {
        $("#commentsNew").append("Sorry but comments can't be loaded, request status is " + " " + err.status + " : " + err.statusText);
      });
    });
    /*-------------------- da radi i back dugme ------------------*/

    window.addEventListener("hashchange", function () {
      if (window.location.hash != "#blogPost1")
        window.location.reload();
    })
  });
}

loadBlogPage();

/*--------------- add new comment ----------------------*/ //FIXXXX!!
function addComment() {
  var request = $.ajax({
    type: "POST",
    url: "http://localhost:3000/blogPostComments",

  });

  request.done(function (data) {

    let newComment = {
      avatar: "images/person-circle-outline.svg",
      comment: document.getElementById("input-comment").value,
    };

    blogPostComments.push(JSON.stringify(newComment));
  });
  request.fail(function (err) {
    $("#commentsNew").append("Oops... there was an" + " " + err.statusText + " " + "so we can't post your comment");
  });
}


/*-----------------gallery modal -----------------*/
var loadFile = function (event) {
  var image = document.getElementById("img-preview"); //getuje src u modalu, posle postavlja src na vrednost src
  image.src = URL.createObjectURL(event.target.files[0]); //dodeli putanju sa naseg uredjaja src-u (The new object URL represents the specified File object or Blob object
  $("#myModal").modal("show");
};

function uploadToGallery() {
  let image = document.getElementById("img-preview");
  var gallery = document.querySelector(".gallery");
  gallery.innerHTML +=
    '<div class="col-lg-3 col-md-4 col-sm-6 m-0 p-1"><img src="' +
    image.src +
    '"width="100%" height="100%" class="thumbnail"/></div>';
  $("#myModal").modal("hide");
}

/*--------------- open reservations -----------------*/ //prebacila sam

// $(document).ready(function () {
//   $("#view-res").click(function () {
//     let req = $.ajax({
//       type: "GET",
//       url: "booking1.html",
//     });
//     req.done(function (data) {
//       $("#swap-tables").html(data);
//     });
//     req.fail(function (err) {
//       $("#swap-tables").text(err.statusText);
//     });
//   });
// });
// $(document).ready(function () {
//   $("#view-res").click(function () {
//     $.get("booking1.html", function (data) {
//       $("#swap-tables").html(data);
//     });
//   });
// });

// function viewReservations() {
//   let tableContent = "";
//   for (const val in destinations) {
//     let data = `<table id="myTable" class="display">
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Surname</th>
//       <th>Destination</th>
//       <th>Price</th>
//       <th>Note</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>${reservations[val].name}</td>
//       <td>${reservations[val].surname}</td>
//       <td>${reservations[val].reservedDestination}</td>
//       <td>${reservations[val].price} €</td>
//       <td>${reservations[val].note}</td>
//       <td>
//         <button
//           type="button"
//           class="btn btn-outline btn-booking"
//           data-toggle="modal"
//           data-target="#detailsModal"
//         >
//           Change <br />
//           Reservation
//         </button>
//       </td>
//       <td>
//         <button
//           type="button"
//           class="btn btn-outline btn-booking"
//           data-toggle="modal"
//           data-target="#resModal"
//         >
//           Delete <br />
//           Reservation
//         </button>
//       </td>
//     </tr>
//   </tbody>
//   </table>
//   <hr class="orange-hr" />
//   <h4 class="float-right mt-2">TOTAL:${sum()} €</h4>`

//     tableContent += data;

//   }
//   document.querySelector("#tbl").innerHTML = tableContent;

// }
// $(document).ready(function() {
//     $("#reserv-form").validate({
//          rules: {
//                      name: {
//                          required: true,
//                         minlength: 5
//                     },
//                      surname: required,
//                      email:  required,


//          },
//         messages: {
//                     name: {
//                          required: "Name is required",
//                          minlength: "Name must be atleast 5 characters long"
//              },
//                      surname: "Surname is required",
//                  email: "Enter s valid email adress",

//          }
//      })
//  })

// var get = $.ajax({
//     type: "GET",
//     url: "http://localhost:3000/destinations"
// });

// get.done(function(destinations){
//     $each(destinations, function(i, destination){
//         $("tbody").append("<tr> <td>" + destination.destinationName +  "</td> <td>" + destination.startingDate + "</td> <td>" + destination.duration + "</td> <td>" + destination.price + "</td> <td> <button type=\"button\" class=\"btn btn-outline btn-booking\" data-toggle=\"modal\" data-target=\"#detailsModal\" >View Details</button> </td> <td> <button type=\"button\" class=\"btn btn-outline btn-booking\" data-toggle=\"modal\" data-target=\"#resModal\" >Make Reservation</button></td> </tr>");
//     });

// $("#destinations-tbl").dataTable();    
// })

// get.fail(function(destinations) {
//     alert(destinations.statusText);
// })

/*-------------------BOOKING View Reservations------------------------*/


// $(document).ready(function () {
//   $("#view-res").click(
//     $.get("booking1.html", function (data) {
//       $("#show-tbl").html(data)
//     })
//   )
// })



// function postaviKomentar() {

//     var zahtev = $.get("http://localhost:3000/blogPostComments");
//     zahtev.done(function(){
//         JSON.parse(blogPostComments);
//     let commentContent = "";
//     for (const item in blogPostComments) {
//     let comm =
//     `<div class="d-flex comments">
//     <img
//       class="d-flex align-self-start"
//       src= "${blogPostComments[item].avatar}"
//       alt="avatar"
//       width="70"
//     />

//     <p class="comment">
//       ${blogPostComments[item].comment}
//     </p>
//   </div>` 


//     commentContent += comm;

//     }
//     document.querySelector("#commentsNew").innerHTML = commentContent;
// }
