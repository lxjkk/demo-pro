<template>
  <div>
    <div class="main">
      <div class="main-title">
        <div><span v-text="title"></span></div>
        <div>
          <a-button class="btn-data" @click="stopService">{{info.status?'停用服务':'启用服务'}}</a-button>
          <a-button type="primary" @click="showModal()">充值</a-button>
        </div>
      </div>

      <basic-info :basicsData="info" />

      <div class="tail-info l-container">
        <a-tabs :default-active-key="1" @change="tabsChange">
          <a-tab-pane :key="1" tab="收发日志">
            <div class="l-flex-between main-search">
              <div class="l-flex">
                <div class="l-flex-align-center" style="margin-right: 24px">
                  <div class="search-text">关键字：</div>
                  <div class="search-inp">
                    <a-input v-model="form.keyword" placeholder="搜索编号、内容、用户" />
                  </div>
                </div>
                <div class="l-flex-align-center">
                  <div class="search-text">收发时间：</div>
                  <div class="search-inp">
                    <a-range-picker @change="pickerOnChange" :value="picker">
                      <a-icon slot="suffixIcon" type="calendar" />
                    </a-range-picker>
                  </div>
                </div>
              </div>
              <div>
                <a-button style="margin-right: 9px" @click="picker=[];resetForm();getLogList()">重置</a-button>
                <a-button type="primary" @click="getLogList">查询</a-button>
              </div>
            </div>
            <div class="l-flex list-data">
              <div class="info">
                <span>{{ '全部' + '  ' + 213 }}</span>
              </div>
              <div class="info l-flex-end">
                <div class="lamp lamp-on"></div>
                <span>{{ '成功' + '  ' + 213 }}</span>
              </div>
              <div class="info l-flex-end">
                <div class="lamp lamp-off"></div>
                <span>{{ '失败' + '  ' + 213 }}</span>
              </div>
              <div class="info l-flex-end">
                <div class="lamp lamp-air"></div>
                <span>{{ '列队中' + '  ' + 213 }}</span>
              </div>
            </div>

            <a-table :rowKey="(record,index)=>{return index}" :data-source="logdata" :columns="columns"
              :pagination="false">
              <div slot="filterDropdown" slot-scope="{setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                style="padding: 9px 12px">
                <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索${column.title}`" :value="selectedKeys[0]"
                  style="width: 120px;margin-bottom: 17px"
                  @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                  @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)" />
                <div class="l-flex-between">
                  <a @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)">搜索</a>
                  <a class="reset" @click="() => handleReset(clearFilters)">重置</a>
                </div>
              </div>

              <div slot="checkDropdown" style="padding: 8px">
                <div style="width: 120px;margin-bottom:5px">
                  <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                    全选
                  </a-checkbox>
                </div>
                <a-checkbox-group style="width: 120px;line-height: 2.4;" v-model="checkedList" :options="plainOptions"
                  @change="checkOnChange" />
                <div class="l-flex-between">
                  <a @click="getLogList">搜索</a>
                  <a @click="checkedList=[1,0,2];checkAll=true" class="reset">重置</a>
                </div>
              </div>

              <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }" />
              <template slot="status" slot-scope="record">
                <div class="l-flex-align-center">
                  <div class="status-lamp" :class="$DETAILS_STATUS_CLASS[record]"></div>
                  <span>{{ $DETAILS_STATUS_TEXT[record] }}</span>
                </div>
              </template>
            </a-table>
            <div class="l-flex-end" style="margin-top: 16px">
              <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :total="count" />
            </div>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="充值记录" force-render>
            <div class="l-flex-between main-search">
              <div class="l-flex">
                <div class="l-flex-align-center">
                  <div class="search-text">充值时间：</div>
                  <div class="search-inp">
                    <a-range-picker :value="pickerRecord" @change="pickerOnChangeRecord">
                      <a-icon slot="suffixIcon" type="calendar" />
                    </a-range-picker>
                  </div>
                </div>
              </div>
              <div>
                <a-button style="margin-right: 9px" @click="pickerRecord=[];resetFormRecord();getPayList()">重置
                </a-button>
                <a-button type="primary" @click="getPayList">查询</a-button>
              </div>
            </div>
            <a-table :rowKey="(record,index)=>{return index}" :data-source="paydata" :columns="columnsRecord"
              :pagination="false">

              <div slot="checkDropdown" style="padding: 8px">
                <div style="width: 120px;margin-bottom:5px">
                  <a-checkbox :indeterminate="indeterminateRecord" defaultChecked :checked="checkAllRecord"
                    @change="onCheckAllChangeRecord">
                    全选
                  </a-checkbox>
                </div>
                <a-checkbox-group style="width: 120px;line-height: 2.4;" v-model="checkedListRecord"
                  :options="plainOptionsRecord" @change="checkOnChangeRecord" />
                <div class="l-flex-between">
                  <a @click="getPayList">搜索</a>
                  <a @click="checkedListRecord=['inc', 'dec'];checkAllRecord=true" class="reset">重置</a>
                </div>
              </div>

              <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }" />
              <template slot="status" slot-scope="record">
                <div class="l-flex-align-center">
                  <div class="status-lamp" :class="$USER_TOP_UP_STATUS[record]"></div>
                  <span>{{ $USER_TOP_UP_STATUS[record] }}</span>
                </div>
              </template>
            </a-table>
            <div class="l-flex-end" style="margin-top: 16px">
              <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :total="countRecord" />
            </div>
          </a-tab-pane>
          <div class="tabs-solt" slot="tabBarExtraContent">
            <a-button style="margin-right: 26px" @click="deriveData">导出数据</a-button>
            <a-icon type="redo" @click="refresh" />
          </div>
        </a-tabs>
      </div>
    </div>
    <top-up :title="ModalTitle" :data="ModalData" :visible.sync="visible" @ok="ok" />
  </div>
</template>

<script>
import { getImDetailList, getRechargeList, saveDetailListExport, saveRechargeExport } from '@/api/get'
import { recharge, getImSiteList } from '@/api/post'
import transformTime from '@/utils/transformTime.js'
import toThousands from '@/utils/toThousands.js'
import basicInfo from '@/component/basic-info'
import topUp from '@/component/top-up.vue'

export default {
  components: {
    basicInfo,
    topUp
  },
  data () {
    return {
      title: '',
      visible: false,
      ModalData: {},
      ModalTitle: '',
      checkedList: this.$EXE_DEFAULT_LIST,
      plainOptions: this.$EXE_STATUS_OPTIONS,
      indeterminate: true,
      checkAll: true,
      plainOptionsRecord: this.$EXE_STATUS_OPTIONS_USER,
      checkedListRecord: this.$EXE_DEFAULT_LIST_USER,
      indeterminateRecord: true,
      checkAllRecord: true,
      visibleDrawer: false,
      logdata: [],
      paydata: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 144,
          key: 'id'
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
          }
        },
        {
          title: '发送方',
          dataIndex: 'send_name',
          width: 200,
          key: 'send_name',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
          }
        },
        {
          title: '收取方',
          width: 200,
          dataIndex: 'receive_name',
          key: 'receive_name',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
          }
        },
        {
          title: '执行状态',
          dataIndex: 'status',
          width: 160,
          key: 'status',
          scopedSlots: {
            customRender: 'status',
            filterDropdown: 'checkDropdown'
          }
        },
        {
          title: '收发时间',
          width: 210,
          dataIndex: 'create_time',
          key: 'create_time',
          sorter: true
        }
      ],
      columnsRecord: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '充值数量（条）',
          width: 270,
          align: 'end',
          dataIndex: 'num',
          key: 'num'
        },
        {
          title: '充值前余量（条）',
          align: 'end',
          dataIndex: 'start_num',
          width: 200,
          key: 'start_num'
        },
        {
          align: 'end',
          title: '充值后余量（条）',
          width: 200,
          dataIndex: 'end_num',
          key: 'end_num'
        },
        {
          title: '类型',
          dataIndex: 'status',
          width: 144,
          key: 'address',
          scopedSlots: {
            customRender: 'status',
            filterDropdown: 'checkDropdown'
          }
        },
        {
          title: '充值时间',
          width: 240,
          dataIndex: 'create_time',
          key: 'create_time',
          sorter: true
        }
      ],
      tabsKey: 1,
      picker: [],
      pickerRecord: [],
      info: {
        status: 0,
        num: 0,
        create_time: '',
        url: '',
        username: ''
      },
      form: {
        id: null,
        page: 1,
        limit: 10,
        keyword: '',
        content: '',
        sender: '',
        receiver: '',
        date: [],
        status: ''
      },
      formRecord: {
        id: null,
        page: 1,
        limit: 10,
        type: '',
        date: []
      },
      count: 0,
      countRecord: 0
    }
  },
  filters: {
    openTime (val) {
      if (val) {
        return transformTime(val)
      }
    },
    toNum (val) {
      if (val) {
        return toThousands(val)
      }
    }
  },
  created () {
    // 获取路由传参
    const info = this.$route.query
    this.title = this.$route.meta.title = info.title
    this.form.id = this.formRecord.id = info.id
    this.getLogList()
  },
  methods: {
    // 收发日志
    async getLogList () {
      try {
        const form = this.form
        form.date = this.dateType(this.form.date)
        const req = await getImDetailList(form)
        console.log(req.data, '数据')
        this.logdata = req.data.list
        this.count = req.data.count
        this.info = req.data
        console.log(this.count)
      } catch (e) {
        console.log(e)
      }
    },
    // 充值记录
    async getPayList () {
      try {
        const form = this.formRecord
        form.date = this.dateType(this.formRecord.date)
        const req = await getRechargeList(form)
        console.log(req.data, '数据2')
        this.paydata = req.data.list
        this.countRecord = req.data.count
        this.info = req.data
      } catch (e) {
        console.log(e)
      }
    },
    // tabs 改变
    tabsChange (e) {
      console.log(e)
      this.tabsKey = e
      if (this.tabsKey === 1) {
        this.getLogList(this.form)
      } else if (this.tabsKey === 2) {
        this.getPayList(this.formRecord)
      }
    },
    // 刷新
    refresh () {
      if (this.tabsKey === 1) {
        this.getLogList(this.form)
      } else if (this.tabsKey === 2) {
        this.getPayList(this.formRecord)
      }
    },
    // 搜索
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.form[dataIndex] = selectedKeys[0]
      this.getLogList()
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    // 多选框
    checkOnChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.$EXE_STATUS_OPTIONS.length
      this.checkAll = checkedList.length === this.$EXE_STATUS_OPTIONS.length
      this.form.status = checkedList.toString()
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.$EXE_DEFAULT_LIST : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    checkOnChangeRecord (checkedList) {
      this.indeterminateRecord = !!checkedList.length && checkedList.length < this.$EXE_STATUS_OPTIONS_USER.length
      this.checkAllRecord = checkedList.length === this.$EXE_STATUS_OPTIONS_USER.length
      this.formRecord.status = checkedList.toString()
    },
    onCheckAllChangeRecord (e) {
      Object.assign(this, {
        checkedListRecord: e.target.checked ? this.$EXE_DEFAULT_LIST_USER : [],
        indeterminateRecord: false,
        checkAllRecord: e.target.checked
      })
    },
    // 充值
    showModal () {
      this.ModalData = {
        id: this.form.id,
        type: 1,
        num: 0,
        remark: ''
      }
      this.ModalTitle = this.title
      this.visible = true
    },
    async ok (form) {
      console.log(form)
      try {
        const res = await recharge(form)
        this.infoSatus(res)
        this.visible = false
      } catch (err) {
        console.log(err)
      }
    },
    async deriveData () {
      if (this.tabsKey === 1) {
        try {
          const req = await saveDetailListExport(this.form)
          console.log(req, '导出数据')
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const req = await saveRechargeExport(this.formRecord)
          console.log(req, '导出数据')
        } catch (e) {
          console.log(e)
        }
      }
    },
    infoSatus (res) {
      if (res.msg === 'ok') {
        this.$message.success(res.data)
      } else {
        this.$message.error(res.data)
      }
    },
    pickerOnChange (e, s) {
      this.picker = e
      this.form.date = this.dateType(s)
    },
    pickerOnChangeRecord (e, s) {
      this.pickerRecord = e
      this.formRecord.date = this.dateType(s)
    },
    dateType (s) {
      if (s && s.length === 2) {
        return s[0] + '~' + s[1]
      } else {
        return ''
      }
    },
    // 停用服务
    stopService () {
      const that = this
      this.$confirm({
        centered: true,
        title: that.info.status ? '是否停用服务' : '是否启用服务',
        content: that.info.status ? '停用服务将影响该站点的运营,请谨慎操作 ' : '将开启服务该站点的运营',
        icon: 'info-circle',
        async onOk () {
          const form = {
            id: that.form.id,
            status: that.info.status ? 0 : 1
          }
          try {
            const res = await getImSiteList(form)
            that.infoSatus(res)
          } catch (err) {
            console.log(err)
          }
        }
      })
    },
    // 重置
    resetForm () {
      this.form = {
        id: this.$route.meta.id,
        page: 1,
        limit: 10,
        keyword: '',
        content: '',
        sender: '',
        receiver: '',
        date: [],
        status: ''
      }
    },
    resetFormRecord () {
      this.formRecord = {
        id: this.$route.meta.id,
        page: 1,
        limit: 10,
        type: '',
        date: []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.agreement {
  height: calc(100vh - 110px);
  background: #ffffff;
}

.main-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-data {
    margin-right: 8px;
  }

  span {
    font-size: 20px;
    font-weight: 500;
  }
}
.main {
  @info-lamp: #909399;
  @status-color: #52c41a;
  color: #000000;
  font-size: 14px;
  padding-top: 9px;

  .basics-info {
    height: 148px;
    span {
      color: #555658;
    }

    .title {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .tail-info {
    padding-top: 8px;

    .tabs-solt {
      .search-text {
        width: 60px;
      }

      .search-inp {
        width: 290px;
      }
    }

    .list-data {
      margin: 16px 0;

      .info {
        margin-left: 24px;
        color: @info-lamp;

        &:nth-child(1) {
          color: #000000;
          font-weight: 500;
          position: relative;
          margin-left: 0;
          padding-right: 24px;

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
    }
    .main-search {
      margin-bottom: 16px;
    }
    /deep/ .ant-tabs {
      color: #555658;
    }

    /deep/ .ant-tabs-nav-container {
      font-size: 16px;
    }

    /deep/ .ant-tabs-bar {
      border-bottom: none;
    }

    /deep/ .ant-tabs-nav .ant-tabs-tab {
      padding: 12px 0;
      padding-bottom: 20px;
    }

    .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
      width: 56px;
    }
  }

  .lamp-on {
    background-color: @status-color;
  }

  .lamp-off {
    background-color: #f5222d;
  }
  .lamp-air {
    box-sizing: initial;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid #cee2f7;
    color: #40a9ff;
    background-color: #1890ff;
    margin-right: 7px;
  }
  .status-lamp {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }
}

.reset {
  color: #555658;
}
</style>
