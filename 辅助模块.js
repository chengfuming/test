async function main(xky, args, xutil) {
    let module = args.main_check;
    for (let i = 0; i < module.length; i++) {
        await xky.sleep(1 * 1000);
        await xky.toast(`开始执行 ${module[i]}  模块`);
        switch (module[i]) {
            case "关闭微信":
                await closeWecat(xky)
                break;
            case "关闭触动":
                await setChuDong(xky, args, xutil, 2, "");//1开启,2关闭,3设置地区,4设置账号
                await xky.sleep(5 * 1000);
                await xky.pressKey(3);
                break;
        }
    }
}

async function closeWecat(xky) {
    await xky.killApp('com.tencent.mm');//结束在运行的微信
    await xky.sleep(3 * 1000);
    await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
}


//2019/03/06
// ====================================================================================================
// XKY原生类
// ====================================================================================================

//下载图片
//let sjPic = await sjs(1, 774);
//await xky.downloadFile(`friendPic/pyq ${sjPic}.jpg`, `/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

//更新图库
//await xky.insertMedia(`/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

//删除图片
//await xky.delString(`/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

// ====================================================================================================
// 辅助操作类
// ====================================================================================================

//获取元素信息
// let elmArr = await getElementMassage(xky,"微信");//必须找到
// let elmArr = await getElementMassage(xky,"微信", 1);//限时查找
// let elmArr = await getElementMassage(xky,"微信", 1, index);//限时查找第index-1个元素(从0开始的)
// xky.log(elmArr);

//随机数
// let sjss = await sjs(1, 24);
// xky.log(sjss);

//数组打乱随机
// let arrays = await upsetArray(oldArray)//传入数组

//元素点击
// await elementClick(xky,"注册");//必须点
// await elementClick(xky,"注册", x);//限时x秒内点击
// await elementClick(xky,"注册", x, index);//限时x秒内点击第index个元素(下标0为第一个)

//坐标点击
// await coordinatesClick(xky,"com.android.documentsui:id/icon_thumb", x, y);

//随机点击元素其中一个
//await sjElementClick(xky,"注册");//返回点击的元素

//随机范围点击
// let qqq = await sjXYClick(xky,"minX|minY" ,"maxX|maxY");//点击并返回随机坐标
//xky.log(qqq)

//长按控制
// await longCopyPaste(xky,"注册", "copy",);//长按复制
// await longCopyPaste(xky,"注册", "paste");//长按粘贴

//找到元素输入
// await findElementIput(xky,"请填写手机号", phone);

//使用方法找到元素
//await findUseFunction(xky,"首页", "方法");//方法(如前进,返回,后退等)

//滚动查找元素:
// await rollFindElement(xky,"延展阅读", "xia/shang",num);//已num格的速度查找

//查找元素超时报错
//let qqq = await FindElementTimeout(xky,"首页",data,60);//data报错内容传什么数据都行,超出60秒报错
//xky.log(qqq)

//生成随机字符串
// let qqq = await randomString(5);//长度5
// xky.log(qqq);

//创建插槽
//  let qqq = await creatSlot(xky,"com.tencent.mm"，15);//传入包名，插槽码长度15，返回插槽码
//  xky.log(qqq);

// 微信滑动拼图
// await slideWecatJigsaw(xky,"tcaptcha_drag_thumb");

//随机生成姓名(本地)
//let qqq = await getName();//返回姓名
//xky.log(qqq)

// ====================================================================================================
// 数据交互类
// ====================================================================================================

//获取实名信息
// let RealNameInformation = await xutil.http.get("http://119.23.32.104:91/com/get/real")
// xky.log(RealNameInformation)

//接口批量生成添加联系人
//let qqq = await toLeadInsCon(xky,xutil,5);//生成5个,返回联系人数组
//xky.log(qqq)

//设置触动精灵代理
//await setChuDong(xky, args, xutil, 1, vpn_location);//1开启,2关闭,3设置地区,4设置账号

//数据存储
//let qqq = await saveData(xky, xutil, appName,id,depot,account,password,mobile,nickname,rawid,city,cCode,addressbook);//新号ID为空"", 更新时必须填
//xky.log(qqq)

// 获取数据
// let qqq = await getData(xky,xutil,app,depot);
// xky.log(qqq)

