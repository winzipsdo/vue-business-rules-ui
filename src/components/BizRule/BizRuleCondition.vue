<template lang="pug">
  .bizrulecondition-container
    el-input(
      v-model="pipe.name"
      placeholder="字段名称"
      style="width: 150px; margin-right: 16px;"
      clearable
    )
    el-select(v-model="pipe.operator" style="width: 90px; margin-right: 16px;")
      el-option(label="==" value="eq")
      el-option(label="!=" value="neq")
      el-option(label="<" value="lt")
      el-option(label=">" value="gt")
      el-option(label="<=" value="lte")
      el-option(label=">=" value="gte")
      el-option(label="in" value="in")
      el-option(label="not in" value="not_in")
    el-badge(
      :value="pipe.val_type === 'string' ? '字符串' : '数字'"
      :type="pipe.val_type === 'string' ? 'info' : 'success'"
      @click.native="switchVarType($event, pipe)"
      style="margin-right: 50px;"
    )
      el-input(
        v-model="pipe.value"
        placeholder="字段值"
        style="width: 150px;"
        clearable
      )
    el-button(@click="delSelf" type="danger" icon="el-icon-delete" circle)
</template>

<script>
export default {
  name: 'biz-rule-condition',
  props: ['pipe'],
  methods: {
    // 切换参数类型
    switchVarType(e, kv) {
      if (String(e.target.tagName).toUpperCase() === 'SUP') {
        kv.val_type = kv.val_type === 'number' ? 'string' : 'number';
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
.bizrulecondition-container {
  display: flex;
  flex-direction: row;

  & >>> .el-badge__content {
    transition: 400ms;
    user-select: none;
  }

  & >>> .el-badge__content:hover {
    cursor: pointer;
  }
}
</style>
