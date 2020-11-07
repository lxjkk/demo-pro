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
        <a-button class="btn-m">重置</a-button>
        <a-button type="primary">查询</a-button>
      </div>
    </div>

    <div class="tail-info l-container">
      <p class="title">协议列表</p>
      <a-table :data-source="data" :columns="columns" :pagination="false">
        <a-icon slot="filterIcon" slot-scope="filtered" type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }" />
        <template slot="operation" slot-scope="record">
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
        <a-input value="全文搜索" disabled />
      </div>

      <div class="input-m">
        <p class="title-l">协议名称</p>
        <a-input placeholder="请输入" />
      </div>

      <div>
        <p class="title-l">协议内容</p>
        <a-textarea style="height: 540px" placeholder="请输入" />
      </div>
      <a-divider />
      <div style="text-align: end;">
        <a-button style="margin-right:18px" @click="onClose">取消</a-button>
        <a-button type="primary">保存</a-button>
      </div>
    </a-drawer>

    <escape-drawer :visibleDrawer.sync="visibleDrawer" content="  一、外按地张就或变程派号题数期称合展率适难条特群四至现由准门走规劳平要根每路即红容重物太油资八及集用。多难三且华片增复总验影们更参然度引持必究共适便书只维状层名马入性增青。 二、断化术提己教满工属十可八文放改使手圆中层写见了生统调毛因十响情复按温积便将示共组么按常各率低并率南格支其规。 三、头内起立意情大度教江设层元音还安此传志八且东集各叫建者局各由听者技离酸存事状结是部农采非程务号统该后习天做林研传导石活效记理口条节下历是。县海基交却西参外场在真酸住各力海后争法增在海们动把直直铁更按体国红再整看位式区圆斗量强却越定参机千除员示向也不全心关此水构组商单线。明等没济及观被也所要感地观改九处管很叫导划说西动社法省东观关京难引局次究领音工决条处存传厂理见支广对较。上越别业九率共做家代心火育真精始手已江照近国万收容断说百展火是这酸华说精关象增看般论取。 四、已越下权精教求具规并难该安展共量号可光九积十及林育林学动农组类始外号来月定油代风设关非程因党具物格布提选商。业年引群细为验队作这教持真期则种总总实本红派起新代各划土立入方量称表战算众标应界集候反总切提安调容厂利验南压更思强处都则家果油马明光群造广适看便原通。 五、度别大式八习号示设组特清公完本里流先种增五打果理是开被革往元红明样里米离确头数共很比美别土每思经内表还件习比养南节由。示改论消老火华级平五准道每增已连切红统现意业知口干眼分口置近来消花数离万战律提增半进比该关约支着向易用军特可很记争由布华号。 六、象对装清门将共千等能提红习只知于么以时应整都信经那平标她时什南的出识九当置儿品阶节身文里造现制适百火世使际根先并式以。共劳证文到将况名声时完你应布般代七平力养青或解相人产价称即阶家对集向开书县报称各认接不已极想全段济。被给难感七统七合改天感装值片又组改单林开目原义满速对土工始取相七子过结干保派向学院认农门整千内能名指少平观门级其育或造部育。被月验民火养治压先规价市进备安叫影活容时线七查交口引也价工月国地专先持商书条类儿八属王能量红专步出格表存部所机回龙局五高效意容被红。音装机名动报该斗低更文话必给复并术光用而立又气战体每对种更极些切交大证论王代国中中交般报些包效以米示华算精两单候因议去们持要专。" title="编辑协议"  />
  </div>
</template>

<script>
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
          title: 'ID',
          dataIndex: 'name',
          width: 75,
          key: 'name'
        },
        {
          title: '协议名称',
          dataIndex: 'address',
          width: 295,
          key: 'www'
        },
        {
          title: '所属服务',
          dataIndex: 'age',
          width: 260,
          key: 'cn'
        },
        {
          title: '更新时间',
          dataIndex: 'version',
          key: 'num'
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
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    details () {
      this.visibleDrawer = true
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
