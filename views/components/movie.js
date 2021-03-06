angular.module('movieTemplate',[])
.constant('movie','/api/agent/moviesShow/')
.constant('movieSearch','/api/agent/moviesSearch/')
.constant('movieNew','/api/agent/moviesShowNew/')
.directive('myMovie',function($location,$resource,movie,movieNew,movieSearch){
	return{
		scope:{
			movieAll:'=movieAll'
		},
		link:function(scope,element,attrs){
			var head=document.querySelectorAll('head')[0]
			var headEle=angular.element(head)
			var titleEle=angular.element('<title>')
			var absurl=$location.absUrl()
			
			var width=document.documentElement.clientWidth||document.body.clientWidth,	// 获取页面宽度
			designWidth=952,		// 设计时的宽度
			differ=(parseInt(width)-designWidth)/2,	// 获取当前页面宽度与设计宽度的差值
			leftPersent=(differ/width)*100+'%'
			movieBox=document.querySelectorAll('.movieBox')[0],
			movieBoxEle=angular.element(movieBox)
			
			movieBoxEle.attr('style','left:'+leftPersent)
				
			var count=absurl.match(/\/\d+/g)[0].match(/\d+/g)[0]
			
			var newOrOld=absurl.match(/\/\w+\//g)[0].match(/\w+/g)[0]
			
			console.log(newOrOld)
			
			if(newOrOld=='moviesShow'){	
				scope.movieResource=$resource(movie+count)
			}else if(newOrOld=='moviesSearch'){
				console.log(1)
				scope.movieResource=$resource(movieSearch+count)
			}else{
				scope.movieResource=$resource(movieNew+count)
			}
			
			console.log(scope.movieResource.query())
			
			scope.movieResource.query().$promise.then(function(data){
				scope.movie=data[0]
				titleEle.text(scope.movie.name)
				headEle.append(titleEle)
			})
			
		},
		templateUrl:'../views/components/templates/movie.ejs'
	}
})