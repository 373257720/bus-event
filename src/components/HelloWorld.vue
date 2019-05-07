<template>
  <div class="hello">
    <toform @additem="addItem"></toform>

    <!-- <dir style="position:relative;width:10rem;height:10rem;">
         <input type="text" class="search" placeholder="搜索" v-model.trim="title"  style="position:absolute;left:0.5rem;">   
          <img src="../assets/logo.png" alt="" style="width:10px;height:10px;position:absolute;left:0.5rem;">
    </dir>-->
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="80">
            <input type="checkbox" v-model="checkAll">全选
          </th>
          <th scope="col" width="50">#</th>
          <th scope="col" width="300">待处理事项</th>
          <th scope="col" width="80">状态</th>
          <th scope="col" width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr is="item" v-for="(item,idx) in datalist" :key="item.id" :data="item" :idx="idx"></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import toform from "./form";
import bus from "./bus";
// import Todolist from "../components/content";
import Item from "./Item";
// import myFilter from "./Filter";
// import Dynamic from "./Dynamic";
// import Transition from "./Transition";
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  name: "HelloWorld",
  // data() {
  //   return {
  //     msg: "Welcome to Your Vue.js App",
  //     title: "",
  //     search: []
  //   };
  // },
  // watch: {
  //   //watch title change
  //   title() {
  //     delay(() => {
  //       this.fetchData();
  //     }, 300);
  //   }
  // },
  // methods: {
  //   async fetchData(val) {
  //     const res = await this.$axios({
  //       url: "写上你的URL",
  //       method: "GET",
  //       params: { title: this.title }
  //     });
  //     this.search = res.data.list;
  //   }
  // },
  // mounted() {
  //   console.log(delay);
  // },
  //   props:{
  //       datalist:{
  //           type:Array,
  //           required:true
  //       }
  //   },
  data() {
    return {
      // ii:this.$store.state.idx,
      datalist: [
        {
          id: parseInt(Math.random() * 1000 + 1),
          text: "今晚打老虎",
          done: false, //是否完成
          selected: false //是否选中
        }
      ]
      // checkAll:false
    };
  },
  computed: {
    idx:function(){ 
          console.log(this.$store.state.idx) ;
      }, 
      // return this.$store.state.idx;
    

    checkAll: {
      get() {
        return this.datalist.every(item => item.selected);
      },
      set(checked) {
        this.selectItem(checked);
      }
    },
    abc() {
      return (
        this.datalist[this.$store.state.idx].done !=
        this.datalist[this.$store.state.idx].done
      );
    }
  },
  watch: {
    ii(newName, oldName) {
      if(oldName==newName){
        console.log(111)
            // this.datalist[newName].done=! this.datalist[newName].done
      }else{
         this.datalist[newName].done=! this.datalist[newName].done
      }

    }
  },
  methods: {
    // 添加待办事项
    addItem(item) {
      // console.log(item);
      // 传入的格式：{text}
      // 修改成所需格式：{text,id,done}
      item.id = parseInt(Math.random() * 1000 + 1);
      item.done = false;
      item.selected = false;
      this.datalist.push(item);
    },
    // 完成待办事项
    completeItem(idx) {
     this.datalist[idx].done =!this.datalist[idx].done;
    },
    // 删除待办事项
    removeItem(idx) {
      this.datalist.splice(idx, 1);
    },
    // 修改selected属性（选中或不选）
    selectItem(checked, idx) {
      // 全部操作
      if (idx === undefined) {
        this.datalist.forEach(item => {
          item.selected = checked;
        });
      }
      // 单个操作
      else {
        this.datalist[idx].selected = checked;
      }
    }
  },
  mounted() {
    //  this.datalist[this.$store.state.idx].done =!this.datalist[this.$store.state.idx].done;
    bus.$on("selectitem", (checked, idx) => {
      this.selectItem(checked, idx);
      // console.log(11)
    });
    bus.$on("completeitem",  idx => {
      this.completeItem(idx);
      // console.log(11)
    });
    bus.$on("removeitem", idx => {
      this.removeItem(idx);
      // console.log(11)
    });
  },
  components: {
    Item,
    toform
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
