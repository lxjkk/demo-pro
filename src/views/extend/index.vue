<template>
  <div>
    <div class="main">
      <div class="main-title">
        <div><span v-text="title"></span></div>
        <a-popover v-model="visible" trigger="click">
          <div slot="content" style="width: 100px;cursor:pointer">服务协议</div>
          <div class="main-popover l-flex-allcenter">···</div>
        </a-popover>
      </div>
      <div class="main-container">
        <a-input-search style="width:550px;margin-left: 24px" placeholder="搜索服务名称" enter-button="搜索" size="large"
          @search="onSearch" />
        <a-tabs default-active-key="1" class="main-tabs">
          <a-tab-pane key="1" tab="全部">
            <div class="l-flex main-grid">
              <extendChunk title="即时通讯IM" status desc="聊天、会话，文字图片收发" surplus="剩余收发量（条）" :count="1243" @open="$router.push({path:'/user/utem/user-imserver'})" />
              <extendChunk title="全文搜索" status desc="ElasticSearch分布式搜索引擎" surplus="剩余收发量（条）" :count="1243" open @open="$router.push({path:'/user/utem/user-allsearch'})" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已开通">
            <a-empty style="margin-top: 150px" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="未开通">
            未开通
          </a-tab-pane>
        </a-tabs>
      </div>

      <footer class="main-footer">Copyright©2014-2020 嘉兴想天科技信息有限公司 Powered by 短说OSX</footer>
    </div>
  </div>
</template>

<script>
import extendChunk from '@/component/extend-chunk'
export default {
  components: {
    extendChunk
  },
  data () {
    return {
      title: '扩展服务',
      visible: false
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     if (vm.isAdmin) {
  //       vm.$router.push({ path: from.path })
  //     }
  //   })
  // },
  created () {
    if (this.isUser) {
    }
  },
  methods: {
    hide () {
      console.log(111)
      this.visible = false
    },
    onSearch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  @info-lamp: #909399;
  @status-color: #1890ff;
  color: #000000;
  font-size: 14px;
  padding-top: 9px;
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-data {
      margin-right: 26px;
    }
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .main-popover {
    width: 32px;
    height: 32px;
    font-size: 20px;
    background-color: #ffffff;
    cursor: pointer;
  }

  .main-container {
    height: 820px;
    margin-top: 16px;
    padding-top: 24px;
    background-color: #ffffff;
  }

  .main-footer {
    padding: 10px;
    text-align: center;
    color: #909399;
  }

  .main-tabs {
    margin-top: 8px;
    background: #e9f2f9;
    height: calc(100% - 44px);
    .main-grid {
      width: 100%;
      flex-wrap: wrap;
      overflow-y: auto;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    /deep/ .ant-tabs-top-bar {
      padding: 0 24px;
      background-color: #ffffff;
    }
    /deep/ .ant-tabs-tabpane {
      background-color: #e9f2f9;
      position: relative;
    }
  }
  /deep/ .ant-tabs {
    color: #555658;
  }

  /deep/ .ant-tabs-nav-container {
    font-size: 16px;
  }

  /deep/ .ant-tabs-bar {
    border-bottom: none;
    margin: 0;
  }

  /deep/ .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 0;
    padding-bottom: 10px;
  }

  /deep/ .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
    width: 56px;
  }
  /deep/ .ant-tabs .ant-tabs-top-content {
    height: calc(100% - 45px);
  }
}
</style>
