function checkPasswordConfirm(formId) {
    console.log('checkPasswordConfirm called');
    let password = document.querySelector(`#${formId} [name=password]`);
    let confirmPassword = document.querySelector(`#${formId} [name=confirmPassword]`);

    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords not match!');
        confirmPassword.reportValidity();
    } else {
        confirmPassword.setCustomValidity('');
    }
}

async function follow(userName,id) {
    //console.log(userName);
    // Select the element by its ID
    const element = document.querySelector(`#${CSS.escape(userName)}`);
    
    // Access the text content
    const tmp = element.textContent.trim(); // `trim` removes extra whitespace
    //console.log(tmp);
    if(tmp=='Unfollow'){
        element.textContent= 'Follow';
        //unfollow
        try{
            const res= await fetch(`/unfollow?id=${id}`,{
                method:'DELETE',
            });

            if(res.statusCode==200){
                return location.reload
            }
            const resText= await res.text()
            throw new Error(resText);
        }
        catch(error){
            console.error('Error:', error);
            element.textContent= 'Unfollow';
        }

    }
    else{
        element.textContent= 'Unfollow';
        //follow
        try{
            const res= await fetch(`/follow?id=${id}`,{
                method:'POST',
            });

            if(res.statusCode==200){
                return location.reload
            }
            const resText= await res.text()
            throw new Error(resText);
        }
        catch(error){
            console.error('Error:', error);
            element.textContent= 'Follow';
        }
    }
  }
  