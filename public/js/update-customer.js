/*
 *
 *   UPDATE STUFF I ATTEMPTED
 *
*/



function updateCustomer(customerID){
	$.ajax({
		url: '/people/' + customerID.
		type: 'PUT',
		data: $('#update-customer').serialize(),
		success: function(result){
			window.location.replace("./";
		}
	})
};
