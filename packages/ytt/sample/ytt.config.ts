import { getName } from './utils'
import { defineConfig } from '../src'

export default defineConfig([
  {
    serverUrl: 'https://yapi.nbttfc365.com/',
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    // prodEnvName: 'mock',
    // outputFilePath: 'src/api/index.ts',
    outputFilePath: interfaceInfo => `${getName(interfaceInfo)}.ts`,
    // requestFunctionFilePath: 'src/api/request.ts',
    dataKey: [],
    projects: [
      {
        // NB mapi/mobile api
        // https://yapi.admin-devops.com/project/44/setting
        token:
          '4c2afb0b169bcb30820766f8ece8eaca3a8604258a9473ace200031e6ef3912e',
        categories: [
          {
            id: 0,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              // return changeCase.camelCase(interfaceInfo.path)

              // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如：
              return changeCase.camelCase(
                `Yapi_${interfaceInfo.method}_${interfaceInfo.path}_api`,
              )

              // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如：
              // return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`)
            },
          },
        ],
      },
    ],
  },
])
