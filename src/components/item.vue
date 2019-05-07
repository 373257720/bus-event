<template>
  <tr :class="{'table-success':data.done}" @click="select(!data.selected,idx)">
    <td>
      <input type="checkbox" :checked="data.selected">
    </td>
    <td>{{idx+1}}</td>
    <td>{{data.text}}</td>
    <td>{{data.done? '完成':'待办'}}</td>
    <td>
      <div class="btn-group btn-group-sm">
        <Button class="btn-outline-success" :handle-click="complete">完成</Button>
        <Button class="btn-outline-danger" :handle-click="remove">删除</Button>
        <!-- <button class="btn btn-outline-success" @click.stop="complete(idx)">完成</button>
        <button class="btn btn-outline-danger" @click.stop="remove(idx)">删除</button>-->
      </div>
    </td>
  </tr>
</template>
<script>
import Button from './Button';
import bus from './bus';
export default {
      props:{
        data:Object,
        
        idx:[Number,String]
    },
    data(){
      return{
          guang:this.data,
      }
    },
    created(){
      // console.log(this.data)
    },
    methods:{
        complete(){
            // bus.$emit('completeitem',this.idx);
            this.$store.commit('comleteitem',this.idx)

          // this.data.done=!this.data.done
        },
        remove(){
            bus.$emit('removeitem',this.idx);
        },
        select(checked){
          // console.log(this.ggg
            bus.$emit('selectitem',checked,this.idx);
        }
    },
    components:{
        Button
    }
}
</script>

