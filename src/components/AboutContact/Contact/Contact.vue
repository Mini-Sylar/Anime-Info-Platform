<template >
    <div class="right-contact">
        <h1>Get in touch</h1>
        <form @submit.prevent.default="submitForm">
            <!-- contact form -->
            <div class="contact-form">
                <div class="contact-form-left">
                    <div class="contains-input">
                        <label for="reply_to">Email</label>
                        <input class="form-input" name="reply_to" type="email" placeholder="The way for me to reach you.📧"
                            required>
                    </div>
                    <div class="contains-input">
                        <label for="subject">Subject</label>
                        <input class="form-input" name="subject" type="text" placeholder="What are we talking about?😊"
                            required>
                    </div>
                </div>
                <div class="contact-form-right">
                    <label for="message">Message</label>
                    <textarea class="form-input" name="message" cols="20" rows="10" placeholder="Your message goes here 👈"
                        required></textarea>
                </div>
                <div class="send-message-container" v-once>
                    <button class="btn btn-reverse btn-arrow send-message" type="submit" title="Reach out to me">
                        Send Message
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const submitForm = () => {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this.$refs.form, 'YOUR_PUBLIC_KEY')
        .then((result) => {
            toast.success("Message sent successfully!");
        }, (error) => {
            toast.error("There was a problem sending your message, try again");
        });

}


</script>
<style scoped>
.right-contact {
    width: 40em;
    height: min(40em, 80vh);
    padding: 0 2rem;
    overflow-x: hidden;
    transition: all 0.3s ease-in-out;
}

.contact-form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 40em;
    padding: 2rem 2rem;
    background-color: #0195ff18;
    box-shadow: 0 0 10px 0 #0195ff18;
    position: relative;
    right: 0;
}

label {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    padding: 0 1rem;
    margin-bottom: 0;
}

input {
    width: 90%;
    height: 2.5rem;
    padding: 1rem 1rem;
    border: none;
    border-bottom: 1px solid #0195ff;
    background-color: transparent;
    outline: none;
    color: white;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.568);
}

textarea {
    width: 90%;
    height: 10rem;
    padding: 1rem 1rem;
    border: none;
    border-bottom: 1px solid #0195ff;
    background-color: transparent;
    outline: none;
    color: white;
    resize: none;
}

textarea:focus {
    border-bottom: 1px solid #0195ff;
}

.contains-input {
    margin-bottom: 3rem;
}

button {
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    border-color: transparent;
}

.more-info-container {
    display: flex;
    margin-block: .8rem;
    position: relative;
}



.send-message-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

@media screen and (max-width:768px) {
    .right-contact {
        width: 100%;
        height: 70vh;
        overflow: scroll;
        padding: 0 1rem;
        transition: all 0.3s ease-in-out;
        position: static;
    }

    .right-contact::-webkit-scrollbar {
        display: none;
    }

    .contact-form {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: static;
    }

    input,
    textarea {
        width: 100%;
    }


}
</style>