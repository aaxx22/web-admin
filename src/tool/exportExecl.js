 //导出execl
 import XLSX from "xlsx";
 import $t from '../lang/zh-CN2.js'
 import printJS from 'print-js'
 import moment from 'moment';

 function execl(data, name) {
     let date = +new Date();

     downloadExl(JSON.parse(JSON.stringify(data)));
     var tmpDown; //导出的二进制对象
     function downloadExl(json, type) {
         // console.log(json);
         //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
         var tmpdata = json[0];
         json.unshift({});
         var keyMap = []; //获取keys
         for (var k in tmpdata) {
             keyMap.push(k);
             json[0][k] = k;
         }
         var tmpdata = [];
         json
             .map((v, i) =>
                 keyMap.map((k, j) =>
                     Object.assign({}, {
                         v: v[k],
                         position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) +
                             (i + 1),
                     })
                 )
             )
             .reduce((prev, next) => prev.concat(next))
             .forEach(
                 (v, i) =>
                 (tmpdata[v.position] = {
                     v: v.v,
                 })
             );
         //设置区域,比如表格从A1到D10
         var outputPos = Object.keys(tmpdata);
         var tmpWB = {
             SheetNames: ["mySheet"], //保存的表标题
             Sheets: {
                 mySheet: Object.assign({},
                     tmpdata, //内容
                     {
                         "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
                     }
                 ),
             },
         };
         //创建二进制对象写入转换好的字节流
         tmpDown = new Blob(
             [
                 s2ab(
                     XLSX.write(
                         tmpWB, {
                             bookType: type == undefined ? "xlsx" : type,
                             bookSST: false,
                             type: "binary",
                         } //这里的数据是用来定义导出的格式类型
                     )
                 ),
             ], {
                 type: "",
             }
         );
         var href = URL.createObjectURL(tmpDown); //创建对象超链接
         let atag = document.createElement('a')
         atag.href = href; //绑定a标签
         atag.setAttribute('download', name + '.xlsx') //設置文件名
         atag.click(); //模拟点击实现下载

         setTimeout(function () {
             //延时释放
             URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
         }, 100);
     }
     //字符串转字符流
     function s2ab(s) {
         var buf = new ArrayBuffer(s.length);
         var view = new Uint8Array(buf);
         for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
         return buf;
     }

     //将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。

     function getCharCol(n) {
         let temCol = "",
             s = "",
             m = 0;
         while (n > 0) {
             m = (n % 26) + 1;
             s = String.fromCharCode(m + 64) + s;
             n = (n - m) / 26;
         }
         return s;
     }
 }

 export default function (arr, name, type, documentTitle) {
     //  console.log(arr);
     var keyMap = {
         code: $t.message.code,
         cnName: $t.message.cn_name,
         enName: $t.message.en_name,
         stateName: $t.message.state_name,
         remark: $t.message.remark,
         photo: $t.message.photo,
         address: $t.message.address,
         createdAt: $t.message.createat,
         radius: $t.message.radius,
         group: $t.message.group_name,
         staff: $t.message.staff_name,
         userName: $t.message.user_name,
         userCount: $t.message.user_count,
         staffCount: $t.message.staff_count,
         defVal: $t.message.def_val,
         enterTypeName: $t.message.enter_type,
         enterLimitName: $t.message.enter_limit,
         options: $t.message.options
     }
     //  return
     let data = []
     arr.forEach(item => {
         let newData = {}
         if (item.dept) item.dept = item.dept.name
         if (item.position) item.position = item.position.name
         if (item.group) item.group = item.group.name
         if (item.staff) item.staff = item.staff.name

         Object.keys(item).forEach((key, i, ) => {
             if (!item[key]) item[key] = ''
             if (moment(item[key]).format() !== 'Invalid date' && (key.indexOf('At') !== -1 || key.indexOf('day') !== -1)) item[key] = (moment(item[key]).format('yyyy-MM-DD'));

             if (key !== 'id' && key !== 'state' && key !== 'modifyAt' && key !== "sex" && key !== "photo" && key !== 'enterType' && key !== 'enterLimit') {
                 let newKey = keyMap[key] || key
                 newData[newKey] = item[key]
             }
         }, {})
         data.push(newData)
     })
     console.log(data)

     if (type == 'print') {
         printJS({
             printable: data,
             type: 'json',
             properties: Object.keys(data[0]),
             header: documentTitle,
             headerStyle: 'text-align:center;font-size:18px;',
             documentTitle: ' ',
             maxWidth: "100%",
         })
     } else if (type == 'export') {
         for (let i = 0; i < data.length; i++) {
             let keys = Object.keys(data[i]);
             for (let j = 0; j < keys.length; j++) {
                 if (typeof data[i][keys[j]] === "object") {
                     for (let key in data[i][keys[j]]) {
                         if (data[i][keys[j]]) {
                             data[i][keys[j] + "." + key] = data[i][keys[j]][key]
                         }
                     }
                     delete data[i][keys[j]]
                 }
             }
         }

         execl(data, name)
     }
 }