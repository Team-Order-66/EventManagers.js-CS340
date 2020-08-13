// this function will be used to delete a member when the button is clicked on form

function deleteVipMember(id){
    $.ajax({
        url:'/vipMembership/'+id,
        type:'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};