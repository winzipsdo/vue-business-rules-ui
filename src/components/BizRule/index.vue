<template lang="pug">
  .allany-container
    .control-bar
      el-select(v-model="pipe.condition" style="width: 200px; margin-right: 16px;")
        el-option(label="满足以下所有条件" value="all")
        el-option(label="满足以下任一条件" value="any")
      el-button(@click="addCondition('condition')" type="primary") 添加条件
      el-button(@click="addCondition('all_any')" type="success") 添加子条件
      el-button(v-if="!pipe.isRoot" @click="delSelf" type="danger" icon="el-icon-delete" circle)
    .conditions-wrapper
      .conditions-wrapper--gap
      .conditions-wrapper--conditions
        .conditions-wrapper--condition(v-for="(child, idx) in pipe.children" :key="idx")
          biz-rule-all-any(v-if="child.type === 'all_any'" :pipe="child")
          biz-rule-condition(v-else-if="child.type === 'condition'" :pipe="child")
</template>

<script>
import BizRuleCondition from './BizRuleCondition.vue';

export default {
  name: 'biz-rule-all-any',
  components: { BizRuleCondition },
  props: ['isRoot', 'pipe'],
  methods: {
    // 添加条件
    addCondition(type) {
      if (type === 'all_any') {
        this.pipe.children.push({
          type: 'all_any',
          condition: 'all',
          children: [],
        });
      } else if (type === 'condition') {
        this.pipe.children.push({
          type: 'condition',
          name: '',
          operator: 'eq',
          value: '',
          val_type: 'string',
        });
      }
    },
    // 删除操作
    delSelf() {
      const idx = Array().indexOf.call(this.$parent.pipe.children, this.pipe);
      this.$parent.pipe.children.splice(idx, 1);
    },
  },
};
</script>

<style lang="stylus" scoped>
.allany-container {
}

.control-bar {
  display: flex;
  flex-direction: row;
}

.conditions-wrapper {
  display: flex;
  flex-direction: row;
}

.conditions-wrapper--gap {
  width: 4px;
  margin: 5px 10px;
  margin-bottom: 0;
  border-radius: @width * 0.5;
  background-color: rgb(245, 245, 245);
  transition: background-color 400ms;

  &:hover {
    background-color: rgb(144, 147, 153);
  }
}

.conditions-wrapper--conditions {
  display: flex;
  flex-direction: column;
}

.conditions-wrapper--condition {
  padding-top: 15px;
}
</style>
