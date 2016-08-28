
var app = angular.module("dragDrop", ["mySharedElements"]);  // linking 'mySharedElements' - i.e. directives/event listeners for drag and drop 

app.controller('kpr', function($scope,Basket,Product,Order) { //input factory functions to model transaction
    
    //--------------- cart class variables------------------------

    $scope.appBasketInst = '';

    $scope.creatAppBasketInst =  function(){
      var anAppBasket = new Basket();   //create an instance of a basket for use in the app.. called only once on page open 
      $scope.appBasketInst = anAppBasket;
    };


    $scope.startProcess = function() {  //checkout action
      $scope.setIdDraggedProd(); //set itemDropIDCategory, itemDropID itemDropQty
    }


    //---------------------------------------




    //----------------Get input(prodId,categoryId,quantity) from dragging action--------------------
    //item quantity input label 
    $scope.bin = '-';
    
    $scope.itemCategoryList = {"Nike":"Nike", "Louboutin":"Louboutin", "Choo":"Choo"};
    $scope.currentItemCategory = '';
    $scope.itemDropCategory = '';    //category of last item dropped
    $scope.itemDropID = '';            //id of last item dropped
    $scope.itemDropQty = '';


    $scope.setIdDraggedProd = function(){
          //set prod id of item selected for purchase
          $scope.itemDropID = Number($scope.bin) ;

          //set catid of item selected for purchase
          $scope.itemDropCategory = $scope.currentItemCategory;

          //set qty of item selected for purchase. Qty is set in view and stored in prod item list
          $scope.itemDropQty = $scope.productList[$scope.itemDropCategory][$scope.itemDropID-1].Quantity;
    };

    //------------------------------------------------



    //----------------Navigation--------------------

    //change product category/page
    $scope.gotoPage =  function(categoryName) {
        $scope.currentItemCategory = $scope.itemCategoryList[categoryName];
    };
    //------------------------------------




    //----------------Set up Product list --------------------
    //items to display
    $scope.productList = {  
                  'Choo':[
                        {'Id': 1, 'Name':'Rice', 'Price': 2000.00, 'Quantity':1},
                        {'Id': 2, 'Name':'Yam', 'Price': 1000, 'Quantity':1},  
                        {'Id': 3, 'Name':'Beans', 'Price': 2500, 'Quantity':1},  
                        {'Id': 4, 'Name':'Potato', 'Price': 500, 'Quantity':1},
                        {'Id': 5, 'Name':'Banana', 'Price': 200, 'Quantity':1},
                        {'Id': 6, 'Name':'Pineapple', 'Price': 300, 'Quantity':1},  
                        {'Id': 7, 'Name':'Pawpaw', 'Price': 250, 'Quantity':1},  
                        {'Id': 8, 'Name':'Coconut', 'Price': 100, 'Quantity':1}  ],
                    
                  'Louboutin':[
                        {'Id': 1, 'Name':'Blue Leather', 'Price': 2000.00, 'Quantity':1},
                        {'Id': 2, 'Name':'Timberland', 'Price': 100000, 'Quantity':1},  
                        {'Id': 3, 'Name':'Louboutin', 'Price': 500000, 'Quantity':1},  
                        {'Id': 4, 'Name':'Jimy Cho', 'Price': 500, 'Quantity':1},
                        {'Id': 5, 'Name':'Air Jordan', 'Price': 200, 'Quantity':1},
                        {'Id': 6, 'Name':'Caterpilla', 'Price': 300, 'Quantity':1},  
                        {'Id': 7, 'Name':'Clarks', 'Price': 250, 'Quantity':1},  
                        {'Id': 8, 'Name':'Sketchers', 'Price': 100, 'Quantity':1}  ],

                  'Nike':[
                        {'Id': 1, 'Name':'Jordan Super Fly 5', 'Price': 60000, 'Quantity':1},
                        {'Id': 2, 'Name':'Air Jordan Trainer 1', 'Price': 60200, 'Quantity':1},  
                        {'Id': 3, 'Name':'Westbrook O Low', 'Price': 60500, 'Quantity':1},  
                        {'Id': 4, 'Name':'Jordan 5 AM', 'Price': 40000, 'Quantity':1},
                        {'Id': 5, 'Name':'Air Jordan 5', 'Price': 76000, 'Quantity':1},
                        {'Id': 6, 'Name':'Air Jordan XXXI', 'Price': 75000, 'Quantity':1},  
                        {'Id': 7, 'Name':'Jordan Ultra Fly ', 'Price': 43000, 'Quantity':1},  
                        {'Id': 8, 'Name':'Jordan Reveal', 'Price': 41500, 'Quantity':1}  ],
                      };  
                      

    //------------------------------------
   

    //returns an array based on a range 
    $scope.range = function(x){
       var arr = [];
      for (var i = 0; i < x; i++) {
          arr[i] = i;
      }
      return arr;
    };


});


//----------------Factory functions modelling the transaction in OOP ----------------------

app.factory('Product', function() {
  
  var productInst = function() {
      this.name = '';
      this.picture = '';
      this.price = 0;
      this.discount = 0;
      this.quantity = 0;  //set by view
  }
  return productInst;

});


app.factory('Order', function() {
  
  var orderInst = function() {
    this.productId = -1;
    this.quantity = 0;
    this.price = 0;
    this.discount = 0;

  }
  return orderInst;

});

app.service('AddToBasket', function(productInst,basketInst) {
  
  this.addItemToBasket = function() {
    //create order for product
    var orderInst = new Order();
    orderInst.productId = productInst.productId;
    orderInst.quantity = productInst.quantity;
    orderInst.price = productInst.price;

    //add order to basket. Basket now has product that was dragged 
    basketInst.addToBasket(orderInst);

  }

});


app.factory('Basket', function() {
  
  var basketInst = function(){
      this.orderList = []; //stores all items dragged to basket
      this.orderCount = 0;
      this.totalCost = 0;
      this.vatCost = 0;
      this.vatRate = 0.05;

      this.addToBasket = function (orderInst) {
        this.orderList.push (orderInst);
      }


      this.computeOrder = function () {
      
      //var to hold total cost of purchase
      var totalOrderCost = 0;
      var vatExpense =0;

      for (var i = 0; i < this.orderList.length; i++) {
        //get each order in orderList
        var eachOrder = this.orderList[i];
        
        //compute purchase cost
        totalOrderCost = totalOrderCost + (eachOrder.quantity * (eachOrder.price * (1 - eachOrder.discount)) );
        
        //compute tax
        vatExpense = vatExpense + (eachOrder.quantity * (eachOrder.price * (1 - eachOrder.discount))  * (this.vatRate) );
      }
      
      this.vatCost = vatExpense;
      
      return (totalOrderCost + vatExpense);
    }

}

  return basketInst;

});












