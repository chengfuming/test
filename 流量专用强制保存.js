async function main(xky, args, xutil) {
    //上传上号删除本地插槽
    await saveuser(xky, args, xutil)
}

//上传上号删除本地插槽
async function saveuser(xky, args, xutil) {
    await xky.toast("正在上传插槽信息");
    await xky.killApp('com.tencent.mm');
    await xky.sleep(3 * 1000);
    await setNatBase(xky,2);//1初始化,2本地,3流量
    await xky.sleep(5 * 1000);
    let aa = await xky.getCurrentAppSnapshot("com.tencent.mm")
    await uplondWeFile(xky, "WeChat", "com.tencent.mm", aa.name);//服务器文件名,包名,插槽名
    await xky.sleep(2 * 1000);
    await xky.toast("删除本地插槽结束微信");
    await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
    await xky.sleep(5 * 1000);
    await xky.pressKey(3);
}

//设置网络  >>1初始化,2本地,3流量
async function setNatBase(xky, loc) {
    let oldLoc = 8;
    //获取硬件码
    let aa = await xky.adbShell('ifconfig');
    let reg = /(([a-f0-9]{2}:)|([a-f0-9]{2}-)){5}[a-f0-9]{2}/gi;
    let yjm = reg.exec(aa.result)[0];
    // xky.log(yjm);
    let jiqi = {
        "5e:d3:f0:68:4a:65": 81,
        "86:ed:d9:91:e9:21": 82,
        "a2:3a:fe:a3:db:10": 83,
        "1a:d9:13:8b:ce:ee": 84,
        "12:58:09:c7:1c:89": 85,
        "d2:0e:3f:ff:ea:7e": 86,
        "32:6f:c4:cc:67:6a": 87,
        "1a:df:d5:bd:65:40": 88,
        "9a:d1:f1:c4:8a:24": 89,
        "ce:e6:41:68:82:0c": 90,
    }
    // xky.log(jiqi[yjm]);
    await xky.restartApp("com.android.settings")
    await elementClick(xky, "更多");
    await elementClick(xky, "Ethernet");
    await elementClick(xky, "Ethernet Ip mode");
    await elementClick(xky, "static");
    if (loc == 3) {
        oldLoc = 0;
        await findElementIput(xky, "com.android.settings:id/ipaddress", `192.168.${oldLoc}.${jiqi[yjm]}`);
        await findElementIput(xky, "com.android.settings:id/gateway", `192.168.${oldLoc}.1`);
    } else if (loc == 1) {
        await findElementIput(xky, "com.android.settings:id/ipaddress", `192.168.${oldLoc}.${jiqi[yjm]}`);
        await findElementIput(xky, "com.android.settings:id/gateway", `192.168.${oldLoc}.1`);
        await findElementIput(xky, "com.android.settings:id/network_prefix_length", "255.255.255.0");
        await findElementIput(xky, "com.android.settings:id/dns1", "114.114.114.114");
        await findElementIput(xky, "com.android.settings:id/dns2", "1.7.11.91");
    } else {
        await findElementIput(xky, "com.android.settings:id/ipaddress", `192.168.${oldLoc}.${jiqi[yjm]}`);
        await findElementIput(xky, "com.android.settings:id/gateway", `192.168.${oldLoc}.1`);
    }
    await elementClick(xky, "CONNECT");
}
//2019/03/19
//下载图片
//let sjPic = await sjs(1, 774);
//await xky.downloadFile(`friendPic/pyq ${sjPic}.jpg`, `/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

//更新图库
//await xky.insertMedia(`/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

//删除图片
//await xky.delString(`/storage/emulated/0/Pictures/pyq ${sjPic}.jpg`);

//获取元素信息  >>必须找到,限时查找,限时查找第index-1个元素(从0开始的)
// let elmArr = await getElementMassage(xky,"微信");
// let elmArr = await getElementMassage(xky,"微信", 1);
// let elmArr = await getElementMassage(xky,"微信", 1, index);
// xky.log(elmArr);

//随机数
// let sjss = await sjs(1, 24);
// xky.log(sjss);

//数组打乱随机  >>传入数组
// let arrays = await upsetArray(oldArray)

