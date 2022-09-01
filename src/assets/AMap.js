// 高德map
import AMapLoader from '@amap/amap-jsapi-loader'
export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      AMapLoader.load({
        key: "7c3377c7966e7693b4eb78bc1a3a686f", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: [], // 需要加载的 AMapUI ui插件
        },
      })
      // var script1 = document.createElement('script')
      // script1.type = 'text/javascript'
      // script1.async = true
      // script1.src =
      //   'https://webapi.amap.com/maps?v=1.4.11&callback=initAMap&key=7c3377c7966e7693b4eb78bc1a3a686f'
      // script1.onerror = reject
      // document.head.appendChild(script1)

      // var script2 = document.createElement('script')
      // script2.type = 'text/javascript'
      // script2.async = true
      // script2.src =
      //   'https://webapi.amap.com/maps?v=1.3&key=7c3377c7966e7693b4eb78bc1a3a686f&plugin=AMap.DistrictSearch'
      // script2.onerror = reject
      // document.head.appendChild(script2)

      // var script3 = document.createElement('script')
      // script3.type = 'text/javascript'
      // script3.async = true
      // script3.src =
      //   'https://webapi.amap.com/ui/1.0/main.js'
      // script3.onerror = reject
      // document.head.appendChild(script3)

      // var script4 = document.createElement('script')
      // script4.type = 'text/javascript'
      // script4.async = true
      // script4.src =
      //   'https://echarts.baidu.com/resource/echarts-gl-latest/dist/echarts-gl.min.js'
      // script4.onerror = reject
      // document.head.appendChild(script4)

      // var script5 = document.createElement('script')
      // script5.type = 'text/javascript'
      // script5.async = true
      // script5.src =
      //   'https://code.jquery.com/jquery-3.4.1.min.js'
      // script5.onerror = reject
      // document.head.appendChild(script5)

      // var script6 = document.createElement('script')
      // script6.type = 'text/javascript'
      // script6.async = true
      // script6.src =
      //   'https://lib.baomitu.com/echarts/4.8.0/echarts.min.js'
      // script6.onerror = reject
      // document.head.appendChild(script6)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}