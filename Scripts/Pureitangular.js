var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http) {
		   $scope.temp = "";
		   $scope.rows = [];
		   $scope.dataconfig=[]; // init empty array
		   $scope.circlearra=[];





		   $http({
			method: 'GET',
			url: 'Data/config.json'
			}).then(function (config){
			$scope.dataconfig=config.data;
			console.log($scope.dataconfig);
			},function (error){
			console.log("config error");
			});


		   
		   var c = document.getElementById("myCanvas");
			//1

			var x=500,y=500;
			var r=325;

			function circle(x,y,r) 
			{
			  this.x = x;
			  this.y = y;
			  this.r = r;
			}


			function getDistance(x0, y0, x1, y1)
			{
			  return Math.sqrt(Math.pow(x1-x0,2) + Math.pow(y1-y0, 2));  
			  
			}

			 $scope.startpage = function() {


			 	



				var jsonconfig=JSON.parse(JSON.stringify($scope.dataconfig));

				var number =jsonconfig.length;
				var div=360/number;
				var index=0;
				for(var i=0;i>-360;i=i-div){
					var newx=x+r*Math.cos((i*Math.PI)/180);
					var newy=y+r*Math.sin((i*Math.PI)/180);

					ctx = c.getContext("2d");
					ctx.moveTo(x, y);
					ctx.lineTo(newx,newy);
					ctx.stroke();


					ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.arc(newx,newy, 7*jsonconfig[index].weight, 0, 2*Math.PI);
					ctx.fillStyle = "CornflowerBlue ";
					ctx.fill();
					ctx.stroke();



					

					ctx = c.getContext("2d");
			        ctx.font = '15pt Calibri';
			        ctx.fillStyle = 'white';
			        ctx.textAlign = 'center';
			        ctx.fillText('T',newx,newy+8);

			        ctx.font = '15pt Calibri';
			        ctx.fillStyle = 'black';
			        ctx.textAlign = 'center';
			        ctx.fillText(jsonconfig[index].label,newx,newy+35);

			        ctx.font = '20pt Calibri';
			        ctx.fillStyle = 'black';
			        ctx.textAlign = 'center';
			        ctx.fillText(jsonconfig[index].weight,(x+newx)/2,(y+newy)/2);


			        //creation of cirlce object array

			        var temp1=new circle();
			        temp1.x=newx;
			        temp1.y=newy;
			        temp1.r=7*Number(jsonconfig[index].weight);
			        $scope.circlearra.push(temp1);

			        index++;

					
				}

				ctx = c.getContext("2d");
				ctx.beginPath();
				ctx.arc(x,y, 35, 0, 2*Math.PI);
				ctx.fillStyle = "MidnightBlue";
				ctx.fill();
				ctx.stroke();

				
				console.log($scope.circlearra);

				function printMousePos(event) {

					var mousex=event.clientX-c.offsetLeft+$(window).scrollLeft();
					var mousey=event.clientY-c.offsetTop+$(window).scrollTop();

				 	//console.log("clientX: " + mousex +" - clientY: " +  mousey+"-circlex "+$scope.circlearra[3].x+"-circley "+$scope.circlearra[3].y);

				 	for(var i=0;i<$scope.circlearra.length;i++){
				 		var distance=getDistance($scope.circlearra[i].x,$scope.circlearra[i].y,mousex,mousey);
				 		if(distance<$scope.circlearra[i].r){
				 			console.log(jsonconfig[i]);
				 			break;
				 		}
				 		//console.log(distance);
				 		//console.log($scope.circlearra[i].r);
				 	}


				}

				document.addEventListener("click", printMousePos);
			}
		});
