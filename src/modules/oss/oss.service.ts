import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import * as dayjs from 'dayjs';
import { OSSParams } from 'src/graphql.schema';
@Injectable()
export class OSSService {
  async getSignature(): Promise<OSSParams> {
    const aliyunConfig = {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      bucket: process.env.ALIYUN_BUCKET,
      region: process.env.ALIYUN_REGION,
    };
    console.log(aliyunConfig);

    const client = new OSS(aliyunConfig);

    const rules: OSS.CORSRule[] = [
      {
        // 指定允许跨域请求的来源，支持通配符星号（*），表示允许所有的来源域。
        allowedOrigin: 'http://localhost:*',
        // 指定允许的跨域请求方法，支持GET、PUT、DELETE、POST和HEAD方法。
        allowedMethod: ['POST', 'PUT', 'DELETE', 'GET', 'HEAD'],
        // allowedMethod: '*',
        // 指定允许跨域请求的响应头。建议无特殊情况下将此项设置为通配符星号（*）。
        allowedHeader: '*',
        // 指定允许用户从应用程序中访问的响应头，例如一个JavaScript的XMLHttpRequest对象。不允许使用通配符星号（*）。
        exposeHeader: ['Content-Length', 'Content-Type'],
        // 指定浏览器对特定资源的预取（OPTIONS）请求返回结果的缓存时间，单位为秒。
        maxAgeSeconds: '30',
      },
    ];
    client.putBucketCORS(aliyunConfig.bucket, rules);
    // .then((res) => {
    //   console.log('allow cors', res);
    // });

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
      ],
    };

    //签名
    const formData = await client.calculatePostSignature(policy);

    //bucket域名
    const host = `https://${aliyunConfig.bucket}.${
      (await client.getBucketLocation(aliyunConfig.bucket)).location
    }.aliyuncs.com`.toString();

    //回调
    // const callback = {
    //   callbackUrl: aliyunConfig.callbackUrl,
    //   callbackBody:
    //     'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}',
    //   callbackBodyType: 'application/x-www-form-urlencoded',
    // };

    //返回参数
    const params = {
      expire: dayjs().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessId: formData.OSSAccessKeyId,
      host,
      dir: 'images',
      // callback: Buffer.from(JSON.stringify(callback)).toString('base64'),
    };

    return params;
  }
}
