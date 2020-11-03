<template>
  <div class="main">
    <div class="main-title">
      <div><span v-text="title"></span></div>
      <div>
        <a-button class="btn-data">停用服务</a-button>
        <a-button type="primary">充值</a-button>
      </div>
    </div>

    <div class="basics-info l-container">
      <p class="title">基础信息</p>
      <a-row>
        <a-col :span="6" style="margin-bottom: 16px">
          <div class="l-flex-align-center">
            服务状态：
            <div class="lamp-air" />
            <span>正常</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>
            剩余收发量（条）：<span>{{ toThousands(10200) }}</span>
          </div>
        </a-col>
        <a-col :span="12" style="margin-bottom: 16px">
          <div>
            开通日期：<span>{{ 12321321312 | openTime() }}</span>
          </div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>网站域名：<a href="wwww.baidu.com">wwww.baidu.com</a></div>
        </a-col>
        <a-col :span="6" style="margin-bottom: 16px">
          <div>联系人：<span>11112222333</span></div>
        </a-col>
      </a-row>
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
            <div slot="filterDropdown" slot-scope="{
              selectedKeys,
              column
            }" style="padding: 9px 12px">
               <a-input-search :placeholder="`搜索${column.title}`" :value="selectedKeys[0]" style="width: 120px;margin-bottom: 17px" @search="onSearch" />
             <div class="l-flex-between">
                <a>搜索</a>
                <a class="reset">重置</a>
              </div>
            </div>

            <div slot="checkDropdown" style="padding: 8px">
              <div style="width: 120px;margin-bottom:5px">
                <a-checkbox :indeterminate="indeterminate" defaultChecked :checked="checkAll" @change="onCheckAllChange">
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
            <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2" :total="500" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="充值记录" force-render> 充值记录 </a-tab-pane>
        <div class="tabs-solt" slot="tabBarExtraContent">
          <a-button style="margin-right: 26px">导出数据</a-button>
          <a-icon type="redo" />
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import transformTime from '@/utils/transformTime.js'
const plainOptions = ['成功', '失败', '列队中']
const defaultCheckedList = ['成功', '失败', '列队中']
export default {
  data () {
    return {
      title: '短说社区',
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
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
      ]
    }
  },
  filters: {
    openTime (val) {
      if (val) {
        return transformTime(val)
      }
    }
  },
  created () {
    console.log(this.$route.query.id)
    this.$route.meta.title = '短说'
  },
  methods: {
    toThousands (num) {
      if (num) {
        const result = []
        let counter = 0
        num = (num || 0).toString().split('')
        for (var i = num.length - 1; i >= 0; i--) {
          counter++
          result.unshift(num[i])
          if (!(counter % 3) && i !== 0) {
            result.unshift(',')
          }
        }
        return result.join('')
      }
    },
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

    .btn-data {
      margin-right: 8px;
    }

    span {
      font-size: 20px;
      font-weight: 500;
    }
  }

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
    color: #555658
}
</style>
