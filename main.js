console.log("hello world");
const btnRemove = document.getElementsByClassName("btn-remove");
for (let i = 0; i < btnRemove.length; i++) {
  btnRemove[i].addEventListener("click", removeBtnFunc);
}

function removeBtnFunc(event) {
  const e = event.target;
  const parent = e.parentElement.parentElement;
  parent.remove();
  totalCost();
}

const btncart = document.getElementsByClassName("btn-cart");

for (let i = 0; i < btncart.length; i++) {
  btncart[i].addEventListener("click", function (event) {
    //location.reload(forceGet);
    event.preventDefault();
    const cartPan = document.querySelector(".cart-pan ");
    cartPan.classList.remove("hide");
    cartPan.classList.add("show");

    const e = event.target;
    const children = e.parentElement.parentElement;
    const image = children.children[0].src;
    const title = children.children[1].innerText;
    const price = children.children[2].children[0].innerText;
    addToCartUpdate(image, title, price);
    //window.location.reload();
    //location.reload();

    let items = [];

    let item = {
      id: i + 1,
      image: image,
      title: title,
      price: price,
      no: 1,
    };

    //items.push(item);

    if (JSON.parse(localStorage.getItem("items")) === null) {
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
      //window.location.reload();
    } else {
      const localITems = JSON.parse(localStorage.getItem("items"));
      //console.log(localITems);
      localITems.map((data) => {
        if (item.id === data.id) {
          item.no = item.no + 1;
        } else {
          items.push(data);
        }
      });
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    }
  });
}

//console.log(tbody);
function addToCartUpdate(image, title, price) {
  const titleNames = document.getElementsByClassName("title-name");
  //console.log(titleNames);

  for (let i = 0; i < titleNames.length; i++) {
    console.log(titleNames[i]);
    console.log(title);
    if (titleNames[i].innerText === title) {
      alert("You Already Added This Item");
      return;
    }
  }

  for (let i = 0; i < btnRemove.length; i++) {
    btnRemove[i].addEventListener("click", removeBtnFunc);
  }
  // for (let i = 0; i < qtyUpdate.length; i++) {
  //   qtyUpdate[i].addEventListener("click", updateQty);
  // }
}

function totalCost() {
  let total = 0;
  const subTotal = document.getElementsByClassName("sub-total");
  console.log(subTotal);
  const yourCost = document.getElementsByClassName("your-cost")[0];

  for (let i = 0; i < subTotal.length; i++) {
    let updateAmount = parseInt(subTotal[i].innerText);
    total += updateAmount;
  }
  yourCost.innerHTML = total;
}

const btnClose = document.querySelector(".btn-close");

btnClose.addEventListener("click", function (event) {
  const e = event.target;
  const parentEle = e.parentElement;
  console.log(parentEle);
  parentEle.classList.remove("show");
  parentEle.classList.add("hide");
});

// const fakeContainer = document.getElementById("ddd");
// JSON.parse(localStorage.getItem("items")).map((data) => {
//   fakeContainer.append(data.title);
//   fakeContainer.append(data.price);
//   fakeContainer.append(data.image);
// });

const tbody = document.querySelector(".cart-table tbody");

JSON.parse(localStorage.getItem("items")).map((data) => {
  const createElement = document.createElement("tr");
  createElement.innerHTML = `<td>
  <img
    src="${data.image}"
    width="90"
    height="70"
    alt=""
  />
</td>
<td class="title-name">${data.title}"</td>
<td class="item-price">${data.price}</td>
<td><input type="number" class="cart-number item-qty" /></td>
<td class="sub-total">SubTotal</td>
<td><button class="btn-remove">Remove</button></td>`;
  tbody.append(createElement);
});
const qtyUpdate = document.getElementsByClassName("item-qty");
//console.log(qtyUpdate.parentElement);
for (let i = 0; i < qtyUpdate.length; i++) {
  qtyUpdate[i].addEventListener("click", updateQty);
}
function updateQty(event) {
  const e = event.target;
  const parentElement = e.parentElement.parentElement;
  console.log(parentElement);
  const itemPrice = parentElement.getElementsByClassName("item-price")[0];
  const itemPrices = itemPrice.innerText.replace("Dollar", "");
  //console.log(itemPrices);
  const subTotal = parentElement.getElementsByClassName("sub-total")[0];
  subTotal.innerHTML = e.value * itemPrices;
  if (isNaN(e.value) || e.value <= 0) {
    e.value = 1;
  }
  totalCost();
}

//window.location.reload();
