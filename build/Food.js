/*
	* 公共 JS 方法
*/
;define(function(require, exports, module){

	var Async = require("Async");
	var dot = require("dot");
	var confirm = require("$confirm");


(function($){
	$.FOOD = function($this, options){

		this.settings = $.extend(true, {}, $.FOOD.defaults, options);
		this.$el = $this;      // parent container holding items

	};

	$.FOOD.defaults = { 
		active: "FD-on",		// 显示|隐藏  className
 	};

	/*$.FOOD.setDefaults = function(options){
		$.FOOD.defaults = $.extend(true, {}, $.FOOD.defaults, options);
	};*/
	

	$.extend($.FOOD.prototype, {
		innit: function(){
		},
		dot: function(dot, tpl, data){

			tpl = tpl.replace(/&lt;/g,"<");
			tpl = tpl.replace(/&gt;/g,">");
			tpl = tpl.replace(/&amp;/g,"&");
			
			var tempFn = dot.template(tpl);
			var html = tempFn(data);

			return html;
		},
		ajax: function(o){
			var result = '';
			new Async({
				url: o.data_url,
				type: o.type || "GET",
				dataType: o.dataType || "json",
				data: o.data || '',
				async: o.async || false,
				success: function(data){
					result = o.tpl_id ? $(data).filter(o.tpl_id).get(0).innerHTML : data.data;
				},
				error: function(data){
					$.messager.error(data.message);
					result = undefined;
				}
			});	
			return result;

		},
		ajax2: function(o){
			var ajax = '';
			new Async({
				url: o.data_url2,
				type: o.type2 || "GET",
				dataType: "json",
				data: o.data2 || '',
				async: o.async || false,
				success: function(data){
					ajax = data.data;
				},
				error: function(data){
					$.messager.error(data.message);
					result = undefined;
				}
			});	
			return ajax;
		},
		docClick: function(){
			var evt = $(this.target);
			$(document).on("click",function(){
				console.log(evt);				
			})

		},
		HtmlRender: function(o){
			if(!o) return;
			var t = this;

			var result = null;
			var data = {};

			// tpl request
			var tplJson = {};
			tplJson.url = o.tpl_url;
			tplJson.dataType = 'html';
			tplJson.tpl_id = o.tpl_id;			
			var tpl = t.ajax({
				data_url: tplJson.url,
				dataType: tplJson.dataType,
				tpl_id: tplJson.tpl_id
			});				

			// data request
			if(o.data_url){
				var dataJson = o;
				dataJson.tpl_id = '';
				data = t.ajax(o);				
			}

			// 新增 data
			if(o.jsonData){
				var json = o.jsonData;
				for(var key in json){
					data[key] = json[key];
				}
			}
			var result = t.dot(dot, tpl, data || {});
			
			return result;
		},
		tplRender: function(o){
			var tpl = '';
			$.ajax({
				url: o.tpl_url,
				type: "GET",
				dataType: "html",
				async: false,
				success: function(html){
					tpl=$(html).filter(o.tpl_ID).get(0).innerHTML;
				}

			});			

			return tpl;
		},
		FDconfirm: function(o){
			var t = this;
			var o = o || {};
			var tpl = '';
			var data = {};
			if(o.tpl_url && o.tpl_ID){
				tpl = this.tplRender(o);
				if(o.data_url && o.data_url2){					
					data = this.ajax(o);
					data2 = this.ajax2(o);
					for(var key in data2){
						data[key] = data2[key];
					}									
				}  else if(o.data_url){					
					data = this.ajax(o);
				}

				// 传入 json
				if(o.jsonData){
					var json = o.jsonData;
					for(var key in json){
						data[key] = json[key];
					}
				}
				tpl = Food.tplRender(dot, tpl, data || {});	

			} else{
				//tpl = this.tplRender(o);
			}

			var FDconfirm = confirm({
				title: o.title || false,
				closeIcon: o.closeIcon || false,
				columnClass: o.columnClass || 'col-md-6 col-md-offset-3',
				content: o.content || tpl,
				confirmButton: o.confirmButton!=false ? o.confirmButton || "确定" : false ,
				cancelButton: o.cancelButton!=false ? o.cancelButton || "取消" : false,
				confirmButtonClass: 'btn-success',
				cancelButtonClass: 'btn-danger',
				confirm: o.confirm || function(){},
				cancel: o.cancel || function(){},
				onOpen: function(){
					o.onOpen && o.onOpen();
				},
			});

			return FDconfirm;
		},
		pagination:function(o){
			var t = this;
			var id = o || '';
			if(!id) return;

			// 获取页码列表
			var pagination = $("#"+id+"_info").text().split("/");
			var pag_now = pagination[0];
			var pag_all = pagination[1];
			if(!pag_all) return;

			// 翻页
			var next = $("#"+id+"_next");
			var previous = $("#"+id+"_previous");
			var next_btn = $("[data-next="+id+"]");
			var previous_btn = $("[data-previous="+id+"]");

			next_btn.on("click",function(){
				next.click();
			});
			previous_btn.on("click",function(){
				previous.click();
			});

			// 列表页码
			var box = $("[data-pagination="+id+"]");
			var box_now = box.children("[data-id=now]");
			var box_all = box.children("[data-id=all]");

			box_now.text(pag_now);
			box_all.text(pag_all);

			var list = box.next();
			var len = pag_all;

			var html = '';
			for(var i=1;i<=len;i++){
				if( i == pag_now){
					html += '<li class="on" alt='+i+'>'+i+'/'+pag_all+'</li>';								
				} else{
					html += '<li alt='+i+'>'+i+'/'+pag_all+'</li>';		
				}
			}			
			list.html(html);

			// 指定页码
			var paginate_btn = $("a[aria-controls="+id+"]");
			var li_btn = list.children();
			li_btn.on("click",function(ev){
				var t = $(this);
				var obj = t.attr("alt");

				paginate_btn.each(function(){
					var t = $(this);
					var page = t.attr("data-dt-idx");

					if(obj == page-1) t.click();					
				});
			});			
		},
		drag: function(o){
			console.log(o)
			var obj = document.getElementById("theme");
			obj.onmousedown=function(ev){
			    var oEvt=ev||event; 
			    var disX=oEvt.clientX-obj.offsetLeft;
			    var disY=oEvt.clientY-obj.offsetTop;
			    
			    document.onmousemove=function(ev){
				    var oEvt=ev||event; 

				    // 边距的限定 ,加 
				    var t=oEvt.clientY-disY;
				    var l=oEvt.clientX-disX;

					/*if(t<50) t=0;
			      	if(t>document.documentElement.clientHeight-obj.offsetHeight-20){  // 磁性吸附
			        	t=document.documentElement.clientHeight-obj.offsetHeight;
			     	 }
			      	if(l<50) l=0;
			      	if(l>document.documentElement.clientWidth-obj.offsetWidth-20){
			        	l=document.documentElement.clientWidth-obj.offsetWidth;
			      	}*/


				    // obj 定位
				    obj.style.left = l+'px';//newDiv.offsetLeft+'px';
				    obj.style.top = t+'px';//newDiv.offsetTop+'px';
			     
			    };
			    document.onmouseup=function(){
			    	document.onmouseup= document.onmousemove=null;     	 // 抬起时关闭 不用的函数包括自己，下次点击又会生成新的函数
			    	obj.releaseCapture && obj.releaseCapture();   
			    };

			    obj.setCapture && obj.setCapture();            
			    return false;                 					
			}; 
		}
	});

	$.fn.FOOD = function(o) {
		var o = o || {};
		var $t = $(this);

		return new $.FOOD($t,o);

	};

	
})(window.jQuery || window.Zepto || window.$);






	module.exports = $.fn.FOOD;
});