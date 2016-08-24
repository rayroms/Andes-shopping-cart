function basket (){
	this.orderList = []; //stores all items dragged to basket
	this.orderCount = 0;

	this.addToBasket = function(){
	
	}

}

function product () {
	this.name = '';
	this.picture = '';
	this.price = 0;
	this.discount = 0;
}

function order () {
	
	this.productId = -1;
	this.quantity = 0;
	this.price = 0;

}