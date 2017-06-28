
/**
 * 最终上传到cos的URL
 * 把以下字段配置成自己的cos相关信息，详情可看API文档 https://www.qcloud.com/document/product/436/6066
 * REGION: cos上传的地区
 * APPID: 账号的appid
 * BUCKET_NAME: cos bucket的名字
 * DIR_NAME: 上传的文件目录
 */

const REGION = 'gz'; // gz tj
const APPID = '1253759887';
const BUCKET_NAME = 'wxupload'; //uploadimg  wxupload
const DIR_NAME = '';
var cosUrl = "https://" + REGION + ".file.myqcloud.com/files/v2/" + APPID + "/" + BUCKET_NAME + DIR_NAME

var config = {
    PORT: '', //服务占用端口，默认8888
    secretId: 'AKIDgMq8E8rMgoQxISjPFtMgok6GEzb0rE2m',
    secretKey: 'voW2LSN5bv31qSs681iGhHl393kFYeYF',
    appid: '1253759887',
    bucket: 'wxupload',
    folder: ''
};
function js_signature(){
    var folder = config.folder || '';
    if(folder && folder.indexOf('/') == 0) {
        folder = folder.substr(folder.indexOf('/')+1);
    }
    var appid = config.appid; // 开发者的项目 ID，即COS控制台密钥管理里的 APPID
    var bucket = config.bucket; // 空间名称 Bucket
    var secretID = config.secretId; // 项目的 Secret ID
    var secretKey = config.secretKey; // 项目的 Secret Key
    var expiredTime = 0; // 单次签名，e 必须设置为0；多次有效签名时，e 为签名的时间戳，单位是秒
    var currentTime = parseInt(Date.now() / 1000); // 当前时间戳，是一个符合 Unix Epoch 时间戳规范的数值，单位为秒
    var rand = parseInt(Math.random() * Math.pow(2, 32)); // 随机串，无符号10进制整数，用户需自行生成，最长 10 位
    var fileid = encodeURIComponent('/'+appid+'/'+bucket+'/'+folder); // 唯一标识存储资源的相对路径。格式为 /appid/bucketname/dirname/[filename]

    // 每个字段具体格式查看文档：https://www.qcloud.com/document/product/436/6054
    var plainText = 'a='+appid+'&k='+secretID+'&e='+expiredTime+'&t='+currentTime+'&r='+rand+'&f='+fileid+'&b='+bucket;

    var SignTmp = crypto.HmacSHA1(secretKey, plainText)
    // var Sign = base64encode(SignTmp+plainText)concat
    var Sign = crypto.enc.Base64.stringify(SignTmp+plainText)
    return Sign
}
// var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
// function base64encode(str) {  
//      var out, i, len;  
//      var c1, c2, c3;  
  
//      len = str.length;  
//      i = 0;  
//      out = "";  
//      while(i < len) {  
//          c1 = str.charCodeAt(i++) & 0xff;  
//          if(i == len)  
//          {  
//              out += base64EncodeChars.charAt(c1 >> 2);  
//              out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
//              out += "==";  
//              break;  
//          }  
//          c2 = str.charCodeAt(i++);  
//          if(i == len)  
//          {  
//              out += base64EncodeChars.charAt(c1 >> 2);  
//              out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));  
//              out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
//              out += "=";  
//              break;  
//          }  
//          c3 = str.charCodeAt(i++);  
//          out += base64EncodeChars.charAt(c1 >> 2);  
//          out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));  
//          out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));  
//          out += base64EncodeChars.charAt(c3 & 0x3F);  
//      }  
//      return out;  
// }  

//填写自己的鉴权服务器地址
var cosSignatureUrl = 'http://119.29.253.88/zerg/public/api/v1/token/cos' 

/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
export function upload(filePath, fileName) {
    // 鉴权获取签名
    return new Promise((resolve, reject) => {
        wx.request({
            url: cosSignatureUrl,
            fail: function(e){
                reject(e)
            },
            success: function(cosRes) {
                // 签名
                var signature = cosRes.data.token
                // var signature = '6ivTxye4UZCJurMIm2KHkURZY8phPTEyNTM3NTk4ODcmaz1BS0lEZ01xOEU4ck1nb1F4SVNqUEZ0TWdvazZHRXpiMHJFMm0mZT0xNDk3OTQ3ODY2JnQ9MTQ5Nzk0NzgwNiZyPTI5ODczNzg4NzImZj0lMkYxMjUzNzU5ODg3JTJGd3h1cGxvYWQlMkYmYj13eHVwbG9hZA=='
                // var signature = js_signature();
                console.log(cosRes)
                console.log(signature)
                // 头部带上签名，上传文件至COS
                wx.uploadFile({
                    url: cosUrl + '/' + fileName,
                    filePath: filePath,
                    header: {
                        'Authorization': signature
                    },
                    name: 'filecontent',
                    formData: {
                        op: 'upload'
                    },
                    success: function(uploadRes){
                        if(uploadRes.statusCode=200){
                            var data = JSON.parse(uploadRes.data)
                            var imgurl = data.data.source_url
                            var imgArr = data.data.resource_path.split('/')
                            var img = imgArr[imgArr.length-1]
                            resolve(img)
                            console.log('uploadRes',imgurl, img)
                        }
                        
                        //do something
                    },
                    fail: function(e) {
                        console.log('e', e)
                        reject(e)
                    }
                })
            }
        })
    })
}
