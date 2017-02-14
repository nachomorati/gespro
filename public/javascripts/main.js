$(document).ready(function () {
	//$('#items-list').hide();
	$('.flashMessage').slideUp(2500);
	$('#edit_product').hide();
	
	$('#jq_btn_show_edit').on('click', function () {
		$('#items-list').toggle(200);
		$('#edit_product').slideToggle(200);
	});
	
	$('#code_filter').on('change', function (e) {
		//console.log(e.currentTarget.value);
		$.get('/filter_by_code', {filter: e.currentTarget.value}, function (data) {
			console.log(data)
		})
	})

	//Buscar producto al seleccionarlo en el select del formulario de nueva venta
	$('#savesale_form #product').on('change', function (e) {
		console.log(e.currentTarget.value);
		$.get('/getproduct', {id: e.currentTarget.value}, function (data) {
			console.log('ajax success');
			console.log(data);
			$('#stock_input').val(data.product.stock);
			$('#code').val(data.product.code);
			$('#provider').val(data.product.provider);
			$('#comment').val(data.product.comment);
		})		
	})
})