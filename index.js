//搜索框效果
$(document).ready(function(){
	$(":text").focus(function(){
		    $(":text").css("background-color","#fff");
		    $(":text").css("color","#333");	
	});
	$(":text").blur(function(){
		    $(":text").css("background-color","#343434");
		    $(":text").css("color","#fff");	
	});
});
//图片和文字轮播
window.onload = function(){
	var container = document.getElementById("container");
	var span = document.getElementById("span");
	var button = document.getElementById("buttons");
	var prev = document.getElementById("left-button");
	var next = document.getElementById("right-button");
	var animated = false;
	var timer;
	var area = document.getElementById("number-container");
	var backToTop = document.getElementById("back-to-top");
	var time = null;
	var isTop = true;
	var clientHeight = document.documentElement.clientHeight;

	function animate(offset){
		animated = true;
		var newLeft = parseInt(container.style.left) + offset;
		var time = 300 //位移总时间
		var interval = 10 //位移次数
		var speed = offset/(time/interval);
		function go(){
			if( (speed >0 && parseInt(container.style.left) < newLeft) || (speed < 0 && parseInt(container.style.left) > newLeft) ){
				container.style.left = parseInt(container.style.left) + speed + "px";
				setTimeout(go,interval);
			}
			else{
				animated = false;
				container.style.left = newLeft + "px";
		        if(newLeft > -745){
			     container.style.left = -2235 + "px";
		        }
		        if(newLeft < -2235){
			       container.style.left = -745 + "px";
		        }
			}
		}
		go();
	}
	area.innerHTML += area.innerHTML;
	area.scrollLeft = 0;
	function numberChange(height){
		area.scrollTop += height;
		if (area.scrollTop >= area.scrollWidth/2) {
				area.scrollTop = 0;
			}
	}
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},5000);
	}
	function stop(){
		clearInterval(timer);
	}
	next.onclick = function(){
		if(!animated){
			animate(-745);
		}
		numberChange(16);
	}
	prev.onclick = function(){
		if(!animated){
			animate(745);
		}
		numberChange(-16);
	}
	button.onmouseover = stop;
	button.onmouseout = play;
	container.onmouseover = stop;
	container.onmouseout = play;
	play();
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(osTop >= clientHeight){
			backToTop.style.display = "block";
		}
		else{
			backToTop.style.display = "none";
		}
		if(!isTop){
			clearInterval(time);
		}
		isTop = false;
	}
	backToTop.onclick = function(){
		time = setInterval(function(){
	    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		var ispeed = Math.floor(-osTop/6);

		isTop = true;
		document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
		if(osTop == 0){
			clearInterval(time);
		}
	},30);
	}
}