# 微信小程序示例项目

基于 [Labrador](https://github.com/maichong/labrador) 框架构建。

如需帮助，请加入QQ交流群 282140496



### 步骤
- 运行npm install
- 运行labrador build为编译dist文件, labrador watch为实时刷新


### 页面文档

- page/main 入口页面
- page/answer 提问页面
- page/answerOrder 抢单也没
- page/answerDetail 回答页面

- page/subject 学科选择页面
- page/grade 选择 小学/初中/高中
- page/gradeno 选择几年级

### 接口文档



####
```javascript
    //获取当前用户状态
    {
        userinfo:{},//个人信息,可以不用返回
        isAnswer:true,//是否可以抢答，如果不能抢答还要多久才能抢答
        money:12,//剩余多少钱
    }
    //获取未答列表
    //具体字段名称你去命名吧。我至少写一个参考。就是需要的数据(需要通过年级、学科去筛选)
    [
        {
            title:'',//题目名称
            des:'',//题目描述
            price:12,//悬赏价格
            overTime:1494678732,//结束时间，时间戳
            isAnswer:false,//是否结束？是否已经被回答
            imgArr:[],//问题图片描述
            voiceArr:[],//问题语音描述
            grade:'高二数学',//年级，学科。具体分几个字段你看
            userinfo:{headImg:'http://header',username:''}//问问题人的个人信息
        }
    ]

    //提问接口
    {
        title:'',//题目名称
        des:'',//题目描述
        price:12,//悬赏价格
        overTime:1494678732,//结束时间，时间戳
        imgArr:[],//问题图片描述
        voiceArr:[],//问题语音描述
        grade:'高二数学',//年级，学科。具体分几个字段你看
        userinfo:{headImg:'http://header',username:''}//提问题人的个人信息
    }
    //回答接口，需要生成订单
    {
        questionId:123,//题目ID
        des:'',//答案描述
        imgArr:[],//问题图片描述
        voiceArr:[],//问题语音描述
        answerTimer:1494678732,//回答问题时间
        userinfo:{headImg:'http://header',username:''}//提问题人的个人信息
    }
    //获取已答
    {
        question:{//问题的详情
            title:'',//题目名称
            des:'',//题目描述
            price:12,//悬赏价格
            overTime:1494678732,//结束时间，时间戳
            imgArr:[],//问题图片描述
            voiceArr:[],//问题语音描述
            grade:'高二数学',//年级，学科。具体分几个字段你看
            userinfo:{headImg:'http://header',username:''}//提问题人的个人信息
        },
        answer:{//回答的详情
            des:'',//答案描述
            imgArr:[],//问题图片描述
            voiceArr:[],//问题语音描述
            grade:'高二数学',//年级，学科。具体分几个字段你看
            userinfo:{headImg:'http://header',username:''}//提问题人的个人信息
        }
    }
```
- 首页
- 个人中心
- 问答列表
- 已答列表