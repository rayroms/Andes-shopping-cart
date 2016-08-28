
var app = angular.module("dragDrop", ["mySharedElements"]);

app.controller('kpr', function($scope,Basket,Product,Order) { 
    
    //--------------- cart class variables------------------------

    $scope.createBasketInst = new Basket();   //create an instance of a basket.. only once on page open 

    










    //---------------------------------------



    //item quantity input label 
    $scope.bin = '-'
    
    $scope.itemCategory = ["Louboutin", "Jimmy Choo", "Air Jordan", "Groceries"];
    $scope.itemDropIDCategory = '';    //category of last item dropped
    $scope.itemDropID = '';            //id of last item dropped


    $scope.setIdDraggedProd = function(){
      alert('hi');
          var holderStr = $scope.bin;
          //locate seperator in holderStr with format 'id-category'
          var locationOfDash = holderStr.indexOf('-'); 

          //get category id 
          var catOfDraggedItem = holderStr.substr(0,locationOfDash);

          //get id of dragged
          var idOfDraggedItem = holderStr.substr(locationOfDash+1,holderStr.length-1);

          //set catid
          $scope.itemDropIDCategory = catOfDraggedItem;

          $scope.bin = catOfDraggedItem+"/"+idOfDraggedItem + 
                      "*" + $scope.item[catOfDraggedItem][idOfDraggedItem-1].Quantity;
    };


    //items to display
    $scope.item = {  
                  '0':[
                        {'Id': 1, 'Name':'Rice', 'Price': 2000.00, 'Quantity':1},
                        {'Id': 2, 'Name':'Yam', 'Price': 1000, 'Quantity':1},  
                        {'Id': 3, 'Name':'Beans', 'Price': 2500, 'Quantity':1},  
                        {'Id': 4, 'Name':'Potato', 'Price': 500, 'Quantity':1},
                        {'Id': 5, 'Name':'Banana', 'Price': 200, 'Quantity':1},
                        {'Id': 6, 'Name':'Pineapple', 'Price': 300, 'Quantity':1},  
                        {'Id': 7, 'Name':'Pawpaw', 'Price': 250, 'Quantity':1},  
                        {'Id': 8, 'Name':'Coconut', 'Price': 100, 'Quantity':1}  ],
                    
                  '1':[
                        {'Id': 1, 'Name':'Blue Leather', 'Price': 2000.00, 'Quantity':1},
                        {'Id': 2, 'Name':'Timberland', 'Price': 100000, 'Quantity':1},  
                        {'Id': 3, 'Name':'Louboutin', 'Price': 500000, 'Quantity':1},  
                        {'Id': 4, 'Name':'Jimy Cho', 'Price': 500, 'Quantity':1},
                        {'Id': 5, 'Name':'Air Jordan', 'Price': 200, 'Quantity':1},
                        {'Id': 6, 'Name':'Caterpilla', 'Price': 300, 'Quantity':1},  
                        {'Id': 7, 'Name':'Clarks', 'Price': 250, 'Quantity':1},  
                        {'Id': 8, 'Name':'Sketchers', 'Price': 100, 'Quantity':1}  ],

                  '2':[
                        {'Id': 1, 'Name':'Jordan Super Fly 5', 'Price': 60000, 'Quantity':1},
                        {'Id': 2, 'Name':'Air Jordan Trainer 1', 'Price': 60200, 'Quantity':1},  
                        {'Id': 3, 'Name':'Westbrook O Low', 'Price': 60500, 'Quantity':5},  
                        {'Id': 4, 'Name':'Jordan 5 AM', 'Price': 40000, 'Quantity':1},
                        {'Id': 5, 'Name':'Air Jordan 5', 'Price': 76000, 'Quantity':1},
                        {'Id': 6, 'Name':'Air Jordan XXXI', 'Price': 75000, 'Quantity':1},  
                        {'Id': 7, 'Name':'Jordan Ultra Fly ', 'Price': 43000, 'Quantity':1},  
                        {'Id': 8, 'Name':'Jordan Reveal', 'Price': 41500, 'Quantity':1}  ],  
                      

                  '3':[
                        {'Id': 1, 'Name':'Rice', 'Price': 2000.00 , 'Quantity':1},
                        {'Id': 2, 'Name':'Yam', 'Price': 1000, 'Quantity':1},  
                        {'Id': 3, 'Name':'Beans', 'Price': 2500, 'Quantity':1},  
                        {'Id': 4, 'Name':'Potato', 'Price': 500, 'Quantity':1},
                        {'Id': 5, 'Name':'Banana', 'Price': 200, 'Quantity':1},
                        {'Id': 6, 'Name':'Pineapple', 'Price': 300, 'Quantity':1},  
                        {'Id': 7, 'Name':'Pawpaw', 'Price': 250, 'Quantity':1},  
                        {'Id': 8, 'Name':'Coconut', 'Price': 100, 'Quantity':1} ]
                    }; 

   

    //returns an array based on a range 
    $scope.range = function(x){
       var arr = [];
      for (var i = 0; i < x; i++) {
          arr[i] = i;
      }
      return arr;
    };

    //activated when item is dropped in basket
    $scope.handleDrop = function() {
      $scope.bin = $scope.itemDropIDCategory + 'yes';
      
    }


    $scope.doSquare = function() {
        $scope.bin = CalculatorService.square(15);
    }

    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube(11);
    }



});



app.service('MathService', function() {
    this.add = function(a, b) { return a + b };
    
    this.subtract = function(a, b) { return a - b };
    
    this.multiply = function(a, b) { return a * b };
    
    this.divide = function(a, b) { return a / b };
});

app.service('CalculatorService', function(MathService){
    
    this.square = function(a) { return MathService.multiply(a,a); };
    this.cube = function(a) { return MathService.multiply(a, MathService.multiply(a,a)); };

});



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












