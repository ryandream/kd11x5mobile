import Vue from 'vue';
import VueResource from 'vue-resource';
import kdLoading from '../common/Loading';

Vue.use(VueResource);

let HTTP = Vue.http,
    jsonData = JSON.stringify;

HTTP.options.emulateJSON = true;
HTTP.options.emulateHTTP = true;
HTTP.options.root = '/api';
HTTP.interceptors.push((request, next) => {
    if(request.url.indexOf('?noloading') > -1){
        next(response => {
            return response;
        });
    }else{
        kdLoading.showedLoading = true;
        
        next(response => {
            kdLoading.showedLoading = false;
            return response;
        });
    }
});

/*-------------------- 响应格式 --------------------*/
/*
* S: 状态代码
* D: 响应数据内容，这里可能是JSON数组，也可能是单一项目
* 公用响应代码：
    88 表示网站关闭时显示的文本
    77 不允许游客访问
    44 黑名单列表的IP拒绝访问

    222 要求用户必须登录
    333 要求使用POST请求
    444 用户已经是登录状态，要登录须先退出登录
    115 用户名或密码无效
    116 用户名无效
    119 密码无效
    171 超出账户一天无效登录次数
    172 超出单IP尝试次数
    173 超出单IP尝试账户数
    117 账户已停用
    118 用户名无效，用户名不可以使用单引号
    120 登录成功
    141 手机号码无效
    142 系统关闭注册
    143 系统保留用户名，不允许注册
    144 N分钟内拒绝注册多个账户
    145 单IP最多允许注册N个账户
    146 用户名已经存在，拒绝注册
    147 手机号码已经存在，拒绝注册
    148 真实姓名无效，拒绝注册
    151 单IP最多只能试玩N次
    152 试玩账号创建成功
    181 验证码无效
    201 验证码无效
    202 验证码无效
    182 第一步操作完成，请继续
    183 账户未设置EMAIL信息
    184 登录密码已发送至邮箱
    185 请求方式不正确
    186 账户未设置问答信息
    187 安全问答错误
    188 新密码格式无效
    189 新密码设置成功
    190 安全回答正确，请设置新密码
    191 注册成功
    666 QQ号码无效
    667 微信号码无效
*/

