let api_url = "https://free-food-menus-api-production.up.railway.app/burgers";
function getMenu(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      showMenu(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMenu(value) {
  let tab = "";
  for (let r of value) {
    tab += `
        <div id="mainDiv" style="border:1px solid black;">
        <div id="productImg">
            <img src = ${r.img} height='250px' width='250px'>
        </div>
        <div id="productDetails" style="padding-left:3%">
        Name : ${r.name} <br>
        Description : ${r.dsc} <br>
        Id : ${r.id} <br>
        Price : ${r.price} <br>
        Rate: ${r.rate}<br>
        Country : ${r.country}
        </div>
           </div>`;
  }

  document.getElementById("wastu").innerHTML = tab;
}
function takeOrder(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const obj = [];
        obj.push(data[Math.floor(Math.random() * 61)]);
        obj.push(data[Math.floor(Math.random() * 61)]);
        obj.push(data[Math.floor(Math.random() * 61)]);
        setTimeout(() => {
          resolve(obj);
        }, 2500);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
getMenu(api_url);
function showOrder(value) {
  let tab = "";
  for (let r of value) {
    // console.log(r);
    tab += `
    <div id="mainDiv" style="border:1px solid black;">
    <div id="productImg">
        <img src = ${r.img} height='280px' width='320px'>
    </div>
    <div id="productDetails" style="padding-left:3%">
    Name : ${r.name} <br>
    Description : ${r.dsc} <br>
    Id : ${r.id} <br>
    Price : ${r.price} <br>
    Rate: ${r.rate}<br>
    Country : ${r.country}
    </div>
       </div>`;
}

document.getElementById("under").innerHTML = tab;
}

function orderPrep(){
return new Promise((resolve) => {
setTimeout(() => {
resolve({ order_status: true, paid: false });
}, 1500);

});
}
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}


function thankyouFnc() {
  return new Promise((resolve) => {
    setTimeout(() => {
      alert("Thank you.");
      resolve();
    }, 1000);
  });
}
async function wipro() {
  await takeOrder(api_url)
    .then((result) => {
      showOrder(result);
    })
    .catch((error) => console.error(error));
  await orderPrep()
    .then((result) => {
      let tab = `<h1 style="text-align: center">Order Preparation Process</h1>
      <h2>Order Status : ${result.order_status} </h2>
      <h2>Paid : ${result.paid}</h2><br>`;
      document.getElementById("orderPrep").innerHTML = tab;
      console.log("orderPrep", result);
    })
    .catch((error) => console.error(error));

  await payOrder()
    .then((result) => {
      let tab = `
      <h1 style="text-align: center">Payment Process</h1>
      <h2>Order Status : ${result.order_status} </h2>
        <h2>Paid : ${result.paid}</h2><br>`;
      document.getElementById("payOrder").innerHTML = tab;
      console.log("payOrder", result);
    })
    .catch((error) => console.error(error));
  await thankyouFnc();
}

wipro();