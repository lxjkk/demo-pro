<template>
  <div>
    <div v-if="!agreement && isUser" style="padding-top: 9px">
      <div class="main-title" style="margin-bottom:16px">
        <div><span v-text="title"></span></div>
      </div>
      <div class="l-flex-justcenter agreement">
        <escape-component :image="1" title="您目前还没有开启即时通讯IM服务" content="支持聊天、会话、图文收发。" escape="即时通讯IM服务协议"
          userDesc="本服务支持试用，开通后提供3000次免费调用，如有额外需要请联系客服" @grant="grant" @escape-privacy="escapePrivacy"
          :checked.sync="checked" />
        <escape-drawer :visibleDrawer.sync="visibleDrawer"
          content="  一、外按地张就或变程派号题数期称合展率适难条特群四至现由准门走规劳平要根每路即红容重物太油资八及集用。多难三且华片增复总验影们更参然度引持必究共适便书只维状层名马入性增青。 二、断化术提己教满工属十可八文放改使手圆中层写见了生统调毛因十响情复按温积便将示共组么按常各率低并率南格支其规。"
          title="编辑协议" @consent="consent" escapeType />
      </div>
    </div>
    <div class="main" v-else>
      <div class="main-title">
        <div><span v-text="title"></span></div>
        <div v-if="isAdmin">
          <a-button class="btn-data" @click="stopService">停用服务</a-button>
          <a-button type="primary">充值</a-button>
        </div>
        <div v-else>
          <escapePopover @agreement="false" />
        </div>
      </div>

      <basic-info v-if="isAdmin" />
      <div v-else>
        <user-info />
      </div>

      <div class="tail-info l-container">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="收发日志">
            <div class="l-flex-between main-search">
              <div class="l-flex">
                <div class="l-flex-align-center" style="margin-right: 24px">
                  <div class="search-text">关键字：</div>
                  <div class="search-inp">
                    <a-input placeholder="搜索编号、内容、用户" />
                  </div>
                </div>
                <div class="l-flex-align-center">
                  <div class="search-text">收发时间：</div>
                  <div class="search-inp">
                    <a-range-picker @change="pickerOnChange">
                      <a-icon slot="suffixIcon" type="calendar" />
                    </a-range-picker>
                  </div>
                </div>
              </div>
              <div>
                <a-button style="margin-right: 9px">重置</a-button>
                <a-button type="primary">查询</a-button>
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

            <a-table :data-source="data" :columns="columns" :pagination="false">
              <div slot="filterDropdown" slot-scope="{selectedKeys,column}" style="padding: 9px 12px">
                <a-input-search :placeholder="`搜索${column.title}`" :value="selectedKeys[0]"
                  style="width: 120px;margin-bottom: 17px" @search="onSearch" />
                <div class="l-flex-between">
                  <a>搜索</a>
                  <a class="reset">重置</a>
                </div>
              </div>

              <div slot="checkDropdown" style="padding: 8px">
                <div style="width: 120px;margin-bottom:5px">
                  <a-checkbox :indeterminate="indeterminate" defaultChecked :checked="checkAll"
                    @change="onCheckAllChange">
                    全选
                  </a-checkbox>
                </div>
                <a-checkbox-group style="width: 120px;line-height: 2.4;" v-model="checkedList" :options="plainOptions"
                  @change="checkOnChange" />
                <div class="l-flex-between">
                  <a>搜索</a>
                  <a class="reset">重置</a>
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
              <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2"
                :total="500" />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="充值记录" force-render>
            <div class="l-flex-between main-search">
              <div class="l-flex">
                <div class="l-flex-align-center">
                  <div class="search-text">收发时间：</div>
                  <div class="search-inp">
                    <a-range-picker @change="pickerOnChange">
                      <a-icon slot="suffixIcon" type="calendar" />
                    </a-range-picker>
                  </div>
                </div>
              </div>
              <div>
                <a-button style="margin-right: 9px">重置</a-button>
                <a-button type="primary">查询</a-button>
              </div>
            </div>
            <a-table :data-source="data" :columns="columnsRecord" :pagination="false">

              <div slot="checkDropdown" style="padding: 8px">
                <div style="width: 120px;margin-bottom:5px">
                  <a-checkbox :indeterminate="indeterminate" defaultChecked :checked="checkAll"
                    @change="onCheckAllChange">
                    全选
                  </a-checkbox>
                </div>
                <a-checkbox-group style="width: 120px;line-height: 2.4;" v-model="checkedList" :options="plainOptions"
                  @change="checkOnChange" />
                <div class="l-flex-between">
                  <a>搜索</a>
                  <a class="reset">重置</a>
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
          </a-tab-pane>
          <div class="tabs-solt" slot="tabBarExtraContent">
            <a-button style="margin-right: 26px">导出数据</a-button>
            <a-icon type="redo" />
          </div>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import transformTime from '@/utils/transformTime.js'
