
var app = angular.module("dragDrop", []);

app.controller('DragDropCtrl', function($scope) { 

	$scope.bin = 'Basket';

	$scope.item = [{'Id': 1, 'Name':'Rice', 'Price': 2000},
					  {'Id': 2, 'Name':'Yam', 'Price': 1000} ];

$scope.gDate = function(){
      //var aDate = new Date();
      //var arr = aDate.split(" ");
      return 'hi';
};

  //get range
$scope.range = function(x){
   var arr = [];
  for (var i = 0; i < x; i++) {
      arr[i] = i;
  }
  return arr;
};

$scope.handleDrop = function() {
	alert('Drop occurred');
}

  
});


app.directive('draggable', function() {
	return function(scope,element){
		var el = element[0];
		el.draggable = true;

		//el.adEv(' ',f(),false);
		el.addEventListener (
			'dragstart',
			function(e) {
				e.dataTransfer.effectAllowed = 'move';
				e.dataTransfer.setData('Text', this.id);
				this.classList.add('drag');

				return false;
			},
			false
		);


		el.addEventListener(
			'dragend',
			function(e) {
				this.classList.remove('drag');
				return false;	
			},
			false

		);

		el.addEventListener(
			'dragover',
			function(e) {
				e.dataTransfer.dropEffect = 'move';
				
				//permits dropping
				if (e.preventDefault) {
					e.preventDefault();
				};

				this.classList.add( 'over');

				return false;

			},
			false

		);

		el.addEventListener(
			'dragenter',
			function(e) {
				this.classList.addEventListener('over');
				return false;
			},
			false
		);

		el.addEventListener(
			'dragleave',
			function(e) {
				this.classList.remove('over');
				return false;
			},
			false
		);

		el.addEventListener(
			'drop',
			function(e) {
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				this.classList.remove('over');
				var item = document.getElementById(e.dataTransfer.getData('Text'));
				this.appendChild(item);

				return false;
			},
			false
		);


	}

});


app.directive('droppable', function(){
	return {
		scope: {
			drop: '&' //parent
		},
		link: function(scope, element) {
			//get native obj
			var el = element[0];

			el.addEventListener(
				'drop',
				function(e) {
					if (e.stopPropagation) {
						e.stopPropagation();
					}

					this.classList.remove('over');

					var item = document.getElementById(e.dataTransfer.getData('Text'));
					this.appendChild(item);

					//calls the drop passed function
					scope.$apply('drop()');

					return false;
				}				
				false
			);

		}
	}
});




