//元素点击 >>必须点,限时x秒内点击,限时x秒内点击第index个元素(下标0为第一个)
// await elementClick(xky,"注册");
// await elementClick(xky,"注册", x);
// await elementClick(xky,"注册", x, index);

//正则点击
// await regularClick(xky, element);
// await regularClick(xky, element,index);

//坐标点击
// await coordinatesClick(xky,"com.android.documentsui:id/icon_thumb", x, y);

//随机点击元素其中一个  >>返回点击的元素
//await sjElementClick(xky,"注册");

//随机范围点击  >>点击并返回随机坐标
// let qqq = await sjXYClick(xky,"minX|minY" ,"maxX|maxY");
//xky.log(qqq);

//长按控制  >>长按复制,长按粘贴
// await longCopyPaste(xky,"注册", "copy",);
// await longCopyPaste(xky,"注册", "paste");

//找到元素输入  >>timer限时找到输入
// await findElementIput(xky,"请填写手机号", phone);
// await findElementIput(xky,"请填写手机号", phone,timer);

//使用方法找到元素  >>方法(如前进,返回,后退等)
//await findUseFunction(xky,"首页", "方法");

//滚动查找元素  >>已num格的速度查找
// await rollFindElement(xky,"延展阅读", "xia/shang",num);

//查找元素超时报错  >>data报错内容传什么数据都行,超出60秒报错
//let qqq = await FindElementTimeout(xky,"首页",data,60);
//xky.log(qqq);

//生成随机字符串  >>长度5
// let qqq = await randomString(5);
// xky.log(qqq);

//创建插槽  >>传入包名，插槽码长度15，返回插槽码
//  let qqq = await creatSlot(xky,"com.tencent.mm"，15);
//  xky.log(qqq);

// 微信滑动拼图
// await slideWecatJigsaw(xky,"tcaptcha_drag_thumb");

//随机生成姓名(本地)  >>返回姓名
//let qqq = await getName();
//xky.log(qqq);

//获取实名信息
// let RealNameInformation = await xutil.http.get("http://119.23.32.104:91/com/get/real");
// xky.log(RealNameInformation);

//接口批量生成添加联系人  >>生成5个,返回联系人数组
//let qqq = await toLeadInsCon(xky,xutil,5);
//xky.log(qqq);

//数据存储  >>新号ID为空"", 更新时必须填
//let qqq = await saveData(xky, xutil, appName,id,depot,account,password,mobile,nickname,rawid,city,extend);
//xky.log(qqq);

// 获取APP库号
// let qqq = await getDepot(xky,xutil,app);
// xky.log(qqq);

// 获取数据
// let qqq = await getData(xky,xutil,app,depot);
// xky.log(qqq);

//活跃完成通知
//let qqq = await upData(xky, xutil,id);
//xky.log(qqq);

//数据冻结
//let qqq = await dataFrozen(xky, xutil,id);
//xky.log(qqq);

//获取内部好友数据
// let qqq = await getInteriorFriendData(xky,xutil,app,depot,id);
// xky.log(qqq);

//重置活跃
//let qqq = await resetActive(xky,xutil,id);
//xky.log(qqq);

//ip查询
//let qqq = await ipWhere(xky,xutil,ip,type);
//xky.log(qqq);

//获取代理
//let qqq = await getAgency(xky, xutil, city);
//xky.log(qqq);

//获取回复内容
//let qqq = await replyMessage(xky,xutil,id,msg);
//xky.log(qqq);

//获取任务
//let qqq = await getTask(xky,xutil,id);
//xky.log(qqq);

//提交任务  >>taskid任务ID,extend扩展可为空
//let qqq = await taskFinish(xky,xutil,id,taskid,extend);
//xky.log(qqq);

//活跃存取状态  >>field名称自己取名,存数据才填value
// let qqq = await activeSaveGet(xky, xutil, id, field, value);
// xky.log(qqq);

//通讯录取号  >>微信ID
// let qqq = await contactGet(xky, xutil, id);
// xky.log(qqq);

//通讯录处理  >>type:1取备注编号 2完成添加 3拉黑,number:获取的号码
// let qqq = await contactFinish(xky, xutil, id, type, number);
// xky.log(qqq);

