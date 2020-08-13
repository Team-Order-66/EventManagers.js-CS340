// this function will update the customer using the customer id to get the

function updateCustomer(customerID){
	$.ajax({
		url: '/customers/' + customerID, 
		type: 'PUT',
		data: $('#customer-update').serialize(), // serialize the data we got from the inputs
		success: function(result){
            // after succesfully updating, we will go to the url /customers using the .assign- essentially back to our previous page
		    window.location.assign("/customers");  
		}
	})
};