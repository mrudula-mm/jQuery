$(document).ready(function () {


    $('#search').click(function () {
    
       var checker = 0;
        for (var i = 0; i < 8; i++) {
            var card = $("div").filter(".box")[i];
            var title = $("p").filter(".cartname")[i].innerText.toUpperCase();
    
            if (title.indexOf($("#inp").val().toUpperCase()) > -1) {
                card.style.display = 'block';
                checker++;
            }
            else {
                card.style.display = 'none';
            }
        }
        if(checker > 0){
    
            $("#not_find_any_thing").text("");
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
        var price = parseFloat(clickedBox.find('.bottom h2').text().replace('$', ''));

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
                        <h6 class="qtyNumber"><span class="quantity">1</span> X <span class="cart_item_price">$${price.toFixed(2)}</span></h6>
                    </div>
                    <div>
                    <button class="decrement">-</button>
                    </div>
                </div>
            `;
            $("#order").append(cart_item);
            updateTotalAmount();
        
        $("#cart_item_count").text(cart_item_count);
        item_count();
    }); 
    
    function updateTotalAmount(){
        var totalAmount = 0;
        $('.cart_item').each(function (){
            var quantity = parseInt($(this).find('.quantity').text());
            var price = parseFloat($(this).find('.cart_item_price').text().replace('$', ''));
            var subtotal = quantity * price;
            totalAmount += subtotal;

        });
        $('#total_amount').text('$' + totalAmount);
    }
    updateTotalAmount();
    
    $('#order').on('click', '.increment', function() {
        var cartItem = $(this).closest('.cart_item');
        var currentQuantity = parseInt(cartItem.find('.quantity').text());
        currentQuantity++;
        cartItem.find('.quantity').text(currentQuantity);
        updateTotalAmount();
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
        updateTotalAmount();
    });
    function item_count(){
        var res = $("#order").children().length;
        $("#cart_item_count").text(res);
    };
    
});


