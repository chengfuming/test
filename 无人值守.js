async function main(xky, args, xutil) {
    //清空无用文件
    await xky.adbShell(" rm /sdcard/xbak/*.tar");
    await closeNoSave(xky, args, xutil)
    await xky.sleep(1 * 1000);
    await openVxQx(xky);
    await xky.sleep(1 * 1000);


    //设置触动账号
    await setChuDong(xky, args, xutil, 4, "绵阳");
    if (args.setHyFs == "所有") {
        await allDepot(xky, args, xutil);
    } else {
        await oneDepot(xky, args, xutil);
    }
}

async function oneDepot(xky, args, xutil) {
    while (1) {
        let appNum = 1;
        let qqq = "";
        while (1) {
            //获取账号
            qqq = await getData(xky, xutil, appNum, args.depots);
            if (qqq.data.msg == "该库活跃已完成") {
                xky.log("***************该库活跃完成***************");
                await xky.toast('***************该库活跃完成***************');
                await setChuDong(xky, args, xutil, 2, "绵阳");
                return;
            }
            await setChuDong(xky, args, xutil, 3, qqq.data.data.city);
            await setChuDong(xky, args, xutil, 2, "绵阳");
            break;
        }
        //xky.log(qqq)
        //清空联系人
        await xky.toast("清空和添加联系人");
        await xky.clearContacts();
        //获取extend
        let data = JSON.parse(qqq.data.data.extend);
        let cCode = data.cCode;
        //添加联系人
        await xky.insertContacts(data.addressbook);
        //下载还原插槽信息
        await donwlondWeFile(xky, "WeChat", "com.tencent.mm", cCode);//服务器文件名,包名,插槽名
        //设置定位和VPN
        await xky.toast("设置定位和VPN");
        //切换代理(触动精灵)
        await setChuDong(xky, args, xutil, 1, qqq.data.data.city);
        //定位
        await setLocations(xky);
        await xky.sleep(3 * 1000);
        //切换账号
        await xky.setAppSnapshot("com.tencent.mm", cCode);
        await elementClick(xky, "允许", 3);
        await elementClick(xky, "允许", 1);
        await elementClick(xky, "关闭应用", 3);
        await elementClick(xky, "返回", 1);
        //查看是否启动完毕,如果时间过长会报告信息
        let isError = await userError(xky, "com.tencent.mm:id/d7b")
        switch (isError) {
            case 1:
                //运行正常,打乱顺序
                var maincheck1 = await upsetArray(args.main_check)
                //执行模块
                await doModule(xky, args, xutil, maincheck1, qqq);
                break;
            case 2:
                //启动卡住
                xky.log("<<<<<<提示1,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log("<<<<<<提示2,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log(qqq)
                xky.log("<<<<<<提示3,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log("<<<<<<提示4,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                await xky.sleep(20 * 1000);
                await xky.toast("删除本地插槽结束微信");
                await xky.killApp('com.tencent.mm');//结束在运行的微信
                await xky.sleep(2 * 1000);
                await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
                break;
            case 5:
                //其他设备登陆异常
                xky.log("<<<<<<正在处理异常账号>>>>>>>");
                xky.log(qqq);
                xky.log("<<<<<<正在处理异常账号>>>>>>>");
                await xky.sleep(5000);
                var isGood = await repairError(xky, args, xutil, qqq);
                if (isGood == 1) {
                    //运行正常
                    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                    //打乱顺序
                    var maincheck12 = await upsetArray(args.main_check)
                    //执行模块
                    await doModule(xky, args, xutil, maincheck12, qqq);
                }
                break;
        }
    }
}

async function allDepot(xky, args, xutil) {
    //获取仓库
    let getPot = await getDepot(xky, xutil, 1);
    let depotArrObj = [];
    for (let i = 5; i < getPot.data.data.length; i++) {
        depotArrObj.push(getPot.data.data[i].id)
    }
    //仓库选择器
    let depotIndex = 0;
    while (1) {
        //初始化获取账号
        //app编号
        let appNum = 1;
        let qqq = "";
        //切换账号和仓库
        while (1) {
            await xky.sleep(2000);
            if (depotIndex >= depotArrObj.length) {
                xky.log("***************所有仓库活跃完成***************")
                await xky.toast('所有仓库活跃完成');
                await setChuDong(xky, args, xutil, 2, "绵阳");
                return;
            }
            await xky.toast(`开始执行${depotArrObj[depotIndex]}库`);
            //获取账号
            qqq = await getData(xky, xutil, appNum, depotArrObj[depotIndex]);
            //切换仓库
            if (qqq.data.msg == "该库活跃已完成") {
                await xky.toast('该库活跃完成,正在切换仓库');
                depotIndex++;
                //设置代理编号
            } else {
                await setChuDong(xky, args, xutil, 3, qqq.data.data.city);
                await setChuDong(xky, args, xutil, 2, qqq.data.data.city);
                break;
            }
        }
        //xky.log(qqq)
        //清空联系人
        await xky.toast("清空旧联系人,添加账号联系人");
        await xky.clearContacts();
        //获取extend
        let data = JSON.parse(qqq.data.data.extend);
        let cCode = data.cCode;
        //添加联系人
        await xky.insertContacts(data.addressbook);
        //下载还原插槽信息
        await donwlondWeFile(xky, "WeChat", "com.tencent.mm", cCode);
        //设置定位和VPN
        await xky.toast("设置定位和VPN");
        //切换代理(触动精灵)
        await setChuDong(xky, args, xutil, 1, qqq.data.data.city);
        //定位
        await setLocations(xky);
        await xky.sleep(3 * 1000);
        //切换账号
        await xky.setAppSnapshot("com.tencent.mm", cCode);
        await elementClick(xky, "允许", 3);
        await elementClick(xky, "允许", 1);
        await elementClick(xky, "关闭应用", 3);
        await elementClick(xky, "返回", 1);

        //查看是否启动完毕,如果时间过长会报告信息
        let isError = await userError(xky, "com.tencent.mm:id/d7b")

        switch (isError) {
            case 1:
                //运行正常,打乱顺序
                var maincheck1 = await upsetArray(args.main_check)
                //执行模块
                await doModule(xky, args, xutil, maincheck1, qqq);
                break;
            case 2:
                //启动卡住
                xky.log("<<<<<<提示1,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log("<<<<<<提示2,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log(qqq)
                xky.log("<<<<<<提示3,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                xky.log("<<<<<<提示4,有20秒确认是否为未出现过的故障添加到异常处理库!!!>>>>>>>");
                await xky.sleep(20 * 1000);
                await xky.toast("删除本地插槽结束微信");
                await xky.killApp('com.tencent.mm');//结束在运行的微信
                await xky.sleep(2 * 1000);
                await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
                break;
            case 5:
                //其他设备登陆异常
                xky.log("<<<<<<正在处理异常账号>>>>>>>");
                xky.log(qqq);
                xky.log("<<<<<<正在处理异常账号>>>>>>>");
                await xky.sleep(5000);
                var isGood = await repairError(xky, args, xutil, qqq);
                if (isGood == 1) {
                    //运行正常
                    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                    //打乱顺序
                    var maincheck12 = await upsetArray(args.main_check)
                    //执行模块
                    await doModule(xky, args, xutil, maincheck12, qqq);
                }
                break;
        }
    }
}

//执行模块
async function doModule(xky, args, xutil, maincheck, qqq) {
    if (maincheck) {
        for (let i = 0; i < maincheck.length; i++) {
            await xky.sleep(1 * 1000);
            await xky.toast(`开始执行 ${maincheck[i]}  模块`);
            switch (maincheck[i]) {
                case "清除红点":
                    await wxhdss(xky, xutil);
                    break;
                case "加群拉人":
                    await adCrowdAdPop(xky, args);
                    break;
                case "抢红包":
                    await redPacket(xky, args, xutil);
                    break;
                case "实名昵称":
                    await isAuthentiNick(xky, xutil, qqq);
                    break;
                case "添加通讯录":
                    await AddTxlFriend(xky, args, xutil, qqq);
                    break;
                case "修改微信号":
                    await setVXId(xky, xutil, qqq);
                    break;
                case "添加内部好友":
                    await addPetopFriend(xky, args, xutil, qqq);
                    break;
                case "收藏":
                    await collect(xky);
                    break;
                case "关注公众号":
                    await officialAccounts(xky, args, xutil);
                    break;
                case "取消关注公众号":
                    await delAccounts(xky, args, xutil);
                    break;
                case "建群":
                    await Jianqun(xky);
                    break;
                case "发朋友圈":
                    await friendCircle(xky, args, xutil);
                    break;
                case "看一看阅读":
                    await lookRead(xky);
                    break;
                case "搜一搜搜索":
                    await SearchHotspot(xky);
                    break;
                case "换头像":
                    await exchangeHeaderPic(xky);
                    break;
                case "个性签名":
                    await autograph(xky, xutil);
                    break;
                case "下载表情":
                    await LowerExpression(xky);
                    break;
                case "随机朋友圈可见时间":
                    await friendLookTome(xky);
                    break;
                case "关闭手机加好友":
                    await closePhoneAddFriend(xky, "close");//close/open
                    break;
                case "打开手机加好友":
                    await closePhoneAddFriend(xky, "open");//close/open
                    break;
                case "关注小程序":
                    await miniProgram(xky, args, xutil);
                    break;
                case "绑定APP":
                    await wechatLogin(xky, args, xutil);
                    break;
                case "实名认证":
                    await realNameAuthentication(xky, xutil);
                    break;
                case "关闭新消息提醒":
                    await closeTis(xky)
                    break;
            }
        }
    } else {
        await xky.toast("没有选择执行模块");
    }
    await xky.sleep(5 * 1000);
    await xky.toast("正在上传插槽信息");
    await xky.killApp('com.tencent.mm');
    await setChuDong(xky, args, xutil, 2, "绵阳");
    //上传插槽信息
    let aa = await xky.getCurrentAppSnapshot("com.tencent.mm");
    await uplondWeFile(xky, "WeChat", "com.tencent.mm", aa.name);//服务器文件名,包名,插槽名
    await xky.sleep(2 * 1000);
    await xky.toast("删除本地插槽结束微信");
    await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
    let finish = await upData(xky, xutil, qqq.data.data.id);
    xky.log(finish)
}

//判断异常号
async function userError(xky, element) {
    let startTime = new Date();
    while (1) {
        let elementArr = await getElementMassage(xky, element, 1);
        if (elementArr) {
            return 1;
        }
        let endTime = new Date();
        let useTime = endTime - startTime;
        if (useTime > 18000) {
            if (useTime > 45000) {
                return 2;
            }
            //登陆状态异常
            let denglu = await getElementMassage(xky, "登录", 1);
            if (denglu) {
                return 5;
            }
            //账号异常
            let tisa = await xky.findUiObjects('帐号状态异常', { regex: true, timeout: 2000 });
            if (tisa.uiObjects != "") {
                await elementClick(xky, "确定");
                return 5;
            }
            let qq1 = await getElementMassage(xky, "请填写微信密码", 1);
            if (qq1) {
                return 5;
            }

            //其他设备登陆
            let cc = await xky.findUiObjects('你的微信帐号于', { regex: true, timeout: 2000 });
            let dd = await xky.findUiObjects('你的帐号于', { regex: true, timeout: 2000 });
            let ee = await xky.findUiObjects('当前帐号于', { regex: true, timeout: 2000 });
            if (cc.uiObjects != "" || dd.uiObjects != "" || ee.uiObjects != "") {
                await elementClick(xky, "确定");
                return 5;
            }

            //登陆出现错误
            let aaa = await xky.findUiObjects('重新登录', { regex: true, timeout: 2000 });
            if (aaa.uiObjects != "") {
                await elementClick(xky, "确定");
                return 5;
            }

            //被盗异常
            let aaas = await xky.findUiObjects('被盗', { regex: true, timeout: 2000 });
            if (aaas.uiObjects != "") {
                await elementClick(xky, "确定");
                return 5;
            }
        }
        await xky.sleep(3000);
    }
}

//处理异常号
async function repairError(xky, args, xutil, qqq) {
    while (1) {
        while (1) {
            var qqwe1 = await xky.findUiObjects("请填写微信密码");
            var qqwe2 = await xky.findUiObjects("请填写手机号");
            var qqwe3 = await xky.findUiObjects("登录");
            var qqwe4 = await xky.findUiObjects("下一步");
            var qqwe5 = await xky.findUiObjects("tcaptcha_drag_thumb");
            var qqwe6 = await xky.findUiObjects("开始验证 ");
            var qqwe7 = await xky.findUiObjects("是");
            var qqwe8 = await xky.findUiObjects('异常', { regex: true });
            var qqwe9 = await xky.findUiObjects('批量', { regex: true });
            var qqwe10 = await xky.findUiObjects('密码错误', { regex: true });
            var qqwe11 = await xky.findUiObjects('应急联系人', { regex: true });
            let goodUser = await getElementMassage(xky, "com.tencent.mm:id/d7b", 1);
            if (qqwe1.uiObjects != "") {
                await findElementIput(xky, "请填写微信密码", qqq.data.data.password);
                break;
            } else if (qqwe2.uiObjects != "") {
                await findElementIput(xky, "请填写手机号", qqq.data.data.mobile);
                break;
            } else if (qqwe3.uiObjects != "" && qqwe1.uiObjects == "") {
                await elementClick(xky, "登录", 1);
                await xky.sleep(2000);
                break;
            } else if (qqwe4.uiObjects != "" && qqwe1.uiObjects == "") {
                await elementClick(xky, "下一步", 1);
                await xky.sleep(2000);
                break;
            } else if (qqwe5.uiObjects != "") {
                await slideWecatJigsaw(xky, "tcaptcha_drag_thumb");
                await xky.sleep(3000);
                break;
            } else if (qqwe6.uiObjects != "") {
                await elementClick(xky, "开始验证 ");
                break;
            } else if (qqwe7.uiObjects != "") {
                await elementClick(xky, "是");
                await xky.sleep(5 * 1000);
                return 1;
            } else if (qqwe8.uiObjects != "" || qqwe9.uiObjects != "" || qqwe10.uiObjects != "") {
                await moveTepot(xky, xutil, 1002, qqq);
                return 2;
            } else if (qqwe11.uiObjects != "") {
                return 1;
            } else if (goodUser) {
                return 1;
            }
        }
    }
}

//开启微信权限
async function openVxQx(xky) {
    await xky.restartApp("com.android.settings")
    await xky.sleep(2000);
    await rollFindElement(xky, "应用", "xia", 6);
    await elementClick(xky, "应用");
    await xky.sleep(2000);
    await rollFindElement(xky, "微信", "xia", 6);
    await elementClick(xky, "微信");
    await elementClick(xky, "权限");
    await xky.sleep(2000);
    while (1) {
        let sdd = await elementClick(xky, "关闭", 2);
        if (!sdd) {
            await elementClick(xky, "身体传感器");
            break;
        }
    }
    await xky.killApp('com.android.settings');
}

//关闭新消息提醒
async function closeTis(xky) {
    await elementClick(xky, "我");
    await elementClick(xky, "设置");
    await elementClick(xky, "新消息提醒");
    await xky.sleep(2000);
    let getnewmsg = await getElementMassage(xky, "com.tencent.mm:id/j7");
    if (getnewmsg["0"].contentDesc == "已开启") {
        await elementClick(xky, "已开启");
        await elementClick(xky, "确认关闭", 3);
    } else {
        xky.log("消息提醒已经关闭")
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//移库
async function moveTepot(xky, xutil, depot, qqq) {
    await xky.sleep(2 * 1000);
    let extendData = JSON.parse(qqq.data.data.extend)
    let saveUser = await saveData(xky, xutil, 1, qqq.data.data.id, depot, qqq.data.data.account, qqq.data.data.password, qqq.data.data.mobile, qqq.data.data.nickname, qqq.data.data.rawid, qqq.data.data.city, extendData);
    xky.log(saveUser);
    let aa = await xky.getCurrentAppSnapshot("com.tencent.mm")
    await xky.sleep(2 * 1000);
    await xky.toast("删除本地插槽结束微信");
    await xky.delAppSnapshot("com.tencent.mm", "all");//删除01
    xky.log(`------------------------------------`);
    xky.log(`${qqq.data.data.id}已经转移至${depot}库`);
    xky.log(`------------------------------------`);
}

//关闭不保留活动
async function closeNoSave(xky) {
    await xky.restartApp("com.android.settings")
    await xky.sleep(2000)
    while (1) {
        let sss = await xky.findUiObjects('WLAN');
        if (sss.uiObjects != "") {
            await xky.swipe(0.5, 0.9, 0.5, 0.15, 2);
            break;
        }
    }
    await xky.sleep(2000)
    let bb = await elementClick(xky, "开发者选项", 2);
    if (!bb) {
        xky.log("开发者模式没有打开")
        await rollFindElement(xky, "关于手机", "xia", 6);//已num格的速度查找
        await elementClick(xky, "关于手机");
        await rollFindElement(xky, "版本号", "xia", 5);//已num格的速度查找
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "版本号");
        await elementClick(xky, "菜单");
        await elementClick(xky, "开发者选项");
    }
    await xky.sleep(2 * 1000);
    await await xky.swipe(0.5, 0.9, 0.5, 0.15, 2);
    await xky.sleep(2000)
    await rollFindElement(xky, "不保留活动", "shang", 2);//已num格的速度查找
    await xky.sleep(2000)
    await elementClick(xky, "ON", 2);
}

//实名昵称更改
async function isAuthentiNick(xky, xutil, qqq) {
    await elementClick(xky, "我");
    await elementClick(xky, "支付");
    await elementClick(xky, "更多");
    let yirenzheng = await getElementMassage(xky, "已认证", 3);
    if (yirenzheng) {
        let extendData = JSON.parse(qqq.data.data.extend)
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        await elementClick(xky, "我");
        await xky.sleep(2000);
        let yigai = await getElementMassage(xky, "com.tencent.mm:id/a63");
        let smmmm = yigai["0"].text.indexOf("mars")
        if (smmmm < 0) {
            await elementClick(xky, "com.tencent.mm:id/py");
            await elementClick(xky, "昵称");
            await findElementIput(xky, "com.tencent.mm:id/e6r", `${yigai["0"].text}mars`);
            await xky.sleep(2000);
            await elementClick(xky, "保存");
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
            await xky.sleep(2 * 1000);
            if (!extendData.isShiMing) {
                extendData.isShiMing = 1;
            }
            let nickSave = await saveData(xky, xutil, 1, qqq.data.data.id, qqq.data.data.depot, qqq.data.data.account, qqq.data.data.password, qqq.data.data.mobile, `${yigai["0"].text}mars`, qqq.data.data.rawid, qqq.data.data.city, extendData);
            xky.log(nickSave);
        } else {
            if (!extendData.isShiMing) {
                extendData.isShiMing = 1;
                let nickSave = await saveData(xky, xutil, 1, qqq.data.data.id, qqq.data.data.depot, qqq.data.data.account, qqq.data.data.password, qqq.data.data.mobile, qqq.data.data.nickname, qqq.data.data.rawid, qqq.data.data.city, extendData);
                xky.log(nickSave);
            }
        }
    } else {
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    }
}

//实名认证
async function realNameAuthentication(xky, xutil) {
    await elementClick(xky, "我");
    await elementClick(xky, "支付");
    await elementClick(xky, "更多");
    let ewmArr = await getElementMassage(xky, "已认证", 3);
    if (ewmArr) {
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        return 1;
    }
    await elementClick(xky, "实名认证");
    let mm = await getElementMassage(xky, "系统繁忙，请稍后再试", 3);
    if (mm) {
        await elementClick(xky, "确定", 1);
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        return 1;
    }
    await elementClick(xky, "验证姓名和身份证号码");
    await elementClick(xky, "同意");
    let [ppp, qqq, aa] = [0, "", ""];
    while (1) {
        while (1) {
            qqq = await xutil.http.get("http://119.23.32.104:91/com/get/real")
            aa = await xutil.http.get(`https://www.fesugar.com/get_identitycards?id=${qqq.data.data.card}`)
            if (aa.data.msg) {
                xky.log("身份证信息错误")
                await xky.sleep(2000);
            } else {
                break;
            }
        }
        await findElementIput(xky, "请输入本人姓名", qqq.data.data.name);
        await findElementIput(xky, "输入身份证号", qqq.data.data.card);
        await elementClick(xky, "职业");
        await elementClick(xky, "其他");
        await xky.sleep(2 * 1000);
        let tasksave = await getElementMassage(xky, "android.widget.EditText");
        if (tasksave["0"].text == "请输入本人姓名" || tasksave["1"].text == "输入身份证号") {
            xky.log("不活动保留处于打开状态,正在关闭")
            await closeNoSave(xky);
            await xky.restartApp('com.tencent.mm');
            await xky.sleep(6 * 1000);
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
            await elementClick(xky, "我");
            await elementClick(xky, "支付");
            await elementClick(xky, "更多");
            await elementClick(xky, "实名认证");
            await elementClick(xky, "验证姓名和身份证号码");
        } else {
            await elementClick(xky, "地区");
            await elementClick(xky, "允许", 3);
            await elementClick(xky, "com.tencent.mm:id/c1");
            let bb = aa.data.data.address;
            let cc = bb.split("省");
            let dd = cc[1].split("市");
            await findElementIput(xky, "com.tencent.mm:id/kh", cc[0]);
            await elementClick(xky, "com.tencent.mm:id/d8t");
            await elementClick(xky, "com.tencent.mm:id/c1");
            await findElementIput(xky, "com.tencent.mm:id/kh", dd[0]);
            await elementClick(xky, "com.tencent.mm:id/d8t");
            await elementClick(xky, "收起键盘", 2);
            await elementClick(xky, "下一步");
            let fff = await getElementMassage(xky, "设置支付密码", 5);
            if (fff) {
                break;
            } else {
                await elementClick(xky, "确定");
                await elementClick(xky, "返回");
                ppp++;
                if (ppp > 2) {
                    xky.log("不能过多的尝试实名")
                    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                    return 1;
                }
                await elementClick(xky, "验证中国大陆身份证");
            }
        }
    }
    await xky.sleep(3000);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.77);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.16, 0.86);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.50, 0.86);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.51, 0.77);
    await xky.sleep(3000);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.77);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.16, 0.86);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.50, 0.86);
    await coordinatesClick(xky, "android.widget.RelativeLayout", 0.51, 0.77);
    await elementClick(xky, "完成", 3);
    let yj = await getElementMassage(xky, "你已通过身份证号实名注册两个微信支付账户，达到个数限制。请通过添加银行卡完成本次实名注册", 2);
    if (yj) {
        await elementClick(xky, "确定");
        await elementClick(xky, "com.tencent.mm:id/eyy");
        await elementClick(xky, "是");
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//修改微信ID
async function setVXId(xky, xutil, qqq) {
    await elementClick(xky, "我");
    await elementClick(xky, "com.tencent.mm:id/py");
    let ewmArr = await getElementMassage(xky, "android:id/summary");
    if (!ewmArr[1].text.indexOf("wxid_")) {
        let len = 3;
        let $chars =
            "abcdefhijkmnprstwxyz"; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        let maxPos = $chars.length;
        let pwd = "";
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        let VXheader = pwd;
        let newVXID = `${VXheader}${qqq.data.data.mobile.substring(5, 11)}`
        await elementClick(xky, "微信号");
        await findElementIput(xky, "com.tencent.mm:id/e69", newVXID);
        await elementClick(xky, "保存");
        await elementClick(xky, "确定");
        let IDhave = await getElementMassage(xky, "帐号已经存在，请换其它帐号", 5);
        if (IDhave) {
            newVXID = `${VXheader}${qqq.data.data.mobile.substring(5, 11)}a1`;
            await elementClick(xky, "确定");
            await findElementIput(xky, "com.tencent.mm:id/e69", newVXID);
            await elementClick(xky, "保存");
            await elementClick(xky, "确定");
        }
        await xky.sleep(3 * 1000);
        //上传修改信息信息
        let extendData = JSON.parse(qqq.data.data.extend);
        let saveUser = await saveData(xky, xutil, 1, qqq.data.data.id, qqq.data.data.depot, qqq.data.data.account, qqq.data.data.password, qqq.data.data.mobile, qqq.data.data.nickname, newVXID, qqq.data.data.city, extendData);
        xky.log(saveUser);
        xky.log("******微信号修改完成******");
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    } else {
        xky.log("******该账号已经设置过微信号了******")
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    }
}

//添加内部好友
async function addPetopFriend(xky, args, xutil, qqq) {
    await elementClick(xky, "com.tencent.mm:id/d7b");
    await elementClick(xky, "更多功能按钮");
    await elementClick(xky, "添加朋友");
    await elementClick(xky, "微信号/QQ号/手机号");
    let friendVXID = "";
    let kkk = 0;
    while (1) {
        await xky.sleep(2000);
        let sss = await getInteriorFriendData(xky, xutil, 1, qqq.data.data.depot, qqq.data.data.id);
        if (sss.data.msg == "ok") {
            friendVXID = sss.data.data.rawid;
            break;
        }
        kkk++;
        if (kkk > 3) {
            xky.log("好友请求接口异常,请检查!!")
            xky.log(sss)
            xky.log("好友请求接口异常,请检查!!")
        }
    }
    await findElementIput(xky, "com.tencent.mm:id/kh", friendVXID);
    await elementClick(xky, "com.tencent.mm:id/d7b", 1);
    let noUser = await elementClick(xky, "添加到通讯录", 5);
    if (noUser) {
        await elementClick(xky, "发送", 5);
        await xky.sleep(2000);
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//加群拉人
async function adCrowdAdPop(xky, args) {
    //清空图片
    await xky.adbShell(" rm /storage/emulated/0/Download/*.jpg");
    await xky.sleep(1000);
    //下载二维码
    await xky.adbShell(`curl '${args.addQunUrl}'  -o /storage/emulated/0/Download/1.jpg`);
    await xky.sleep(3000);
    //更新图片
    await xky.insertMedia(`/storage/emulated/0/Download/1.jpg`);
    await elementClick(xky, "com.tencent.mm:id/d7b");
    await elementClick(xky, "更多功能按钮");
    await elementClick(xky, "扫一扫");
    await elementClick(xky, "com.tencent.mm:id/jy");
    await elementClick(xky, "从相册选取二维码");
    await elementClick(xky, "所有图片");
    await elementClick(xky, "Download");
    await elementClick(xky, "com.tencent.mm:id/akq");
    await elementClick(xky, "加入该群聊", 8);
    await xky.sleep(3000);
    let elmArr = await getElementMassage(xky, "com.tencent.mm:id/k3");
    let aaaa = elmArr["0"].text.replace(/[^0-9]/ig, "")
    if ((aaaa) > 95) {
        xky.log("加群人数已达到要求")
        return
    }
    await xky.sleep(5000);
    await elementClick(xky, "com.tencent.mm:id/jy");
    await elementClick(xky, "聊天信息", 1);
    await xky.sleep(2000);
    await rollFindElement(xky, "添加成员", "xia", 3);
    await elementClick(xky, "添加成员");
    await xky.sleep(3000);
    await coordinatesClick(xky, "com.tencent.mm:id/ib", 0.97, 0.61);
    await xky.sleep(3000);
    let [classify, region] = args.addQunFenLei.split(",");
    await findElementIput(xky, "com.tencent.mm:id/b8a", `${classify}_${region}`);
    let pops = await xky.findUiObjects(`${classify}_${region}`, { regex: true, timeout: 3000 });
    if (pops.uiObjects != "") {
        await elementClick(xky, pops.uiObjects["0"].text);
        await xky.sleep(2000)
        for (let i = 1; i < pops.uiObjects.length; i++) {
            await xky.sleep(2000)
            await findElementIput(xky, "com.tencent.mm:id/b8a", `${classify}_${region}`);
            await xky.sleep(2000)
            await elementClick(xky, pops.uiObjects[i].text);
        }
        await elementClick(xky, "com.tencent.mm:id/jx");
        await elementClick(xky, "邀请", 3);
        await elementClick(xky, "邀请", 3);
        await elementClick(xky, "确定", 3);
    }
    //成功后删除图片
    await xky.delString(`/storage/emulated/0/Download/1.jpg`);
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//抢红包
async function redPacket(xky, args, xutil) {
    await elementClick(xky, "com.tencent.mm:id/d7b");
    let dashen = await getElementMassage(xky, args.qhbName, 5);
    if (dashen) {
        await elementClick(xky, args.qhbName);
        let hongbao = await elementClick(xky, "恭喜发财，大吉大利", 3);
        if (hongbao) {
            await elementClick(xky, "com.tencent.mm:id/cyf", 3);
            await elementClick(xky, "com.tencent.mm:id/cv0", 3);
            await elementClick(xky, "返回", 3);
        }
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    await xky.sleep(2000);
    if (args.isFaHongBao) {
        await faRedPacket(xky, args);
    }
}
//发红包
async function faRedPacket(xky, args) {
    await elementClick(xky, "我");
    await elementClick(xky, "支付");
    await xky.sleep(2000);
    let elmArr = await getElementMassage(xky, "com.tencent.mm:id/d1c");
    let klk = elmArr["0"].text.replace("¥", "");
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    if (klk >= 0.01) {
        await elementClick(xky, "com.tencent.mm:id/d7b");
        await elementClick(xky, args.qhbName);
        await elementClick(xky, "更多功能按钮，已折叠");
        await elementClick(xky, "红包");
        await findElementIput(xky, "com.tencent.mm:id/cvb", 0.01);
        await findElementIput(xky, "填写个数", 1);
        await elementClick(xky, "收起键盘", 2);
        await elementClick(xky, "塞钱进红包");
        await elementClick(xky, "立即支付", 2);
        await xky.sleep(3000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
        await xky.sleep(1000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.67);
        await xky.sleep(1000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.17, 0.77);
        await xky.sleep(1000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.16, 0.86);
        await xky.sleep(1000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.50, 0.86);
        await xky.sleep(1000);
        await coordinatesClick(xky, "android.widget.RelativeLayout", 0.51, 0.77);
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}
//检查加通讯录
async function examineAddTxl(xky, args, xutil, qqq) {
    let sss = await contactCheck(xky, xutil, qqq.data.data.id)
    if (sss.data.data == "") {
        return;
    }
    xky.log(sss)
    let mylength = sss.data.data.length;
    await elementClick(xky, "通讯录");
    await elementClick(xky, "com.tencent.mm:id/iq");
    for (let i = 0; i < mylength; i++) {
        if (sss.data.data[i].type && sss.data.data[i].city) {
            await findElementIput(xky, "com.tencent.mm:id/kh", `${sss.data.data[i].type}_${sss.data.data[i].city}_${sss.data.data[i].id}`);
            await xky.sleep(3000);
            let isAdd = await getElementMassage(xky, `${sss.data.data[i].type}_${sss.data.data[i].city}_${sss.data.data[i].id}`, 2);
            if (isAdd.length > 1) {
                let iss = await contactFinish(xky, xutil, qqq.data.data.id, 2, sss.data.data[i].number)//type:1取备注编号 2完成添加 3拉黑,number:获取的号码
                // await elementClick(xky, "com.tencent.mm:id/q0");
                // await coordinatesClick(xky, "com.tencent.mm:id/nu", 0.08, 0.22);
                // await elementClick(xky, "设置备注和标签");
                // await elementClick(xky, "com.tencent.mm:id/b4w");
                // await findElementIput(xky, "com.tencent.mm:id/b4v", "");
                // await elementClick(xky, "完成");
                // await findUseFunction(xky, "com.tencent.mm:id/ki", "返回");
            }
            await xky.sleep(1000);
        }
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}
//添加通讯录
async function AddTxlFriend(xky, args, xutil, qqq) {
    await examineAddTxl(xky, args, xutil, qqq);
    await elementClick(xky, "com.tencent.mm:id/d7b");
    await elementClick(xky, "更多功能按钮");
    await elementClick(xky, "添加朋友");
    await elementClick(xky, "微信号/QQ号/手机号");
    let addNum = args.addNums;
    let cishu = 0;
    while (1) {
        cishu++;
        if (cishu > 10) {
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
            return 2;
        }
        //获取号码
        let getTxlNum = await contactGet(xky, xutil, qqq.data.data.id)//微信ID
        await findElementIput(xky, "com.tencent.mm:id/kh", getTxlNum.data.data.number);
        await elementClick(xky, "com.tencent.mm:id/mf");
        let isTxl = await getElementMassage(xky, "添加到通讯录", 5);
        if (isTxl) {
            let sssq = await contactFinish(xky, xutil, qqq.data.data.id, 1, getTxlNum.data.data.number)//type:1取备注编号 2完成添加 3拉黑,number:获取的号码
            //xky.log(sssq.data.data.id)
            await elementClick(xky, "设置备注和标签");
            await findElementIput(xky, "com.tencent.mm:id/b4v", `${getTxlNum.data.data.type}_${getTxlNum.data.data.city}_${sssq.data.data.id}`);
            await elementClick(xky, "保存");
            await elementClick(xky, "添加到通讯录");
            await elementClick(xky, "发送", 5);
            addNum--;
            if (addNum < 1) {
                await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                return 1;
            }
        } else {
            await xky.sleep(2000);
            //不存在直接3拉黑
            // let sssq = await contactFinish(xky, xutil, qqq.data.data.id, 3, getTxlNum.data.data.number)//type:1取备注编号 2完成添加 3拉黑,number:获取的号码
            // xky.log(sssq)
        }
        await findUseFunction(xky, "com.tencent.mm:id/kh", "返回");
        await elementClick(xky, "微信号/QQ号/手机号", 1);
    }
}

//综合红点(1)
async function wxhdss(xky, xutil) {
    await elementClick(xky, "com.tencent.mm:id/d7b");
    //是否有家人群
    let jiaruqun = await getElementMassage(xky, "家人", 5);
    if (jiaruqun) {
        if (jiaruqun.length > 1) {
            for (let i = 1; i < jiaruqun.length; i++) {
                await elementClick(xky, "家人", 5);
                await elementClick(xky, "com.tencent.mm:id/jy", 5);
                await rollFindElement(xky, "删除并退出", "xia", 5);
                await xky.sleep(2000);
                await elementClick(xky, "删除并退出");
                await elementClick(xky, "离开群聊", 3);
                await elementClick(xky, "确定", 3);
                await xky.sleep(2000);
            }
        }
        await elementClick(xky, "家人");
        var jiarensjs = await sjs(1, 2);
        switch (jiarensjs) {
            case 1:
                //文字
                var msg1 = await getPyqMsg(xky, xutil);
                await findElementIput(xky, "android.widget.EditText", msg1.data.data.content.substring(0, 15));
                await elementClick(xky, "发送", 3);
                await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                break;
            case 2:
                //表情
                await elementClick(xky, "表情");
                await elementClick(xky, "系统表情");
                await xky.sleep(3 * 1000);
                await sjElementClick(xky, "com.tencent.mm:id/xs");
                await elementClick(xky, "发送", 3);
                await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                break;
        }
    }
    while (1) {
        let fris = await elementClick(xky, "com.tencent.mm:id/mv", 5);
        if (!fris) {
            break;
        }
        let news = await elementClick(xky, "com.tencent.mm:id/a7b", 3);
        if (news) {
            await xky.sleep(5 * 1000);
            await xky.wheel(0.5, 0.5, -6); //往下滚动-2个位置
            await xky.sleep(2 * 1000);
            await xky.wheel(0.5, 0.5, -6); //往下滚动-2个位置
            await xky.sleep(2 * 1000);
            await xky.wheel(0.5, 0.5, -6); //往下滚动-2个位置
            await xky.sleep(2 * 1000);
            await xky.wheel(0.5, 0.5, -6); //往下滚动-2个位置
            await xky.sleep(2 * 1000);
            await xky.wheel(0.5, 0.5, -6); //往下滚动-2个位置
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        }
        let friend = await elementClick(xky, "android.widget.EditText", 2);
        if (friend && !news) {
            var sjsa = await sjs(1, 2);
            switch (sjsa) {
                case 1:
                    //文字
                    var msg2 = await getPyqMsg(xky, xutil);
                    await findElementIput(xky, "android.widget.EditText", msg2.data.data.content.substring(0, 15));
                    await elementClick(xky, "发送", 3);
                    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                    break;
                case 2:
                    //表情
                    await elementClick(xky, "表情");
                    await elementClick(xky, "系统表情");
                    await xky.sleep(3 * 1000);
                    await sjElementClick(xky, "com.tencent.mm:id/xs");
                    await elementClick(xky, "发送", 3);
                    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
                    break;
            }
        }
        if (!friend && !news) {
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        }
        await xky.wheel(0.5, 0.5, -1); //往下滚动-2个位置
        await xky.sleep(2 * 1000);
    }
    //是否有人加我
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    await elementClick(xky, "通讯录");
    let Addme = await elementClick(xky, "com.tencent.mm:id/brf", 3);
    if (Addme) {
        await xky.sleep(3000);
        let ffd = 0;
        while (1) {
            if (ffd > 1) {
                break;
            }
            let Add = await elementClick(xky, "com.tencent.mm:id/brs", 1);
            if (!Add) {
                break;
            }
            await elementClick(xky, "完成", 3);
            await xky.sleep(3000);
            await findUseFunction(xky, "添加朋友", "返回");
            ffd++;
        }
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    }
}

//收藏(1)
async function collect(xky) {
    await elementClick(xky, "com.tencent.mm:id/d7b");
    await elementClick(xky, "腾讯新闻");
    await elementClick(xky, "com.tencent.mm:id/an_");
    await xky.sleep(3000);
    await xky.wheel(0.5, 0.5, -6);//往下滚动-2个位置
    await xky.sleep(3000);
    await xky.wheel(0.5, 0.5, -6);//往下滚动-2个位置
    await xky.sleep(3000);
    await xky.wheel(0.5, 0.5, -6);//往下滚动-2个位置
    await elementClick(xky, "更多");
    await elementClick(xky, "收藏");
    await elementClick(xky, "我知道了", 3);
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//关注公众号(2)
async function officialAccounts(xky, args, phone) {
    //
}

//删除公众号(2)
async function delAccounts(xky, args, phone) {
    //
}

//建群聊(2)
async function Jianqun(xky) {
    await elementClick(xky, "com.tencent.mm:id/d7b");
    let jiahanve = await elementClick(xky, "家人", 3);
    if (jiahanve) {
        xky.log("**家人群已存在,正在查看是否啦家人进群**");
        await xky.sleep(2000);
        let jiahanveob = await getElementMassage(xky, "com.tencent.mm:id/jw");
        let shangxian = 9;
        let nowpep = jiahanveob["0"].text.replace(/[^0-9]/ig, "");
        if (nowpep < shangxian) {
            xky.log(`现在有${nowpep}人,需要拉人`)
            await elementClick(xky, "com.tencent.mm:id/jy");
            await elementClick(xky, "添加成员");
            await xky.sleep(2000);
            let txzk = await getElementMassage(xky, "com.tencent.mm:id/zk");
            for (let i = 0; i < txzk.length; i++) {
                await elementClick(xky, "com.tencent.mm:id/zk", 1, i);
            }
            await xky.sleep(2000);
            await elementClick(xky, "com.tencent.mm:id/jq");
            await xky.sleep(3000);
            await elementClick(xky, "确定");
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        } else {
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
        }
    } else {
        await elementClick(xky, "通讯录");
        await elementClick(xky, "群聊");
        await elementClick(xky, "新群聊");

        let allPeople = await getElementMassage(xky, "com.tencent.mm:id/zk");
        if (allPeople.length > 2) {
            for (let i = 0; i < allPeople.length; i++) {
                await coordinatesClick(xky, "com.tencent.mm:id/zk", allPeople[i].x, allPeople[i].y);
            }
        } else {
            xky.log("***少于3人不能建群***")
            xky.log("***少于3人不能建群***")
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
            return;
        }
        await elementClick(xky, "com.tencent.mm:id/jq");
        let louser = await getElementMassage(xky, "发起群聊失败", 3);
        if (louser) {
            await elementClick(xky, "取消");
            await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
            return;
        }
        await elementClick(xky, "聊天信息");
        await elementClick(xky, "群聊名称");
        await findElementIput(xky, "android.widget.EditText", "家人");
        await elementClick(xky, "保存");
        await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
    }
}

//朋友圈(3)
async function friendCircle(xky, args, xutil) {
    //下载更新图片
    let sjPic = await sjs(1, 774);
    await xky.downloadFile(`friendPic/pyq (${sjPic}).jpg`, `/storage/emulated/0/Pictures/pyq (${sjPic}).jpg`);
    await xky.insertMedia(`/storage/emulated/0/Pictures/pyq (${sjPic}).jpg`);
    //创建消息
    let sarss = "";
    while (1) {
        let sarArr = await getPyqMsg(xky, xutil);
        if (sarArr.data.msg == "ok") {
            sarss = sarArr.data.data.content;
            break;
        }
        await xky.sleep(3000);
    }
    await elementClick(xky, "发现");
    await elementClick(xky, "朋友圈");
    await elementClick(xky, "拍照分享");
    await elementClick(xky, "从相册选择");
    await elementClick(xky, "我知道了", 2);
    await elementClick(xky, "com.tencent.mm:id/e2a");
    await elementClick(xky, "Pictures");
    await elementClick(xky, "com.tencent.mm:id/bot");
    await elementClick(xky, "com.tencent.mm:id/jx");
    //随机消息
    await findElementIput(xky, "这一刻的想法...", sarss);
    await elementClick(xky, "发表");
    //删除图片
    await xky.delString(`/storage/emulated/0/Pictures/pyq (${sjPic}).jpg`);
    //点赞留言
    await xky.sleep(2 * 1000);
    await zanAndSay(xky, xutil);
}

//留言和点赞(3)
async function zanAndSay(xky, xutil) {
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//看一看阅读(3)
async function lookRead(xky) {
    await elementClick(xky, "发现");
    await elementClick(xky, "看一看");
    await elementClick(xky, "知道了", 3);
    await elementClick(xky, "精选");
    await xky.sleep(3 * 1000);
    await xky.wheel(0.5, 0.5, -5);//往下滚动-2个位置
    await xky.sleep(2 * 1000);
    await xky.wheel(0.5, 0.5, -5);//往下滚动-2个位置
    await xky.sleep(2 * 1000);
    await sjXYClick(xky, "0.06|0.16", "0.84|0.90");
    await sjXYClick(xky, "0.06|0.16", "0.84|0.90");
    await sjXYClick(xky, "0.06|0.16", "0.84|0.90");
    await xky.sleep(3 * 1000);
    let sjs = await sjs(6, 10);
    for (let i = 0; i < sjs; i++) {
        await xky.sleep(1000);
        await xky.wheel(0.5, 0.5, -3);//往下滚动-2个位置
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//搜一搜搜索(3)
async function SearchHotspot(xky) {
    await elementClick(xky, "发现");
    await elementClick(xky, "搜一搜");
    let searchArr = ["", "美女", "化妆品", "衣服", "搭配", "鞋子", "外套", "明星", "读书", "潮男", "吃货"];
    let sjs = await sjs(1, searchArr.length - 1);
    await elementClick(xky, "允许", 3);
    await findElementIput(xky, "android.widget.TextView", searchArr[sjs]);
    let keyboard = await getElementMassage(xky, "com.android.inputmethod.latin:id/keyboard_view", 2);
    if (!keyboard) {
        await xky.showInputMethod();
        await elementClick(xky, "英语(美国)");
    }
    await coordinatesClick(xky, "com.android.inputmethod.latin:id/keyboard_view", 0.92, 0.95);
    await getElementMassage(xky, "android.widget.ListView");
    let searchNo = ["", "公众号", "小程序", "文章", "音乐", "视频"];
    let sjsNo = await sjs(1, 5);
    await elementClick(xky, searchNo[sjsNo], 1);
    await xky.sleep(3000);
    await xky.wheel(0.5, 0.5, -5)
    await xky.sleep(2000);
    await xky.wheel(0.5, 0.5, -5)
    await xky.sleep(5000);
    while (1) {
        await xky.sleep(2000);
        await sjXYClick(xky, "0.03|0.03", "0.96|0.98");
        await xky.sleep(2000);
        await sjXYClick(xky, "0.03|0.03", "0.96|0.98");
        let comeIn = await getElementMassage(xky, "com.tencent.mm:id/jy", 3);
        let comeIn2 = await getElementMassage(xky, "android.widget.ImageButton", 1);
        if (comeIn || comeIn2) {
            break;
        }
    }
    await xky.sleep(5000);
    await xky.wheel(0.5, 0.5, -6)
    await xky.sleep(3000);
    await xky.wheel(0.5, 0.5, -6)
    await xky.sleep(3000);
    while (1) {
        await xky.pressKey(4); //按下返回键
        await xky.sleep(2 * 1000);
        await elementClick(xky, "关闭", 1);
        await elementClick(xky, "返回", 1);
        let sss = await getElementMassage(xky, "com.tencent.mm:id/d7b", 1);
        if (sss) {
            break;
        }
    }
}

//换头像(4)
async function exchangeHeaderPic(xky) {
    //下载更新图片
    let sjPic = await sjs(1, 1620);
    await xky.downloadFile(`herdpics/touxiang (${sjPic}).jpg`, `/storage/emulated/0/headpics/pyq (${sjPic}).jpg`);
    await xky.insertMedia(`/storage/emulated/0/headpics/pyq (${sjPic}).jpg`);
    await elementClick(xky, "我");
    await elementClick(xky, "com.tencent.mm:id/py");
    await elementClick(xky, "头像");
    await elementClick(xky, "所有图片");
    await elementClick(xky, "headpics");
    await elementClick(xky, "com.tencent.mm:id/dkb");
    await elementClick(xky, "使用");
    //删除图片
    await xky.delString(`/storage/emulated/0/headpics/pyq (${sjPic}).jpg`);
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//个性签名(4)
async function autograph(xky, xutil) {
    await elementClick(xky, "我");
    await elementClick(xky, "com.tencent.mm:id/py");
    await elementClick(xky, "更多");
    await elementClick(xky, "个性签名");

    let psArr = "";
    while (1) {
        let sarArr = await getPyqMsg(xky, xutil);
        if (sarArr.data.msg == "ok") {
            psArr = sarArr.data.data.content.substring(0, 29);
            break;
        }
        await xky.sleep(3000);
    }
    await findElementIput(xky, "com.tencent.mm:id/lk", psArr);
    await elementClick(xky, "保存", 1);
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//下载表情（4）
async function LowerExpression(xky) {
    await elementClick(xky, "我");
    await elementClick(xky, "表情");
    await elementClick(xky, "更多表情");
    await xky.sleep(2 * 1000);
    let sjweizhi = await sjs(1, 5);
    for (let i = 0; i < sjweizhi; i++) {
        await xky.wheel(0.5, 0.5, -5);//往下滚动-2个位置
        await xky.sleep(2 * 1000);
    }
    await sjElementClick(xky, "com.tencent.mm:id/bdc");
    await elementClick(xky, "添加");
    await getElementMassage(xky, "发表情");
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//随机朋友圈可见时间(4)
async function friendLookTome(xky) {
    await elementClick(xky, "我");
    await elementClick(xky, "设置");
    await elementClick(xky, "隐私");
    //总选项
    let allTimeArr = ["最近半年", "最近三天", "全部"]
    let nowSetArr = await getElementMassage(xky, "android:id/summary");
    //剩余选项
    let aa = [];
    for (let i = 0; i < allTimeArr.length; i++) {
        if (allTimeArr[i] != nowSetArr[1].text) {
            aa.push(allTimeArr[i])
        }
    }
    await elementClick(xky, "允许朋友查看朋友圈的范围");
    let sjs = await sjs(0, 1);
    if (sjs) {
        await elementClick(xky, aa[sjs]);
    } else {
        await elementClick(xky, aa[0]);
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//关闭/开启手机加好友(4)
async function closePhoneAddFriend(xky, closeOrOpen) {
    await elementClick(xky, "我");
    await elementClick(xky, "设置");
    await elementClick(xky, "隐私");
    await elementClick(xky, "添加我的方式");
    let phonePosition = await getElementMassage(xky, "com.tencent.mm:id/j7");
    switch (closeOrOpen) {
        case "close":
            if (phonePosition[1].contentDesc == "已开启") {
                await elementClick(xky, "com.tencent.mm:id/j7", 1, 1);
            } else {
                await xky.toast('该功能已经关闭');
                xky.log('该功能已经关闭');
            }
            break;
        case "open":
            if (phonePosition[1].contentDesc == "已关闭") {
                await elementClick(xky, "com.tencent.mm:id/j7", 1, 1);
            } else {
                await xky.toast('该功能已经开启');
                xky.log('该功能已经开启');
            }
            break;
    }
    await findUseFunction(xky, "com.tencent.mm:id/d7b", "返回");
}

//关注小程序(5)
async function miniProgram(xky, args, xutil) {
    //
}

//绑定APP(5)
async function wechatLogin(xky, args, xutil) {
    //
}

//2019/03/25
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

//设置触动精灵代理  >>1开启,2关闭,3设置地区,4设置账号
//await setChuDong(xky, args, xutil, 1, "绵阳");

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

//重置库活跃
//let qqq = await resetDepot(xky,xutil,depot);
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

//设置触动精灵代理
async function setChuDong(xky, args, xutil, stats, loc) {
    var locitionNum = {
        "上海": 1, "北京": 2, "天津": 16, "重庆": 10, "苏州": 17, "南京": 20, "无锡": 21, "南通": 31, "徐州": 40, "常州": 41,
        "连云港": 81, "淮安": 82, "盐城": 83, "扬州": 84, "镇江": 85, "泰州": 86, "宿迁": 87, "杭州": 12, "宁波": 23, "温州": 42,
        "绍兴": 43, "嘉兴": 88, "湖州": 89, "金华": 90, "衢州": 91, "舟山": 92, "台州": 93, "丽水": 94, "青岛": 11, "烟台": 27,
        "济南": 28, "潍坊": 39, "济宁": 45, "淄博": 46, "枣庄": 113, "东营": 114, "泰安": 115, "威海": 116, "日照": 117,
        "临沂": 118, "德州": 119, "聊城": 120, "滨州": 121, "菏泽": 122, "厦门": 13, "泉州": 30, "福州": 36, "莆田": 102,
        "三明": 103, "漳州": 104, "南平": 105, "龙岩": 106, "宁德": 107, "唐山": 32, "石家庄": 38, "秦皇岛": 48, "邯郸": 49,
        "邢台": 50, "保定": 51, "张家口": 52, "承德": 53, "沧州": 54, "廊坊": 55, "衡水": 56, "深圳": 9, "广州": 15, "佛山": 22,
        "东莞": 29, "韶关": 152, "珠海": 153, "汕头": 154, "江门": 155, "湛江": 156, "茂名": 157, "肇庆": 158, "惠州": 159,
        "梅州": 160, "汕尾": 161, "河源": 162, "阳江": 163, "清远": 164, "中山": 165, "潮州": 166, "揭阳": 167, "云浮": 168,
        "武汉": 18, "黄石": 134, "十堰": 135, "宜昌": 136, "孝感": 137, "荆州": 138, "黄冈": 139, "成都": 19, "泸州": 178,
        "德阳": 179, "绵阳": 180, "乐山": 181, "南充": 182, "眉山": 183, "宜宾": 184, "大连": 24, "沈阳": 26, "鞍山": 72,
        "抚顺": 73, "锦州": 74, "盘锦": 75, "郑州": 25, "开封": 123, "洛阳": 124, "平顶山": 125, "安阳": 126, "新乡": 127,
        "焦作": 128, "许昌": 129, "南阳": 130, "商丘": 131, "信阳": 132, "周口": 133, "西安": 33, "宝鸡": 199, "咸阳": 200,
        "渭南": 201, "安康": 202, "哈尔滨": 34, "大庆": 47, "齐齐哈尔": 79, "牡丹江": 80, "合肥": 35, "芜湖": 95, "蚌埠": 96,
        "马鞍山": 97, "淮北": 98, "安庆": 99, "滁州": 100, "六安": 101, "长春": 37, "吉林": 76, "四平": 77, "延边": 78,
        "鄂尔多斯": 44, "呼和浩特": 65, "包头": 66, "赤峰": 67, "通辽": 68, "呼伦贝尔": 69, "巴彦淖尔": 70, "乌兰察布": 71,
        "太原": 57, "大同": 58, "阳泉": 59, "长治": 60, "晋中": 61, "运城": 62, "忻州": 63, "临汾": 64, "南昌": 108, "赣州": 109,
        "吉安": 110, "抚州": 111, "上饶": 112, "长沙": 140, "株洲": 141, "湘潭": 142, "衡阳": 143, "邵阳": 144, "岳阳": 145, "常德": 146,
        "张家界": 147, "益阳": 148, "郴州": 149, "怀化": 150, "娄底": 151, "南宁": 169, "柳州": 170, "桂林": 171, "梧州": 172, "北海": 173,
        "贵港": 174, "玉林": 175, "百色": 176, "海口": 177, "贵阳": 185, "遵义": 186, "黔东南": 187, "昆明": 188, "曲靖": 189, "玉溪": 190,
        "保山": 191, "临沧": 192, "楚雄": 193, "红河": 194, "文山": 195, "西双版纳": 196, "大理": 197, "德宏": 198, "兰州": 203,
        "西宁": 204, "乌鲁木齐": 205, "昌吉": 206, "巴音郭楞": 207, "伊犁": 208
    }
    let [usesIp, ewmArr] = ["", ""];
    var ewmArr1 = await getElementMassage(xky, "start.lua", 3);
    if (!ewmArr1) {
        while (1) {
            await xky.restartApp('com.touchsprite.android');
            await elementClick(xky, "重新打开应用", 3);
            await elementClick(xky, "知道了", 3);
            var closeAPP = await elementClick(xky, "关闭应用", 3);
            if (closeAPP) {
                await xky.restartApp('com.touchsprite.android');
                await elementClick(xky, "重新打开应用", 3);
            }
            var kkk = await elementClick(xky, "忽略此版本", 3);
            if (kkk) {
                await elementClick(xky, "com.touchsprite.android:id/iv_experience");
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
                await elementClick(xky, "我的账号");
                await rollFindElement(xky, "自动检测更新", "xia", 5);
                await elementClick(xky, "自动检测更新");
                await elementClick(xky, "com.touchsprite.android:id/more_sb_service_switch");
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
                await elementClick(xky, "我的脚本");
            }
            var ewmArrqqq = await getElementMassage(xky, "start.lua", 3);
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
                var ipwherre = await ipWhere(xky, xutil, ffff["0"].text.split("IP: ")[1], 1);
                xky.log(`${ffff["0"].text}的地区为:${ipwherre.data.data.city}`);
                var bb = ipwherre.data.data.city.indexOf(loc)
                if (bb >= 0) {
                    usesIp = ffff["0"].text.split("IP: ")[1];
                    break;
                } else {
                    var iploser = ffff["0"].text.indexOf("string")
                    if (iploser >= 0) {
                        await elementClick(xky, "确定", 2);
                    }
                }
            }
            await elementClick(xky, "确定", 2);
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
            var jpyn = await getElementMassage(xky, "com.android.inputmethod.latin:id/keyboard_view", 3);
            if (jpyn) {
                await xky.showInputMethod();
                await elementClick(xky, "X输入法");
            }
            await xky.sleep(2000);
            await xky.mousedown(0.60, 0.57);
            await xky.sleep(2000);
            await xky.setClipboardText(locitionNum[loc]);
            await xky.paste();
            var ccc = await elementClick(xky, "保存", 2);
            if (!ccc) {
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
            }
            break;
        case 4:
            await xky.mousedown(ewmArr["0"].x, ewmArr["0"].y);
            await elementClick(xky, "编辑");
            var jpyn2 = await getElementMassage(xky, "com.android.inputmethod.latin:id/keyboard_view", 3);
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
            var www = await elementClick(xky, "保存", 3);
            if (!www) {
                await elementClick(xky, "com.touchsprite.android:id/title_bar_tv_left");
            }
            break;
    }
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

//重置库活跃
async function resetDepot(xky, xutil, depot) {
    let oldData = {
        depot: depot,
        time: parseInt(new Date().getTime() / 1000)
    }
    let sss = await encryptionSort(xutil, oldData)
    await xky.sleep(2 * 1000)
    return await xutil.http.get(`${sss.url}/data/depot_reset?depot=${sss.data.depot}&token=${sss.data.token}&time=${sss.data.time}`)
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
            let a = await xky.adbShell(`curl ftp://192.168.8.176/data/${AppUsesName}/ -u "admin:123456" -T ${back.path}`);
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
        await xky.adbShell(`curl ftp://192.168.8.176/data/${AppUsesName}/${backupname}.tar -u "admin:123456" -o /sdcard/xbak/${backupname}.tar`);
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