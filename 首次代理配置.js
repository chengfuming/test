//安装代理模块（每台机器只要执行一次）：注意文件地址需改
// let qqq = await xky.adbCommand('shell mkdir /data/redsocks');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell chmod -R 777 /data/redsocks');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell curl -o /data/redsocks/redsocks http://119.23.32.104:91/file/redsocks');
// xky.log(qqq);
// qqq - await xky.adbCommand('shell curl -o /data/redsocks/redsocks.conf http://119.23.32.104:91/file/redsocks.conf');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell curl -o /data/redsocks/redsocks.sh http://119.23.32.104:91/file/redsocks.sh');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell curl -o /data/redsocks/busybox http://119.23.32.104:91/file/busybox');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell curl -o /data/redsocks/redsocks.conf.bak http://119.23.32.104:91/file/redsocks.conf.bak');
// xky.log(qqq);
// qqq = await xky.adbCommand('shell chmod -R 777 /data/redsocks');
// xky.log(qqq);
//开启代理 填socks5 代理地址
//let qqq = await xky.adbCommand('shell sh /data/redsocks/redsocks.sh start 175.154.203.80 4261');
//xky.log(qqq);

//关闭代理
//let qqq = await xky.adbCommand('shell sh /data/redsocks/redsocks.sh stop');
// xky.log(qqq);

//强制清理代理配置
//let qqq = await xky.adbCommand('shell killall -9 redsocks');
//xky.log(qqq);
//qqq = await xky.adbCommand('shell iptables -t nat -F OUTPUT');
//xky.log(qqq);