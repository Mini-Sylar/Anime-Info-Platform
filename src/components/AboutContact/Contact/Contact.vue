<template >
    <div class="right-contact">
        <h1>Contact</h1>
        <form action="#">
            <!-- contact form -->
            <div class="contact-form">
                <div class="contact-form-left">
                    <input type="email" placeholder="Email">
                    <input type="text" placeholder="Subject">
                </div>
                <div class="contact-form-right">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>

</script>
<style scoped>
.right-contact {
    width: 100%;
    height: min(40em, 80vh);
    padding: 0 2rem;
    overflow-x: hidden;
    background-color: darkolivegreen;
    transition: all 0.3s ease-in-out;
}

.contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

input {
    width: 100%;
    height: 2rem;
    margin: 1rem 0;
    padding: 0 1rem;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    outline: none;
}

textarea {
    width: 100%;
    height: 100%;
    margin: 1rem 0;
    padding: 1rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    outline: none;
}
</style>