//活跃完成通知
//let qqq = await upData(xky, xutil,id);
//xky.log(qqq)

//数据冻结
//let qqq = await dataFrozen(xky, xutil,id);
//xky.log(qqq)

//获取内部好友数据
//let qqq = await getInteriorFriendData(xky,xutil,app,depot,id);
//xky.log(qqq)

//重置活跃
//let qqq = await resetActive(xky,xutil,id);
//xky.log(qqq)

//ip查询
//let qqq = await ipWhere(xky,xutil,ip,type);
//xky.log(qqq)

//获取代理
//let qqq = await getAgency(xky, xutil, city);
//xky.log(qqq)

//获取回复内容
//let qqq = await replyMessage(xky,xutil,id,msg);
//xky.log(qqq)

//获取任务
//let qqq = await getTask(xky,xutil,id);
//xky.log(qqq)

//提交任务
//let qqq = await taskFinish(xky,xutil,id,taskid,extend);//taskid任务ID,extend扩展可为空
//xky.log(qqq)

//活跃存取状态
// let qqq = await activeSaveGet(xky, xutil, id, field, value)//field名称自己取名,存数据才填value
// xky.log(qqq)

//通讯录取号
// let qqq = await contactGet(xky, xutil, id)//微信ID
// xky.log(qqq)

//通讯录处理
// let qqq = await contactFinish(xky, xutil, id, type, number)//type:1取备注编号 2完成添加 3拉黑,number:获取的号码
// xky.log(qqq)

//通讯录检查
// let qqq = await contactCheck(xky, xutil, id)//id:微信ID
// xky.log(qqq)

//获取昵称
//let qqq = await getNikeName(xky,xutil,"cn/en");cn中文,en英文
//xky.log(qqq)

//归属地查询
//let qqq = await phoneWhere(xky,xutil,phone);
//xky.log(qqq)

//设置定位
//let qqq = await setLocations(xky);//根据当前IP完成定位,返回坐标
//xky.log(qqq)

//网络检测
//let qqq = await networkDetection(xky,ip);//完成定位,返回坐标
//xky.log(qqq)

//获取头像
//let qqq = await getHeadPic(xky,,xutil);//完成定位,返回坐标
//xky.log(qqq)

//上传插槽到本地服务器
//await uplondWeFile(xky, "WeChat", "com.tencent.mm", "dfhfh2557114");//服务器文件名,包名,插槽名

//从本地服务器下载插槽到矿机
//await donwlondWeFile(xky, "WeChat", "com.tencent.mm", "dfhfh2557114");//服务器文件名,包名,插槽名

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//综合方法
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//获取元素信息
async function getElementMassage(xky, element, timer, nums) {
    while (1) {
        let elementObj = await xky.findUiObjects(element);
        let elementArr = elementObj.uiObjects;
        if (elementArr != "") {
            if (timer) {
                if (nums || nums >= 0) {
                    return elementArr[nums];
                }
                return elementArr;
            }
            return elementArr;
        } else {
            if (timer) {
                await xky.sleep(1000);
                timer--;
                if (timer < 1) {
                    break;
                }
            } else {
                await xky.sleep(1000);
            }
        }
    }
}

//随机数
async function sjs(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}

//数组打乱随机
async function upsetArray(oldarray) {
    let pos = oldarray.length, i;
    while (pos) {
        i = (Math.random() * pos--) >>> 0;
        [oldarray[pos], oldarray[i]] = [oldarray[i], oldarray[pos]]
    }
    return oldarray;
}

//元素点击
async function elementClick(xky, element, timer, nums) {
    if (timer) {
        if (nums) {
            let qqq = await getElementMassage(xky, element, timer, nums);
            if (qqq) {
                await xky.findAndClick(element, { index: nums });
                return qqq;
            }
        }
        let qqq = await getElementMassage(xky, element, timer);
        if (qqq) {
            await xky.findAndClick(element);
            return qqq;
        }
    } else {
        let qqq = await getElementMassage(xky, element);
        await xky.findAndClick(element);
        return qqq;
    }
}

//坐标点击
async function coordinatesClick(xky, element, x, y) {
    await getElementMassage(xky, element);
    await xky.click(x, y);
}

