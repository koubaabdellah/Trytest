if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){if(this===undefined||this===null){throw new TypeError('"this" is null or not defined');}
var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0;}
if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0;}}
for(;fromIndex<length;fromIndex++){if(this[fromIndex]===searchElement){return fromIndex;}}
return-1;};}
var app=angular.module('cartSection',['ngSanitize']);app.config(function($httpProvider){$httpProvider.defaults.transformRequest=function(data){if(data===undefined){return data;}
return $.param(data);};$httpProvider.defaults.headers.post=$httpProvider.defaults.headers.put=$httpProvider.defaults.headers.patch={"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"};});app.filter('formatCurrency',function(){return function(amount){return I18N.formatCurrency(amount);}});app.directive('addRemoveClass',[function(){return{restrict:'A',link:function(scope,element,attrs,controller){scope.$watch(function(){return element.attr('class');},function(newValue){esSetMenuScroll();});}}}]);app.factory('cartService',['$http','$q','$filter','$rootScope','$timeout',function($http,$q,$filter,$rootScope,$timeout){var cart_data={};var cart_items=[];var loaded=false;var cart_loading=false;var is_cart_showing=false;var max_order=30;var qty_change_timeout='';var serviceFunctions={loadCart:function(replace_cart,show_after){cart_loading=true;if(typeof replace_cart=='undefined'){replace_cart=false;}
$http.post('/carts/getcart',{time:new Date().getTime()}).then(function(payload,status,headers,config){serviceFunctions.updateCartItems(payload.data,replace_cart);$rootScope.$emit('cartLoaded',show_after);}).catch(function(data,status,headers,config){});},updateCartItems:function(data,replace_cart){var json_cart=angular.fromJson(data.json_cart);json_cart=($filter)('orderBy')(json_cart,'sort_order');serviceFunctions.setCartItems(json_cart,replace_cart);cart_data.shipping_amount=parseFloat(data.cart_shipping_price);cart_data.free_shipping_minimum_spend=parseFloat(data.free_shipping_minimum_spend);cart_data.tax_percentage=parseFloat(data.cart_tax_rate);if(typeof data.currency_symbol!=='undefined'){cart_data.currency_symbol=data.currency_symbol;}
cart_data.discount_description=data.discount_description;cart_data.discount_amount=parseFloat(data.discount_amount);cart_data.current_credit_amount=parseFloat(data.current_credit_amount);cart_data.using_free_order_credit=data.using_free_order_credit;loaded=true;},setCartItems:function(items_array,replace_cart){if(replace_cart){cart_items=[];}
angular.forEach(items_array,function(item){serviceFunctions.addToCart(item);});},sortItems:function(a,b){if(b.is_haircolor){return 1;}
return 0;},updateCart:function(item){if(item.qty>0){$http.post('/carts/add',item).then(function(data,status,headers,config){serviceFunctions.loadCart();}).catch(function(data,status,headers,config){});}else{var index=cart_items.indexOf(item);item.qty=cart_items[index].qty;}},addProductToCart:function(product_id,qty){var deferred=$q.defer();$http.post('/carts/add',{product_id:product_id,qty:qty}).then(function(data,status,headers,config){serviceFunctions.updateCartItems(data);deferred.resolve(data.reload);}).catch(function(data,status,headers,config){});return deferred.promise;},changeQty:function(item,qty){var original_qty=item.qty||0;item.qty=qty;var max_qty=max_order;if(item.qty>max_qty){item.qty=max_qty;}
if(item.qty<1){item.qty=1;}
if(item.qty==original_qty){return;}
if(typeof qty_change_timeout=='object'){$timeout.cancel(qty_change_timeout);}
qty_change_timeout=$timeout(function(){item.update_pending=true;serviceFunctions.updateCart(item);},250);},getMaxOrderSize:function(){return max_order;},getDiscountDescription:function(){return cart_data.discount_description||false;},getDiscountAmount:function(){return cart_data.discount_amount||0;},isCartLoaded:function(){return loaded;},isCartLoading:function(){return cart_loading;},getCurrency:function(){return cart_data.currency_symbol||'$';},getShipping:function(){return cart_data.shipping_amount||0;},getFreeShippingMinimumSpend:function(){return cart_data.free_shipping_minimum_spend||0;},getTax:function(){return cart_data.tax_percentage||0;},getCart:function(){return cart_items;},getCartData:function(){return cart_data;},getCurrentCreditAmount:function(){return cart_data.current_credit_amount||0;},isUsingFreeOrderCredit:function(){return cart_data.using_free_order_credit||false;},isCartShowing:function(){return is_cart_showing;},setCartShowing:function(cart_showing){is_cart_showing=cart_showing;},slideToggleCart:function(direction,which_cart){var menu_width=$('.minicart2-container').width();var menu_right=parseInt($('.minicart2-container').css('right'));var slide_to=0;var opacity_to=0.5;var transition_speed=600;if(!direction){direction=(menu_right==0)?'close':'open';}
if(direction=='close'){slide_to=-menu_width;opacity_to=0;is_cart_showing=false;esToogleMenuFooter(false);}else{slide_to=0;opacity_to=0.5;is_cart_showing=true;esSetMenu(true);$rootScope.$emit('menuToggle',true);}
window.scrollTo(0,0);$('.minicart2-container').animate({right:slide_to},transition_speed,function(){if(!is_cart_showing){$rootScope.$emit('menuToggle',false);esSetMenu(false);}else{esToogleMenuFooter(true);}
esSetMenuScroll();});$('.minicart2-mask').animate({opacity:opacity_to},transition_speed);},getCartCount:function(default_value){var cart_count=0;if(loaded){angular.forEach(cart_items,function(item){if(!item.removed){cart_count+=parseInt(item.qty);}});return cart_count;}else{return default_value||0;}},addToCart:function(product){var updated=false;angular.forEach(cart_items,function(item){if(parseInt(item.product_id)==parseInt(product.product_id)&&item.unit_price==product.unit_price){updated=true;item.qty=parseInt(product.qty);item.auto_delivery=product.auto_delivery;item.unit_price=parseFloat(product.unit_price);item.full_price=parseFloat(product.full_price);item.frequency=product.frequency;item.future=false;item.is_haircolor=product.is_haircolor;item.removed=false;item.in_stock=product.in_stock;item.update_pending=false;}});if(!updated){var new_cart_item={name:product.name,translated_name:product.translated_name,title:product.title,images:product.images,taxable:product.taxable,hide_product_page:product.hide_product_page,product_url:product.product_url,variation_name:product.variation_name||product.variation,variation_type:product.variation_type,product_id:parseInt(product.product_id),qty:parseInt(product.qty),editable:product.editable,removeable:product.removeable,undoable:product.undoable,removed:false,auto_delivery:product.auto_delivery,frequency:product.frequency,future:false,is_haircolor:product.is_haircolor,unit_price:parseFloat(product.unit_price),full_price:parseFloat(product.full_price),allow_subscription:product.allow_subscription,in_stock:product.in_stock,dye_type:product.dye_type,product_type:product.product_type,is_glove:product.is_glove,bundle_special:product.bundle_special,show_full_price:product.show_full_price,};cart_items.push(new_cart_item);}
$rootScope.$emit('addedCartItem');},oneTimeHaircolor:function(){var deferred=$q.defer();$http.post('/carts/onetime',{time:new Date().getTime()}).then(function(data,status,headers,config){if(data.success){serviceFunctions.updateCartItems(data);}}).catch(function(data,status,headers,config){});return deferred.promise;},removeFromCart:function(item_to_remove,update_array){update_array=(typeof update_array=='undefined')?true:update_array;var deferred=$q.defer();$http.post('/carts/remove',item_to_remove).then(function(data,status,headers,config){if(update_array){serviceFunctions.updateCartItems(data);}
deferred.resolve(data.data.reload);}).catch(function(data,status,headers,config){});return deferred.promise;},markRemoved:function(item,value){if(typeof value!='boolean'){value=true;}
var item_index=cart_items.indexOf(item);cart_items[item_index].removed=value;},removeMarked:function(){var kept_items=[];var items_removed=false;angular.forEach(cart_items,function(cart_item,index){if(!cart_item.removed){kept_items.push(cart_item);}});items_removed=(cart_items.length!==kept_items.length);serviceFunctions.setCartItems(kept_items,true);return items_removed;},showCart:function(allow_close){if(!serviceFunctions.isCartLoading()){serviceFunctions.loadCart(true,true);return;}
if(typeof allow_close!='boolean'){allow_close=true;}
if(!loaded){serviceFunctions.loadCart(true,true);}else{$rootScope.$emit('pullCart');if(allow_close){serviceFunctions.slideToggleCart();}}}};return serviceFunctions;}]);app.controller('cartCtrl',['$scope','cartService','formatCurrencyFilter','$http','$filter','$rootScope','$timeout',function($scope,cartService,formatCurrencyFilter,$http,$filter,$rootScope,$timeout){$scope.cart_items=cartService.getCart();$scope.tax_percentage=cartService.getTax();$scope.currency_symbol=cartService.getCurrency();$scope.discount_description=cartService.getDiscountDescription()||false;$scope.discount_amount=cartService.getDiscountAmount();$scope.current_credit_amount=cartService.getCurrentCreditAmount();$scope.using_free_order_credit=cartService.isUsingFreeOrderCredit();$scope.qty_inc_timeout={};$scope.item_to_remove=[];$scope.cartCount=cartService.getCartCount;$rootScope.$on('menuToggle',function(ev,is_showing){$scope.setCartShowing(is_showing);if(!is_showing){if(cartService.removeMarked()){$scope.loadCart();}}});$rootScope.$on('removedMarked',function(){$scope.updateLocalScope();});$rootScope.$on('addedCartItem',function(){$timeout(function(){esSetMenuScroll();});});$scope.maxOrderSize=function(item){return cartService.getMaxOrderSize();};$scope.maxOrderArray=function(){var arr=[];for(var i=0;i<cartService.getMaxOrderSize();++i){arr.push(i+1);}
return arr;};$scope.getCartItems=function(load_if_empty){if(load_if_empty&&!cartService.isCartLoading()){cartService.loadCart();}
var cartItems=cartService.getCart();return cartItems.filter(function(item){return!item.removed||item.removed&&item.undoable})};$scope.toggleCart=cartService.showCart;$scope.showCart=cartService.showCart;$scope.loadCart=cartService.loadCart;$scope.removeFromCart=cartService.removeFromCart;$scope.addCart=cartService.addToCart;$scope.getFreeShippingMinimumSpend=cartService.getFreeShippingMinimumSpend;$scope.updateLocalScope=function(){$scope.cart_items=cartService.getCart();angular.forEach(cartService.getCartData(),function(val,key){$scope[key]=val;});};$rootScope.$on('cartLoaded',function(event,show_after){$scope.updateLocalScope();if(show_after){cartService.slideToggleCart();}});$rootScope.$on('item_removed',function(event,item){$scope.updateLocalScope();});$scope.showDiscountAmount=function(){return $scope.discount_amount*-1;};$scope.getCurrentCreditAmount=function(){return $scope.current_credit_amount*-1;};$scope.isUsingFreeOrderCredit=function(){return $scope.using_free_order_credit;};$scope.subtotal=function(){var subtotal=0;angular.forEach($scope.cart_items,function(s){subtotal+=s.unit_price*s.qty;});return subtotal;};$scope.form_subtotal=function(){var subtotal=0;angular.forEach($scope.cart_items,function(s){if(!s.removed){subtotal+=s.unit_price*s.qty;}});return subtotal;};$scope.taxableSubtotal=function(){var subtotal=0;angular.forEach($scope.cart_items,function(s){if(s.taxable){subtotal+=s.unit_price*s.qty;}});return subtotal;};$scope.tax=function(){return Math.round((($scope.taxableSubtotal()-$scope.discount_amount)*cartService.getTax())*100)/100;};$scope.accountCreditUsed=function(){var total=$scope.total();var credit=$scope.current_credit_amount;if(credit>0){if(credit>=total){return total*-1;}else{return credit*-1;}}else{return 0;}};$scope.total=function(){return $scope.subtotal()
+$scope.tax()
+$scope.shippingAmount()
-$scope.discount_amount;};$scope.shippingAmount=function(){var holiday_bundle_pids=[515,516,517,518,519];angular.forEach($scope.cart_items,function(i){if(holiday_bundle_pids.indexOf(i.product_id)!==-1){return 0;}});if($scope.subtotal()-$scope.discount_amount>=$scope.getFreeShippingMinimumSpend()){return 0;}else{return cartService.getShipping();}}
$scope.totalAfterCredit=function(){return $scope.total()+$scope.accountCreditUsed();};$scope.incrementQty=function(item,amount){if(item.update_pending){return;}
if(typeof amount=='undefined'){amount=1;}
var new_amount=parseInt(item.qty)+amount;if(new_amount){cartService.changeQty(item,new_amount);}};$scope.oneTimeHaircolor=function(){var promise=cartService.oneTimeHaircolor();promise.then(function(updated){$scope.cart_items=cartService.getCart();});};$scope.showItem=function(item){return(typeof item.removed=='undefined'||!item.removed);};$scope.showUndo=function(item){return(typeof item.undoable=='undefined'||item.undoable);};$scope.hideUndo=function(item){item.undoable=false;};$scope.addProduct=function(product_id,qty){cartService.addProductToCart(product_id,qty).then(function(){cartService.loadCart();});};$scope.removeItem=function(item,bypass){bypass=bypass||false;var promise=cartService.removeFromCart(item,false);promise.then(function(updated){cartService.markRemoved(item);cartService.loadCart(updated);});};$scope.markRemoved=function(item,value){cartService.markRemoved(item,value);$scope.cart_items=cartService.getCart();};$scope.removeMarked=function(item,$event){var table_row=$($event.target).closest('tr');table_row.find('.removed-item-undo').fadeOut('fast',function(){table_row.css('height',0);});};$scope.showPrice=function(index){$scope.updateLocalScope();return formatCurrencyFilter($scope.cart_items[index].unit_price*$scope.cart_items[index].qty);};$scope.showFullPrice=function(index){var item=$scope.cart_items[index];if(item.product_type=='gift_card'){return '';}
return(item.full_price!==item.unit_price)?formatCurrencyFilter(item.full_price):'';};$scope.displayTitle=function(item){return item.name;};$scope.displayName=function(item){if(item.title){if(item.variation){return item.name+' ('+item.variation+')';}else{return item.name;}}else{return '';}};$scope.setCartShowing=function(is_cart_showing){$scope.is_cart_showing=is_cart_showing;if(!is_cart_showing){$scope.$apply();}};$scope.isCartShowing=function(){return $scope.is_cart_showing;};$scope.productClick=function(item){if(item.product_url){window.location.href=item.product_url;}};$scope.showIncrement=function(element){return element.item.editable&&element.item.full_price==element.item.unit_price;};$scope.hasProductInCart=function(product_id){product_id=parseInt(product_id);return $scope.cart_items.some(function(item){return(parseInt(item.product_id)==product_id);});};$scope.getHairColorVariation=function(dye_type){if(dye_type=='demi'||dye_type=='spde'){return $scope.getI18NString('demi_permanent_hc');}else{return $scope.getI18NString('permanent_hc');}};$scope.removedItemText=function(item_name){return $scope.getI18NString('removed_item_text').replace('%1$s',item_name);};$scope.getDiscountDescription=function(discount_description){return $scope.getI18NString('discount_description').replace('%1$s',discount_description);};$scope.getI18NString=function(val){if(!$scope.i18n_strings){return '';}
return $scope.i18n_strings[val];};$scope.setI18NStrings=function(obj){$scope.i18n_strings=obj;};$scope.getVariationType=function(type){if(!$scope.i18n_strings||!$scope.i18n_strings.variation_types){return type;}
return $scope.i18n_strings.variation_types[type]||type;};$scope.updateCart=cartService.updateCart;}]);$(document).ready(function(){$(".mini-cart-close").click(function(){var appElement=$('#cartCtrl');var $scope=angular.element(appElement).scope();$scope.$apply(function(){$scope.toggleCart();});});$('.closeFancy').click(function(ev){ev.preventDefault();$.fancybox.close();return false;});$("#oneTimeHaircolor").on('click',function(event){event.preventDefault();$.fancybox.close();var appElement=$('#cartCtrl');var $scope=angular.element(appElement).scope();$scope.$apply(function(){$scope.oneTimeHaircolor();});});if(window.location.hash=='#shownow'){var appElement=$('#cartCtrl');var $scope=angular.element(appElement).scope();$scope.$apply(function(){$scope.showCart();});}
if(window.location.hash=='#showauto'){var appElement=$('#cartCtrl');var $scope=angular.element(appElement).scope();$scope.$apply(function(){$scope.showCart();});}});