$(document).ready(function () {
	//$('#items-list').hide();
	$('#products_table').tablesorter();
	$('.flashMessage').slideUp(2500);
	$('#edit_product').hide();
	$('#jq_btn_show_edit').on('click', function () {
		$('#items-list').toggle(200);
		$('#edit_product').slideToggle(200);
	});

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
		});
	});

	//FILTRAR UN PRODUCTO EN LA TABLA DE PRODUCTOS POR SU CODIGO
	$('#code_filter').on('change', function (e) {
		//console.log(e.currentTarget.value);
		$.ajax('/api/products', {
			data: {filtro: e.currentTarget.value},
			error: function (jqXHR, error, errorThrown) {
				if (error) {
					console.log(error, errorThrown);
				}
			},
			success: function (data, status, jqXHR){
				var html = '';
				data.forEach(function (item) {
					html += `
					<tr>
						<td>${item.code}</td>
						<td>${item.name}</td>
						<td>${item.stock}</td>
						<td>${item.comment}</td>
						<td><a href="/product/${item._id}">editar</a></td>
					</tr>
					`;
				});
				$('#products_table tbody').html(html);
			}
		});
	})

}); //document.ready
