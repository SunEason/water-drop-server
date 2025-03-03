import fs from 'fs';
import path from 'path';

import genModule from './module.temp.js';
import genResolver from './resolver.temp.js';
import genService from './service.temp.js';

const args = process.argv.slice(2);

const name = args[0];
const dirPath = `./src/modules/${name}`;
const types = ['module', 'service', 'resolver'];
const genFn = [genModule, genService, genResolver];

const files = types.map((type, index) => {
  const filePath = path.join(dirPath, `${name}.${type}.ts`);
  const content = genFn[index](name);
  return {
    name: `${name}.${type}.ts`,
    path: filePath,
    content,
  };
});

// 确保目录存在
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath); // 同步创建目录
}

function genFile(path, content, filename) {
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(`${filename} 生成失败:`, err);
    }
  });
}

files.forEach((file) => {
  genFile(file.path, file.content, file.name);
});
