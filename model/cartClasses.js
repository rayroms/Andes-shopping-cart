function basket (){
	this.orderList = []; //stores all items dragged to basket
	this.orderCount = 0;

	this.addToBasket = function (orderInst) {
		this.orderList.push (orderInst);
	}

	this.computeOrder = function (this.orderList) {
		
		//var to hold total cost of purchase
		var totalOrder = 0;
		for (var i = 0; i < this.orderList.length; i++) {
			//get each order in orderList
			var eachOrder = this.orderList[i];

			//compute purchase
			totalOrder = totalOrder + (eachOrder.quantity * eachOrder.price);
		}

		return totalOrder;
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





