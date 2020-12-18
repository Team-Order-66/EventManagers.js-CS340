// this funciton will delete a customer by its id

function deleteCustomer(customerID){
	$.ajax({
		url: '/customers/' + customerID,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true); // reload the customers page after the delete as happened
		}
	})
};