var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http) {
		   $scope.temp = "";
		   $scope.rows = [];
		   $scope.dataconfig=[]; // init empty array





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

			        index++;

					
				}

				ctx = c.getContext("2d");
				ctx.beginPath();
				ctx.arc(x,y, 35, 0, 2*Math.PI);
				ctx.fillStyle = "MidnightBlue";
				ctx.fill();
				ctx.stroke();

				console.log("ok ok")
			}
		});
