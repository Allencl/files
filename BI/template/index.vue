<style lang="less">
  .template-canvas-box{
    position: relative;
    padding: 50px 210px 10px 210px;
    min-height: 670px;
    // background:rgba(255,255,153,0.5);

    .tool-bar {
      position: absolute;
      left: 0px;
      top: 8px;
      height: 50px;
      width: 100%;
      padding: 0px 15px;

      >a{
        position: relative;
        display: inline-block;
        width: 33px;
        height: 33px;
        padding: 0px 15px;
        color: currentColor;
      }

      span.cut{       
        opacity: 0.5;
        cursor: auto;
      }

      .command,.custom {
        width: 100%;
        height: 100%;
        line-height: 33px;
        display: block;
        position: absolute;
        text-align: center;
        top: 0px;
        left: 0px;           
        // top: 9px;
        // position: absolute;
        // left: 12px;

      }

      .iconfont{
        font-size: 20px;
      }

      .disable {
        color: rgba(0, 0, 0, 0.25);
      }

      .ivu-dropdown{
        width: 33px;
        height: 33px;
      }

      .ivu-select-dropdown{
          display: inline-table;
          margin-top: 33px;
      }

      .ivu-color-picker{
        position: absolute;
        top: 6px;
        width: 50px;

        .ivu-color-picker-input{
            padding-top: 2px;
            height: 23px; 
        }

        .ivu-icon-ios-arrow-down{
          line-height: 23px;
        }

        .ivu-color-picker-color{
            width: 13px;
            height: 13px;
        }
      }
    }

    .tool-panel{
      position: absolute;
      left: 0;
      top: 50px;
      width: 200px;
      background: rgba(153,153,102,0.6);

      .common-library{


        li{
          display: inline-block;
          position: relative;
          width: 50px;
          height: 50px;
          list-style: none;
          text-align: center;
          padding: 5px 5px 23px 5px;
          margin-bottom: 6px;
          margin-right: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.5s;
          user-select:none;

          &:hover{
            transform: scale(1.5,1.5);
          }


          p{
            position: absolute;
            left: 0;
            bottom: 5;
            width: 100%;
            padding: 0;
            margin: 0;
            font-size: 13px;
            // user-select:none;
          }

          img{
            height: 100%;
            width: 100%;
          }
        }
      }

      .ivu-collapse.custom{
        .ivu-collapse-content{
          padding: 0px;
        }
        .ivu-collapse-content-box{
          padding-top: 0px;
          padding-bottom: 0px;
        }
      }

      .template-library{
          max-height: 300px;
          overflow-y: auto;
          padding: 10px 13px;

          li{
            position: relative;
            list-style: none;
            width: 100%;
            height: 57px;
            border: 1px solid rgba(203,203,203,0.6);
            padding: 8px 5px 8px 5px;
            margin-bottom: 10px;
            box-shadow: 3px 3px 3px rgba(203, 203, 203, 0.5);
            cursor: pointer;
            transition: all 0.5s;


            &:hover{
              transform: skewX(10deg);
            }

            span{
              width: 100%;
              display: block;
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding-right: 15px;
            }

            .close{
                position: absolute;
                top: 0px;
                right: 0px;
                border-radius: 100%;
                background: #d3d3ff;
                cursor: pointer;
                font-size: 19px;
                color: #fff;
                margin: 5px;
                transition: all 0.6s;



                &:hover{
                    background: #990000;
                    transform: scale(1.1,1.1);
                }
            }


          }
      }
    }

    .cnavas-contend{
      overflow-x: auto;
      width: 100%;

      .canvas-container{
        margin: auto;
        
      }
    }

    .tool-selected{
      position: absolute;
      right:0;
      top:50px;
      width: 200px;
      background: rgba(153,153,102,0.6);

      .control-param{
        list-style: none;


        li{
          margin-bottom: 15px;
          label{
            padding-right: 10px;
            text-align: right;
            display: inline-block;
            width: 70px;
          }
        }

      }
      
    }
    
  }
