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
  

  async function followHandle(userName) {
    const followButton = document.getElementById(userName);
    const isFollowed = followButton.classList.contains("isFollowed");
    const action = isFollowed ? "unfollow" : "follow";
  
    try {
      followButton.disabled = true;
  
      const response = await fetch(`/followUser?userName=${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
  
      if (response.ok) {
        const data = await response.json();
        followButton.innerHTML = data.isFollowed ? "Unfollow" : "Follow";
        followButton.classList.toggle("isFollowed", data.isFollowed);
        followButton.setAttribute("aria-pressed", data.isFollowed);
      } else {
        alert("Failed to update follow status. Please try again.");
        console.error("Failed to toggle follow state");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      followButton.disabled = false;
    }
  }

  async function seenHandle(notificationId) {
    const seenButton = document.getElementById(`notification-${notificationId}`);
    const isSeen = seenButton.getAttribute("data-is-seen") === "true";
  
    try {
      // Toggle action between "seen" and "unseen"
      const action = isSeen ? "unseen" : "seen";
  
      // Send request to the server
      const response = await fetch(`/notifications?notiId=${notificationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const newIsSeen = data.isSeen;
  
        // Update button state
        seenButton.setAttribute("data-is-seen", newIsSeen);
        seenButton.innerHTML = `<i class="bi ${newIsSeen ? "bi-eye" : "bi-eye-slash"}"></i>`;
      } else {
        alert("Failed to update notification status. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }
  
  //share profile
  function shareProfile(userName) {
    const host = window.location.origin; 
    const profileLink = `${host}/${userName}`;

    navigator.clipboard.writeText(profileLink)
        .then(() => {
            // notification
            const notification = document.createElement('div');
            notification.innerText = "Profile link copied to clipboard!";
            notification.className = "alert alert-success text-center position-fixed";
            notification.style.top = "50%";
            notification.style.left = "50%";
            notification.style.transform = "translate(-50%, -50%)";
            notification.style.zIndex = "9999";

            document.body.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 1500);
        })
        .catch((error) => {
            console.error("Failed to copy:", error);
            alert("Failed to copy the profile link. Please try again.");
        });
}


  //button follow handle
  document.addEventListener("DOMContentLoaded", () => {
    const notificationContainer = document.querySelector("#notificationTabsContent");

    notificationContainer.addEventListener("click", async (event) => {
        const target = event.target.closest(".notification-toggle");
        if (!target) return;

        const notificationId = target.getAttribute("data-notification-id");
        const isSeen = target.getAttribute("data-is-seen") === "true";

        try {
            const action = isSeen ? "unseen" : "seen";

            // Send request to the server
            const response = await fetch(`/notifications?notiId=${notificationId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action }),
            });

            if (response.ok) {
                const data = await response.json();
                const newIsSeen = data.isSeen;

                document
                    .querySelectorAll(`[data-notification-id="${notificationId}"]`)
                    .forEach((button) => {
                        button.setAttribute("data-is-seen", newIsSeen);
                        button.innerHTML = `<i class="bi ${newIsSeen ? "bi-eye" : "bi-eye-slash"}"></i>`;
                    });
            } else {
                alert("Failed to update notification status. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});