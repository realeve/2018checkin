import {
    axios
} from './axios';


/**
*   @database: { 微信开发 }
*   @desc:     { 异常数据上报 } 
    const { err_type, err_url, err_desc, network_type, device_platform, device_user_agent, device_app_version, hook, remark, rec_time, ip } = params;
*/
export const addCommonErrorLog = async params => await axios({
    url: '/22/6768cba468.json',
    params,
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 签到人数汇总 } 
 */
export const getCbpmCheckin = async() => await axios({
    url: '/28/f31b49b1be/1.json'
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 更新url阅读数 } 
 */
export const addCommonVisitCount = async url => await axios({
    url: '/5/4c908bffac.json',
    params: {
        url
    },
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 签到人员列表 } 
 */
export const getCbpmCheckinList = async() => await axios({
    url: '/29/01adc64f57/10.json'
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 错误列表 } 
 */
export const getCommonErrorLog = async() => await axios({
    url: '/30/2856b41c8e.json'
}).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 更新用户签到地址 } 
    const { user,  mobile,  prov,  city,  area,  detail,  openid,  rec_time, user2, mobile2, prov2, city2, area2, detail2, rec_time2 } = params;
*/
export const addCbpmCheckinUserAddress = async params => await axios({
    url: '/31/e111d9406b.json',
    params,
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 签到用户身份信息 } 
 */
export const getCbpmVoteUserAddress = async openid => await axios({
    url: '/32/3730cedbaf.json',
    params: {
        openid
    },
}).then(res => res);

export const getUnId = async openid => await axios({
    params: {
        s: "weixin/getUnid",
        openid
    }
}).then(res => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 是否需要投票 } 
 */
export const isNeedCheckin = async openid => await axios({
    url: '/33/244cfa8c2d.json',
    params: {
        openid
    },
}).then(res => res);

export const getIP = async() => await axios({
    url: '/ip/'
}).then(({
    ip
}) => ip);
/**
*   @database: { 微信开发 }
*   @desc:     { 每日签到 } 
    const { sid, nickname, openid, sex, headimgurl, country, province, city, ip, check_count, rec_date } = params;
*/
export const addCbpmCheckin = async params => await axios({
    url: '/34/322d4b9b1c.json',
    params,
}).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 更新签到信息 } 
    const { ip, check_count, rec_date, openid } = params;
*/
export const setCbpmCheckin = async params => await axios({
    url: '/35/9525bff8d3.json',
    params,
}).then(res => res);