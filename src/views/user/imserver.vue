<template>
  <div>
    <div v-if="agreement" style="padding-top: 9px">
      <div class="main-title" style="margin-bottom:16px">
        <div><span v-text="title"></span></div>
      </div>
      <div class="l-flex-justcenter agreement">
        <escape-component :image="1" title="您目前还没有开启即时通讯IM服务" content="支持聊天、会话、图文收发。" escape="即时通讯IM服务协议"
          userDesc="本服务支持试用，开通后提供3000次免费调用，如有额外需要请联系客服" @grant="grant" @escape-privacy="escapePrivacy"
          :checked.sync="checked" />
      </div>
    </div>
    <div class="main" v-else>
      <div class="main-title">
        <div><span v-text="title"></span></div>
        <escapePopover @agreement="visibleDrawer=true" />
      </div>

      <user-info :status="info.status" :strip="info.num" :dateTime="info.create_time" />

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
    <escape-drawer :visibleDrawer.sync="visibleDrawer"
          content="  一、外按地张就或变程派号题数期称合展率适难条特群四至现由准门走规劳平要根每路即红容重物太油资八及集用。多难三且华片增复总验影们更参然度引持必究共适便书只维状层名马入性增青。 二、断化术提己教满工属十可八文放改使手圆中层写见了生统调毛因十响情复按温积便将示共组么按常各率低并率南格支其规。"
          title="编辑协议" @consent="consent" :escapeType="agreement" />
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import transformTime from '@/utils/transformTime.js'
import toThousands from '@/utils/toThousands.js'
import escapePopover from '@/component/escape-popover'
import userInfo from '@/component/user-info'
import escapeComponent from '@/component/escape-component'
import escapeDrawer from '@/component/escape-drawer'
import { getImDetailList, getRechargeList, saveDetailListExport, saveRechargeExport } from '@/api/get'

export default {
  components: {
    escapePopover,
    userInfo,
    escapeComponent,
    escapeDrawer
  },
  data () {
    return {
      title: '即时通讯IM',
      agreement: true, // 协议
      checked: false, // 协议
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
    this.title = '即时通讯IM'
    this.getLogList()
  },
  methods: {
    async getLogList () {
      try {
        const req = await getImDetailList(this.form)
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
    // 协议
    escapePrivacy (e) {
      this.visibleDrawer = true
    },
    // 同意
    consent (e) {
      this.checked = e
      this.visibleDrawer = false
    },
    // 立即开通
    grant (e) {
      console.log(e)
      if (e) {
        this.agreement = false
        console.log(this.logdata)
      } else {
        message.info('请同意协议!')
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
    // 导出数据
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
