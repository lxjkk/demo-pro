<template>
  <div>
    <div v-if="agreement && isUser" style="padding-top: 9px">
      <div class="main-title" style="margin-bottom:16px">
        <div><span v-text="title"></span></div>
      </div>
      <div class="l-flex-justcenter agreement">
        <escape-component :image="2" title="您目前还没有开启全文搜索服务" content="ElasticSearch分布式搜索引擎，自动分词、关联搜索，可以有效提升搜索效率和精准度。" escape="全文搜索服务协议"
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
      <div>
        <a-button class="btn-data" @click="stopService">停用服务</a-button>
        <a-button type="primary">充值</a-button>
      </div>
    </div>

    <basic-info />

    <div class="basics-info l-container">
      <p class="title">数据概览</p>
      <div class="l-flex">
        <data-look title="今日搜索量（次）" :count="999" :rate="9.9" isWeek />
        <data-look title="昨日搜索量（次）" :count="999" :rate="9.9" isRate isWeek />
        <data-look title="平均耗时（ms）" :count="999" />
        <data-look title="总内容数（篇）" :count="9399" />
        <data-look title="总搜索量（次）" :count="999" active />
      </div>
    </div>

    <div class="tail-info l-container">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="搜索日志" force-render>
          <div class="l-flex-between main-search">
            <div class="l-flex-align-center">
              <div class="search-text">关键字：</div>
              <div class="search-inp">
                <a-input placeholder="搜索网站名称、网站号、域名" />
              </div>
            </div>
            <div>
              <a-button style="margin-right: 8px">重置</a-button>
              <a-button type="primary">查询</a-button>
            </div>
          </div>

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

          <a-table :data-source="data" :columns="columns" :pagination="false">
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
              <div class="l-flex-align-center">
                <div class="status-lamp" :class="record?'lamp-on':'lamp-off'"></div>
                <span>{{ record?'正常':'停用' }}</span>
              </div>
            </template>
            <template slot="action" slot-scope="text,record">
              <div>
                <a style="margin-right: 16px" @click="$router.push({path:'/allsearch/details',query:{id: record}});"
                  href="javascript:;">详情</a>
                <a href="javascript:;" @click="showModal(record)">充值</a>
              </div>
            </template>
          </a-table>
          <div class="l-flex-end" style="margin-top: 16px">
            <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2" :total="500" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="上传日志">
          <div class="l-flex-between main-search">
            <div class="l-flex">
              <div class="l-flex-align-center" style="margin-right: 24px">
                <div class="search-text">关键字：</div>
                <div class="search-inp">
                  <a-input placeholder="搜索编号、内容、用户" />
                </div>
              </div>
              <div class="l-flex-align-center">
                <div class="search-text">更新时间：</div>
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

          <a-table :data-source="data" :columns="columns" :pagination="false">
            <div slot="filterDropdown" slot-scope="{
              selectedKeys,
              column
            }" style="padding: 9px 12px">
              <a-input-search :placeholder="`搜索${column.title}`" :value="selectedKeys[0]"
                style="width: 120px;margin-bottom: 17px" @search="onSearch" />
              <div class="l-flex-between">
                <a>搜索</a>
                <a class="reset">重置</a>
              </div>
            </div>

            <a-icon slot="filterIcon" slot-scope="filtered" type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }" />
          </a-table>
          <div class="l-flex-end" style="margin-top: 16px">
            <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2" :total="500" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="充值记录">
          充值记录
        </a-tab-pane>
        <a-tab-pane key="4" tab="内容库">
          内容库
        </a-tab-pane>
        <div class="tabs-solt" slot="tabBarExtraContent">
          <a-button style="margin-right: 26px">导出数据</a-button>
          <a-icon type="redo" />
        </div>
      </a-tabs>
    </div>
      <progress-bar :visible.sync="visible" @anew-up="anewUp" />
  </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import basicInfo from '@/component/basic-info'
import dataLook from '@/component/data-look.vue'
import progressBar from '@/component/progress-bar.vue'
import escapeComponent from '@/component/escape-component'
import escapeDrawer from '@/component/escape-drawer'
const plainOptions = ['成功', '失败', '列队中']
const defaultCheckedList = ['成功', '失败', '列队中']
export default {
  components: {
    basicInfo,
    dataLook,
    progressBar,
    escapeComponent,
    escapeDrawer
  },
  data () {
    return {
      title: '',
      visible: false,
      checkAll: false,
      checkedList: defaultCheckedList,
      indeterminate: true,
      plainOptions,
      agreement: true, // 协议
      checked: false,
      visibleDrawer: false,
      data: [
        {
          key: '1',
          name: '1111',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        }],
      columns: [
        {
          title: 'ID',
          dataIndex: 'name',
          width: 144,
          key: 'name'
        },
        {
          title: '搜索词',
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
          title: '用户',
          dataIndex: 'age',
          width: 220,
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
          title: '执行状态',
          width: 160,
          dataIndex: 'version',
          key: 'num',
          scopedSlots: {
            filterDropdown: 'checkDropdown',
            customRender: 'status'
          }
        },
        {
          title: '耗时（ms）',
          dataIndex: 'status',
          align: 'end',
          width: 160,
          key: 'address',
          sorter: true
        },
        {
          title: '搜索时间',
          width: 260,
          dataIndex: 'strip',
          key: 'state'
        }
      ]
    }
  },
  created () {
    this.title = this.$route.meta.title.name ? this.$route.meta.title.name : '全文搜索'
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
    stopService () {
      const a = false
      const that = this
      if (a) {
        this.$confirm({
          centered: true,
          title: '是否停用服务',
          content: '停用服务将影响该站点的运营,请谨慎操作 ',
          icon: 'info-circle',
          onOk () {
            console.log('调用成功')
          }
        })
      } else {
        this.$confirm({
          centered: true,
          title: '是否启用服务',
          content: '全文搜索服务启用可能需要较长时间上传数据，期间该站点将无法正常使用',
          icon: 'info-circle',
          onOk () {
            that.visible = true
          }
        })
      }
    },
    pickerOnChange (e) {
      console.log(e)
    },
    onSearch (e) {
      console.log(e)
    },
    // 重新上传
    anewUp (data) {
      console.log(data)
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
</style>
