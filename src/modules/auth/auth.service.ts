import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import Util, * as $Util from '@alicloud/tea-util';

@Injectable()
export class AuthService {
  createClient(): Dysmsapi20170525 {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    const config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  async sendMessage(tel: string) {
    // todo
    console.log(tel);
    const client = this.createClient();
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: '水滴',
      templateCode: 'SMS_475140218',
      phoneNumbers: tel,
      templateParam: '{"code":"1234"}',
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data['Recommend']);
    }
    return '1234';
  }
}