</style>
<template>
  <div class="template-canvas-box">
    <div class="tool-bar">
        <!-- <a href="javascript:;"><i @click="toolEvent('undo')" :class="`command iconfont icon-undo ${current?'':'disable'}`" title="撤销"></i></a> -->
        <!-- <a href="javascript:;"><i @click="toolEvent('redo')" :class="`command iconfont icon-redo ${(config['length']==cacheMax)?'':'disable'}`" title="重做"></i></a> -->
        
        <a href="javascript:;"><i @click="toolEvent('copy')" class="command iconfont icon-copy-o" title="复制"></i></a>
        <a href="javascript:;"><i @click="toolEvent('paste')" :class="`command iconfont icon-paster-o ${isCopy?'':'disable'}`" title="粘贴"></i></a>
        <a href="javascript:;"><i @click="toolEvent('deleted')" :class="`command iconfont icon-delete-o ${selectionTed?'':'disable'}`" title="删除"></i></a>
        <a href="javascript:;"><i @click="toolEvent('clear')" class="command iconfont icon-trash-fill" title="清空画布"></i></a>
          <a href="javascript:;"><span class="cut custom iconfont icon-cut-off"></span></a>

        <Dropdown @on-click="toolLayoutChange">
            <a href="javascript:;" style="color:inherit;">
                <i :class="`command iconfont icon-center ${selectionTed?'':'disable'}`" title="画布居中"></i>
            </a>
            <DropdownMenu slot="list">         
                <DropdownItem name="center"><i class="iconfont icon-center" title="画布居中"></i>画布居中</DropdownItem>
                <DropdownItem name="center-level"><i class="iconfont icon-center-level" title="水平居中"></i> 水平居中</DropdownItem>
                <DropdownItem name="center-vertical"><i class="iconfont icon-center-vertical" title="垂直居中"></i> 垂直居中</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown @on-click="toolCoordChange">
            <a href="javascript:;" style="color:inherit;">
                <i :class="`command iconfont icon-point ${selectionTed?'':'disable'}`" title="旋转点"></i>
            </a>
            <DropdownMenu slot="list">         
                <DropdownItem name="left-top"><i class="iconfont icon-point-left-top" title="左-上"></i> 左-上</DropdownItem>
                <DropdownItem name="left-center"><i class="iconfont icon-point-left-center" title="左-中"></i> 左-中</DropdownItem>
                <DropdownItem name="left-bottom"><i class="iconfont icon-point-left-bottom" title="左-下"></i> 左-下</DropdownItem>
                <Divider style="margin:3px 0px;" dashed />
                <DropdownItem name="center-top"><i class="iconfont icon-point-center-top" title="中-上"></i> 中-上</DropdownItem>
                <DropdownItem name="center-center"><i class="iconfont icon-point-center-center" title="中-中"></i> 中-中</DropdownItem>
                <DropdownItem name="center-bottom"><i class="iconfont icon-point-center-bottom" title="中-下"></i> 中-下</DropdownItem>
                <Divider style="margin:3px 0px;" dashed />
                <DropdownItem name="right-top"><i class="iconfont icon-point-right-top" title="右-上"></i> 右-上</DropdownItem>
                <DropdownItem name="right-center"><i class="iconfont icon-point-right-top" title="右-中"></i> 右-中</DropdownItem>
                <DropdownItem name="right-bottom"><i class="iconfont icon-point-right-bottom" title="右-下"></i> 右-下</DropdownItem>
                    
            </DropdownMenu>
        </Dropdown>
        <a href="javascript:;"><i @click="toolEvent('toBack')" :class="`command iconfont icon-to-back ${selectionTed?'':'disable'}`" title="层级置底"></i></a>
        <a href="javascript:;"><i @click="toolEvent('toFront')" :class="`command iconfont icon-to-front ${selectionTed?'':'disable'}`" title="层级置顶"></i></a>
        <a href="javascript:;"><i @click="toolEvent('lock')" :class="`command iconfont icon-cut-lock ${selectionTed?'':'disable'}`" title="锁定"></i></a>
        <a href="javascript:;"><i @click="toolEvent('unlock')" class="command iconfont icon-cut-unlock" title="解锁全部"></i></a>
        <a href="javascript:;"><i @click="toolEvent('group')" :class="`command iconfont icon-group ${selectionTed?'':'disable'}`" title="合并"></i></a>
        <a href="javascript:;"><i @click="toolEvent('ungroup')" :class="`command iconfont icon-ungroup ${selectionTed?'':'disable'}`" title="分解"></i></a>
         
        <a href="javascript:;"><span class="cut custom iconfont icon-cut-off"></span></a>

        <Dropdown @on-click="toolSetFamily">
            <a href="javascript:;" style="color:inherit;">
                <i :class="`command iconfont icon-font-family ${selectionTed?'':'disable'}`" title="适应画布"></i>
            </a>
            <DropdownMenu slot="list">    
                <DropdownItem name="monospace">monospace</DropdownItem>
                <DropdownItem name="Times New Roman">Times New Roman</DropdownItem>
                <DropdownItem name="sans-serif">sans-serif</DropdownItem>
                <DropdownItem name="cursive">cursive</DropdownItem>
                <DropdownItem name="fantasy">fantasy</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown @on-click="toolSetFontSize">
            <a href="javascript:;" style="color:inherit;">
                <i :class="`command iconfont icon-font-size ${selectionTed?'':'disable'}`" title="字体大小"></i>
            </a>
            <DropdownMenu slot="list">    
                <DropdownItem name="12"><span style="font-size:12px">12 px</span></DropdownItem>
                <DropdownItem name="14"><span style="font-size:14px">14 px</span></DropdownItem>
                <DropdownItem name="16"><span style="font-size:16px">16 px</span></DropdownItem>
                <DropdownItem name="18"><span style="font-size:18px">18 px</span></DropdownItem>
                <DropdownItem name="20"><span style="font-size:20px">20 px</span></DropdownItem>
                <DropdownItem name="26"><span style="font-size:26px">26 px</span></DropdownItem>
                <DropdownItem name="36"><span style="font-size:36px">36 px</span></DropdownItem>
                <DropdownItem name="48"><span style="font-size:48px">48 px</span></DropdownItem>
            </DropdownMenu>
        </Dropdown>


        <a href="javascript:;"><i @click="toolFontEvent('fontSize+')" :class="`command iconfont icon-font-add ${selectionTed?'':'disable'}`" title="字号+"></i></a>
        <a href="javascript:;"><i @click="toolFontEvent('fontSize-')" :class="`command iconfont icon-font-sub ${selectionTed?'':'disable'}`" title="字号-"></i></a>
        <a href="javascript:;"><i @click="toolFontEvent('fontStyle')" :class="`command iconfont icon-font-style ${selectionTed?'':'disable'}`" title="倾斜"></i></a>
        <a href="javascript:;"><i @click="toolFontEvent('fontWeight')" :class="`command iconfont icon-font-weight ${selectionTed?'':'disable'}`" title="加粗"></i></a>
        <a href="javascript:;"><i @click="toolFontEvent('textDecoration')" :class="`command iconfont icon-font-under ${selectionTed?'':'disable'}`" title="下划线"></i></a>
        <a href="javascript:;" style="cursor:default;"><i :class="`command iconfont icon-font-color ${selectionTed?'':'disable'}`" title="字体颜色"></i></a>
        <ColorPicker v-model="colorFont" />
        <a href="javascript:;" style="cursor:default;margin-left:56px;"><i :class="`command iconfont icon-font-background ${selectionTed?'':'disable'}`" title="字体背景色"></i></a>
        <ColorPicker v-model="colorFontBackground" />
          <a href="javascript:;" style="margin-left:50px;"><span class="cut custom iconfont icon-cut-off"></span></a>
        
        <a href="javascript:;"><span class="custom iconfont icon-SVG" title="预览" @click="previewHandle"></span></a>
        <a href="javascript:;"><span class="custom iconfont icon-save" title="保存模板" @click="saveHandle"></span></a>

        <!-- <span class="separator"></span> -->
        <!-- <a href="javascript:;"><i data-command="zoomOut" class="command iconfont icon-zoom-out-o" title="缩小"></i></a> -->
        <!-- <a href="javascript:;"><i data-command="autoZoom" class="command iconfont icon-fit" title="适应画布"></i></a> -->
        <!-- <a href="javascript:;"><i data-command="resetZoom" class="command iconfont icon-actual-size-o" title="实际尺寸"></i></a> -->
    

        <!-- <a href="javascript:;"><i data-command="multiSelect" class="command iconfont icon-select" title="多选"></i></a> -->
        <!-- <i data-command="addGroup" class="command iconfont icon-group disable" title="成组"></i>
        <i data-command="unGroup" class="command iconfont icon-ungroup disable" title="解组"></i> -->
            <!-- <a href="javascript:;"><span class="cut custom iconfont icon-cut-off"></span></a> -->


    </div>
    <div class="tool-panel">

      <Collapse v-model="Collapse1">
          <Panel name="1">
            工具箱  
            <ul slot="content" class="common-library">
              <li>
                <img 
                  @dragstart="dragPanelHandle('rect')" 
                  @dragend="dragPanelHandle(null)" 
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYzNzA0NDk4NzM1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NjMiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkwIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xMjggODUzLjMzMzMzM2g3NjhhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMCA0Mi42NjY2NjctNDIuNjY2NjY2VjIxMy4zMzMzMzNhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMC00Mi42NjY2NjctNDIuNjY2NjY2SDEyOGE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwLTQyLjY2NjY2NyA0Mi42NjY2NjZ2NTk3LjMzMzMzNGE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwIDQyLjY2NjY2NyA0Mi42NjY2NjZ6TTE3MC42NjY2NjcgMjU2aDY4Mi42NjY2NjZ2NTEySDE3MC42NjY2NjdWMjU2eiIgZmlsbD0iIzBhMGEwYSIgcC1pZD0iMTU2NCI+PC9wYXRoPjwvc3ZnPg=="
                >
                <p>方形</p>
              </li>
              <li>
                <img 
                  @dragstart="dragPanelHandle('transverse')" 
                  @dragend="dragPanelHandle(null)" 
                  src="data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI2NDAiIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj4KPHRpdGxlPjwvdGl0bGU+CjxnIGlkPSJpY29tb29uLWlnbm9yZSI+CjwvZz4KPHBhdGggZmlsbD0iIzAwMCIgZD0iTTUwNi42NjcgMjkzLjMzM2gtMzczLjMzM2MtMTQuNzIgMC0yNi42NjcgMTEuOTQ3LTI2LjY2NyAyNi42NjdzMTEuOTQ3IDI2LjY2NyAyNi42NjcgMjYuNjY3aDM3My4zMzNjMTQuNzIgMCAyNi42NjctMTEuOTQ3IDI2LjY2Ny0yNi42NjdzLTExLjk0Ny0yNi42NjctMjYuNjY3LTI2LjY2N3oiPjwvcGF0aD4KPC9zdmc+Cg=="
                >
                <p>横线</p>
              </li>          
              <li>
                <img 
                  @dragstart="dragPanelHandle('vertical')" 
                  @dragend="dragPanelHandle(null)" 
                  src="data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI2NDAiIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj4KPHRpdGxlPjwvdGl0bGU+CjxnIGlkPSJpY29tb29uLWlnbm9yZSI+CjwvZz4KPHBhdGggZmlsbD0iIzAwMCIgZD0iTTI5My4zMzMgMTMzLjMzM3YzNzMuMzMzYzAgMTQuNzIgMTEuOTQ3IDI2LjY2NyAyNi42NjcgMjYuNjY3czI2LjY2Ny0xMS45NDcgMjYuNjY3LTI2LjY2N3YtMzczLjMzM2MwLTE0LjcyLTExLjk0Ny0yNi42NjctMjYuNjY3LTI2LjY2N3MtMjYuNjY3IDExLjk0Ny0yNi42NjcgMjYuNjY3eiI+PC9wYXRoPgo8L3N2Zz4K"
                >
                <p>竖线</p>
              </li>
              <li>
                <img 
                  @dragstart="dragPanelHandle('img')" 
                  @dragend="dragPanelHandle(null)" 
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYzNzA1NTYxODIyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUwMTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc0OCAxODMuNVYwSDk2djEwMjRoODM2VjE4My41eiIgZmlsbD0iIzcxQ0U1MiIgcC1pZD0iNTAxOCI+PC9wYXRoPjxwYXRoIGQ9Ik05MzIgMTg0SDc0OFYwIiBmaWxsPSIjQzFGRjk5IiBwLWlkPSI1MDE5Ij48L3BhdGg+PHBhdGggZD0iTTMxNC4xIDQ2MC45YzE3LjUgOS45IDM4LjkgOS44IDU2LjMtMC40IDE3LjQtMTAuMiAyOC0yOC44IDI3LjktNDguOS0wLjItMzEuMS0yNS42LTU2LjEtNTYuNy01NS45LTMxLjIgMC4xLTU2LjIgMjUuNS01NiA1Ni43IDAuMSAyMCAxMSAzOC41IDI4LjUgNDguNXpNNDY2LjUgNTg2LjdsLTc0LjktNzguOEwyODAuNyA2NjZsNDcwLjMtMy4xLTE0NC4yLTIyOC4yeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iNTAyMCI+PC9wYXRoPjwvc3ZnPg=="
                >
                <p>图片</p>
              </li>
              <li>
                <img 
                  @dragstart="dragPanelHandle('text')" 
                  @dragend="dragPanelHandle(null)" 
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYzNzIwNDEyMzI1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1NzYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTg1OS40Mjg1NzEgMjU2YTE4LjI4NTcxNCAxOC4yODU3MTQgMCAwIDEtMTguMjg1NzE0LTE4LjI4NTcxNFYxNDYuMjg1NzE0SDE4Mi44NTcxNDN2OTEuNDI4NTcyYTE4LjI4NTcxNCAxOC4yODU3MTQgMCAwIDEtMzYuNTcxNDI5IDB2LTEwOS43MTQyODZhMTguMjg1NzE0IDE4LjI4NTcxNCAwIDAgMSAxOC4yODU3MTUtMTguMjg1NzE0aDY5NC44NTcxNDJhMTguMjg1NzE0IDE4LjI4NTcxNCAwIDAgMSAxOC4yODU3MTUgMTguMjg1NzE0djEwOS43MTQyODZhMTguMjg1NzE0IDE4LjI4NTcxNCAwIDAgMS0xOC4yODU3MTUgMTguMjg1NzE0eiIgcC1pZD0iMzU3NyI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIgOTMyLjU3MTQyOWExOC4yODU3MTQgMTguMjg1NzE0IDAgMCAxLTE4LjI4NTcxNC0xOC4yODU3MTVWMTI4YTE4LjI4NTcxNCAxOC4yODU3MTQgMCAwIDEgMzYuNTcxNDI4IDBWOTE0LjI4NTcxNGExOC4yODU3MTQgMTguMjg1NzE0IDAgMCAxLTE4LjI4NTcxNCAxOC4yODU3MTV6IiBwLWlkPSIzNTc4Ij48L3BhdGg+PHBhdGggZD0iTTY5NC44NTcxNDMgOTMyLjU3MTQyOUgzMjkuMTQyODU3YTE4LjI4NTcxNCAxOC4yODU3MTQgMCAwIDEgMC0zNi41NzE0MjloMzY1LjcxNDI4NmExOC4yODU3MTQgMTguMjg1NzE0IDAgMCAxIDAgMzYuNTcxNDI5eiIgcC1pZD0iMzU3OSI+PC9wYXRoPjwvc3ZnPg=="
                >
                <p>文本</p>
              </li>          
            </ul>
          </Panel>
      </Collapse>
      <Collapse v-model="Collapse2" class="custom">
          <Panel name="1">
            自定义-模板库  
            <div slot="content">
                <ul v-if="templateLocal['length']" class="template-library">
                  <li v-for="(o,i) in templateLocal" :key="i" @click="templateLoader(o)">
                      <span :title="o['templateName']">{{ o['templateName'] }}</span>
                      <i>{{ o['createTime'] }}</i>
                      <Icon @click="closeTemplate(o)" class="close" type="ios-close"></Icon>
                  </li>         
                </ul>

                <div v-else style="text-indent: 25px;padding:17px 15px;">
                  <span>编辑完成后，请点击工具栏“保存模板”按钮 [</span>
                  <span class="custom iconfont icon-save"></span>
                  <span> ]。保存模板至模板库</span>
                </div>
            </div>
          </Panel>
      </Collapse>

    </div>
    <div class="cnavas-contend">
      <canvas id="c"></canvas>
    </div>
    <div class="tool-selected">


      <Collapse v-if="fabricType=='img'" v-model="Collapse3">
          <Panel name="1">
              图片-设置  
              <ul slot="content" class="control-param">
                <!-- <li>
                    <label>背景色:</label>
                    <ColorPicker v-model="imgBackground" />
                </li> -->
                <li>
                    <label>图片URL:</label>
                    <Button @click="addImgBackgroundURL" size="small" type="info" shape="circle" icon="iconfont icon-md-add" title="新增" style="line-height:25px;"></Button>
                </li>                
              </ul>
          </Panel>
      </Collapse> 
      <Collapse v-else v-model="Collapse3">
          <Panel name="1">
              画布-设置  
              <ul slot="content" class="control-param">
                <li>
                    <label>宽(px):</label>
                    <InputNumber v-model="canvasWidth" :width="110" :max="3000" :min="100" :step="10"></InputNumber>
                </li>
                <li>
                    <label>高(px):</label>
                    <InputNumber v-model="canvasHeight" :width="110" :max="3000" :min="100" :step="10"></InputNumber>              
                </li>
                <li>
                    <label>背景色:</label>
                    <ColorPicker v-model="canvasBackground" />
                </li>
                <li>
                    <label>背景URL:</label>
                    <Button @click="addBackgroundURL" size="small" type="info" shape="circle" icon="iconfont icon-md-add" title="新增" style="line-height:25px;"></Button>
                </li>                
              </ul>
          </Panel>
      </Collapse>      


      <!-- 保存模板 modal -->
      <Modal
          v-model="modalSave"
          title="保存-自定义模板"
          @on-ok="templateSaveHandle"

        >

          <Input v-model="templateName" placeholder="请输入模板名称..." />
      </Modal>

      <!-- 画布背景 modal -->
      <Modal
          v-if="fabricType=='img'"
          v-model="modalCanvas"
          title="设置-图片背景"
          @on-ok="addImgBackgroundHandle"

        >
          <span>注：请输入网络地址。</span>
          <br/>
          <span style="font-style:oblique;">例：https://gw.alipayobjects.com/zos/basement_prod/dd371ce9-ee8b-46b3-9cfa-de49f853673d.svg</span>
          <br/>
          &nbsp;
          <Input v-model="imgBackgroundURLValue" placeholder="请输入图片地址..." />
      </Modal>

      <!-- 图片背景 modal -->
      <Modal
          v-else
          v-model="modalImg"
          title="设置-画布背景"
          @on-ok="addBackgroundHandle"

        >
          <span>注：请输入网络地址。</span>
          <br/>
          <span style="font-style:oblique;">例：https://gw.alipayobjects.com/zos/basement_prod/dd371ce9-ee8b-46b3-9cfa-de49f853673d.svg</span>
          <br/>
          &nbsp;
          <Input v-model="backgroundURLValue" placeholder="请输入图片地址..." />
      </Modal>


    </div>
  </div>