import toThousands from '@/utils/toThousands.js'
import basicInfo from '@/component/basic-info'
import escapePopover from '@/component/escape-popover'
import userInfo from '@/component/user-info'
import escapeComponent from '@/component/escape-component'
import escapeDrawer from '@/component/escape-drawer'

const plainOptions = ['成功', '失败', '列队中']
const defaultCheckedList = ['成功', '失败', '列队中']
export default {
  components: {
    basicInfo,
    escapePopover,
    userInfo,
    escapeComponent,
    escapeDrawer
  },
  data () {
    return {
      title: '',
      agreement: true, // 协议
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      checked: false,
      visibleDrawer: false,
      plainOptions,
      data: [
        {
          key: '1',
          name: '1111',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        },
        {
          key: '2',
          name: '111',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        },
        {
          key: '3',
          name: '1111',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 0
        },
        {
          key: '4',
          name: '111',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 0
        },
        {
          key: '5',
          name: '11',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 0
        },
        {
          key: '6',
          name: '22',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        },
        {
          key: '7',
          name: '33',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        },
        {
          key: '8',
          name: '4',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        },
        {
          key: '9',
          name: '55',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 2
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'name',
          width: 144,
          key: 'name'
        },
        {
          title: '内容',
          dataIndex: 'address',
          key: 'www',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
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
          title: '发送方',
          dataIndex: 'age',
          width: 200,
          key: 'cn',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
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
          title: '收取方',
          width: 200,
          dataIndex: 'version',
          key: 'num',
          scopedSlots: {
            filterDropdown: 'filterDropdown'
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
          title: '执行状态',
          dataIndex: 'status',
          width: 160,
          key: 'address',
          scopedSlots: {
            customRender: 'status',
            filterDropdown: 'checkDropdown'
          }
        },
        {
          title: '收发时间',
          width: 210,
          dataIndex: 'strip',
          key: 'state',
          sorter: true
        }
      ],
      columnsRecord: [
        {
          title: 'ID',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '充值数量（条）',
          width: 270,
          align: 'end',
          dataIndex: 'address',
          key: 'www'
        },
        {
          title: '充值前余量（条）',
          align: 'end',
          dataIndex: 'age',
          width: 200,
          key: 'cn'
        },
        {
          align: 'end',
          title: '充值后余量（条）',
          width: 200,
          dataIndex: 'version',
          key: 'num'
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
          dataIndex: 'strip',
          key: 'state',
          sorter: true
        }
      ]
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
    console.log(this.$route.query.id)
    this.title = this.$route.meta.title = this.$route.query.name ? this.$route.query.name : '即时通讯IM'
  },
  methods: {
    checkOnChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    onSearch (e) {
      console.log(e)
    },
    pickerOnChange (e) {
      console.log(e)
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
      } else {
        message.info('请同意协议!')
      }
    },
    // 停用服务
    stopService () {
      this.$confirm({
        centered: true,
        title: '是否停用服务',
        content: '停用服务将影响该站点的运营,请谨慎操作 ',
        icon: 'info-circle',
        onOk () {
          console.log('调用成功')
        }
      })
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
