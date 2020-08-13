function deleteCustomer(customerID){
	$.ajax({
		url: '/customer/' + customerID,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};
