import './Vista.css';
function Vista() {

  return (

    //UI INSPIRED FROM https://codepen.io/MuzammalAhmed/pen/qBvdwVq
    
    <div className='body'>
     <div >
        </div>
        <section class=" section Chat">
            <div class="ChatHead">
                <li class="group">
                    <div class="avatar"></div>
                    <h2 class="secondary-heading GroupName mb-0">Vista - Your Personal Therapist</h2>

                </li>
            </div>
            <div class="MessageContainer">
                <span></span>
                <div class="messageSeperator">Yesterday</div>
                <div class="message me">
                    <p class="messageContent">Hello!</p>
                </div>
                <div class="message me">
                    <p class="messageContent">How are You!</p>

                </div>
                <div class="message you">
                    <p class="messageContent">I'm Fine!</p>
                </div>
                <div class="message you">
                    <p class="messageContent">How are You!</p>
                </div>
                <div class="message me">
                    <p class="messageContent">I'm also Fine!</p>
                </div>
                <div class="message me">
                    <p class="messageContent">Send Me the Pics!</p>
                </div>
                <div class="messageSeperator">Today</div>
                <div class="message you">
                    <p class="messageContent">Sorry for the Delay!</p>
                </div>
                <div class="message you">
                    <p class="messageContent">Here are Pics!</p>
                </div>
            </div>
            <form id="MessageForm">
                <input type="text" id="MessageInput"></input>
                <button class="btn btn-success">Send</button>
            </form>
        </section>
    </div>
  );
}

export default Vista;
