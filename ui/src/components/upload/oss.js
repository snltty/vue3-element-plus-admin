/*
 * @Author: xr
 * @Date: 2021-03-25 17:22:36
 * @LastEditors: xr
 * @LastEditTime: 2021-04-02 12:46:55
 * @version: v1.0.0
 * @Descripttion: 功能说明
 * @FilePath: \web.admin.vue3\src\components\upload\oss.js
 */
import OSS from 'ali-oss'
import { getSts } from '../../apis/oss'
export default class AliyunOSS {
    static config = {
        expiration: 0,
        client: null,
        stsData: {}
    }
    constructor() {
    }
    getClient () {
        return new Promise((resolve, reject) => {
            let config = AliyunOSS.config;
            if (Date.now() / 1000 > config.expiration) {
                getSts().then((res) => {
                    let data = res.data.Data;
                    config.expiration = new Date(data.BeiJing).getTime() / 1000;
                    config.stsData = data;
                    config.client = null;
                    this.getClient().then((client) => {
                        resolve(client);
                    });
                }).catch(reject);
            } else {
                if (!config.client) {
                    config.client = new OSS({
                        region: 'oss-' + config.stsData.Region,
                        accessKeyId: config.stsData.AccessKeyId,
                        accessKeySecret: config.stsData.AccessKeySecret,
                        stsToken: config.stsData.SecurityToken,
                        bucket: config.stsData.BucketName
                    });
                }
                resolve(config.client);
            }
        });
    }
    delete (name) {
        return new Promise((resolve, reject) => {
            this.getClient().then((client) => {
                client.delete(name).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error);
                });
            })
        })
    }
    put (name, file) {
        return new Promise((resolve, reject) => {
            this.getClient().then((client) => {
                client.put(name, file).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error);
                });
            });
        })
    }
}