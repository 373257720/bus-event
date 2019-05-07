<template>
       <button class="btn" @click.stop="handleClick"><slot></slot></button>
</template>
<script>
export default {
    // 把组件的属性变成实例属性
    props:['handleClick'],
    mounted(){
        // console.log(this.handleClick);
    }
}
</script>