//随机点击元素其中一个
async function sjElementClick(xky, element) {
    let qqq = await getElementMassage(xky, element);
    let sjsEl = await sjs(0, qqq.length - 1);
    await xky.findAndClick(element, { index: sjsEl });
    return qqq[sjsEl];
}

//随机范围点击
async function sjXYClick(xky, minXY, maxXY) {
    let [minX, minY] = minXY.split("|");
    let [maxX, maxY] = maxXY.split("|");
    let X = await sjs(xky, minX * 100, maxX * 100);
    let Y = await sjs(xky, minY * 100, maxY * 100);
    await xky.click(X / 100, Y / 100);
    return {
        x: X / 100,
        y: Y / 100
    }
}

//长按控制
async function longCopyPaste(xky, element, copyOrPaste) {
    let elmArr = await getElementMassage(xky, element);
    if (copyOrPaste == "copy") {
        await xky.mousedown(elmArr[0].x - 0.1, elmArr[0].y);
        await elementClick(xky, "全选");
        await xky.sleep(1000);
        await xky.copy()
    } else {
        await elementClick(xky, element);
        await xky.paste();
    }
}

//找到元素输入
async function findElementIput(xky, element, inp) {
    let qqq = await getElementMassage(xky, element);
    await xky.findAndInput(element, inp);
    return qqq;
}

//使用方法找到元素
async function findUseFunction(xky, element, fun) {
    while (1) {
        let elmArr = await getElementMassage(xky, element, 1);
        if (elmArr) {
            return elmArr;
        }
        await elementClick(xky, fun, 2);
        await xky.sleep(1000);
    }
}

//滚动查找元素
async function rollFindElement(xky, element, direction, speed) {
    while (1) {
        let elmArr = await getElementMassage(xky, element, 1);
        if (elmArr) {
            break;
        }
        if (direction == "xia") {
            await xky.wheel(0.5, 0.5, -speed);
        } else {
            await xky.wheel(0.5, 0.5, speed);
        }
    }
}

//查找元素超时报错
async function FindElementTimeout(xky, element, data, timer) {
    let startTime = new Date();
    while (1) {
        let elmArr = await getElementMassage(xky, element, 1);
        if (elmArr) {
            await xky.sleep(1000);
            return elmArr;
        } else {
            let endTime = new Date();
            let useTime = endTime - startTime;
            if (useTime > timer * 1000) {
                xky.log("***************查找此元素超过限定时间,请检查账号情况和代码情况***************")
                xky.log(data)
                xky.log("***************查找此元素超过限定时间,请检查账号情况和代码情况***************")
                return;
            }
        }
    }
}

