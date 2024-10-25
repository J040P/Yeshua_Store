import products from "./products.js";


const cart = () => {
  let iconCart = document.querySelector('.icon-cart');
  let closeBtn = document.querySelector('.CartTab .close');
  let body = document.querySelector('body');
  let cart = []

  iconCart.addEventListener('click', () => {
    body.classList.toggle("activeTabCart");
  });
    
  closeBtn.addEventListener('click', () => {
    body.classList.toggle("activeTabCart");
  });

  const setProductInCart = (idProduct, quantity, position) =>{
    console.log("Adicionando produto ao carrinho...");
    console.log("ID do Produto:", idProduct);
    console.log("Quantidade:", quantity);
    console.log("Posição no Carrinho:", position);

    if(quantity > 0){
      if(position < 0 ){
        cart.push({
          product_id: idProduct,
          quantity: quantity
        })
      }else{
        cart[position].quantity = quantity;
      }
    }else{
      cart.splice(position, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    refreshCartHTML();
    updateTotalPrice();

    localStorage.setItem('cart', JSON.stringify(cart));
    refreshCartHTML();
    console.log("Atualizando o carrinho...");
    updateTotalPrice();
    console.log("Preço total atualizado.");

    console.log("Produto adicionado ao carrinho com sucesso.");
  }
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      let position = products.findIndex((value) => value.id == item.product_id);
      let info = products[position];
      totalPrice += info.price * item.quantity;
    });
    return totalPrice;
  }

  const updateTotalPrice = () => {
    let totalPriceElement = document.querySelector('.totalPrice');
    let totalPrice = calculateTotalPrice();
    totalPriceElement.innerText = `R$${totalPrice}`;
  }

  const refreshCartHTML = () =>{
    console.log("Atualizando o HTML do carrinho...");
    let listHTML = document.querySelector('.listCart');
    let totalHTML = document.querySelector('.icon-cart span');
    let totalPriceElement = document.querySelector('.totalPrice'); // Selecionando o elemento do preço total
    console.log("Elementos HTML selecionados:", listHTML, totalHTML, totalPriceElement);
    let totalQuantity = 0;
    listHTML.innerText ='';
    let totalPrice = calculateTotalPrice(); // Calculando o preço total
    cart.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
      let position = products.findIndex((value) => value.id == item.product_id);
      let info = products[position];
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.innerHTML = 
      `
        <div class="image">
          <img src="${info.image}" />
        </div>
        <div class="name">${info.name}</div>
        <div class="totalrice">$${info.price * item.quantity}</div>
        <div class="quantity">
          <span class="minus" data-id="${info.id}">-</span>
          <span>${item.quantity}</span>
          <span class="plus" data-id="${info.id}">+</span>
        </div>
      `;
      listHTML.appendChild(newItem);
    });

    totalHTML.innerHTML = totalQuantity;
    totalPriceElement.innerText = `$${totalPrice}`; // Atualizando o elemento do preço total

    console.log("HTML do carrinho atualizado com sucesso.");
  }



  document.addEventListener('click', (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = cart.findIndex((value) => value.product_id == idProduct)
    let quantity = position < 0 ? 0 : cart[position].quantity;

    if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
      quantity++;
      setProductInCart(idProduct, quantity, position);
    }else if(buttonClick.classList.contains('minus')){
      quantity--;
      setProductInCart(idProduct, quantity, position);
    }
  })

  const initApp = () => {
    if (localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    refreshCartHTML();
    updateTotalPrice();
  }
  initApp();

  const menubtn = document.querySelector(".menu-btn");
  const navi = document.querySelector(".menu")

  const bts = document.querySelectorAll(".btn-slides")
  const slides = document.querySelectorAll(".video1")
  const contents = document.querySelectorAll(".content")

  menubtn.addEventListener("click",()=>{
      menubtn.classList.toggle("active");
      navi.classList.toggle("active");    
  })

  var slidernav = function(manual){
      bts.forEach((btn)=>{
          btn.classList.remove("active")
      })
      slides.forEach((slid)=>{
          slid.classList.remove("active")
      })
      contents.forEach((legenda)=>{
          legenda.classList.remove("active")
      })

      bts[manual].classList.add("active")
      slides[manual].classList.add("active")
      contents[manual].classList.add("active")
  }

  bts.forEach((btn,i)=>{
      btn.addEventListener("click",() =>{
          slidernav(i)
      })
  })

}
export default cart;

