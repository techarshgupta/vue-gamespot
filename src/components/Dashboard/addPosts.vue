<template>
    <div class="dashboard_form">
        <h1>Add Posts</h1>
        <form @submit.prevent="submitHandler">
            <div v-if="imageUpload">
                <img :src="imageUpload">
            </div>
            <div class="input_field">
                <input type="file" @change="processFile($event)" ref="myFileInput">
            </div>

            <div class="input_field" :class="{invalid: $v.formdata.title.$error}">
                <label>Title</label>
                <input type="text" v-model="formdata.title" @blur="$v.formdata.title.$touch()">
                <p class="error_label" v-if="$v.formdata.title.$error">
                    this input field is required
                </p>
            </div>

            <div class="input_field" :class="{invalid: $v.formdata.desc.$error}">
                <label>Description</label>
                <input type="text" v-model="formdata.desc" @blur="$v.formdata.desc.$touch()">
                <p class="error_label" v-if="$v.formdata.desc.$error">
                    this input field is required
                </p>
                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                    You entered too much characters than {{$v.formdata.desc.$params.maxLength.max}}
                </p>
            </div>

            <div class="input_field">
                <wysiwyg v-model="formdata.content"></wysiwyg>
            </div>

            <div class="input_field" :class="{invalid: $v.formdata.rating.$error}">
                <label>Rating</label>
                <select v-model="formdata.rating" @blur="$v.formdata.rating.$touch()">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <p class="error_label" v-if="$v.formdata.rating.$error">
                    You need to select atleast one
                </p>
            </div>

            <button type="submit">Add Post</button>
        </form>

        <md-dialog :md-active="dialog">
            <p>Your post has no content are you sure you want to add</p>

            <md-dialog-actions>
                <md-button class="md-primary" @click="dialogOnCancel">OOPS, I want to add it.</md-button>
                <md-button class="md-primary" @click="dialogOnConfirm">Yes I'm sure.</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div v-if="addPosts" class="post_succesfull">
            Your post was posted
        </div>
    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

    export default {
        name: "addPosts",
        data(){
            return{
                dialog: false,
                formdata:{
                    img: '',
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                }
            }
        },
        validations:{
            formdata: {
                title: {
                    required,
                },
                desc:{
                    required,
                    maxLength: maxLength(100)
                },
                rating: {
                    required
                },
            }
        },
        methods:{
            submitHandler(){
                if(!this.$v.$invalid){
                    if(this.formdata.content === ''){
                        this.dialog = true
                    }else{
                        this.addPost()
                    }
                } else{
                    alert("wrong")
                }
            },
            dialogOnCancel(){
                this.dialog = false
            },
            dialogOnConfirm(){
                this.dialog = false;
                this.addPost()
            },
            addPost(){
                //console.log("add post");
                this.$store.dispatch('admin/addPost', this.formdata)
            },
            clearPost(){
                this.$v.$reset();
                this.$refs.myFileInput.value = '';
                this.formdata = {
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                }
            },
            processFile(event){
                let file = event.target.files[0];
                this.$store.dispatch('admin/imageUpload', file)
            }
        },
        computed:{
            addPosts(){
                let status = this.$store.getters['admin/addPostStatus'];
                if(status){
                    this.clearPost()
                    this.$store.commit('admin/clearImageUpload')
                }
                return status;
            },
            imageUpload(){
                let imageUrl = this.$store.getters['admin/imageUpload'];
                this.formdata.img = imageUrl;
                return imageUrl
            }
        },
        destroyed() {
            this.$store.commit('admin/clearImageUpload')
        }
    }
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

    .input_field.invalid input,
    .input_field.invalid select {
        border: 1px solid red;
    }
</style>