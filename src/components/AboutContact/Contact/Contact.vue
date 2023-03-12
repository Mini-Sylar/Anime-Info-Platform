<template >
    <div class="right-contact">
        <h1>Get in touch</h1>
        <form @submit.prevent.default="submitForm" ref="getForm">
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
                    <button class="btn btn-reverse btn-arrow send-message" type="submit" title="Reach out to me"
                        :disabled="isButtonDisable">

                        <transition name="fade">
                            <span v-if="isButtonDisable"><svg class="is-contact-loader" version="1.1" id="L9"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                    y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                                    <rect x="20" y="50" width="4" height="10" fill="#fff">
                                        <animateTransform attributeType="xml" attributeName="transform" type="translate"
                                            values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                    <rect x="30" y="50" width="4" height="10" fill="#fff">
                                        <animateTransform attributeType="xml" attributeName="transform" type="translate"
                                            values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                    <rect x="40" y="50" width="4" height="10" fill="#fff">
                                        <animateTransform attributeType="xml" attributeName="transform" type="translate"
                                            values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                                    </rect>
                                </svg></span>

                        </transition>
                        Send Message
                    </button>
                </div>

            </div>
        </form>

    </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
import { ref, computed } from "vue";
import emailjs from '@emailjs/browser';

const serviceID = import.meta.env.VITE_SERVICE_ID
const templateID = import.meta.env.VITE_TEMPLATE_ID
const publicKey = import.meta.env.VITE_PUBLIC_API_KEY
const buttonDisabled = ref(false)
const isButtonDisable = computed(() => {
    return buttonDisabled.value
})
const getForm = ref(null)
const toast = useToast();
const submitForm = () => {
    buttonDisabled.value = true
    emailjs.sendForm(serviceID, templateID, getForm.value, publicKey)
        .then((result) => {
            toast.success("Message sent successfully!");
            buttonDisabled.value = false
            getForm.value.reset()
        }, (error) => {
            toast.error("There was a problem sending your message, try again");
            buttonDisabled.value = false
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
    border-radius: 25px;
    cursor: pointer;
    border-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    transition: all .2s ease;
}

span {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
}

button:disabled {
    background-color: gray !important;
    transition: all .2s ease;
    cursor: not-allowed;
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