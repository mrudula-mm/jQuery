$(document).ready(function () {


    $('#search').click(function () {
    
       var checker = 0;
        for (var i = 0; i < 8; i++) {
            var card = $("div").filter(".box")[i];//main div of single item
            var title = $("p").filter(".cartname")[i].innerText.toUpperCase();//name
    
            if (title.indexOf($("#inp").val().toUpperCase()) > -1) {//searchbox id
                card.style.display = 'block';
                checker++;
            }
            else {
                card.style.display = 'none';
            }
        }
        if(checker > 0){
    
            $("#not_find_any_thing").text("");//search display message
        }
        else{
            $("#not_find_any_thing").text("Product not available").fadeIn();
        }
    });

    var cart_item_count = 0;
    
    $('.cart_btn').click(function(){
        cart_item_count++;
        var clickedBox = $(this).closest('.box');
        var img_src = clickedBox.find('.images').attr('src');
        var titlte = clickedBox.find('.cartname').text();
        var price = parseInt(clickedBox.find('.bottom h2').text().replace('$', '')); // Parse the price as a float

            var cart_item = `
                <div class="cart_item">
                    <div class="imgDiv">
                        <img src="${img_src}" class="imgClass">
                    </div>
                    <div id="title" class="nameDiv">
                        <h6 style="font-size:20px;">${titlte}</h6>
                    </div>
                    <div>
                    <button class="increment">+</button>
                    </div>

                    <div class="col" id="t_price">
                        <h6 class="qtyNumber"><span class="quantity">1</span> X <span class="cart_item_price">$${price}</span></h6>
                    </div>
                    <div>
                    <button class="decrement">-</button>
                    </div>
                </div>
            `;
            $("#order").append(cart_item);
        
        $("#cart_item_count").text(cart_item_count);
        item_count();
    });
    
    $('#order').on('click', '.increment', function() {
        var cartItem = $(this).closest('.cart_item');
        var currentQuantity = parseInt(cartItem.find('.quantity').text());
        currentQuantity++;
        cartItem.find('.quantity').text(currentQuantity);
    });
    
    $('#order').on('click', '.decrement', function() {
        var cartItem = $(this).closest('.cart_item');
        var currentQuantity = parseInt(cartItem.find('.quantity').text());
        if (currentQuantity > 1) {
            currentQuantity--;
            cartItem.find('.quantity').text(currentQuantity);
        } else {
            cart_item_count--;
            cartItem.remove();
            $("#cart_item_count").text(cart_item_count);
        }
    });
    function item_count(){
        var res = $("#order").children().length;
        $("#cart_item_count").text(res);
    };
    
});


