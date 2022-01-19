1、将dhparam.pem文件分别上传至生产、测试服务器nginx配置文件夹conf/ssl下。
2、生产环境启动nginx时，读取配置文件nginx-ps-172.22.11.64.conf；
   测试环境启动nginx时，读取配置文件nginx-ps-172.16.69.105.conf