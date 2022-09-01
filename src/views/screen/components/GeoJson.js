import AMapLoader from '@amap/amap-jsapi-loader'
import MapLoader from '@/assets/AMap.js'
export default function getGeoJson (adcode , childAdcode = ''){
  return new Promise((resolve, reject) => {
    MapLoader().then(AMap => {
      console.log('地图加载成功')
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          let mapJson = {
            features: {}
          };
          let Json = areaNode.getSubFeatures();
          console.log(Json);
          if (childAdcode) {
            Json = Json.filter(item => {
              return item.properties.adcode == childAdcode;
            });
          }
          mapJson.features=Json
          console.log(mapJson);
          resolve(mapJson);
        });
      });
      
    }, e => {
      console.log('地图加载失败', e)
    })
    
   
  })
}
  