//生成随机字符串
async function randomString(long) {
    let len = long;
    let $chars =
        "abcdefhijkmnprstwxyz1234567890"; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//创建插槽
async function creatSlot(xky, PackageName, long) {
    let randomString = await randomString(xky, long);//长度5
    while (1) {
        let qqq = await xky.createAppSnapshot(PackageName, randomString);
        if (qqq.msg == "快照创建成功") {
            return randomString;
        } else {
            await xky.sleep(1000);
        }
    }
}

//微信滑动拼图
async function slideWecatJigsaw(xky, element) {
    let qqq = await getElementMassage(xky, element);
    while (1) {
        await xky.sleep(1000);
        await xky.swipe(0.2, 0.54, 0.8, 0.54, 60);
        await xky.sleep(1000);
        qqq = await getElementMassage(xky, element, 2);
        if (qqq) {
            await xky.swipe(0.2, 0.54, 0.7, 0.54, 60);
            await xky.sleep(1000);
            qqq = await getElementMassage(xky, element, 2);
            if (qqq) {
                await xky.swipe(0.2, 0.54, 0.75, 0.54, 60);
                await xky.sleep(1000);
            } else {
                break;
            }
        } else {
            break;
        }
    }
}

//随机生成姓名(本地)
async function getName() {
    var familyNames = new Array(
        "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
        "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
        "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    var givenNames = new Array(
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    var i = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    var familyName = familyNames[i];
    var j = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    var givenName = givenNames[i];
    var name = familyName + givenName;
    return name;
}

//接口批量生成联系人
async function toLeadInsCon(xky, xutil, num) {
    let PhoneNums = await xutil.http.get(`http://192.168.2.216:8090/sou/mobelRand?num=${num}`)
    //创建收集器
    let AllMassage = [];
    let NumArr = PhoneNums.data.split(",")
    for (let i = 0; i < NumArr.length - 1; i++) {
        let EmpretMassage = { name: "", number: "" }
        EmpretMassage.name = await getName();
        EmpretMassage.number = NumArr[i];
        AllMassage.push(EmpretMassage)
    }
    await xky.insertContacts(AllMassage);
    return AllMassage;
}

//设置触动精灵代理
async function setChuDong(xky, args, xutil, stats, loc) {
    var locitionNum = {
        "上海": 1,
        "北京": 2,
        "天津": 16,
        "重庆": 10,
        "苏州": 17,
        "南京": 20,
        "无锡": 21,
        "南通": 31,
        "徐州": 40,
        "常州": 41,
        "连云港": 81,
        "淮安": 82,
        "盐城": 83,
        "扬州": 84,
        "镇江": 85,
        "泰州": 86,
        "宿迁": 87,
        "杭州": 12,
        "宁波": 23,
        "温州": 42,
        "绍兴": 43,
        "嘉兴": 88,
        "湖州": 89,
        "金华": 90,
        "衢州": 91,
        "舟山": 92,
        "台州": 93,
        "丽水": 94,
        "青岛": 11,
        "烟台": 27,
        "济南": 28,
        "潍坊": 39,
        "济宁": 45,
        "淄博": 46,
        "枣庄": 113,
        "东营": 114,
        "泰安": 115,
        "威海": 116,
        "日照": 117,
        "临沂": 118,
        "德州": 119,
        "聊城": 120,
        "滨州": 121,
        "菏泽": 122,
        "厦门": 13,
        "泉州": 30,
        "福州": 36,
        "莆田": 102,
        "三明": 103,
        "漳州": 104,
        "南平": 105,
        "龙岩": 106,
        "宁德": 107,
        "唐山": 32,
        "石家庄": 38,
        "秦皇岛": 48,
        "邯郸": 49,
        "邢台": 50,
        "保定": 51,
        "张家口": 52,
        "承德": 53,
        "沧州": 54,
        "廊坊": 55,
        "衡水": 56,
        "深圳": 9,
        "广州": 15,
        "佛山": 22,
        "东莞": 29,
        "韶关": 152,
        "珠海": 153,
        "汕头": 154,
        "江门": 155,
        "湛江": 156,
        "茂名": 157,
        "肇庆": 158,
        "惠州": 159,
        "梅州": 160,
        "汕尾": 161,
        "河源": 162,
        "阳江": 163,
        "清远": 164,
        "中山": 165,
        "潮州": 166,
        "揭阳": 167,
        "云浮": 168,
        "武汉": 18,
        "黄石": 134,
        "十堰": 135,
        "宜昌": 136,
        "孝感": 137,
        "荆州": 138,
        "黄冈": 139,
        "成都": 19,
        "泸州": 178,
        "德阳": 179,
        "绵阳": 180,
        "乐山": 181,
        "南充": 182,
        "眉山": 183,
        "宜宾": 184,
        "大连": 24,
        "沈阳": 26,
        "鞍山": 72,
        "抚顺": 73,
        "锦州": 74,
        "盘锦": 75,
        "郑州": 25,
        "开封": 123,
        "洛阳": 124,
        "平顶山": 125,
        "安阳": 126,
        "新乡": 127,
        "焦作": 128,
        "许昌": 129,
        "南阳": 130,
        "商丘": 131,
        "信阳": 132,
        "周口": 133,
        "西安": 33,
        "宝鸡": 199,
        "咸阳": 200,
        "渭南": 201,
        "安康": 202,
        "哈尔滨": 34,
        "大庆": 47,
        "齐齐哈尔": 79,
        "牡丹江": 80,
        "合肥": 35,
        "芜湖": 95,
        "蚌埠": 96,
        "马鞍山": 97,
        "淮北": 98,
        "安庆": 99,
        "滁州": 100,
        "六安": 101,
        "长春": 37,
        "吉林": 76,
        "四平": 77,
        "延边": 78,
        "鄂尔多斯": 44,
        "呼和浩特": 65,
        "包头": 66,
        "赤峰": 67,
        "通辽": 68,
        "呼伦贝尔": 69,
        "巴彦淖尔": 70,
        "乌兰察布": 71,
        "太原": 57,
        "大同": 58,
        "阳泉": 59,
        "长治": 60,
        "晋中": 61,
        "运城": 62,
        "忻州": 63,
        "临汾": 64,
        "南昌": 108,
        "赣州": 109,
        "吉安": 110,
        "抚州": 111,
        "上饶": 112,
        "长沙": 140,
        "株洲": 141,
        "湘潭": 142,
        "衡阳": 143,
        "邵阳": 144,
        "岳阳": 145,
        "常德": 146,
        "张家界": 147,
        "益阳": 148,
        "郴州": 149,
        "怀化": 150,
        "娄底": 151,
        "南宁": 169,
        "柳州": 170,
        "桂林": 171,
        "梧州": 172,
        "北海": 173,
        "贵港": 174,
        "玉林": 175,
        "百色": 176,
        "海口": 177,
        "贵阳": 185,
        "遵义": 186,
        "黔东南": 187,
        "昆明": 188,
        "曲靖": 189,
        "玉溪": 190,
        "保山": 191,
        "临沧": 192,
        "楚雄": 193,
        "红河": 194,
        "文山": 195,
        "西双版纳": 196,
        "大理": 197,
        "德宏": 198,
        "兰州": 203,
        "西宁": 204,
        "乌鲁木齐": 205,
        "昌吉": 206,
        "巴音郭楞": 207,
        "伊犁": 208
    }

    let usesIp = "";
    var ewmArr = "";
    var ewmArr1 = await getElementMassage(xky, "start.lua", 1);
    if (!ewmArr1) {
        while (1) {
            await xky.restartApp('com.touchsprite.android');
            await xky.sleep(2000);
            await elementClick(xky, "重新打开应用", 1);
            await xky.sleep(2000);
            await elementClick(xky, "知道了", 1);
            await xky.sleep(2000);
            var closeAPP = await elementClick(xky, "关闭应用", 1);
            if (closeAPP) {
                await xky.restartApp('com.touchsprite.android');
                await xky.sleep(2000);
                await elementClick(xky, "重新打开应用", 1);
            }
            await xky.sleep(2000);
            var kkk = await elementClick(xky, "忽略此版本", 1);
            if (kkk) {
                await elementClick(xky, "我的账号");
                await rollFindElement(xky, "自动检测更新", "xia", 5);
                await elementClick(xky, "自动检测更新");
                await elementClick(xky, "com.touchsprite.android:id/more_sb_service_switch");
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
                await elementClick(xky, "我的脚本");
            }
            await xky.sleep(2000);
            var ewmArrqqq = await getElementMassage(xky, "start.lua", 1);
            if (ewmArrqqq) {
                ewmArr = ewmArrqqq;
                break;
            }
        }
    } else {
        ewmArr = ewmArr1;
    }

    switch (stats) {
        case 1:
            await elementClick(xky, "start.lua");
            while (1) {
                await coordinatesClick(xky, "com.touchsprite.android:id/image_file_arrows2", 0.95, ewmArr["0"].y);
                await elementClick(xky, "立即运行");
                var ffff = await getElementMassage(xky, "com.touchsprite.android:id/text_main");
                //ip查询
                var ipwherre = await ipWhere(xky, xutil, ffff["0"].text.split("IP: ")[1], 1);

                xky.log(`${ffff["0"].text}的地区为:${ipwherre.data.data.city}`);
                var bb = ipwherre.data.data.city.indexOf(loc)
                if (bb >= 0) {
                    usesIp = ffff["0"].text.split("IP: ")[1];
                    break;
                } else {
                    var iploser = ffff["0"].text.indexOf("string")
                    if (iploser >= 0) {
                        await elementClick(xky, "确定", 1);
                    }
                }
            }
            await elementClick(xky, "确定", 1);
            await xky.sleep(1000)
            return usesIp;

        case 2:
            await elementClick(xky, "stop.lua");
            var ewmArre = await getElementMassage(xky, "stop.lua");
            await coordinatesClick(xky, "com.touchsprite.android:id/image_file_arrows2", 0.95, ewmArre["0"].y);
            await elementClick(xky, "立即运行");
            await xky.sleep(2000)
            break;

        case 3:
            await xky.mousedown(ewmArr["0"].x, ewmArr["0"].y);
            await elementClick(xky, "编辑");
            await xky.sleep(2000);
            var jpyn = await getElementMassage(xky, "com.android.inputmethod.latin:id/keyboard_view", 1);
            if (jpyn) {
                await xky.showInputMethod();
                await elementClick(xky, "X输入法");
            }
            await xky.sleep(2000);
            await xky.mousedown(0.60, 0.57);
            await xky.sleep(2000);
            await xky.setClipboardText(locitionNum[loc]);
            await xky.paste();
            await xky.sleep(1000);
            var ccc = await elementClick(xky, "保存", 1);
            if (!ccc) {
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
            }
            break;

        case 4:
            await xky.mousedown(ewmArr["0"].x, ewmArr["0"].y);
            await elementClick(xky, "编辑");
            await xky.sleep(2000);
            var jpyn2 = await getElementMassage(xky, "com.android.inputmethod.latin:id/keyboard_view", 1);
            if (jpyn2) {
                await xky.showInputMethod();
                await elementClick(xky, "X输入法");
            }
            var userVpnObj = [{
                users: "b819deee8d17ed1022f4281c4240584a",
                password: "7eb3e95a8d4dfb67b36560ed9d6dd4ee"
            }, {
                users: "494ffbb1c3d2c55b523acd11ddefa0dd",
                password: "779f9871aafe9a4d0423d6da7377d89f"
            }, {
                users: "f11f5dfd7b8726d9a795dbc1000e8840",
                password: "9198ae0cedf91137086283abacbb8145"
            }]
            if (!args.setChuDongUser) {
                xky.log("******请先配置参数才能选择账号******")
                xky.log("******参数为:账号一账号二账号三******")
                xky.log("******请先配置参数才能选择账号******")
            }

            await xky.mousedown(0.54, 0.27);
            await xky.sleep(3000);
            switch (args.setChuDongUser) {
                case "账号一":
                    await xky.setClipboardText(userVpnObj["0"].users);
                    await xky.paste();
                    await xky.sleep(2000);
                    await xky.mousedown(0.56, 0.30);
                    await xky.sleep(2000);
                    await xky.setClipboardText(userVpnObj["0"].password);
                    await xky.paste();
                    break;
                case "账号二":
                    await xky.setClipboardText(userVpnObj["1"].users);
                    await xky.paste();
                    await xky.sleep(2000);
                    await xky.mousedown(0.56, 0.30);
                    await xky.sleep(2000);
                    await xky.setClipboardText(userVpnObj["1"].password);
                    await xky.paste();
                    break;
                case "账号三":
                    await xky.setClipboardText(userVpnObj["2"].users);
                    await xky.paste();
                    await xky.sleep(2000);
                    await xky.mousedown(0.56, 0.30);
                    await xky.sleep(2000);
                    await xky.setClipboardText(userVpnObj["2"].password);
                    await xky.paste();
                    break;
            }
            await xky.sleep(2000);
            var www = await elementClick(xky, "保存", 1);
            if (!www) {
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
            }
            break;
    }
}

//数据存储
async function saveData(xky, xutil, appName, id, depot, account, password, mobile, nickname, rawid, city, cCode, addressbook) {
    let oldData = {
        app: appName,//APP编号
        id: id, //新号不填, 更新时必须填
        depot: depot, //库号,这个应该在界面上可以填写,不是写死的
        account: account, //微信账号没有可以不填
        password: password,//密码
        mobile: mobile,//手机
        nickname: nickname,//昵称
        rawid: rawid, //微信原始编号
        city: city, //注册地区, 根据卡商而定, 不要使用 location 关键字
        extend: {
            cCode: cCode,//插槽
            addressbook: addressbook//通讯录
        }, //卡槽信息
        time: parseInt(new Date().getTime() / 1000)
    };

    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000);
    return await xutil.http.request({
        url: `${sss.url}/data/save`,
        method: "post",
        data: sss.data,
        headers: {
            token: sss.token
        },
        responseEncoding: "utf8"
    });
}

//获取数据
async function getData(xky, xutil, app, depot) {
    let oldData = {
        app: app,
        depot: depot,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/active_get?app=${sss.app}&depot=${sss.depot}&token=${sss.token}&time=${sss.time}`)
}

//活跃完成通知
async function upData(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/active_finish?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//数据冻结
async function dataFrozen(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/freeze?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//获取内部好友数据
async function getInteriorFriendData(xky, xutil, app, depot, id) {
    let oldData = {
        app: app,
        depot: depot,
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/friend_get?app=${sss.app}&depot=${sss.depot}&id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//重置活跃
async function resetActive(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/active_reset?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//ip查询
async function ipWhere(xky, xutil, ip, type) {
    let oldData = {
        ip: ip,
        type: type,
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/ip?ip=${sss.ip}&type=${sss.type}`)
}

//获取代理
async function getAgency(xky, xutil, city) {
    let oldData = {
        city: escape(city),
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/proxy?city=${sss.city}&token=${sss.token}&time=${sss.time}`)
}

//获取回复内容
async function replyMessage(xky, xutil, id, msg) {
    let oldData = {
        id: id,
        msg: escape(msg)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    let qqq = await xutil.http.get(`${sss.url}/com/get/chat3?id=${sss.id}&msg=${sss.msg}`)
    if (qqq.data.data.message == "请求次数超限制!") {
        qqq = await xutil.http.get(`${sss.url}/com/get/chat2?msg=${sss.msg}`)
    }
    return qqq;
}

//获取任务
async function getTask(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/wx/task_get?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//提交任务
async function taskFinish(xky, xutil, id, taskid, extend) {
    let oldData = {
        id: id,
        task: taskid,//任务ID
        extend: extend,//可为空
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/wx/task_finish?id=${sss.id}&task=${sss.task}&extend=${sss.extend}&token=${sss.token}&time=${sss.time}`)
}

//活跃存取状态
async function activeSaveGet(xky, xutil, id, field, value) {
    if (value) {
        //存数据
        let oldData = {
            id: id,
            field: field,
            value: value,
            time: parseInt(new Date().getTime() / 1000),
        }
        let sss = await encryptionSort(xutil, oldData)
        await xky.sleep(2 * 1000)
        return await xutil.http.get(`${sss.url}/wx/active?id=${sss.id}&field=${sss.field}&value=${sss.value}&token=${sss.token}&time=${sss.time}`)
    } else {
        //取数据
        let oldData = {
            id: id,
            field: field,
            time: parseInt(new Date().getTime() / 1000),
        }
        let sss = await encryptionSort(xutil, oldData)
        await xky.sleep(2 * 1000)
        return await xutil.http.get(`${sss.url}/wx/active?id=${sss.id}&field=${sss.field}&token=${sss.token}&time=${sss.time}`)
    }
}

//通讯录取号
async function contactGet(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000),
    }
    let sss = await encryptionSort(xutil, oldData);
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/wx.contact/get?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//通讯录处理
async function contactFinish(xky, xutil, id, type, number) {
    //取数据
    let oldData = {
        id: id,//微信ID
        type: type,//1取备注编号 2完成添加 3拉黑
        number: number,//处理号码
        time: parseInt(new Date().getTime() / 1000),
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/wx.contact/finish?id=${sss.id}&type=${sss.type}&number=${sss.number}&token=${sss.token}&time=${sss.time}`)
}

//通讯录检查
async function contactCheck(xky, xutil, id) {
    //取数据
    let oldData = {
        id: id,//微信ID
        time: parseInt(new Date().getTime() / 1000),
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/wx.contact/check?id=${sss.id}&token=${sss.token}&time=${sss.time}`)
}

