// this function will update the customer using the customer id to get the

function updateCustomer(customerID){
	$.ajax({
		url: '/customers/' + customerID,
		type: 'PUT',
		data: $('#customer-update').serialize(), 
		success: function(result){
		    window.location.replace("./");  // Navigate to previous 
		}
	})
};