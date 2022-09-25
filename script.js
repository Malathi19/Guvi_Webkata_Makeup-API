//creating main div with nav bar and buttons

var div = document.createElement('div')
div.setAttribute("id","main")
div.innerHTML = `<h1>Beauty Products </h1><div class="row-cols-md-12" id="main">
<nav id="nav" class="navbar bg-light">
<form class="container-fluid justify-content-center">
    <input class="form-control me-2" type="text" id="enter" placeholder ="search for brands,eg.maybelline"> <br><br>
<button class="btn btn-outline-success me-2" type="button" id="search" onclick="foo()">
Search</button>

<button class="btn btn-outline-success me-2" type="button" id="reset" onclick="foo1()">
Rest Before next search</button>

</nav>
</div>`
document.body.append(div)

//getting Data via async/await from Makeup API using brand name as endpoint. Try Catch method user to fetch any error.

async function foo(){
   
    try {
    
    var getProduct = document.getElementById("enter").value
    let products = await fetch (`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${getProduct}`)
    result = await products.json();
    let index = 0;

    //creating foreach loop to dynamically all the products under the brand

    result.forEach(element => {
        console.log(index);
        var img = document.createElement("img");
        var displayProduct = document.createElement('displayProduct');
        if(index===0) displayProduct.innerHTML = '';
        img.src = element.image_link;
        document.body.appendChild(img);
        displayProduct.innerHTML = `
        <div class="row">
        <div class="col-md-6" id="details">
         <p>Brand : ${element.brand}</p>
         <p>Name : ${element.name}</p>
         <p>Price : ${element.price}</p>
         <p>Product Link : ${element.product_link}</p>
         <p>Description : ${element.description}</p>
        </div>
        </div>`
        document.body.appendChild(displayProduct);
        index++;
    });
    console.log(index);
    }
    catch(error){
   alert(error);
    }
    
    }
   
  // to empty the data of previous search, window is realoaded with this function
    function foo1(){
        window.location.reload();
    }