//获取昵称
async function getNikeName(xky, xutil, language) {
    let sss = await encryptionSort()
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/nickname?lang=${language}`)
}

//归属地查询
async function phoneWhere(xky, xutil, phone) {
    let sss = await encryptionSort()
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/mobile?phone=${phone}`)
}

//设置定位
async function setLocations(xky) {
    let positionget = await xky.adbCommand('shell curl http://47.96.124.56:8124/loc.php')
    let possitions = positionget.result;
    let [dd, ff] = possitions.split(",");
    let xxx = await sjs(500, 2999);
    let yyy = await sjs(500, 2999);
    dd *= 100000;
    ff *= 100000;
    dd -= xxx;
    ff -= yyy;
    dd /= 100000;
    ff /= 100000;
    let pss = `${dd},${ff}`;
    await xky.setLocation(pss);
    return pss;
}

//网络检测
async function networkDetection(xky, userIp) {
    let cc = await xky.adbCommand(`shell ping -c 2 ${userIp}`);
    let ss = cc.result.split(",", 3)
    if (ss[2] != " 0% packet loss") {
        await xky.toast(`网络不稳定,请切换网络`);
        xky.log("网络不稳定,请切换网络")
        return ss;
    } else {
        return 666;
    }
}

//获取头像
async function getHeadPic(xky, xutil) {
    let sss = await encryptionSort()
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/head_pic`)
}

//上传插槽到侠客云盘
async function uplondWeFile(xky, AppUsesName, bagName, backupname) {
    while (1) {
        let back = await xky.backupSnapshot(bagName, backupname, {
            killApp: true,
            backupFiles: ["hardware.txt", "files", "MicroMsg", "shared_prefs"]
        });
        if (back.errcode != 0) {
            xky.toast(back.msg, 3);
            return;
        }
        await xky.sleep(1000);
        let ncText = await xky.adbCommand('shell du -k ' + back.path);
        let ncArr = ncText.result.split("/");
        let fileSize = ncArr[0].replace(/\s+/g, "");
        await xky.sleep(1000);
        if (fileSize > 10000) {
            xky.toast("正在将备份文件上传到网盘...");
            await xky.sleep(3000);
            let a = await xky.adbShell(`curl ftp://192.168.2.152/data/${AppUsesName}/ -u "admin:123456" -T ${back.path}`);
            await xky.sleep(3000);
            if (a != null) {
                xky.toast("文件已备份到本地服务器", 1);
                return { errcode: 1, msg: "上传文件到本地服务器成功" }
            } else {
                xky.log("上传文件不正常,正在重新上传")
                await xky.sleep(2000);
            }
        }
    }
}

