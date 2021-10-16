// (一) http 状态码

// 100 continue 继续请求
// 101 switch protocols 升级协议

// 200 ok 成功
// 204 no content 没有内容可以返回，返回报文不包含报文主体
// 206 partial content 范围请求，响应报文包含 Content-Range 字段

// 301 moved permanent 永久重定向 - 应更新书签
// 302 Found 临时重定向 - 不更新书签
// 303 sea other 临时重定向 - GET
// 304 not modified 资源未被修改，协商缓存 - 返回报文不包含报文主体
// 307 Temporary Redirect 临时重定向，不要求 POST 换成 GET

// 400 bad request 请求错误
// 401 unauthorized 需要认证或者认证失败
// 403 forbidden 资源访问被禁止，权限不够
// 404 not found 资源未找到
// 405 method not allow 请求方法错误

// 500 internal server error 服务端错误
// 502 bad gateway 网关错误
// 503 service unavailable 服务器过载
// 504 gateway time out 网关超时

// (二) https的证书申请流程
// 1. 服务器 把自己的 公钥 发给 证书颁发机构申请
// 2. 证书颁发结构用自己的 私钥 加密服务器的 公钥，并做数字签名，生成公钥证书
// 3. 公钥证书 ->  证书颁发结构 -> 服务器 -> 客户端
// 4. 客户端利用证书颁发机构内置在浏览器的 公钥，去解密 公钥证书，确定公钥的可信度
// 5. 客户端用确定了的合法的 服务器的公钥(服务器的公钥在公钥证书中)，加密之后 ( 对称加密通信时需要使用到的 - 密钥 ) 并发给 服务器
// 6. 服务器利用自己的 私钥 -> 解密自己的公钥加密过的(对称加密通信时需要使用到的 - 密钥)，从而获得 ( 对称加密通信时需要使用到的 - 密钥 )
// 7. 之后就可以用 对称加密的密钥 进行对称加密通信了

// (三) GET POST 区别
// 幂等和安全，数据携带，作用，书签，缓存，TCP数据包个数
// 数据类型（GET ASCII）（POST无限制）