/*-------------------- 网站信息 --------------------*/
/*
* 系统日期接口
* 状态： 可用
* 地址： /api/index/get_system_date.html
* 提交参数 NULL
* 响应内容 TEXT: 2017-02-02 14:12:59 (单一的一个系统日期，非JSON)
*/
export const apiFetchSystemTime = function(noloading, vm){
    return HTTP.post('index/get_system_date.html' + (noloading ? '?noloading' : '')).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
};
/*
* 网站信息获取接口
* 状态： 可用
* 地址： /api/index/get_website_info.html
* 提交参数 NULL
* 响应内容 JSON: {
    'name': 'NB网投',
    'qt_domain': 'http://www.g1.lo',
    'contact_info': '联系信息联系信息',
    'copyright_info': '系统底部版权信息',
    'tech_info': '底部技术支持信息'
}
* 响应代码：
*/
export const apiFetchSiteInfo = function(vm){
    return HTTP.post('index/get_website_info.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*-------------------- 会员相关 --------------------*/
/*
* 验证码
* 状态： 可用
* 地址： /api/index/secure_code_img.html
*/
/*
* 用户登录接口
* 状态： 可用
* 地址： /api/user/post_user_login.html
* 提交表单数据： {
    "user_name": 登录用户名,
    "password": 登录密码
    "captcha": 验证码
}
* 备注：
* 登录用户名允许纯数字、手机号码、标准英文数字用户名，长度1-20不含空格。
* 登录密码6-20个任意字符（禁用空格）。
* 登录成功后，马上调用接口【/api/user/get_user_info.html】，如下：
*/
export const apiLogin = function(data, vm){
    return HTTP.post('user/post_user_login.html', {
        user_name: data.userName,
        password: data.password,
        captcha: data.secureCode
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获取用户信息接口
* 状态： 可用
* 地址： /api/user/get_user_info.html
* 提交参数： 无
* 响应内容： {
    'USER_ID': 18,  //用户ID
    'USER_NAME': 'test002', //用户名
    'LOGIN_DATE': '2017-04-02 15:45:51', //登录日期
    'ACTIVE_IP': '192.168.1.104', //用户活动IP
    'SECURE_STRING': '4zYkDE40tPZt9ihP85mj1ElwydzWop9D',  //安全码
    'LAST_BET_DATE': '2017-04-02 15:45:51', //最近一次投注
    'LAST_ACTION_DATE': '2017-04-02 15:45:51', //最近一次活动时间
    'BALANCE': 797000, //用户余额
    'FROZEN': 0,  //冻结金额
    'COIN': 0   //积分
}
*/
export const apiFetchUserInfo = function(vm){
    return HTTP.post('user/get_user_info.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 用户退出登录接口
* 状态： 可用
* 地址： /api/user/post_user_logout.html
* 提交参数： 无
* 响应代码：
    190 退出成功
    191 程序异常
*/
export const apiLogout = function(vm){
    return HTTP.post('user/post_user_logout.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 推荐人写入接口
* 状态： 可用
* 地址： /api/user/post_recommand.html
* 提交参数： {
    "recommand_user_id": 推荐人ID
}
* 响应代码：
    180 写入推荐人ID成功
    181 推荐人ID无效
* 备注： 如果浏览器地址栏有获取到推荐人参数值，一次即可，注册页面先调用本接口，再进行用户注册流程
*/
export const apiSaveIntroducer = function(data, vm){
    return HTTP.post('user/post_recommand.html', {
        recommand_user_id: data.introducerId
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 用户注册接口
* 状态： 可用
* 地址： /api/user/post_user_reg.html
* 提交表单数据： {
    "user_name": 用户名1-20长度[a-zA-Z0-9_]*$,
    "password": 6-20长度不含空格,
    "mobile": 手机
    "weixin":"微信号，6-20个字母、数字、下划线和减号";
    "qq": "QQ号码,5-20个数字";
    "captcha": 验证码
}
* 备注： 用户注册成功后到用户信息获取接口获取一次用户的ID等信息资料。
*/
export const apiRegister = function(data, vm){
    return HTTP.post('user/post_user_reg.html', {
        user_name: data.userName,
        password: data.password,
        mobile: data.mobile,
        weixin: data.weixin,
        qq: data.qq,
        captcha: data.secureCode
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获取用户安全资料接口
* 状态： 可用
* 地址： /api/usersafe/get_user_infodetail.html
* 提交参数： 无
* 响应JSON数据： {
    "USER_ID":9,  // 用户id
    "Bank_Account_Number":"123234354534534535",  // 银行卡卡号
    "RealName":"上逛逛的",  // 实名
    "Mobile_Number":"13456785678" //手机号码
    "Safe_Level":"100%" 
}
* 响应代码：
    756 未找到用户信息
*/
export const apiFetchUserDetail = function(vm){
    return HTTP.post('usersafe/get_user_infodetail.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 登录密码修改接口
* 状态： 可用
* 地址： /api/usersafe/post_user_pin.html
* 提交表单数据： {
    'oldpassword': '',  //原登录密码
    'password': ''    //新登录密码 
}
* 响应代码：
    763 原密码未填写
    764 原密码格式无效
    765 新密码格式无效
    766 原密码不正确
    767 修改密码出错
    768 修改密码成功
    769 新密码未填写
*/
export const apiChangePassword = function(data, vm){
    return HTTP.post('usersafe/post_user_pin.html', {
        oldpassword: data.oldPassword,
        password: data.password
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};  
/*
* 实名认证接口
* 状态： 可用
* 地址： /api/usersafe/post_user_name.html
* 提交表单数据： {
    'name': '',   //名字 2-4 位中文
    'password': ''    //登录密码 
}
* 响应代码：
    801 登录密码未填写
    802 名字未填写
    803 登录密码不正确
    804 已经实名认证
    805 实名认证成功
    806 名字无效
*/
export const apiAuthenticateRealName = function(data, vm){
    return HTTP.post('usersafe/post_user_name.html', {
        name: data.realName,
        password: data.password
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 银行卡绑定接口
* 状态： 可用
* 地址： /api/usersafe/post_user_bankinfo.html
* 提交表单数据： {
    'Number': '',   //银行卡号 16-19位数字不包括空格
    'Detail': ''     //开户银行 不超过50个汉字
}
* 备注： 绑定后就暂时无法修改
* 响应代码部分：
    776 银行卡号无效
    777 开户银行无效
    779 修改银行卡信息出错
    780 修改银行卡信息成功
    804 银行卡已经绑定
*/
export const apiBindBankCard = function(data, vm){
    return HTTP.post('usersafe/post_user_bankinfo.html', {
        Number: data.bankCardNo,
        Detail: data.bankDetail
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 手机号码绑定
* 状态： 可用
* 地址： /api/usersafe/post_user_moblile.html
* 提交表单数据：{
   'moblile': '',   //手机号码
}
* 备注： 绑定后就暂时无法修改
* 响应代码：
    805 手机号码无效
    806 手机号码已经绑定
    807 手机绑定成功
*/
export const apiBindMobile = function(data, vm){
    return HTTP.post('usersafe/post_user_moblile.html', {
        mobile: data.mobile
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 充值-订单创建接口
* 状态： 可用
* 地址： /api/usercenter/create_payment_order.html
* 提交JSON数据： {
    "payment_amount": 支付金额,
    "payment_type": 支付类型 //WY\CZK\WX\ZFB 对应 网银\充值卡\微信\支付宝
}
* 响应JSON数据： {
    "ORDER_NO": 订单号,
    "PAY_URL": 支付地址
    "BACK_URL": 回调地址
}
* 响应代码：
    200 成功
    121 参数payment_type值类型错误
    122 充值金额范围无效
    123 充值金额范围无效
*/
export const apiCreateOrderOfMoneyIn = function(data, vm){
    return HTTP.post('usercenter/create_payment_order.html', {
        payment_type: data.method,
        payment_amount: data.amount
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 提现底部文字接口
* 状态： 可用
* 地址： /api/usercenter/get_cash_text.html
* 响应JSON数据： {
    "s": 320,
    "d": 这里响应提现底部文本内容。
}
*/
export const apiFetchCaptionOfMoneyOut = function(vm){
    return HTTP.post('usercenter/get_cash_text.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 提现接口
* 状态： 可用
* 地址： /api/usercenter/get_cash.html
* 提交表单数据： {
    "amount ": 提现金额,
    "confirm":确认接收扣除手续费提现，非确认和第一次均提交空字符串，确认提交一个数字1即可。
}
* 响应JSON数据： {
    "s": 业务代码,
    "d": 文本描述
}
* 响应代码：
    301 提现功能关闭
    302 提现时间为当日10时至次日凌晨2时
    304 提现金额应在X 至 X之间
    305 提现金额必须是X的整数倍
    306 您的打码量还未达到免手续费标准，只需要再打码800就可以提现啦。如要强行提现，我们公司将收取 35% 的行政手续费。
    307 您今天已经提现X次，如今天还需继续提现，我们公司将收取 X% 的行政手续费
    308 账户余额不足
    309 未绑定出款银行账户
    310 提现成功
    311 系统异常，详见异常信息
    4980 提现配置无效
*/
export const apiCreateOrderOfMoneyOut = function(data, vm){
    return HTTP.post('usercenter/get_cash.html', {
        amount: data.amount,
        confirm: data.agreePayFee
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 账户明细
* 状态： 可用
* 地址： /api/usercenter/user_history_logs_page.html
* 提交表单数据： {
    " page ": 1,    //页码，提交空字符串时默认为1
    " num ": 15,     //每页记录数，提交空字符串时默认为15
    " start ": '2017-02-21',     //起始时间，不填默认为当前日期前一月
    " end ": '2017-02-22',   //截止时间，不填默认为当前日期
}
* 响应JSON数据： {
    'list': [
        {
            'createDate': '2017-03-27 16 28 44', //交易时间
            'id': 11, //
            'money': 1, //充值金额
            'Balance': 50000, //交易流水
            'Type': 1 //1手工充值、2充值卡充值、3在线支付 4其他
        },
        {
            'createDate': '2017-03-27 16 21 54',
            'id': 8,
            'money': 1,
            'Balance:'0,
            'Type:'1
        },
        {
            'createDate': '2017-03-27 15 48 05',
            'id': 2,
            'money': 1,
            'Balance': 0,
            'Type': 1
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
* 响应代码部分：
    798 起始时间无效
    799 截止时间无效
*/
export const apiFetchBalanceSheet = function(data, vm){
    return HTTP.post('usercenter/user_history_logs_page.html', {
        page: data.currentPage, //页码，提交空字符串时默认为1
        num: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        start: data.startDate, //起始时间，不填默认为当前日期前一月
        end: data.endDate //截止时间，不填默认为当前日期
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 充值记录
* 状态： 可用
* 地址： /api/usersafe/recharge_page.html
* 提交JSON数据： {
    "P": 1, //页码，提交空字符串时默认为1
    "N": 15, //每页记录数，提交空字符串时默认为15
    "S": '2017-02-21', //起始时间，不填默认为当前日期前一月
    "E": '2017-02-22', //截止时间，不填默认为当前日期
}
* 响应JSON数据： {
    'list': [
        {
            'createDate': '2017-03-27 16 28 44', //交易时间
            'id': 11, //
            'money': 1, //充值金额
            'Balance': 50000, //交易流水
            'Type': 1 //1手工充值、2充值卡充值、3在线支付 4其他
        },
        {
            'createDate': '2017-03-27 16 21 54',
            'id': 8,
            'money': 1,
            'Balance:'0,
            'Type:'1
        },
        {
            'createDate': '2017-03-27 15 48 05',
            'id': 2,
            'money': 1,
            'Balance': 0,
            'Type': 1
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
响应代码部分：
    798 起始时间无效
    799 截止时间无效
*/
export const apiFetchRecoredOfMoneyIn = function(data, vm){
    return HTTP.post('usersafe/recharge_page.html', {
        P: data.currentPage, //页码，提交空字符串时默认为1
        N: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        S: data.startDate, //起始时间，不填默认为当前日期前一月
        E: data.endDate //截止时间，不填默认为当前日期
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 提款记录
* 状态： 可用
* 地址： /api/usercenter/withdrawals_record_page.html
* 提交表单数据： {
    " page ": 1,    //页码，提交空字符串时默认为1
    " num ": 15,     //每页记录数，提交空字符串时默认为15
    " start ": '2017-02-21',     //起始时间，不填默认为当前日期前一月
    " end ": '2017-02-22',   //截止时间，不填默认为当前日期
    "status ": 1,   // 方案状态  为空为全部状态  '未处理0、已处理1、已撤销2
}
* 响应JSON数据： {
    'list': [
        {
            'createDate': '2017-03-20 20 39 10', //交易时间
            'id': 1, //id
            'realAmount': 2, //提现金额
            'Balance': 0, // 提现后帐户金额
            'status': 1, // '未处理0、已处理1、已撤销2
            'comment': null // 备注
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
* 响应代码部分：
    798 起始时间无效
    799 截止时间无效
    802 处理状态无效
*/
export const apiFetchRecoredOfMoneyOut = function(data, vm){
    return HTTP.post('usercenter/withdrawals_record_page.html', {
        page: data.currentPage, //页码，提交空字符串时默认为1
        num: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        start: data.startDate,//起始时间，不填默认为当前日期前一月
        end: data.endDate, //截止时间，不填默认为当前日期
        status: data.status, //方案状态  为空为全部状态  '未处理0、已处理1、已撤销2
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获取公司入款设置
* 地址： /api/usercenter/company_payment.html
* 提交JSON数据 空
* 响应JSON数据： {
    "bank":"转账，就是账户和账户之间传输~你带着你的存折，或者卡去~转账只需要目标账号和你的密码就可以~注意跨行转账的话要避开休息时间，因为跨行系统不开。<\/p><p>如果是现金存到别人的账户上，要待钱，身份证，和目", // 银行转账
    "weixin":"微信二维码", //微信二维码
    "alipay":"支付宝二维码" // 支付宝二维码
}
* 响应代码部分：
    801 尚未设置公司入账信息
*/
export const apiFetchMoneyInConfigsOfCompany = function(vm){
    return HTTP.post('usercenter/company_payment.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 提交公司入款申请接口
* 地址： /api/usercenter/company_payment_do.html
* 提交表单数据： {
    "amount ": 1000,    // 金额
    "content": "转账账号:微信1235500",    // 转账信息
}
* 响应代码部分：
    825 转账信息无效
    822 转账金额范围无效
    823 转账信息超过50个字
    824 公司入款申请成功
*/
export const apiApplyMoneyInByCompany = function(data, vm){
    return HTTP.post('usercenter/company_payment_do.html', {
        amount: data.amount,
        content: data.infoOfAccount
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*-------------------- 文章相关 --------------------*/
/*
* 公告列表接口
* 状态： 可用
* 地址： /api/index/get_notice.html
* 提交参数： 无
* 响应数据： [
    {
        'Id': 2,    //信息ID
        'Title': '11选5彩票网5周年庆祝优惠活动',    //公告标题
        'Date': '2017-03-22' //日期
    },
    {
        'Id': 4,
        'Title': '测试',
        'Date': '2017-03-25'
    }
]
* 响应代码：
    750 没有公告
* 备注： 查看公告详情调用[/api/index/get_infosdetail.html](详细说明见4-(1). 根据信息ID获取信息详情接口)。
*/
export const apiFetchNoticeList = function(vm){
    return HTTP.post('index/get_notice.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 技巧攻略接口
* 状态： 可用
* 地址： /api/index/get_skills.html
* 提交参数： 无
* 多个响应数据： [
    {
        'Id': 3,
        'Title': '投注技巧',
        'Date': '2017-03-22'
    }
]
* 响应代码： 
    750 没有公告
* 备注： 查看公告详情调用[/api/index/get_infosdetail.html](详细说明见4-(1). 根据信息ID获取信息详情接口)。
*/
export const apiFetchRankingList = function(vm){
    return HTTP.post('index/get_skills.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 根据信息ID获取信息详情接口
* 状态： 可用
* 地址： /api/index/get_infosdetail.html
* 提交表单数据： {
    "i": XXXX//信息ID
}
* 响应JSON数据： {
    'Title': '日代理月赚100万不是梦',  //信息标题
    'Content': '啊哦额啊哦额啊哦额啊哦额啊哦额啊哦额啊哦额啊哦额啊哦额',     //信息内容
    'Add_Date': '2017-01-15 13:55:29' //添加时间
}
* 响应代码：
    753 信息ID错误
    754 未找到该ID信息
*/
export const apiFetchInfoDetail = function(id, vm){
    return HTTP.post('index/get_infosdetail.html', {
        i: id
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 首页广告列表接口
* 状态： 可用
* 地址： /api/index/get_advertisement.html
* 提交参数： 无
* 响应数据： [
    {
        'Link_URL': 'http://www.g1.lo', //广告链接UR
        'File_Path': 'http://www.g1.lo/d/2017/03/58db63bde0ce0.jpg'//图片路径
    },
    {
        'Link_URL': 'http://www.g1.lo',
        'File_Path': 'http://www.g1.lo/d/2017/03/58db63f7a7ad0.jpg'
    }
]
* 响应代码：
    751 没有广告
*/
export const apiFetchAdvertisement = function(vm){
    return HTTP.post('index/get_advertisement.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 首页中奖数据
* 状态： 可用
* 地址： /api/index/get_win_list.html
* 响应JSON数据： [
    {
        'user_name': 'ash***', //会员名字
        'amount': 27.89//金额
    },
    {
        'user_name': 'ghi***',
        'amount': 15.88
    }
]
*/
export const apiFetchWinList = function(vm){
    return HTTP.post('index/get_win_list.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 首页会员提现数据
* 状态： 可用
* 地址： /api/index/get_withdraw_list.html
* 响应JSON数据： [
    {
        'user_name': 'test2', //会员名字
        'amount': 2 //金额
    },
    {
        'user_name': 'test2',
        'amount': 101
    }
]
*/
export const apiFetchMoneyOutList = function(vm){
    return HTTP.post('index/get_withdraw_list.html').then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*-------------------- 游戏相关 --------------------*/
/*
* 投注记录接口
* 状态： 可用
* 地址： /api/usercenter/bet_record_page.html
* 提交表单数据： {
    " page ": 1,    //页码，提交空字符串时默认为1
    " num ": 15,     //每页记录数，提交空字符串时默认为15
    " start ": '2017-02-21',     //起始时间，不填默认为当前日期前一月
    " end ": '2017-02-22',   //截止时间，不填默认为当前日期
    " gameno ": ''  //游戏编码， ‘sd：'山东十一选五','gd':'广东十一选五','ah':'安徽十一选五','jx':'江西十一选五','sh':'上海十一选五','zj':'浙江十一选五','js':'江苏十一选五','ln':'辽宁十一选五'
    " state ": 1,   // 方案状态  为空为全部状态
    "settletype ": 1    // 结算状态  为空为全部状态
}
* 响应JSON数据： {
    'list': [
        {
            'planId': 15, //  id
            'User_Name': 'test2', //发起人
            'gameNo': 'gd', //彩种
            'progress': '100%', //进度
            'state': 3, //  3、已出票 1、未满员 2已满员 4 已撤单
            'Numbers': '2017031708', // 期号
            'createDate': '2017-03-17 10:13:56' //创建时间
            'type': 1, //方案类型 //1 自购 2追号 3 合买 4跟单   
            'buyAmount': 2, // 认购金额
            'awardAmount': null //中奖金额
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
* 响应代码：
    798 起始时间无效
    799 截止时间无效
    803 游戏编码无效
*/
export const apiFetchBettingRecords = function(data, vm){
    return HTTP.post('usercenter/bet_record_page.html', {
        page: data.currentPage, //页码，提交空字符串时默认为1
        num: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        start: data.startDate, //起始时间，不填默认为当前日期前一月
        end: data.endDate, //截止时间，不填默认为当前日期
        gameno: data.gameId, //游戏编码， ‘sd：'山东十一选五','gd':'广东十一选五','ah':'安徽十一选五','jx':'江西十一选五','sh':'上海十一选五','zj':'浙江十一选五','js':'江苏十一选五','ln':'辽宁十一选五'
        state: data.status, // 方案状态  为空为全部状态
        settletype: data.type // 结算状态  为空为全部状态
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获取投注记录详情
* 状态： 可用
* 地址： /api/joinbuy/get_detail.html
* 提交表单数据： {
    " id ": 1,  // id
    "g": sd,     //游戏编码
} 
* 响应JSON数据： {
    "planId":7,  //id
    "userName":"test2",  // 发起人
    "gameNo":"sd", // 游戏编码
    "progress":"50%+50%(保)", //进度
    "amount":2, //总金额
    "perAmount":1, //每份金额
    "divNum":2, //总份数
    "buyNum":2, // 发起人购买份数
    "state":3, //  3、已出票 1、未满员 2已满员 4 已撤单
    "joinNum":0, // 跟单人数
    "Numbers":"2017040141", // 期号
    "createDate":"2017-04-01 15:41:53", //方案发起时间
    "endDate":"2017-04-01 15:44:30", //认购截止时间
    "planTitle":"ceshi", //方案名称
    "type":3, /方案类型 //1 自购 2追号 3 合买 4跟单
    "bonus":"0%", //发起人提成
    "times":1, //倍数
    "settleType":2, //'1 未兑奖 2 未中奖3 已中奖
    "totalAward":0, //总奖金
    "perAward":0, //每份奖金
    "bet": [ //注单内容
        {
            "name":"和值15", //名称
            "content":"15",  //内容
            "num":1,  // 注数
            "times":2, //倍数
            "amount":2 //投注金额
        }
    ],
    "open":"02,09,03,10,01",//开奖号码
    "user": [ //参与用户
        {
            "userName":"test2", //名字
            "amount":2, //共计金额
            "rate":"100%", //比例
            "award":0, //奖金
            "buy": [ //该用户的所有购买记录
                {
                    "type":"认购", //参与方式
                    "createDate":"2017-04-01 15:41:53", //购买时间
                    "amount":2, //购买金额
                    "status":"已参与" //状态
                },
                {
                    "type":"保底",
                    "createDate":"2017-04-01 15:41:53",
                    "amount":1,
                    "status":"已参与"
                }
            ]
        }
    ]
}
* 响应代码部分：
    800 找不到该信息
*/
export const apiFetchDetailOfBettingRecord = function(data, vm){
    return HTTP.post('joinbuy/get_detail.html', {
        id: data.id, // id
        g: data.gameId, //游戏编码
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 追号记录
* 状态： 可用
* 地址： /api/usercenter/zhuihao_record_page.html
* 提交表单数据： {
    " page ": 1,    //页码，提交空字符串时默认为1
    " num ": 15,     //每页记录数，提交空字符串时默认为15
    " start ": '2017-02-21',     //起始时间，不填默认为当前日期前一月
    " end ": '2017-02-22',   //截止时间，不填默认为当前日期
    " gameno ": ''  //游戏编码， ‘sd：'山东十一选五','gd':'广东十一选五','ah':'安徽十一选五','jx':'江西十一选五','sh':'上海十一选五','zj':'浙江十一选五','js':'江苏十一选五','ln':'辽宁十一选五'
    " state ": 1    // 方案状态  为空为全部状态
}
* 响应JSON数据： {
    'list': [
        {
            'planId': 3, // id
            'amount': 2, // 总金额
            'gameNo': 'gd', //游戏编码
            'state': 1, //状态 1 进行中 2. 已完成 3 已终止
            'createDate': '2017-03-17 10:12:46',
            'finishNum': 0, //已完成期数
            'total': 2, //总期数
            'cancelNum': 0 //取消期数
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
* 响应代码部分：
    798 起始时间无效
    799 截止时间无效
    803 游戏编码无效
*/
export const apiFetchContinuousBettingRecords = function(data, vm){
    return HTTP.post('usercenter/zhuihao_record_page.html', {
        page: data.currentPage, //页码，提交空字符串时默认为1
        num: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        start: data.startDate, //起始时间，不填默认为当前日期前一月
        end: data.endDate, //截止时间，不填默认为当前日期
        gameno: data.gameId,  //游戏编码， ‘sd：'山东十一选五','gd':'广东十一选五','ah':'安徽十一选五','jx':'江西十一选五','sh':'上海十一选五','zj':'浙江十一选五','js':'江苏十一选五','ln':'辽宁十一选五'
        state: data.status // 方案状态  为空为全部状态
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获取追号详情
* 状态： 可用
* 地址： /api/joinbuy/get_zhuihao_detail.html
* 提交表单数据： {
    " id ": 1, //id
    "g": sd, //游戏编码
}
* 响应JSON数据： {
    "userName":"test2", //追号用户
    "gameNo":"sd", //游戏编码
    "type":"指定号码", //追号类型
    "amount":2, //总追号金额
    "finishNum":5,// 已完成期数
    "totalNum":5, //总期数
    "cancelNum":0, //已取消期数
    "isStop":0, //中奖后停止
    "bet": [ //投注内容
        {
            "name":"和值15", //玩法名称
            "content":"15", // 投注内容
            "num":1, //几注
            "times":2, //倍数
            "amount":2 //本注金额
        }
    ],
    "detail": [
        {
            "Numbers":"2017040151",期号
            "times":1, //倍数
            "isBet":1, //是否投注
            "amount":2, //金额
            "award":0 //中奖
        }
    ]
}
* 响应代码部分：
    800 找不到该信息
*/
export const apiFetchDetailOfContinuousBettingRecord = function(data, vm){
    return HTTP.post('joinbuy/get_zhuihao_detail.html', {
        id: data.id, //id
        g: data.gameId, //游戏编码
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 游戏信息数据获取接口
* 状态： 可用
* 地址： /api/game/get_game_info.html
* 提交表单数据： {
    "g": sd //游戏编码，sd：'山东十一选五','gd':'广东十一选五','ah':'安徽十一选五','jx':'江西十一选五',
     'sh':'上海十一选五','zj':'浙江十一选五','js':'江苏十一选五','ln':'辽宁十一选五'
}
* 响应JSON数据：
    7689 请求错误
    7676 没有数据
* 正确时相应数据： {
    "no":"c",
    "name":"重庆时时彩",
    "items":[
        {
            "no":"c-q1",
            "name":"第一球",
            "max":"10",
            "items":[
                {
                    "no":"c000",
                    "name":"0",
                    "value":"0"
                },
                {
                    "no":"c001",
                    "name":"1",
                    "value":"0"
                },
                ...
            ]
        }
    ]
}
* 游戏玩法值说明：
    如果value等于0，玩法名称即表示玩法的具体值，如果value大于0则表示具体的玩法值，部分值定义列表（固定）：
*/
export const apiFetchGameInfo = function(data, vm){
    return HTTP.post('game/get_game_info.html', {
        g: data.gameId //游戏编码
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 游戏页面-游戏状态和开奖号码接口
* 状态： 可用
* 地址： /api/game/get_game_state_info.html
* 提交表单数据： {
    "g":"游戏编码" 为空 获取全部游戏
}
* 没有数据时响应JSON数据： {
    "s": 6000,
    "d":"没有找到适合的游戏状态信息"
}
* 正常响应JSON数据： [
    {
        'NAME': '山东十一选五',
        'GAMENO': 'sd',
        'STATUS': 1,
        'ENABLE_BET': 1,
        'CLOSE_TIME': 30,
        'NOTICE': '1',
        'CLOSE_INFO': '1',
        'OPEN_RESULTS': {
            'N': '2017040238',
            'R': '11,06,05,04,01'
        }
    }
]
* 当没有任何开奖数据信息时，"OPEN_RESULTS":{"N":"","R":""}，N和R都是空字符串。
* 参数说明：名字，游戏编码，游戏状态、是否允许下注、提前封盘时间、通知公告信息、游戏关闭时显示的文本。N=期号，R=开奖结果。
*/
export const apiFetchGameStateInfo = function(data, noloading, vm){
    return HTTP.post('game/get_game_state_info.html' + (noloading ? '?noloading' : ''), {
        g: data.gameId
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

/*
* 游戏页面-游戏开奖公告获取接口
* 状态： 可用
* 地址： /api/game/get_game_open_info_list.html
* 提交表单数据： {
    "n": 数字，   如果为空，则默认25条，最大只能100条，不分页
    "g": 游戏编码,      
}
* 没有数据时响应JSON数据： {
    "s": 6200,
    "d":没有开奖数据信息
}
* 错误代码：6201，请求错误
* 正确响应多个开奖信息: [
    {
        'NUMBER': '2017040238',
        'OPEN_NUMBER': '11,06,05,04,01'
    },
    {
        'NUMBER': '2017040237',
        'OPEN_NUMBER': '09,07,05,02,01'
    },
    {
        'NUMBER': '2017040214',
        'OPEN_NUMBER': '04,10,11,05,03'
    }
]
*/
export const apiFetchGameLotteryResultNotice = function(data, vm){
    return HTTP.post('game/get_game_open_info_list.html', {
        n: data.length || '',
        g: data.gameId
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 游戏页面-赔率获取接口
* 状态： 可用
* 地址： /api/game/get_game_odd.html
* 提交表单数据： {    
    "g ":游戏编码, 
    "t":游戏分类编码,
    "p":"单个游戏玩法编码",
    "l":"多个游戏玩法编码，请用英文“,”串起来提交上来",  
}
* P，l可以为空，都为空时返回该分类下全部
* 请求示例： {
    t: "sd-q1",
    g: "sd",
    p: "",
    l: ""
}
* 没有数据时响应JSON数据： {
    "s": 6202,
    "d":没有赔率信息
}
* 错误代码：114，参数不对或程序异常
* 错误代码：6203，请求错误
* 错误代码：6204，游戏编码错误
* 错误代码：6205，游戏分类编码错误
* 错误代码：6206，游戏玩法编码错误
* 错误代码：6207，游戏玩法编码列表错误
* 错误代码：6208，至少要提供一个查询参数
* 正确响应的赔率信息: [
    {
        'N': 'sd001', 玩法编码、
        'E': 1, 是否允许投注、
        'O': 149, 标准赔率、
        'I': 2, 最低下注、
        'A': 100000, 最高下注、
        'P': 5000, 玩法值、
        'OP': 500, 特殊赔率、
        'PP': 0.1 特殊赔率玩法值
    },
    {
        'N': 'sd035',
        'E': 1,
        'O': 1.88,
        'I': 2,
        'A': 100000,
        'P': 5000,
        'OP': 500,
        'PP': 0.1
    }
]
* 参数值说明：玩法编码、是否允许投注、标准赔率、最低下注、最高下注、玩法值、特殊赔率、特殊赔率玩法值
*/
export const apiFetchGameOdds = function(data, noloading, vm){
    return HTTP.post('game/get_game_odd.html' + (noloading ? '?noloading' : ''), {
        g: data.gameId, // 游戏编码, 
        t: data.categoryId, // 游戏分类编码,
        p: data.productId || '', // 单个游戏玩法编码",
        l: data.productIds ? data.productIds.join(',') : '' // "多个游戏玩法编码，请用英文“,”串起来提交上来"
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 投注接口
* 状态： 可用
* 地址： /api/game/bet_game.html
* 提交JSON数据： {
    gameno: 游戏编码,
    bet_datas: [
        {
            "playno": 游戏玩法编码,
            "amount": 投注金额,
            "content": 投注内容,
            "number": 注单数量,
            "odds": 赔率
        }
    ],
    gnumber: 投注游戏期号
    gnumber_zhui:追号期号,分号分隔。 这个不为空就为追号投注 
    joinbuy: {     //gnumber_zhui为空，joinbuy不为空为合买
        divNum： 总份数
        buyNum： 自己购买份数
        remainNum： 保底份数
        publicType：方案设置  0-仅发单人可看 1-立即公开 2-截止后公开 3-截止后对跟单人公开
        planTitle： 方 案 标 题  //不超过15个汉字
        planDesc: 方 案 描 述  //不超过30个汉字
    }
}
* 响应代码部分：
    200 投注成功
    100 正在投注
    900 程序异常
    101 游戏编码无效
    102 没有找到适合的赔率
    103 玩法不允许下注
    104 标准赔率无效
    105 超出投注限额
    106 投注内容无效
    107 投注单量错误
    108 投注编码无效
    109 用户余额不足
    110 单式最低下注不够
    111 超出分类限号
    112 游戏已封盘
    113 本期总投注超出分类限号
    114 客户端JSON格式错误
    477 游戏为空或未开启
    478 投注期号不对
    479 游戏已封盘
    480 未定义
    481 未定义
    666 追号期号无效
    667 合买内容格式无效
    668 至少认购10%
    669 购买份数不能超过总份数
    670 保留份数不能超过总份数
    671 合买标题超过15个字
    672 合买描述超过30个字
*/
export const apiDoBet = function(data, vm){
    return HTTP.post('game/bet_game.html', jsonData({
        gameno: data.gameId,
        bet_datas: data.bettingData,
        gnumber: data.number,
        gnumber_zhui: data.numbers || '',
        joinbuy: data.togetherBuyData || {}
    })).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 获得未来几期期号
* 状态： 可用
* 地址： /api/game/get_term_num.html
* 提交表单数据： {
    "g": 游戏编码,
    "n": 多少期，默认50期
}
* 返回： [
    {
        'Numbers': '2017040243',
        'Open_Time': '2017-04-02 16:05:00',
        'Begin_Date': '2017-04-02 15:55:30',
        'End_Date': '2017-04-02 16:04:30'
    },
    {
        'Numbers': '2017040244',
        'Open_Time': '2017-04-02 16:15:00',
        'Begin_Date': '2017-04-02 16:05:30',
        'End_Date': '2017-04-02 16:14:30'
    },
    {
        'Numbers': '2017040245',
        'Open_Time': '2017-04-02 16:25:00',
        'Begin_Date': '2017-04-02 16:15:30',
        'End_Date': '2017-04-02 16:24:30'
    }
]
* 错误代码：
    114 参数不对或程序异常
    6203 请求错误
    6204 游戏编码错误
*/
export const apiFetchFutureLotteries = function(data, vm){
    return HTTP.post('game/get_term_num.html', {
        n: data.length || 10,
        g: data.gameId
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 参与合买
* 状态： 可用
* 地址： /api/joinbuy/joinbuy_buy.html
* 提交参数： {
    "planid": 合买计划id，
    "num": 购买份数，
    "gameno": 游戏编码,
}
* 响应代码部分：
    222 要求用户必须登录
    671 购买份数无效
    672 合买ID无效
    673 合买方案已满员
    109 用户余额不足
    675 已超过截止时间
    674 参与合买成功
*/
export const apiJoinToTogetherBuy = function(data, vm){
    return HTTP.post('joinbuy/joinbuy_buy.html', {
        planid: data.planId,
        num: data.count,
        gameno: data.gameId
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 合买列表
* 状态： 可用
* 地址： /api/joinbuy/joinbuy_list.html
* 提交参数： {
    "page": 1,  //页码，提交空字符串时默认为1
    "num": 15,    //每页记录数，提交空字符串时默认为15
    "gameno": 游戏编码
}
* 返回数据: {
    'list': [
        {
            'planId': 15, //合买id
            'User_Name': 'test2', //发起人
            'zhanji': 0, //战绩
            'gameNo': 'gd', //彩种
            'progress': '100%', //进度
            'amount': 2, //总金额
            'perAmount': 1, //每份金额
            'divNum': 2, //总份数
            'buyNum': 1, // 发起人购买份数
            'state': 3, //  3、已出票 1、未满员 2已满员 4 已撤单
            'joinNum': 1, // 跟单份数
            'restNum': 0, // 剩余份数
            'Numbers': '2017031708', // 期号
            'createDate': '2017-03-17 10:13:56' //创建时间
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, // 总页数
    'page': 1 //当前页数
}
* 响应代码部分：
    6204 游戏编码错误
*/
export const apiFetchListOfTogetherBuy = function(data, vm){
    return HTTP.post('joinbuy/joinbuy_list.html', {
        page: data.currentPage, //页码，提交空字符串时默认为1
        num: data.lengthPerPage, //每页记录数，提交空字符串时默认为15
        gameno: data.gameId //游戏编码
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*
* 合买方案详情调7.14的获取投注记录详情
* 状态： 可用
* 地址： /api/joinbuy/get_detail.html
*/
/*
* 历史开奖
* 状态： 可用
* 地址： /api/game/get_history_open.html
* 提交表单数据： {
    g: sd,     // 游戏编码  必填
    page: 1,    //页码，提交空字符串时默认为1
    num: 15,     //每页记录数，提交空字符串时默认为15
    start: '2017032965',     //起始期号
    end: '2017032965',   //截止期号
    date:  '2017-03-30',   //日期  
    // 当 起始期号 或 截止期号 有值时， 日期不起作用
    // 有分页
}
* 响应JSON数据： {
    'list': [
        {
            'NUMBER': '2017032965', //期号
            'OPEN_NUMBER': '05,04,09,01,11' //开奖结果
        }
    ],
    'total': 1, //总记录
    'totalPage': 1, //总页数
    'page': 1 //当前页数
}
*/
export const apiFetchLotteryHistory = function(data, vm){
    return HTTP.post('game/get_history_open.html', {
        g: data.gameId,
        page: data.currentPage,
        num: data.lengthPerPage,
        start: data.startNumber,
        end: data.endNumber,
        date: data.date
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
/*-------------------- 其它 --------------------*/
/*
* 实时数据
* 状态： 可用
* 地址： /api/index/realtime_data.html
* 提交参数: NULL
* 响应数据JSON： {
    I: 1,   // 是否在线 1是0否，为0时，提示用户已不在线
    A: 1,   // 余额是否变化1是0否，为1时，更新用户余额
    B: 0, // 用户余额，A为1时才有此字段
}
* 备注： 长轮询，每隔几秒获取一次，检测到有变化则执行相应事件
*/
export const apiLoopRealtimeData = function(noloading, vm){
    return HTTP.post('index/realtime_data.html' + (noloading ? '?noloading' : '')).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};