</template>

<script>
    import './assets/icon/font.css';


export default {
  data() {
    return {

      modalCanvas:false,
      modalImg:false,
      modalSave:false,


      Collapse1:'1',
      Collapse2:'1',
      Collapse3:'1',
      colorFont:'#000',
      colorFontBackground:'#fff',
      canvasBackground:'#fff',
      backgroundURLValue:'',
      imgBackgroundURLValue:'',

      dragTarget:null,      // 拖拽对象
      isCopy:false,         // 已复制
      selectionTed:false,   // 是否选中
      fabricType:null,      // 挂件类型
      config:[],            // 历史记录
      cacheMax:30,          // 最大 历史记录
      current:0,            // 当前状态
      templateLocal:[],     // 缓存模板
      

      // 画布 设置  
      canvasWidth:1100,
      canvasHeight:1600,
      fontFamily:'monospace',
      fontSize:14,
    

    }
  },
  mounted(){
      this.initCanvas(); 	            // 初始化
      this.eventHandle();             // 事件 初始化
      this.updateTemplateFunuc();     // 缓存模板
    
  },
  watch: {
    /**
     * 监听 画布 width
     * */
    canvasWidth(newValue) {
        this.__canvas.setWidth(newValue);
    },
    /**
     * 监听 画布 height
     * */
    canvasHeight(newValue) {
        this.__canvas.setHeight(newValue);
    }, 
    /**
     * 监听 画布 背景
     * */
    canvasBackground(newValue) {
        let that = this;
        this.__canvas.set({backgroundColor:newValue},that.__canvas.requestRenderAll());
    },     
    /**
     * 监听 字体颜色
     * */
    colorFont(newValue) {
        let that = this;
        let objects = this.__canvas.getActiveObjects();

        if( !objects['length'] ) return;  
        objects.map(o=>o.set({fill:newValue},that.__canvas.requestRenderAll()) );
    },
    /**
     * 监听 字体背景
     * */
    colorFontBackground(newValue) {
        let that = this;
        let objects = this.__canvas.getActiveObjects();

        if( !objects['length'] ) return;  
        objects.map(o=>o.set({backgroundColor:newValue},that.__canvas.requestRenderAll()) );
    
    },          
  },
  methods: {
    /**
     *  canvas init
    */
    initCanvas: function(){
      let that = this;

      // new fabric.StaticCanvas 只读模式
      let canvas = this.__canvas = new fabric.Canvas('c',{
        width:that.canvasWidth||800,
        height:that.canvasHeight||500,
        backgroundColor:that.canvasBackground,
        // selectionColor: 'rgba(102,153,255,1)',
        // selectionLineWidth: 20,
        // isDrawingMode:true
      });
      // canvas.loadFromJSON({"version":"3.2.0","objects":[{"type":"rect","version":"3.2.0","originX":"center","originY":"center","left":100,"top":100,"width":50,"height":50,"fill":"#fff","stroke":"#000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"line","version":"3.2.0","originX":"center","originY":"center","left":125,"top":50,"width":150,"height":0,"fill":"rgb(0,0,0)","stroke":"#000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"x1":-75,"x2":75,"y1":0,"y2":0},{"type":"line","version":"3.2.0","originX":"center","originY":"center","left":50,"top":125,"width":0,"height":150,"fill":"rgb(0,0,0)","stroke":"#000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"x1":0,"x2":0,"y1":-75,"y2":75},{"type":"textbox","version":"3.2.0","originX":"center","originY":"center","left":100,"top":100,"width":90,"height":20.34,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"文本。。。","fontSize":18,"fontWeight":"normal","fontFamily":"monospace","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"splitByGrapheme":false,"styles":{}}]});

      fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';  // 对象缺省原点都在中心
      // fabric.Object.prototype.centeredRotation = false

      // console.log(  JSON.stringify(canvas) );
      // canvas.toJSON（）
      // canvas.toObject（）	
      
      // this.addRect();
    },
    /**
     * ***********************     事件     **********************
     */
        /**
     *  canvas 事件
     */
    eventHandle: function(){

        let that = this;

        // 拖拽事件 
        this.__canvas.on('drop', function(option) {

          // 默认值 
          let defaultConfig = {
            layerX:option.e.layerX,
            layerY:option.e.layerY
          };
          switch (that.dragTarget) {
            case 'rect':  // 方形
              that.addRect(defaultConfig);
              break;
            case 'transverse':	// 横线
              that.addLineTransverse(defaultConfig);
              break;
            case 'vertical':	// 竖线
              that.addLineVertical(defaultConfig);
              break;
            case 'img':			// 图片
              that.addImg(defaultConfig);
              break;	
            case 'text':			// 文本
              that.addText(defaultConfig);
              break;																				
            default:
              break;
          }

        });




        /************   对象 事件 begin   *****************/
        // 对象 创建  
        this.__canvas.on('object:added', function(option) {
            // (option['jsonSource']!='history') && that.cacheStatus();  // 缓存
        });

        // 对象 删除 
        this.__canvas.on('object:removed', function(option) {

            // that.cacheStatus();  // 缓存
        });

        // 对象 修改  
        this.__canvas.on('object:modified', function(option) {

            // that.cacheStatus();  // 缓存
        });
        

        /************   对象 事件 over   *****************/







        /************   select 事件 begin   *****************/

        // 选中 创建
        this.__canvas.on('selection:created', function(option) {
            let object = that.__canvas.getActiveObject();

            that.selectionTed = true;   // 选中
            that.fabricType = object['fabricType'];  // 挂件类型


            // 获取 字体颜色 背景
            if( object['fabricType'] == 'text' ) {
              that.colorFont = object['fill']||'#000';
              that.colorFontBackground = object['backgroundColor']||'#fff';
            }

        });


        // 选中 更新
        this.__canvas.on('selection:updated', function(option) {
            let object = that.__canvas.getActiveObject();

            that.fabricType = object['fabricType'];  // 挂件类型

            // 获取 字体颜色 背景
            if( object['fabricType'] == 'text' ) {
              that.colorFont = object['fill']||'#000';
              that.colorFontBackground = object['backgroundColor']||'#fff';
            }

        });

        // 不选中
        this.__canvas.on('selection:cleared', function(option) {
            that.selectionTed = false;
            that.fabricType = null;
            that.colorFont = '#fff';
            that.colorFontBackground = '#fff';

        });

        /************   select 事件 over   *****************/






    },
    /**
     *  使用自定义 模板
     */
    templateLoader: function(json){
        let canvas = this.__canvas;
        canvas.loadFromJSON(json,canvas.renderAll.bind(canvas));
    },
    /**
     *  缓存  状态
     */
    cacheStatus: function(){
        let json = this.__canvas.toJSON();
        let config = this.config;
        
        if( config['length'] >= this.cacheMax ){
            config = config.slice(1);
        }
        
        this.config = config.concat([Object.assign({},json,{jsonSource:'history'})]);
        this.current = this.config['length']-1;
    },
    /**
     * ***********************    面板 事件  begin   **********************
     */
    /**
     *  面板 拖拽 
    */
    dragPanelHandle: function(key){
      this.dragTarget = key; 
    },
    /**
     *  删除 模板 
    */
    closeTemplate: function(option){
        let tpl = localStorage.getItem("templateCustom");
        let newJson = JSON.parse(tpl).filter(o=>o['createTime']!=option['createTime']);
    
        localStorage.setItem("templateCustom",JSON.stringify(newJson) );
        this.updateTemplateFunuc();   // 刷新缓存 
    },
    /**
     *  add 画布背景 URL
     */
    addBackgroundURL: function(){
        this.modalImg = true;
    },  
    /**
     *  add 图片背景 URL
    */
    addImgBackgroundURL: function(){
        this.modalCanvas = true;
    },  
    /**
     * 设置 图片背景
    */
    addImgBackgroundHandle: function(){

        let canvas = this.__canvas;
        let url = this.imgBackgroundURLValue.trim();
        let object = canvas.getActiveObject();

        if( !url ) return;

        fabric.Image.fromURL(url, function(img) {
          // img.scale(0.5).set({
          //   left: 100,
          //   top: 100,
          //   angle: -15,
          //   clipTo: function (ctx) {
          //     ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
          //   }
          // });
          img.set({
            fabricType:'img',  // 挂件类型
            left: object['left'],
            top: object['top'],
          });
          canvas.add(img).setActiveObject(img);
          canvas.remove(object);  

        });
    },         
    /**
     * 设置 画布背景
     */
    addBackgroundHandle: function(){
        let url = this.backgroundURLValue.trim();
        let canvas = this.__canvas;

        if( !url ) return;
        canvas.setBackgroundImage(url,canvas.renderAll.bind(canvas), {
          width: canvas.width,
          height: canvas.height,
          originX: 'left',
          originY: 'top'
        });
    },
    /**
     *  工具 事件
     */
    toolEvent: function(active){

      switch (active) {
        
        case 'undo':      // 撤销
            this.toolEventUndo();
            break;
        case 'redo':      // 重做
            this.toolEventRedo();
            break;                    
        case 'copy':      // 复制
            this.toolEventCopy();
            this.isCopy = true;
            break;
        case 'paste':     // 粘贴
            this.toolEventPaste();
            break;    
        case 'deleted':   // 删除
            this.toolEventDeleted();
            break;   
        case 'clear':     // 清空
            this.toolEventClear();
            break;     
        case 'toBack':     // 层级置底
            this.toolEventToBack();
            break; 
        case 'toFront':     // 层级置顶
            this.toolEventToFront();
            break;                                                 
        case 'lock':     // 锁定当前
            this.toolEventLock();
            break;  
        case 'unlock':     // 解锁全部
            this.toolEventUnlock();
            break;                 
        case 'group':    // 合并
            this.toolEventGroup();
            break;       
        case 'ungroup':    // 分解
            this.toolEventUnGroup();
            break;                     
        default:
          break;
      }
    },
    /**
     *  刷新缓存
     */
    updateTemplateFunuc: function(){ 
        let tpl = localStorage.getItem("templateCustom")||"[]";

        this.templateLocal = JSON.parse( tpl );

    },
    /**
     * ***********************    面板 事件  over   **********************
    */
    /**
     * ***********************     event - tool  begin  **********************
    */   
    /**
     *  tool 撤销
    */    
    toolEventUndo: function(){
        let that = this; 
        let canvas = this.__canvas;      
        let cur = this.current;


        // if( cur > 0 ) {
        //   this.current = cur-1;

        //   this.$nextTick(()=>{
        //     let len = that.current;
        //     canvas.loadFromJSON(that.config[len],canvas.renderAll.bind(canvas),function(json,obj){
        //       obj.set({jsonSource:"history"});
        //     });
        //   });


        //   console.log( this.current );
        //   console.log( this.config );
        // }
    },
    /**
     *  tool 重做
     */    
    toolEventRedo: function(){
        let that = this; 
        let canvas = this.__canvas;
        let cur = this.current;

        // if( cur < (that.config.length-1) ) {
        //   this.current = cur+1;

        //   this.$nextTick(()=>{
        //     let len = that.current;
        //     canvas.loadFromJSON(that.config[len],canvas.renderAll.bind(canvas),function(json,obj){
        //       obj.set({jsonSource:"history"});
        //     });
        //   });
        // }


    },        
    /**
     *  tool 保存
     */    
    saveHandle: function(){
        
        this.modalSave = true; 
        // this.$Notice.open({
        //     duration:0,
        //     title: '保存json文件',
        //     desc: JSON.stringify( json ) 
        // });

        // this.templateSaveHandle(json); 

    },
    /**
     *  tool 保存模板到本地
     */    
    templateSaveHandle: function(){
        let name = (this.templateName||'').trim();
        if(!name) return;

        let json = this.__canvas.toJSON();
        let temp = localStorage.getItem("templateCustom") || "[]";    
        let newJson = JSON.parse(temp).concat([Object.assign({},json,{templateName:name,createTime:new Date().toLocaleString()})]);

        localStorage.setItem("templateCustom",JSON.stringify(newJson) );
        this.updateTemplateFunuc();    // 刷新模板


        this.$Notice.open({
            duration:0,
            title: '保存json文件',
            desc: JSON.stringify( json ) 
        });

    },
    /**
     *  tool 预览
     */
    previewHandle: function(){
      let svg = this.__canvas.toSVG(); 
  

      const newWin = window.open("", "_blank");
      newWin.document.write(svg);
      newWin.document.title = '模板-预览';
      newWin.document.close();
    },
    /**
     *  tool 合并
     */
    toolEventGroup: function(){
        let canvas = this.__canvas;
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== 'activeSelection') {
          return;
        }
        canvas.getActiveObject().toGroup();
        canvas.requestRenderAll();      
    },
    /**
     *  tool 分解
     */
    toolEventUnGroup: function(){
        let canvas = this.__canvas;

        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== 'group') {
          return;
        }
        canvas.getActiveObject().toActiveSelection();
        canvas.requestRenderAll();
    },

    /**
     *  tool 复制
     */
    toolEventCopy: function(){
        let that = this;

        if(! this.__canvas.getActiveObject() ) return;
        this.__canvas.getActiveObject().clone(function(cloned) {
          that._clipboard = cloned;
        });
    },
    /**
     *  tool 粘贴
    */
    toolEventPaste: function(){
        let that = this;

        if( String(this._clipboard) == 'undefined' ) return;
        this._clipboard.clone(function(clonedObj) {
            that.__canvas.discardActiveObject();
            clonedObj.set({
              left: clonedObj.left + 30,
              top: clonedObj.top + 30,
              evented: true,
            });

            if (clonedObj.type === 'activeSelection') {
              // active selection needs a reference to the canvas.
              clonedObj.canvas = that.__canvas;
              clonedObj.forEachObject(function(obj) {
                that.__canvas.add(obj);
              });
              // this should solve the unselectability
              clonedObj.setCoords();
            } else {
              that.__canvas.add(clonedObj);
            }

            that._clipboard.top += 30;
            that._clipboard.left += 30;
            that.__canvas.setActiveObject(clonedObj);
            that.__canvas.requestRenderAll();
        });
    },
    /**
     *  tool 删除
    */
    toolEventDeleted: function(){
        let that = this;
        let activeObject = this.__canvas.getActiveObject();

        if( !activeObject ) return;  

        // 单个 多个
        if( !activeObject._objects ) {
          that.__canvas.remove(activeObject);  
        } else{
          activeObject._objects.map(o=>that.__canvas.remove(o));
        }
    },
    /**
     *  tool 清空画布
    */
    toolEventClear: function(){
        this.__canvas.clear();
        this.__canvas.set({backgroundColor:'#fff'});
    },
    /**
     *  tool 层级置底
    */
    toolEventToBack: function(){
        let object = this.__canvas.getActiveObject();

        if( !object ) return;  

        this.__canvas.sendToBack(object)      //向下跳底层
        this.__canvas.discardActiveObject();
        // canvas.sendBackwards(t) //向下跳一层
    },
    /**
     *  tool 层级置顶
    */
    toolEventToFront: function(){
        let object = this.__canvas.getActiveObject();

        if( !object ) return; 
        this.__canvas.bringToFront(object);  //向上跳顶层 
        this.__canvas.discardActiveObject();

        // canvas.bringToFront(t)  //向上跳顶层：
    },
    /**
     *  tool 锁定当前
    */
    toolEventLock: function(){

        let that = this;
        let objects = this.__canvas.getActiveObjects();

        if( !objects['length'] ) return;  

        objects.map(o=>o.set({'selectable':false}) );   
        this.__canvas.discardActiveObject();
        // this.__canvas.renderAll()

    },
    /**
     *  tool 解锁全部
    */
    toolEventUnlock: function(){
        let objects = this.__canvas.getObjects();



        objects.map(o=>o.set({selectable:true}));
        // this.__canvas.discardActiveObject();
        // this.__canvas.controlsAboveOverlay(true);
    },
    /**
     *  控制 中心点 
    */    
    toolCoordChange: function(active){

        let object = this.__canvas.getActiveObject()

        if( !object ) return;

        switch (active) {
          case 'left-top':        // 左上
            object.set({centeredRotation:false,originX:'left',originY:'top'});
            break;
          case 'left-center':     // 左中
            object.set({centeredRotation:false,originX:'left',originY:'center'});
            break; 
          case 'left-bottom':     // 左下
            object.set({centeredRotation:false,originX:'left',originY:'bottom'});
            break;
          case 'center-top':      // 中上
            object.set({centeredRotation:false,originX:'center',originY:'top'});
            break;  
          case 'center-center':   // 中中
            object.set({centeredRotation:false,originX:'center',originY:'center'});
            break;
          case 'center-bottom':    // 中下
            object.set({centeredRotation:false,originX:'center',originY:'bottom'});
            break; 
          case 'right-top':       // 右上
            object.set({centeredRotation:false,originX:'right',originY:'top'});
            break;
          case 'right-center':   // 右中
            object.set({centeredRotation:false,originX:'right',originY:'center'});
            break;    
          case 'right-bottom':    // 右下
            object.set({centeredRotation:false,originX:'right',originY:'bottom'});
            break;                                             
          default:
            break;
        }
    },    
    /**
     *  控制 位置 
    */
    toolLayoutChange: function(active){

        let object = this.__canvas.getActiveObject()

        if( !object ) return;

        switch (active) {
          case 'center':          // 居中
            this.__canvas.viewportCenterObject(object);
            break;
          case 'center-level':   // 水平居中
            this.__canvas.viewportCenterObjectH(object);
            break;
          case 'center-vertical':    // 垂直居中
            this.__canvas.viewportCenterObjectV(object);
            break;                
          default:
            break;
        }
    },  
    /**
     * 字体 样式
    */  
    toolSetFamily: function(active){
        let that = this;
        let objects = this.__canvas.getActiveObjects();

        if( !objects['length'] ) return;  
        objects.map(o=>o.set({fontFamily:active,},that.__canvas.requestRenderAll()) );
    
    },
    /**
     * 字体 大小
    */     
    toolSetFontSize: function(sum){
        let that = this;
        let objects = this.__canvas.getActiveObjects();

        if( !objects['length'] ) return;  
        objects.map(o=>o.set({fontSize:Number(sum)},that.__canvas.requestRenderAll()) );
    },
    /**
     * 字体 设置
    */    
    toolFontEvent: function(active){
        let that = this;
        let objects = this.__canvas.getActiveObjects();


        if( !objects['length'] ) return;  

        switch (active) {
          case 'fontSize+':     // 字号加
            objects.map(o=>o.set({fontSize:Number(o['fontSize'])+1,},that.__canvas.requestRenderAll()) );
            break;
          case 'fontSize-':     // 字号减
            objects.map(o=>o.set({fontSize:Number(o['fontSize'])-1,},that.__canvas.requestRenderAll()) );
            break;
          case 'fontStyle':     // 倾斜
            objects.map(o=>o.set({fontStyle:(o['fontStyle']=='italic')?'normal':'italic'},that.__canvas.requestRenderAll()) );
            break;
          case 'fontWeight':    // 加粗
            objects.map(o=>o.set({fontWeight:(o['fontWeight']=='bold')?'normal':'bold'},that.__canvas.requestRenderAll()) );
            break;  
          case 'textDecoration':    // 下划线
            objects.map(o=>o.set({underline:(!o['underline'])},that.__canvas.requestRenderAll()) );
            break;             
     
          default:
            break;
        }

    },
    /**
     * ***********************     event - tool  over  **********************
     */
    /**
     * ***********************     挂件     **********************
     */
    /**
     * 	add 方形
     */
    addRect: function(option){
      let rect = new fabric.Rect({
        width: 300,
        height: 300,
        left: option['layerX']||100,
        top: option['layerY']||100,
        stroke: '#000',
        strokeWidth: 1,
        padding:10,
        fill: 'rgb(255,255,255,0)',
        // selectable: false

      });	  
      this.__canvas.add(rect);
      // this.__canvas.renderAll();
    },	
    /**
     * 	add 横线
     */
    addLineTransverse: function(option){
      let lineAcross =  new fabric.Line([option['layerX']||50,option['layerY']||50,(option['layerX']+300)||200,option['layerY']||50], {
        strokeWidth:1, //线宽
        stroke:'#000', //线的颜色
        padding:20,
        // selectable: false
      });
      this.__canvas.add(lineAcross);
    },
    /**
     * 	add 竖线
    */
    addLineVertical: function(option){
      let lineVertical =  new fabric.Line([option['layerX']||50,option['layerY']||50,option['layerX']||50,(option['layerY']+300)||200],{
          strokeWidth:1, //线宽   
          stroke:'#000', //线的颜色   
          padding:20, 
      });
      this.__canvas.add(lineVertical);
    },
    /**
     * 	add img
     */
    addImg: function(option){
      let canvas = this.__canvas;

      fabric.Image.fromURL('https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',function(img) {
        // 添加滤镜
        // img.filters.push(new fabric.Image.filters.Grayscale());
        // 图片加载完成之后，应用滤镜效果
        // img.applyFilters();
        // 将处理后的图片添加到canvas画布上
        img.set({
          fabricType:'img',  // 挂件类型
          left: option['layerX']||100,
          top: option['layerY']||100,
        });
        canvas.add(img);
      })
    },
    /**
     * 	add text 
     */
    addText: function(option){
      let that = this;
      let textbox = new fabric.Textbox('请输入文本...', {
        fabricType:'text',  // 挂件类型
        left: option['layerX']||100,
        top: option['layerY']||100,
        padding:10,
        width:300,
        fontFamily:that['fontFamily'],
        fontSize:that['fontSize'],
        originX:'left',
        originY:'center',
      });
      this.__canvas.add(textbox);
    }
  }
}
</script>

