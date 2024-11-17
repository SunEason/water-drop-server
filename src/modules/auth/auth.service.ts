import { Injectable } from '@nestjs/common';
import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $Util from '@alicloud/tea-util';
import { getRandomCode } from 'src/utils/random';
import { config as aliyunConfig } from 'aliyun.config';
import { UserService } from '../user/user.service';
import { getClient } from 'src/const/msgClient';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import Util, * as $Util from '@alicloud/tea-util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async sendMessage(tel: string) {
    const user = await this.userService.findUserByTel(tel);
    if (user) {
      const diffTime = new Date().getTime() - user.codeCreateTime.getTime();
      if (diffTime < 60 * 1000) {
        return false;
      }
    }
    const client = getClient();
    const code = getRandomCode();
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: aliyunConfig.signName,
      templateCode: aliyunConfig.templateCode,
      phoneNumbers: tel,
      templateParam: `{"code":"${code}"}`,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
      if (user) {
        const data = await this.userService.updateUserCode(user.id, code);
        if (data) return true;
        else return false;
      }
      const data = await this.userService.createUser({
        name: 'user',
        password: 'user',
        account: '',
        tel: tel,
        code: code,
      });
      if (data) return true;
      else return false;
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data['Recommend']);
    }
  }
}
