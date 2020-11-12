<template>
  <div class="main">
    <div class="main-title">
      <div><span v-text="title"></span></div>
    </div>

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
        <a-tab-pane key="1" tab="站点列表" force-render>
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

          <a-table :data-source="data" :columns="siteColumns" :pagination="false">
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
            <template slot="status" slot-scope="record">
              <div class="l-flex-allcenter">
                <div class="status-lamp" :class="record?'lamp-on':'lamp-off'"></div>
                <span>{{ record?'正常':'停用' }}</span>
              </div>
            </template>
            <template slot="action" slot-scope="text,record">
              <div>
                <a style="margin-right: 16px" @click="$router.push({path:'/admin/tem/allsearch/details',query:{id: record}});"
                  href="javascript:;">详情</a>
                <a href="javascript:;" @click="showModal(record)">充值</a>
              </div>
            </template>
          </a-table>
          <div class="l-flex-end" style="margin-top: 16px">
            <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2" :total="500" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="内容库">
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
            <template slot="status">
              <a @click="showDrawer">详情</a>
            </template>
          </a-table>
          <div class="l-flex-end" style="margin-top: 16px">
            <a-pagination show-quick-jumper :show-total="(total) => `共 ${total} 条`" :default-current="2" :total="500" />
          </div>
        </a-tab-pane>
        <div class="tabs-solt" slot="tabBarExtraContent">
          <a-button style="margin-right: 26px">导出数据</a-button>
          <a-icon type="redo" />
        </div>
      </a-tabs>
    </div>
    <a-drawer width="640" class="drawer" placement="right" :closable="false" :visible="drawerVisible" @close="onClose">
      <p class="title">内容信息</p>
      <div>
        <div class="l-flex-between title">
          <div style="font-size: 16px">内容详情</div>
          <div style="color: #1890FF;cursor:pointer;font-size:14px" @click="onUnfold">
            <span>{{isUnfold?'收起':'展开'}}</span>
            <a-icon :type="isUnfold?'up':'down'" />
          </div>
        </div>
        <div>
          <p class="title">这是一个标题</p>
          <div class="unfold" v-show="isUnfold">
            那些更棒的点子来自于个体依然用过去习惯的方式思考创意时——坐在办公桌前时，在咖啡店等咖啡时，洗澡时。这些由人们独自想出的点子更胜一筹。当讨论会的狂热劲头散去，头脑wqeqwe委屈恶趣味我去</div>
        </div>
      </div>
      <a-divider />
      <div>
        <p class="title">基础信息</p>
        <a-row>
          <a-col :span="12" class="title-col">内容ID<span>111</span></a-col>
          <a-col :span="12" class="title-col">作者<span>谔谔谔</span></a-col>
          <a-col :span="12" class="title-col">发布时间<span>2020-09-11 02:45</span></a-col>
          <a-col :span="12" class="title-col">作者ID<span>122</span></a-col>
          <a-col :span="12" class="title-col">更新时间<span>2020-09-11 02:45</span></a-col>
        </a-row>
      </div>
      <a-divider />
      <div>
        <p class="title">站点信息</p>
        <a-row>
          <a-col :span="12" class="title-col">网站名称<span>短说社区</span></a-col>
          <a-col :span="12" class="title-col">联系人<span>余羽（13657666666）</span></a-col>
          <a-col :span="12" class="title-col">网站号<span>KSHE</span></a-col>
          <a-col :span="12" class="title-col">网站域名<span><a href="h5a.opensns.cn">h5a.opensns.cn</a></span></a-col>
        </a-row>
      </div>
      <a-divider />
      <div>
        <p class="title">其他信息</p>
        <div class="title-col">被搜索量（次）<span>{{2000 | toNum}}</span></div>
      </div>
    </a-drawer>
    <top-up :title="ModalTitle" :visible.sync="visible"  />
  </div>
</template>

<script>
import dataLook from '@/component/data-look.vue'
import toThousands from '@/utils/toThousands.js'
import topUp from '@/component/top-up.vue'

export default {
  components: {
    dataLook,
    topUp
  },
  filters: {
    toNum (val) {
      return toThousands(val)
    }
  },
  data () {
    return {
      title: '全文搜索服务管理',
      visible: false,
      drawerVisible: false,
      isUnfold: false,
      ModalTitle: '',
      data: [
        {
          key: '1',
          name: '短说社区',
          age: 'DXasdas',
          address: 'https://www.antdv.com/components/table-cn/',
          version: '2.9.0',
          strip: 20,
          status: 1
        }],
      columns: [
        {
          title: '内容',
          dataIndex: 'name',
          width: 360,
          key: 'name'
        },
        {
          title: '作者',
          dataIndex: 'address',
          width: 140,
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
          title: '网站名称',
          dataIndex: 'age',
          width: 140,
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
          title: '被搜索量（次）',
          width: 160,
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
          title: '更新时间',
          dataIndex: 'status',
          width: 190,
          key: 'address',
          sorter: true
        },
        {
          title: '操作',
          width: 120,
          dataIndex: 'strip',
          key: 'state',
          scopedSlots: {
            customRender: 'status'
          }
        }
      ],
      siteColumns: [
        {
          title: '网站名称',
          dataIndex: 'name',
          width: 179,
          key: 'name',
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
          dataIndex: 'age',
          width: 196,
          key: 'www',
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
          dataIndex: 'address',
          key: 'cn',
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
          key: 'num',
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
          dataIndex: 'strip',
          width: 190,
          sorter: true,
          align: 'strip',
          key: 'address'
        },
        {
          title: '服务状态',
          dataIndex: 'status',
          width: 120,
          align: 'center',
          key: 'state',
          sorter: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'address',
          width: 120,
          key: 'x',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    showDrawer () {
      this.drawerVisible = true
    },
    onClose () {
      this.drawerVisible = false
    },
    pickerOnChange (e) {
      console.log(e)
    },
    onSearch (e) {
      console.log(e)
    },
    onUnfold () {
      this.isUnfold = !this.isUnfold
    },
    // 充值
    showModal (item) {
      console.log(item)
      this.visible = true
      this.ModalTitle = item.name
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
    .main-search {
      margin-bottom: 16px;
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
    background-color: #1890ff;
  }
  .lamp-off {
    background-color: #d9d9d9;
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

.drawer {
  .title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-bottom: 16px;
  }
  .title-col {
    color: #555658;
    font-weight: 500;
    span {
      font-weight: 400;
      margin-left: 8px;
    }
  }
  .unfold {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
