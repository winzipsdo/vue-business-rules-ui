<template lang="pug">
  .home
    biz-rule-all-any(:pipe="pipe")
    div(style="height: 20px;")
    el-input(ref="input_expression" type="textarea" :disabled="false" :value="crtOriginBizRule" spellcheck="false")
</template>

<script>
// @ is an alias to /src
import BizRuleAdapter from '@/components/BizRule/BizRuleAdapter.js';

export default {
  name: 'home',
  components: {
    BizRuleAllAny: () => import('@/components/BizRule/index.vue'),
  },
  data() {
    return {
      pipe: {
        type: 'all_any',
        condition: 'all',
        children: [],
        isRoot: true,
      },
    };
  },
  computed: {
    crtOriginBizRule() {
      return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
    },
  },
};
</script>
