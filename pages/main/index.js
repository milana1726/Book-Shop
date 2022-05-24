let cartTemp = [];
let order = '';
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
  const fragment = document.createDocumentFragment();

  const body = document.querySelector('body');

  //main wrapper
  let wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.appendChild(wrapper);


  //header
  const header = document.createElement('header');

  const header_container = document.createElement('div');
  header_container.classList.add('header_container');

  const h1 = document.createElement('h1');
  h1.textContent = 'Welcome to amazing Book Shop!';

  const headerLogo = document.createElement('div');
  headerLogo.classList.add('header_logo');

  const image = document.createElement('img');
  image.src = "../../assets/images/book_image.png";
  image.alt = "header_logo";

  header.append(header_container);
  header_container.append(h1, headerLogo);
  headerLogo.append(image);

  //main
  const main = document.createElement('main');

  const main_container = document.createElement('div');
  main_container.classList.add('main_container');

  const book_catalog = document.createElement('div');
  book_catalog.classList.add('book_catalog');

  const cart = document.createElement('div');
  cart.classList.add('cart');

  main.append(main_container);
  main_container.append(book_catalog, cart);

  //modal
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal_container');

  //total cart section
  const total = document.createElement('div');
  total.classList.add('total');
  total.innerHTML = `
    <hr>
    <p class="total_prise">Total: <b><span class="total_count">${totalPrice}</span></b></p>
    <button class="button_confirm" type="button" 
      onClick="location.href='../delivery/index.html'">Confirm order</button>`;
  cart.append(total);

  wrapper.append(header, main, modalContainer);

  fetch('./book.json')
          .then(response => {
              return response.json();
          })
          .then(data => {
            let books = data.map((item, index) => ({...item, id: index}));
            return books;
          })
          .then(data => {
            bookInfo(data);
          });

      fragment.appendChild(wrapper);
      body.appendChild(fragment);
});

function bookInfo(data) {
  let output = '';
  
    for (let item of data) {
        output += `
        <div draggable="true" class="book_card">
          <img src="${item.imageLink}" alt="image_book">
          <div class="about_book">
            <p class="title">${item.title}</p>
            <p class="author">${item.author}</p>
            <p class="price">${item.price}$</p>
            <button class="button_more" type="button">Show more</button>
            <button class="button_cart" type="button">Add to cart</button>
          </div>
        </div>`
  }
  
  document.querySelector('.book_catalog').innerHTML = output;
    
  const moreButton = document.querySelectorAll('.button_more');
  moreButton.forEach((button, index) => {
      button.onclick = () => {
          openModal(data, index);
      }
  });

  function openModal(data, index) {
    let output = '';
        output = `
        <div class="modal_card">
          <p class="author">${data[index].author}</p>
          <p class="title">${data[index].title}</p>
          <p class="description">${data[index].description}</p>
          <div class="modal_close" type="button">+<div>
        </div>`
        
    document.querySelector('.modal_container').style.display='block';
    document.querySelector('.modal_container').innerHTML = output;
    const closeButton = document.querySelector('.modal_close');
      closeButton.onclick = () => {
            document.querySelector('.modal_container').style.display='none';
        }
  }

  const cartButton = document.querySelectorAll('.button_cart');
  cartButton.forEach((button, index) => {
      button.onclick = () => {
          addToCart(data, index);
      }
    }) 
}

//add to cart
function addToCart(data, index) {
  cartTemp.push(data[index]);
  totalPrice += data[index].price;
  localStorage.setItem('totalPrice', totalPrice);
  cartInfo(cartTemp, index);
  console.log(totalPrice);
  return totalPrice;
}

function cartInfo(cartTemp, index) {
  if (cartTemp.length == 4) {
    alert('Your cart is full!');
  } else {
    let output = document.querySelector('.cart');
    output.innerHTML += `
        <div class="book_card">
          <img src="${cartTemp[index].imageLink}" alt="image_book">
          <div class="about_book">
          <p class="title">${cartTemp[index].title}</p>
            <p class="author">${cartTemp[index].author}</p>
            <button class="button_delete" type="button">
              <img id="icon_delete" src="../../assets/icons/delete_icon.svg" alt="delete_icon"/></button>
          </div>
        </div>`
    }
    document.querySelector('.total_count').innerHTML = `${totalPrice}$`;

    const removeButton = document.querySelectorAll('.button_delete');
    removeButton.forEach((button, index) => {
        button.onclick = () => {
            removeFromCart(index);
        }
    }) 
}

// function removeFromCart(index) {
//   if (totalPrice !== 0){
//     totalPrice -= cartTemp[index].price;
//       document.querySelector('.total_count').innerHTML = `${totalPrice}$`;
//   }
//   for (let i = 0; i < cartTemp[index]; i += 1) {
//     document.querySelectorAll('.button_delete')[i].addEventListener('click', (e) => {
//         e.target.parentElement.remove();
//   // cartTemp.splice(cartTemp[index], 1);

//   //console.log(cartTemp);
//     });
    
//   }

//   if (cartTemp.length === 1) {
//       const clearCart = document.createElement('div');
//       clearCart.classList.add('empty_cart');
//       clearCart.innerHTML = `
//       <div class="book_cart">Your cart is empty</div>
//       `
//       cart.append(clearCart);
//       totalPrice = 0;
//     } else {
      
//   }

//   return cartTemp, totalPrice;

// }