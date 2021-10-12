// http 状态码

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
