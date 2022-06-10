<template>
  <div>
    <div class="cesiumContainer" id="cesiumContainer"></div>
    <div class="map-popup" id="map-popup" v-if="info">
      <div class="head">
        <div class="title">建筑信息</div>
        <div class="icon" @click="info = null">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="content">
        <table>
          <tr>
            <td class="name">编号</td>
            <td class="value">{{ info.number }}</td>
          </tr>
          <tr>
            <td class="name">建筑名称</td>
            <td class="value">{{ info.buildName }}</td>
          </tr>
          <tr>
            <td class="name">建筑占地面积</td>
            <td class="value">{{ info.landArea }} 平方米</td>
          </tr>
          <tr>
            <td class="name">楼层</td>
            <td class="value">{{ info.floot }}</td>
          </tr>
          <tr>
            <td class="name">楼高</td>
            <td class="value">{{ info.buildHeight }} 米</td>
          </tr>
          <tr>
            <td class="name">单位名称</td>
            <td class="value">{{ info.unitName }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        5: {
          number: 'wsclc_jz_03',
          buildName: '污水处理厂办公楼',
          landArea: '868',
          floot: '2',
          buildHeight: '9.11',
          unitName: '污水处理厂'
        },
        1: {
          number: 'wsclc_jz_00',
          buildName: '污水处理厂设备维修间',
          landArea: '337',
          floot: '2',
          buildHeight: '7.44',
          unitName: '污水处理厂'
        },
        0: {
          number: 'wsclc_jz_042',
          buildName: '污水处理厂设备维修间',
          landArea: '494',
          floot: '1',
          buildHeight: '5.5',
          unitName: '污水处理厂'
        },
        2: {
          number: 'wsclc_jz_024',
          buildName: '污水处理厂设备维修间',
          landArea: '337',
          floot: '2',
          buildHeight: '7.44',
          unitName: '污水处理厂'
        },
        4: {
          number: 'wsclc_jz_02',
          buildName: '污水处理厂设备维修间',
          landArea: '150',
          floot: '1',
          buildHeight: '5.39',
          unitName: '污水处理厂'
        },
        6: {
          number: 'wsclc_jz_014',
          buildName: '污水处理厂值班室',
          landArea: '30',
          floot: '1',
          buildHeight: '3.97',
          unitName: '污水处理厂'
        },
        3: {
          number: 'wsclc_jz_032',
          buildName: '污水处理厂值班室',
          landArea: '30',
          floot: '1',
          buildHeight: '3.97',
          unitName: '污水处理厂'
        },
        BJ06_bui_09: {
          number: 'BJ06_bui_09',
          buildName: '污水处理厂设备维修间',
          landArea: '192',
          floot: '18',
          buildHeight: '62',
          unitName: '污水处理厂'
        },
        BJ06_bui_08: {
          number: 'BJ06_bui_08',
          buildName: '污水处理厂设备维修间',
          landArea: '133',
          floot: '18',
          buildHeight: '62',
          unitName: '污水处理厂'
        }
      },
      info: null
    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNDBkMTI3Zi1lM2QyLTQyOTEtYWFhYS1lMTJmNWVlYmE4MWQiLCJpZCI6MjM3MTYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODM4OTczNTd9.o6FlvhkYGkuQdtBZF2IyDFt8p42JzLRRheEkFJ9gqGg'
    window.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false, // 动画控制，默认true
      baseLayerPicker: false, // 地图切换控件(底图以及地形图)是否显示,默认显示true
      fullscreenButton: true, // 全屏按钮,默认显示true
      geocoder: false, // 地名查找,默认true
      timeline: false, // 时间线,默认true
      vrButton: false, // 双屏模式,默认不显示false
      homeButton: false, // 主页按钮，默认true
      infoBox: false, // 点击要素之后显示的信息,默认true
      selectionIndicator: true, // 选中元素显示,默认true
      sceneModePicker: false, // 是否显示投影方式控件
      navigationHelpButton: false // 是否显示帮助信息控件
      //            navigationHelpButton: false, //是否显示帮助信息控件
      //             imageryProviderViewModels: this._getImageryViewModels(options.mapInitParams.imageryViewModels), //设置影像图列表
      //             terrainProviderViewModels: this._getTerrainViewModels(options.mapInitParams.terrainViewModels)//设置地形图列表
    })
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    var scene = viewer.scene

    var tileset = scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: '3dtiles/02/tileset.json'
      })
    )
    // 白云机场03
    var tileset3 = scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: '3dtiles/03/tileset.json'
      })
    )
    // 白云机场04
    var tileset4 = scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: '3dtiles/04/数据3/tileset.json'
      })
    )

    viewer.zoomTo(tileset4)

    tileset.readyPromise.then(function (tileset) {
      // tile.properties is not defined until readyPromise resolves.
      let transform = tileset._root.transform // 从3dtile得到位置矩阵

      let m = new Cesium.Matrix4()

      Cesium.Matrix4.setTranslation(
        Cesium.Matrix4.IDENTITY,
        new Cesium.Cartesian3(126, -263, 0),
        m
      ) // 构造平移矩阵

      tileset._root.transform = Cesium.Matrix4.multiply(transform, m, transform) // 计算平移之后的位置矩阵，然后更新3dtiles的位置
    })

    tileset3.readyPromise.then(function (tileset) {
      // tile.properties is not defined until readyPromise resolves.
      let transform = tileset._root.transform // 从3dtile得到位置矩阵

      let m = new Cesium.Matrix4()

      Cesium.Matrix4.setTranslation(
        Cesium.Matrix4.IDENTITY,
        new Cesium.Cartesian3(-70, -140, 0),
        m
      ) // 构造平移矩阵

      tileset._root.transform = Cesium.Matrix4.multiply(transform, m, transform) // 计算平移之后的位置矩阵，然后更新3dtiles的位置
    })

    tileset4.readyPromise.then(function (tileset) {
      // tile.properties is not defined until readyPromise resolves.
      let transform = tileset._root.transform // 从3dtile得到位置矩阵

      let m = new Cesium.Matrix4()

      Cesium.Matrix4.setTranslation(
        Cesium.Matrix4.IDENTITY,
        new Cesium.Cartesian3(0, 46, 0),
        m
      ) // 构造平移矩阵

      tileset._root.transform = Cesium.Matrix4.multiply(transform, m, transform) // 计算平移之后的位置矩阵，然后更新3dtiles的位置
    })

    /* 鼠标移动选择开始 */
    var silhouetteBlue =
      Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE
    silhouetteBlue.uniforms.length = 0.01
    silhouetteBlue.selected = []

    var silhouetteGreen =
      Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
    silhouetteGreen.uniforms.color = Cesium.Color.LIME
    silhouetteGreen.uniforms.length = 0.01
    silhouetteGreen.selected = []
    viewer.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createSilhouetteStage([
        silhouetteBlue,
        silhouetteGreen
      ])
    )

    // // 设置要在输入事件上执行的功能
    // viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(
    //   movement
    // ) {
    //   // 将鼠标的点击坐标转换为场景中的坐标
    //   var pickedFeature = viewer.scene.pick(movement.endPosition)
    //   if (Cesium.defined(pickedFeature)) {
    //     if (pickedFeature === silhouetteGreen.selected[0]) {
    //       silhouetteBlue.selected = []
    //     } else {
    //       silhouetteBlue.selected = [pickedFeature]
    //     }
    //   }
    // },
    // Cesium.ScreenSpaceEventType.MOUSE_MOVE) // 绑定鼠标移动事件

    // 绑定鼠标监听
    let vm = this
    viewer.screenSpaceEventHandler.setInputAction(function leftClick(movement) {
      // 将鼠标的点击坐标转换为场景中的坐标
      var pickedFeature = viewer.scene.pick(movement.position)
      if (Cesium.defined(pickedFeature)) {
        console.log(pickedFeature._batchId)
        vm.info = vm.list[pickedFeature._batchId]
        silhouetteGreen.selected = [pickedFeature]
      } else {
        vm.info = null
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK) // 绑定左键点击事件
  }
}
</script>

