<template >
    <div class="right-contact">
        <h1>Get in touch</h1>
        <form @submit.prevent.default="submitForm">
            <!-- contact form -->
            <div class="contact-form">
                <div class="contact-form-left">
                    <div class="contains-input">
                        <label for="email">Email</label>
                        <input class="form-input" name="email" type="email" placeholder="The way for me to reach you"
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
                    <textarea class="form-input" name="message" cols="20" rows="10" placeholder="What you want to tell me"
                        required></textarea>
                </div>
                <div class="send-message-container" v-once>
                    <button class="btn btn-reverse btn-arrow send-message" type="submit" title="Reach out to me">
                        <span>Send Message<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36.1 25.8"
                                enable-background="new 0 0 36.1 25.8" xml:space="preserve">
                                <g>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10" x1="0"
                                        y1="12.9" x2="34" y2="12.9"></line>
                                    <polyline fill="none" stroke="#FFFFFF" stroke-width="3" stroke-miterlimit="10"
                                        points="22.2,1.1 34,12.9 22.2,24.7   "></polyline>
                                </g>
                            </svg></span>
                    </button>
                </div>
            </div>

        </form>
    </div>
</template>
<script setup>
const submitForm = () => {
    console.log('submitting form')
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
    /* fancy contact form on background with box shadow*/
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
    /* fancy label */
    color: white;
    font-size: 1rem;
    font-weight: 500;
    padding: 0 1rem;
    margin-bottom: 0;
}

input {
    /* fancy input with border at bottom only */
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
    /* fancy text area */
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
    /* background-color: v-bind("setColor"); */
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    left: -10px;
}

.more-info-container {
    display: flex;
    margin-block: .8rem;
    position: relative;
}

/* Button CSS GOES HERE */
.btn,
button {
    border: none;
    letter-spacing: 1.5px;
    transition: color 0.1s cubic-bezier(0.16, 0.08, 0.355, 1),
        background 0.1s cubic-bezier(0.16, 0.08, 0.355, 1);
    display: inline-block;
    cursor: pointer;
    min-width: 9rem;
    outline: none;
    vertical-align: middle;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.btn:hover,
button:hover {
    color: #fff;
}

.btn-border {
    background-color: transparent;
    color: #1d1d1d;
}

.btn-arrow {
    position: relative;
    transition: background-color 300ms ease-out;
}

.btn-arrow span {
    display: inline-block;
    position: relative;
    transition: all 300ms ease-out;
    will-change: transform;
    color: white;
    font-weight: 900;
}

.btn-arrow:hover span {
    transform: translate3d(-1rem, 0, 0);
}

.btn-arrow svg {
    position: absolute;
    width: 1.1em;
    right: 0px;
    right: 0rem;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms ease-out;
    will-change: right, opacity;
}

.btn-arrow svg * {
    stroke-width: 5;
}

.btn-arrow:hover svg {
    opacity: 1;
    right: -2rem;
}

.send-message-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

@media screen and (max-width:768px) {
    .right-contact {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0 1rem;
        transition: all 0.3s ease-in-out;
        position: static;
    }

    .contact-form {
        width: 100%;
        height: 70vh;
        overflow: auto;
        position: static;
    }

    input,
    textarea {
        width: 100%;
    }

    button {
        position: static;
    }

}
</style>