$(document).ready(function () {
    var result_data;

    function displayProducts(sortOption, categoryFilter, searchTerm) {
                       var filteredProducts = result_data.products;

        if (categoryFilter !== "default") {
            filteredProducts = filteredProducts.filter(function (product) {
                return product.category === categoryFilter;
            });
        }

        if (sortOption === "LowToHigh") {
            filteredProducts.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (sortOption === "HighToLow") {
            filteredProducts.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (sortOption === "Rating") {
            filteredProducts.sort(function (a, b) {
                return b.rating - a.rating;
            });
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(function (product) {
                return (
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        var html_content="";
        for (var i = 0; i < filteredProducts.length; ++i) {
            var current_record = filteredProducts[i];
            var discountPrice = current_record.price * (1 - current_record.discountPercentage / 100);
            html_content += "<div class='record'>";
            html_content += "<div class='img-box'>";
            html_content += "<img class='images' src='" + current_record.thumbnail + "' alt='Thumbnail'>";
            html_content += "</div>";
            html_content += "<div class='name'>" + current_record.title + "</div>";
            html_content += "<div>" + current_record.description + "</div>";
            html_content += "<div class='originalPrice'>$ " + current_record.price + "</div>";
            html_content += "<div class='dis'>$ " + discountPrice.toFixed(2) + "</div>";
            html_content += "<div> " +'save '+ current_record.discountPercentage +' %'+ "</div>";
            html_content += "<div><span class='rating'>Rating:</span>" + current_record.rating + "</div>";
            html_content += "<div><span class='stk'>Stock available:</span>" + current_record.stock + "</div>";
            html_content += "<div>" + current_record.category + "</div>";
            html_content += "<button class='cart_btn'>Add to cart</button>";
            html_content += "</div>";
        }

        $("#result_area").html(html_content);
    }

    // Fetch data
    $.get("https://dummyjson.com/products", function (data) {
        result_data = data;
        displayProducts("default", "default", "");
    }).fail(function () {
        $("#result_area").html("<div>Error: Unable to fetch data.</div>");
    });

    // sorting select element
    $("#sort").on("change", function () {
        var selectedSortOption = $(this).val();
        var selectedCategoryOption = $("#cat").val();
        displayProducts(selectedSortOption, selectedCategoryOption);
    });

    // category select element
    $("#cat").on("change", function () {
        var selectedCategoryOption = $(this).val();
        var selectedSortOption = $("#sort").val();
        displayProducts(selectedSortOption, selectedCategoryOption);
    });

    // search element
    $("#search").on("click", function () {
        var selectedSortOption = $("#sort").val();
        var selectedCategoryOption = $("#cat").val();
        var searchTerm = $("#inp").val();
        displayProducts(selectedSortOption, selectedCategoryOption, searchTerm); 
    });
    // **************************************************************************
    
    var cart_item_count = 0;
    
        $("#result_area").on("click", ".cart_btn", function () {

        cart_item_count++;
        var clickedRecord = $(this).closest('.record');
        var img_src = clickedRecord.find('.images').attr('src');
        var title = clickedRecord.find('div:eq(1)').text();
        var price = parseFloat(clickedRecord.find('.dis').text().replace('$', ''));

            var cart_item = `
                <div class="cart_item">
                    <div class="imgDiv">
                        <img src="${img_src}" class="imgClass">
                    </div>
                    <div id="title" class="nameDiv">
                        <h6 style="font-size:20px;">${title}</h6>
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
        $('#total_amount').text('$' + totalAmount.toFixed(2));
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