//从侠客云盘下载插槽到本地
async function donwlondWeFile(xky, AppUsesName, bagName, backupname) {
    xky.toast("正在下载文件...");
    await xky.adbCommand('shell mkdir /sdcard/xbak');
    while (1) {
        let aa = await xky.adbShell(`curl ftp://192.168.2.152/data/${AppUsesName}/${backupname}.tar -u "admin:123456" -o /sdcard/xbak/${backupname}.tar`);
        await xky.sleep(2000);
        let bb = (await xky.adbCommand(' ls /sdcard/xbak/'));
        if (bb.result.indexOf(`${backupname}.tar`) != -1) {
            break;
        }
    }
    xky.toast("正在还原插槽...");
    let resore = await xky.restoreSnapshot(bagName, backupname);
    xky.log(resore);
    await xky.sleep(5 * 1000);
    await xky.adbShell(`chmod -R 777 /sdcard/xbak/${backupname}.tar`);
    await xky.sleep(1000);
    await xky.adbShell(`tar xvf /sdcard/xbak/${backupname}.tar -C /data/AppSnapshot/${bagName}/${backupname}`);
    await xky.sleep(1000);
    await xky.adbShell(`chmod -R 777 /data/AppSnapshot/${bagName}/${backupname}`);
    xky.toast("插槽还原完毕", 1);
}

//+++===[加密排序]===+++
async function encryptionSort(xutil, oldData) {
    let qqq = {
        //钥匙
        key: "~o!O@o#",
        //地址
        api_url: "http://119.23.32.104:91",
        //排序
        sort(d) {
            let field = Object.keys(d);
            field.sort(function (s, t) {
                var a = s.toLowerCase();
                var b = t.toLowerCase();
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
            let nd = {};
            for (var i = 0; i < field.length; i++) {
                //todo
                //nd[field[i]] = escape(d[field[i]]);
                nd[field[i]] = d[field[i]];
            }
            return nd;
        },
        //分割
        split(d) {
            return Object.getOwnPropertyNames(d)
                .map(key => {
                    if (d[key] instanceof Object) d[key] = JSON.stringify(d[key]);
                    return key + "=" + d[key];
                })
                .join("&");
        },
        //加密
        sign(d) {
            delete d.token;
            return xutil.str.md5(this.split(d) + "&key=" + this.key);
        }
    }
    if (oldData) {
        let data = qqq.sort(oldData);
        data.token = qqq.sign(data);
        data.url = qqq.api_url;
        return data;
    } else {
        let data = "";
        data.url = qqq.api_url;
        return data;
    }
}