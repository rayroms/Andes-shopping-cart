function basket (){
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

function product () {
	this.name = '';
	this.picture = '';
	this.price = 0;
	this.discount = 0;
	this.quantity = 0;  //set by view
}

function order () {
	
	this.productId = -1;
	this.quantity = 0;
	this.price = 0;
	this.discount = 0;

}

function onDragged(productInst, basketInst){
	
	//create order for product
	var orderInst = new order();
	orderInst.productId = productInst.productId;
	orderInst.quantity = productInst.quantity;
	orderInst.price = productInst.price;

	//add order to basket
	basketInst.addToBasket(orderInst);

}

/*
//add product
var basketInst = new basket();
var productInst = new product();
productInst.name = 'Rice';
productInst.price = 5000.0;
productInst.quantity = 2;
productInst.discount = 0.15;
productInst.picture = 'rice.png';


//order product add qty
var onDraggedInst = new onDragged(productInst,basketInst);


//get total cost
var total = basketInst.computeOrder;

console.log(total);
*/










