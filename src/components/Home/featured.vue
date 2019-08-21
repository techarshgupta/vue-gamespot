<template>
    <carousel :per-page="1" :mouse-drag="true" :paginationEnabled="false" :autoplay="true" :adjustableHeight="true" :loop="true">
        <slide v-for="(slide, index) in slides" :key="index">
           <div class="slider_bck" :style="{'background': `url(${slide.backgroundImage})`}">
               <div class="gradient">
                   <div class="container">
                       <div class="content">
                           <app-button linkTo="#" :addClass="['harsh']" type="btn">
                               review
                           </app-button>
                           <div class="item">
                               {{slide.title}}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import SlideOne from '../../assets/images/featured/1.jpg';
import SlideTwo from '../../assets/images/featured/2.jpg';
import SlideThree from '../../assets/images/featured/3.jpg';
import SlideFour from '../../assets/images/featured/4.jpg';

    export default {
        name: "featured",
        data(){
            return {
                slides:[
                    {
                        title:'red redemption',
                        backgroundImage: SlideOne
                    },
                    {
                        title:'dead man',
                        backgroundImage: SlideTwo
                    },
                    {
                        title:'raise of tomb rider',
                        backgroundImage: SlideThree
                    },
                    {
                        title:'spider man',
                        backgroundImage: SlideFour
                    },
                ]
            }
        },
        components:{
            Carousel,
            Slide,
        },
    }
</script>

<style scoped>

</style>