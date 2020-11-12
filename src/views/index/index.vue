<template>
  <div class="main">
    <div class="main-title">
      <div><span v-text="isUser?'即时通讯IM':title"></span></div>
      <div class="l-flex-allcenter" >
        <a-button class="btn-data" @click="deriveData">导出数据</a-button>
        <a-icon type="redo" @click="getList" />
      </div>
    </div>

    <div class="l-flex-between main-search">
      <div class="l-flex-align-center">
        <div class="search-text">关键字：</div>
        <div class="search-inp">
          <a-input v-model="form.keyword" placeholder="搜索网站名称、网站号、域名" />
        </div>
      </div>
      <div>
        <a-button class="btn-m" @click="form.keyword='';getList()">重置</a-button>
        <a-button type="primary" @click="getList">查询</a-button>
      </div>
    </div>

    <div class="main-list">
      <div class="list-title l-flex-align-center" v-text="listTitle"></div>
      <div class="l-flex list-data">
        <div class="info">
          <span>{{ '全部' + '  ' + 213 }}</span>
        </div>
        <div class="info l-flex-end">
          <div class="lamp lamp-on"></div>
          <span>{{ '正常' + '  ' + 213 }}</span>
        </div>
        <div class="info l-flex-end">
          <div class="lamp lamp-off"></div>
          <span>{{ '停用' + '  ' + 213 }}</span>
        </div>
      </div>
      <div>
        <a-table :rowKey="(record,index)=>{return index}" :data-source="data" :columns="columns" :pagination="false">
          <div slot="filterDropdown" slot-scope="{
              selectedKeys,
              column
            }" style="padding: 9px 12px">
            <a-input-search v-ant-ref="(c) => (searchInput = c)" :placeholder="`搜索${column.title}`"
              :value="selectedKeys[0]" style="width: 120px;margin-bottom: 17px" @search="onSearch" />
            <div class="l-flex-between">
              <a>搜索</a>
              <a class="reset">重置</a>
            </div>
          </div>
          <a-icon slot="filterIcon" slot-scope="filtered" type="search"
            :style="{ color: filtered ? '#108ee9' : undefined }" />
          <template slot="customRender" slot-scope="text, record, index, column">
            <span v-if="searchText && searchedColumn === column.dataIndex">
              <template v-for="(fragment, i) in text
                  .toString()
                  .split(
                    new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')
                  )">
                <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i"
                  class="highlight">{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>
              {{ text }}
            </template>
          </template>
          <template slot="status" slot-scope="record">
            <div class="l-flex-allcenter">
              <div class="status-lamp" :class="record?'lamp-on':'lamp-off'"></div>
              <span>{{ record?'正常':'停用' }}</span>
            </div>
          </template>
          <template slot="action" slot-scope="text,record">
            <div>
              <a style="margin-right: 16px"
                @click="$router.push({path:'/admin/tem/imserver/details',query:{title: record.site_title,id:record.id }});"
                href="javascript:;">详情</a>
              <a href="javascript:;" @click="showModal(record)">充值</a>
            </div>
          </template>
        </a-table>
      </div>
      <div class="l-flex-end pagination">
        <a-pagination v-if="count>0" show-quick-jumper :current="form.page" :show-total="(total) => `共 ${total} 条`"
          :default-current="1" :total="count" @change="getList" />
      </div>
    </div>

    <top-up :title="ModalTitle" :data="ModalData" :visible.sync="visible" @ok="ok" />
  </div>
</template>

<script>
import { getImSiteList, saveWebsitExport } from '@/api/get'
import { recharge } from '@/api/post'
import topUp from '@/component/top-up.vue'

export default {
  name: 'index',
  components: {
    topUp
  },
  data () {
    return {
      title: '即时通讯IM服务管理',
      listTitle: '站点列表',
      searchText: '',
      searchInput: null,
      ModalData: {},
      ModalTitle: '',
      searchedColumn: '',
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      data: [],
      derive_data: [],
      columns: [
        {
          title: '网站名称',
          dataIndex: 'site_title',
          width: 179,
          key: 'site_title',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.name.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '网站号',
          dataIndex: 'site_order',
          width: 196,
          key: 'site_order',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.age.toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '域名',
          dataIndex: 'site_url',
          key: 'site_url',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '版本号',
          dataIndex: 'version',
          width: 120,
          key: 'version',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '剩余首发量（条）',
          dataIndex: 'num',
          width: 190,
          sorter: true,
          align: 'strip',
          key: 'num'
        },
        {
          title: '服务状态',
          dataIndex: 'status',
          width: 120,
          align: 'center',
          key: 'status',
          sorter: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'x',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ],
      count: 0,
      form: {
        page: 1,
        limit: 10,
        keyword: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const req = await getImSiteList(this.form)
        this.data = req.data
        this.count = req.count
      } catch (e) {
        console.log(e)
      }
    },
    async deriveData () {
      try {
        const req = await saveWebsitExport()
        console.log(req, '导出数据')
      } catch (e) {
        console.log(e)
      }
    },
    // 充值
    async ok (form) {
      console.log(form)
      try {
        const res = await recharge(form)
        if (res.msg === 'ok') {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
    details (item) {
      console.log(item)
    },
    onSearch (e) {
      console.log(e)
    },
    showModal (item) {
      console.log(item)
      this.ModalData = {
        id: item.id,
        type: 1,
        num: 0,
        remark: ''
      }
      this.ModalTitle = item.site_title
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
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

  .main-list {
    padding: 0 24px 24px 24px;
    background-color: #ffffff;
    .list-title {
      height: 60px;
      font-size: 16px;
    }
    .list-data {
      margin-bottom: 17px;
      .info {
        width: 80px;
        color: @info-lamp;
        &:nth-child(1) {
          color: #000000;
          font-weight: 500;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border-right: 1px solid #e7e9eb;
          }
        }
      }
      .lamp {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 4px;
        &:nth-child(1) {
        }
        &:nth-child(2) {
          background-color: #d9d9d9;
        }
      }
      .lamp-on {
        background-color: @status-color;
      }
      .lamp-off {
        background-color: #d9d9d9;
      }
    }
    .pagination {
      margin-top: 16px;
    }
  }
  .status-lamp {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .lamp-on {
    background-color: @status-color;
  }
  .lamp-off {
    background-color: #d9d9d9;
  }
}
.reset {
  color: #555658;
}
</style>