<style lang="scss">
.cesiumContainer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.map-popup {
  position: fixed;
  top: 60px;
  right: 60px;
  width: 356px;
  height: 330px;
  background: rgba(14, 26, 42, 0.8);
  border: 1px solid #27c49d;
  .head {
    width: 100%;
    height: 46px;
    border-bottom: 1px solid rgba(39, 196, 157, 0.5);
    .title {
      float: left;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #29ffca;
      padding: 13px 0px 0px 16px;
    }
    .icon {
      float: right;
      padding: 12px 16px 0px;
      color: #29ffca;
      cursor: pointer;
    }
  }
  .he-btn {
    background: rgba(254, 245, 122, 0.1) !important;
    box-shadow: 0px 0px 20px 0px #fef57a inset !important;
    border-radius: 4px;
    border: 1px solid #fef57a !important;
  }
  .yl-btn {
    background: rgba(31, 255, 181, 0.1) !important;
    box-shadow: 0px 0px 20px 0px #1fffb5 inset !important;
    border-radius: 4px;
    border: 1px solid #1fffb5 !important;
  }
  .foot {
    width: 100%;
    height: 40px;
    margin-top: 16px;
    .btn {
      width: 124px;
      height: 36px;
      margin: auto;
      background: rgba(0, 99, 161, 0.2);
      border-radius: 4px;
      border: 1px solid #1fa9ff;
      line-height: 36px;
      text-align: center;
      color: white;
      cursor: pointer;
    }
  }
  .content {
    padding: 16px;
    tr:hover {
      background: transparent !important;
    }
    .name {
      width: 128px;
      height: 36px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #91969c;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      padding-left: 11px;
      text-align: left;
    }
    .value {
      width: 201px;
      height: 36px;
      background: rgba(255, 255, 255, 0);
      border: 1px solid #91969c;
      padding-left: 11px;
      color: #fff;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: left;
      .press {
        width: 134px;
        height: 14px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        position: relative;
        div {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 118px;
          height: 14px;
          background: #3aa3e4;
          border-radius: 12px 0px 0px 12px;
        }
        span {
          position: absolute;
          top: -1px;
          right: 18px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .l1 {
        float: left;
        padding-right: 8px;
        padding-top: 6px;
      }
      .btn1 {
        width: 74px;
        height: 28px;
        float: left;
        background: rgba(255, 99, 99, 0.1);
        box-shadow: 0px 0px 20px 0px #ff6363 inset;
        border-radius: 4px;
        border: 1px solid #ff6363;
        text-align: center;
        line-height: 28px;
      }
      .btn2 {
        width: 46px;
        height: 28px;
        background: rgba(31, 255, 181, 0.1);
        box-shadow: 0px 0px 20px 0px #1fffb5 inset;
        border-radius: 4px;
        border: 1px solid #1fffb5;
        text-align: center;
        line-height: 28px;
      }
    }
  }
}
</style>
