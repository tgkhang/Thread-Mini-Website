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
  



  async function likeThread(threadId, userId) {
    try {
    
      const likeButton = document.getElementById(threadId);
      const isLiked = likeButton.classList.contains("liked");
 
      const action = isLiked ? "unlike" : "like";
  
     
      const res = await fetch(`/likeThread?threadId=${threadId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, action }),
      });
  
      if (res.ok) {
        // Parse the JSON response
        const data = await res.json();
  
        // Update the like button and count
        likeButton.innerHTML = `<i class="bi bi-heart${!isLiked ? '-fill' : ''} me-1"></i>${data.totalLikes}`;
        likeButton.classList.toggle("liked", !isLiked);
    } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  