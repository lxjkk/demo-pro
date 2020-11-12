<template>
  <div class="main">
    <div class="main-title">
      <div><span v-text="title"></span></div>
    </div>

    <div class="l-flex-between main-search">
      <div class="l-flex-align-center">
        <div class="search-text">关键字：</div>
        <div class="search-inp">
          <a-input placeholder="搜索网站名称、网站号、域名" />
        </div>
      </div>
      <div>
        <a-button class="btn-m" @click="form.keyword='';getList()">重置</a-button>
        <a-button type="primary" @click="getList">查询</a-button>
      </div>
    </div>

    <div class="tail-info l-container">
      <p class="title">协议列表</p>
      <a-table :rowKey="(record,index)=>{return index}" :data-source="data" :columns="columns" :pagination="false">
        <template slot="operation" slot-scope="text,record">
          <div>
            <a style="margin-right: 16px" @click="details(record)" href="javascript:;">详情</a>
            <a href="javascript:;" @click="showDrawer(record)">编辑</a>
          </div>
        </template>
      </a-table>
    </div>
    <a-drawer width="640" class="drawer" placement="right" :closable="false" :visible="visible" @close="onClose">
      <div class="title l-flex-between">
        <span>编辑协议</span>
        <a-icon type="close" style="cursor:pointer;" @click="onClose" />
      </div>
      <a-divider />

      <div class="input-m">
        <p class="title-l">所属服务</p>
        <a-input :value="detail.service_name" disabled />
      </div>

      <div class="input-m">
        <p class="title-l">协议名称</p>
        <a-input v-model="detail.name" placeholder="请输入" />
      </div>

      <div>
        <p class="title-l">协议内容</p>
        <a-textarea v-model="detail.content" style="height: 540px" placeholder="请输入" />
      </div>
      <a-divider />
      <div style="text-align: end;">
        <a-button style="margin-right:18px" @click="onClose">取消</a-button>
        <a-button type="primary" @click="edit">保存</a-button>
      </div>
    </a-drawer>

    <escape-drawer :visibleDrawer.sync="visibleDrawer" :content="detail.content" :title="detail.name"  />

    <div class="l-flex-end pagination">
        <a-pagination v-if="count>0" show-quick-jumper :current="form.page" :show-total="(total) => `共 ${total} 条`"
          :default-current="1" :total="count" @change="getList" />
      </div>
  </div>
</template>

<script>
import { serviceAgreementList, getServiceAgreement } from '@/api/get'
import { editServiceAgreement } from '@/api/post'
import escapeDrawer from '@/component/escape-drawer'

export default {
  components: {
    escapeDrawer
  },
  data () {
    return {
      title: '服务协议',
      visible: false,
      visibleDrawer: false,
      count: 0,
      form: {
        page: 1,
        limit: 10,
        keyword: ''
      },
      detail: {
        name: '',
        content: '',
        service_name: ''
      },
      data: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 75,
          key: 'id'
        },
        {
          title: '协议名称',
          dataIndex: 'name',
          width: 295,
          key: 'name'
        },
        {
          title: '所属服务',
          dataIndex: 'service_name',
          width: 260,
          key: 'service_name'
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time'
        },
        {
          title: '操作',
          width: 144,
          dataIndex: 'strip',
          key: 'state',
          scopedSlots: {
            customRender: 'operation'
          }
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const res = await serviceAgreementList(this.form)
        this.data = res.data
      } catch (err) {
        console.log(err)
      }
    },
    async showDrawer (item) {
      await this.getDetails(item)
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    async details (item) {
      await this.getDetails(item)
      this.visibleDrawer = true
    },
    async getDetails (item) {
      try {
        const { data } = await getServiceAgreement({ id: item.id })
        this.detail.service_name = data.service_name
        this.detail.name = data.name
        this.detail.content = data.content
        console.log(data, '哈哈哈哈')
        return
      } catch (err) {
        console.log(err)
      }
    },
    async edit () {
      try {
        const res = await editServiceAgreement(this.detail)
        if (res.msg === 'ok') {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  @info-lamp: #909399;
  @status-color: #52c41a;
  color: #000000;
  font-size: 14px;
  padding-top: 9px;

  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .main-search {
    height: 90px;
    background-color: #ffffff;
    padding: 0 24px;
    margin: 16px 0;
    .search-text {
      width: 60px;
    }
    .search-inp {
      width: 290px;
    }
    .btn-m {
      margin-right: 8px;
    }
  }

  .tail-info {
    .title {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