//通讯录检查  >>id:微信ID
// let qqq = await contactCheck(xky, xutil, id);
// xky.log(qqq);

//获取昵称  >>cn中文,en英文
//let qqq = await getNikeName(xky,xutil,"cn/en");
//xky.log(qqq);

//归属地查询
//let qqq = await phoneWhere(xky,xutil,phone);
//xky.log(qqq);

//设置定位  >>根据当前IP完成定位,返回坐标
//let qqq = await setLocations(xky);
//xky.log(qqq);

//网络检测  >>传入当前ip
//let qqq = await networkDetection(xky,ip);
//xky.log(qqq);

//获取头像
//let qqq = await getHeadPic(xky,,xutil);
//xky.log(qqq);

//获取朋友圈内容
//let qqq = await getPyqMsg(xky,xutil);
//xky.log(qqq);

//上传插槽到本地服务器  >>服务器文件名,包名,插槽名
//await uplondWeFile(xky, "WeChat", "com.tencent.mm", "dfhfh2557114");

//从本地服务器下载插槽到矿机  >>服务器文件名,包名,插槽名
//await donwlondWeFile(xky, "WeChat", "com.tencent.mm", "dfhfh2557114");
//======================================================================
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

//正则点击
async function regularClick(xky, element, ind) {
    while (1) {
        let qqq = await xky.findUiObjects(element, { regex: true, timeout: 1000 });
        if (qqq.uiObjects != "") {
            if (qqq.uiObjects[0].contentDesc == "") {
                if (ind) {
                    await xky.findAndClick(qqq.uiObjects[ind].text);
                    return qqq.uiObjects;
                }
                await xky.findAndClick(qqq.uiObjects["0"].text);
                return qqq.uiObjects;
            } else {
                if (ind) {
                    await xky.findAndClick(qqq.uiObjects[ind].contentDesc);
                    return qqq.uiObjects;
                }
                await xky.findAndClick(qqq.uiObjects["0"].contentDesc);
                return qqq.uiObjects;
            }
        }
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
async function findElementIput(xky, element, inp, timer) {
    if (timer) {
        let elementTimer = await getElementMassage(xky, element, timer);
        if (elementTimer) {
            await xky.findAndInput(element, inp);
            return elementTimer;
        }
    } else {
        let qqq = await getElementMassage(xky, element);
        await xky.findAndInput(element, inp);
        return qqq;
    }
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
async function rollFindElement(xky, element, direction, speed, timer) {
    while (1) {
        let elmArr = await getElementMassage(xky, element, 1);
        if (elmArr) {
            return elmArr;
        }
        if (direction == "xia") {
            await xky.wheel(0.5, 0.5, -speed);
        } else {
            await xky.wheel(0.5, 0.5, speed);
        }
        if (timer) {
            timer--;
            if (timer < 1) {
                return "查找超时";
            }
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
    let chars = "abcdefhijkmnprstwxyz1234567890"; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxPos = chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//创建插槽
async function creatSlot(xky, PackageName, long) {
    let randomStringcode = await randomString(long);//长度5
    while (1) {
        let qqq = await xky.createAppSnapshot(PackageName, randomStringcode);
        if (qqq.msg == "快照创建成功") {
            return randomStringcode;
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

//数据存储
async function saveData(xky, xutil, appName, id, depot, account, password, mobile, nickname, rawid, city,extend) {
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
        extend: extend,
        time: parseInt(new Date().getTime() / 1000)
    };

    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000);
    return await xutil.http.request({
        url: `${sss.url}/data/save`,
        method: "post",
        data: sss.data,
        headers: {
            token: sss.data.token
        },
        responseEncoding: "utf8"
    });
}

//获取APP库号
async function getDepot(xky, xutil, app) {
    let oldData = {
        app: app,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/depot?app=${sss.data.app}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/data/active_get?app=${sss.data.app}&depot=${sss.data.depot}&token=${sss.data.token}&time=${sss.data.time}`)
}

//活跃完成通知
async function upData(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/active_finish?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
}

//数据冻结
async function dataFrozen(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/freeze?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/data/friend_get?app=${sss.data.app}&depot=${sss.data.depot}&id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
}

//重置活跃
async function resetActive(xky, xutil, id) {
    let oldData = {
        id: id,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/active_reset?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
}

//ip查询
async function ipWhere(xky, xutil, ip, type) {
    let oldData = {
        ip: ip,
        type: type,
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/ip?ip=${sss.data.ip}&type=${sss.data.type}`)
}

//获取代理
async function getAgency(xky, xutil, city) {
    let oldData = {
        city: escape(city),
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/proxy?city=${sss.data.city}&token=${sss.data.token}&time=${sss.data.time}`)
}

//获取回复内容
async function replyMessage(xky, xutil, id, msg) {
    let oldData = {
        id: id,
        msg: escape(msg)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    let qqq = await xutil.http.get(`${sss.url}/com/get/chat3?id=${sss.data.id}&msg=${sss.data.msg}`)
    if (qqq.data.data.message == "请求次数超限制!") {
        qqq = await xutil.http.get(`${sss.url}/com/get/chat2?msg=${sss.data.msg}`)
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
    return await xutil.http.get(`${sss.url}/wx/task_get?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/wx/task_finish?id=${sss.data.id}&task=${sss.data.task}&extend=${sss.data.extend}&token=${sss.data.token}&time=${sss.data.time}`)
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
        return await xutil.http.get(`${sss.url}/wx/active?id=${sss.data.id}&field=${sss.data.field}&value=${sss.data.value}&token=${sss.data.token}&time=${sss.data.time}`)
    } else {
        //取数据
        let oldData = {
            id: id,
            field: field,
            time: parseInt(new Date().getTime() / 1000),
        }
        let sss = await encryptionSort(xutil, oldData)
        await xky.sleep(2 * 1000)
        return await xutil.http.get(`${sss.url}/wx/active?id=${sss.data.id}&field=${sss.data.field}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/wx.contact/get?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/wx.contact/finish?id=${sss.data.id}&type=${sss.data.type}&number=${sss.data.number}&token=${sss.data.token}&time=${sss.data.time}`)
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
    return await xutil.http.get(`${sss.url}/wx.contact/check?id=${sss.data.id}&token=${sss.data.token}&time=${sss.data.time}`)
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

//获取朋友圈内容
async function getPyqMsg(xky, xutil) {
    let sss = await encryptionSort()
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/com/get/moments`)
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
        await xky.sleep(2000);
        let ncText = await xky.adbCommand('shell du -k ' + back.path);
        let ncArr = ncText.result.split("/");
        let fileSize = ncArr[0].replace(/\s+/g, "");
        await xky.sleep(2000);
        if (fileSize > 10000) {
            xky.toast("正在将备份文件上传到网盘...");
            await xky.sleep(3000);
            let a = await xky.adbShell(`curl ftp://192.168.2.254/data/${AppUsesName}/ -u "admin:123456" -T ${back.path}`);
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
    xky.toast("正在下载文件并还原插槽...");
    await xky.adbCommand('shell mkdir /sdcard/xbak');
    while (1) {
        await xky.adbShell(`curl ftp://192.168.2.254/data/${AppUsesName}/${backupname}.tar -u "admin:123456" -o /sdcard/xbak/${backupname}.tar`);
        await xky.sleep(2000);
        let bb = (await xky.adbCommand(' ls /sdcard/xbak/'));
        if (bb.result.indexOf(`${backupname}.tar`) != -1) {
            break;
        }
    }
    let resore = await xky.restoreSnapshot(bagName, backupname);
    xky.log(resore);
    await xky.sleep(5 * 1000);
    await xky.adbShell(`chmod -R 777 /sdcard/xbak/${backupname}.tar`);
    await xky.sleep(2000);
    await xky.adbShell(`tar xvf /sdcard/xbak/${backupname}.tar -C /data/AppSnapshot/${bagName}/${backupname}`);
    await xky.sleep(2000);
    await xky.adbShell(`chmod -R 777 /data/AppSnapshot/${bagName}/${backupname}`);
    xky.toast("插槽还原完毕", 1);
}

//===================[加密排序]===================
async function encryptionSort(xutil, oldData) {
    let qqq = {
        key: "~o!O@o#",
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
        return {
            data: data,
            url: qqq.api_url
        };
    } else {
        return {
            url: qqq.api_url
        };
    }
}