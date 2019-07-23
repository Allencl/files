<style lang="less">

</style>
<template>
  <FlowBase
    :data="dataInit"   
    :getData="getDataFunc"
  ></FlowBase>
</template>

<script>
import FlowBase from './flow.vue';

export default {
  components:{FlowBase},
  data() {
    return {
      // dataInit:{"nodes":[
      //   {"type":"node","labelStyle":{"stroke":"#FFFF00"},"shape":"flow-circle","size":"72*72","color":"#FA8C16","label":"起止节点2323","x":317,"y":157,"id":"36549c65","index":4},
      //   {"type":"node","shape":"flow-capsule","size":"80*48","color":"#722ED1","label":"fdsdsds","x":441,"y":445,"id":"39bf9317","index":5},
      //   {"type":"node","shape":"flow-circle","size":"72*72","color":"#FA8C16","label":"2323","x":837,"y":177,"id":"110fb135","index":6}],
        
      //   "edges":[
      //     {"source":"39bf9317","sourceAnchor":0,"target":"36549c65","targetAnchor":3,"id":"80965d1a","labelRectStyle":{"fill":"#ffffff"},"style":{"stroke":"#79838e"},"index":0,"label":{"text":"是的撒多"}},
      //     {"source":"110fb135","sourceAnchor":3,"target":"39bf9317","targetAnchor":2,"id":"f4fff935","labelRectStyle":{"fill":"#ffffff"},"style":{"stroke":"#7F1987"},"label":{"text":"多少度"},"index":1},
      //     {"source":"110fb135","sourceAnchor":3,"target":"36549c65","targetAnchor":1,"id":"64e490ce","labelRectStyle":{"fill":"#ffffff"},"style":{"stroke":"#5CED68"},"label":{"text":"二位"},"shape":"flow-smooth","index":2},
      //     {"source":"39bf9317","sourceAnchor":1,"target":"110fb135","targetAnchor":1,"id":"ecece4bf","labelRectStyle":{"fill":"#ffffff"},"index":3,"label":{"text":"是的撒多"}}
      //   ]
      // }
      
    dataInit:{"nodes":[{"nodenamenow":"over","type":"node","shape":"flow-circle","size":"72*72","color":"#999900","label":"结束66","x":997,"y":317,"id":"667a0e58","index":4},{"nodenamenow":"model","type":"node","shape":"flow-capsule","size":"80*48","color":"#018F3C","label":"模型11","x":461,"y":405,"id":"4d01656c","index":5},{"nodenamenow":"begin","type":"node","shape":"flow-circle","size":"72*72","color":"#2705F4","label":"开始1","x":424,"y":179,"id":"ca79ab2b","index":6},{"nodenamenow":"normal","type":"node","shape":"flow-rect","size":"80*48","color":"#1890FF","label":"常规88","x":781,"y":117.5,"id":"35d5697d","index":7}],"edges":[{"source":"ca79ab2b","sourceAnchor":1,"target":"4d01656c","targetAnchor":3,"id":"e1fe81d5","labelRectStyle":{"fill":"#ffffff"},"label":{"text":"wqwqw"},"style":{"stroke":"#EB0101"},"index":0},{"source":"ca79ab2b","sourceAnchor":2,"target":"35d5697d","targetAnchor":3,"id":"ec60a618","labelRectStyle":{"fill":"#ffffff"},"shape":"flow-smooth","label":{"text":"12212"},"style":{"stroke":"#097362"},"index":1},{"source":"4d01656c","sourceAnchor":1,"target":"667a0e58","targetAnchor":2,"id":"bd7812e4","labelRectStyle":{"fill":"#ffffff"},"label":{"text":"ewewe"},"style":{"stroke":"#15770D"},"index":2},{"source":"4d01656c","sourceAnchor":0,"target":"667a0e58","targetAnchor":0,"id":"bf888934","labelRectStyle":{"fill":"#ffffff"},"label":{"text":"ewew"},"style":{"stroke":"#A97F0B"},"index":3},{"source":"35d5697d","sourceAnchor":1,"target":"667a0e58","targetAnchor":0,"id":"9cb4fd78","labelRectStyle":{"fill":"#ffffff"},"style":{"stroke":"#037A77"},"shape":"flow-polyline-round","label":{"text":"问问"},"index":8}]}

    }
  },
  methods: {
    /**
     * 获取 流程图数据
     */
    getDataFunc: function(data){
      console.log(data);
      console.log(JSON.stringify(data) );

    }
  }
}
</script>

