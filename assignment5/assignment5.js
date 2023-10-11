$(document).ready(function () {
    var result_data;
    var cartItems = [];
     var searchResults = [];

    function displayProducts(sortOption, categoryFilter, searchTerm) {
        var productsToShow = searchTerm ? searchResults : result_data.products;

        if (categoryFilter !== "default") {
            productsToShow = productsToShow.filter(function (product) {
                return product.category === categoryFilter;
            });
        }

        if (sortOption === "LowToHigh") {
            productsToShow.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (sortOption === "HighToLow") {
            productsToShow.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (sortOption === "Rating") {
            productsToShow.sort(function (a, b) {
                return b.rating - a.rating;
            });
        }

 
        if (searchTerm) {
            productsToShow = productsToShow.filter(function (product) {
                return (
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        if (productsToShow.length === 0) {
            $("#not_find_any_thing").show(); 
            $("#result_area").empty();
        } else {
            $("#not_find_any_thing").hide(); 
            $("#result_area").empty();

        var html_content = "";
        for (var i = 0; i < productsToShow.length; ++i) {
            var current_record = productsToShow[i];
            var discountPrice = current_record.price * (1 - current_record.discountPercentage / 100);
            html_content += "<div class='record'>";
            html_content += "<div class='img-box'>";
            html_content += "<img class='images' src='" + current_record.thumbnail + "' alt='Thumbnail'>";
            html_content += "</div>";
            html_content += "<div class='name'>" + current_record.title + "</div>";
            html_content += "<div>" + current_record.description + "</div>";
            html_content += "<div class='originalPrice'>$ " + current_record.price + "</div>";
            html_content += "<div class='dis'>$ " + discountPrice.toFixed(2) + "</div>";
            html_content += "<div> " + 'save ' + current_record.discountPercentage + ' %' + "</div>";
            html_content += "<div><span class='rating'>Rating:</span>" + current_record.rating + "</div>";
            html_content += "<div><span class='stk'>Stock available:</span>" + current_record.stock + "</div>";
            html_content += "<div>" + current_record.category + "</div>";
            html_content += "<button class='cart_btn' data-id='" + current_record.id + "'>Add to cart</button>";
            html_content += "</div>";
        }

        $("#result_area").html(html_content);
    }
}
    // Fetch data
    $.get("https://dummyjson.com/products", function (data) {
        result_data = data;

        displayProducts("default", "default", "");
    }).fail(function () {
        $("#result_area").html("<div>Error: Unable to fetch data.</div>");
    });

    // sorting element
    $("#sort").on("change", function () {
        var selectedSortOption = $(this).val();
        var selectedCategoryOption = $("#cat").val();
        displayProducts(selectedSortOption, selectedCategoryOption, $("#inp").val());
    });

    // category element
    $("#cat").on("change", function () {
        var selectedCategoryOption = $(this).val();
        var selectedSortOption = $("#sort").val();
        displayProducts(selectedSortOption, selectedCategoryOption, $("#inp").val());
    });

    // search element
    $("#search").on("click", function () {
        var selectedSortOption = $("#sort").val();
        var selectedCategoryOption = $("#cat").val();
        var searchTerm = $("#inp").val();
        searchResults = result_data.products.filter(function (product) {
            return (
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        displayProducts(selectedSortOption, selectedCategoryOption, searchTerm);
    });

    // Add to cart
    $("#result_area").on("click", ".cart_btn", function () {
        var productId = $(this).data("id");
        var product = result_data.products.find(function (item) {
            return item.id === productId;
        });

        if (product) {
            var existingCartItem = cartItems.find(function (item) {
                return item.id === product.id;
            });

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cartItems.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    image: product.thumbnail,
                });
            }

            updateCartDisplay();

        }
        $("#not_find_any_thing").hide();

    });


    function updateCartDisplay() {
        $("#order").empty();
        var totalAmount = 0;

        cartItems.forEach(function (cartItem) {
            var subtotal = cartItem.price * cartItem.quantity;
            totalAmount += subtotal;

            var cart_item = `
                <div class="cart_item" data-id="${cartItem.id}">
                <div class="imgDiv">
                    <img src="${cartItem.image}" class="imgClass">
                </div>
                    <div class="nameDiv">
                        <h6 style="font-size:20px;">${cartItem.title}</h6>
                    </div>
                    <div>
                        <button class="increment">+</button>
                    </div>
                    <div class="col" id="t_price">
                        <h6 class="qtyNumber">
                            <span class="quantity">${cartItem.quantity}</span>
                            X <span class="cart_item_price">$${subtotal.toFixed(2)}</span>
                        </h6>
                    </div>
                    <div>
                        <button class="decrement">-</button>
                    </div>
                </div>
            `;

            $("#order").append(cart_item);
        });

        $('#total_amount').text('$' + totalAmount.toFixed(2));
        $("#cart_item_count").text(cartItems.length);
    }

    $('#order').on('click', '.increment', function () {
        var cartItemId = $(this).closest('.cart_item').data('id');
        var cartItem = cartItems.find(function (item) {
            return item.id === cartItemId;
        });

        if (cartItem) {
            cartItem.quantity++;
            updateCartDisplay();
        }
    });

    $('#order').on('click', '.decrement', function () {
        var cartItemId = $(this).closest('.cart_item').data('id');
        var cartItem = cartItems.find(function (item) {
            return item.id === cartItemId;
        });

        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cartItems = cartItems.filter(function (item) {
                    return item.id !== cartItemId;
                });
            }
            updateCartDisplay();
        }
    });

});