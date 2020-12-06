# CURL

## Examples

### Complex

- Example 1:

```bash

curl \
-H "accept:application/json" \
-H "accept-encoding:gzip, deflate" \
-H "accept-language:en-US" \
-H "content-length:143" \
-H "content-type:application/x-www-form-urlencoded" \
-H "origin:null" \
-H "user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Electron/1.8.8 Safari/537.36" \
-H "x-devtools-request-id:30031.58" \
-d "grant_type=password&client_id=fd14UaTp&client_secret=xxxx&username=gh%40b.biz&password=Tt%2A1" \
-X POST https://a.b.c/2019/03/REST/Token

```

- Example 2: 

```bash

curl \
-H "accept:application/json" \
-H "accept-encoding:gzip, deflate" \
-H "accept-language:en-US" \
-H "authorization:Bearer xxxx" \
-H "user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Electron/1.8.8 Safari/537.36" \
-H "x-devtools-request-id:30031.59" \
--compressed \
https://a.b.c/2019/03/REST/Self/Networks/

```

- Example 3:

```bash

curl \
-H "accept:application/json" \
-H "accept-encoding:gzip, deflate" \
-H "accept-language:en-US" \
-H "content-length:148" \
-H "content-type:application/x-www-form-urlencoded" \
-H "origin:null" \
-H "user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Electron/1.8.8 Safari/537.36" \
-H "x-devtools-request-id:30031.62" \
-d "grant_type=password&client_id=fd14UaTp&client_secret=xxxx&username=xx%2Fgs%40bn.biz&password=Tt%21" \
-X POST https://a.b.c/2019/03/REST/Token

```

- Example 4:

```bash

curl \
-H "accept:application/json" \
-H "accept-encoding:gzip, deflate" \
-H "accept-language:en-US" \
-H "authorization:Bearer xxxx" \
-H "user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Electron/1.8.8 Safari/537.36" \
-H "x-devtools-request-id:30031.63" \
--compressed \
https://a.bsn.c/2019/03/REST/Self/

```

- Example 5:

```bash

curl \
-H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" \
-H "Accept-Encoding: gzip, deflate, br" \
-H "Accept-Language: en-US,en;q=0.9" \
-H "Cache-Control: max-age=0" \
-H "Connection: keep-alive" \
-H "Cookie: _ga=GA1.2.1853822862.1578576441; gwcc=%7B%22fallback%22%3A%2214088529263%22%2C%22clabel%22%3A%22tDacCJyTxGYQpsKY4wM%22%2C%22backoff%22%3A86400%2C%22backoff_expires%22%3A1585874269%7D; CONCRETE5=tl3i4qqp66ri09nbmvaplo8ap6; _gid=GA1.2.956398674.1591998326; cookieconsent_status=dismiss" \
-H "Host: www.b.biz" \
-H "Sec-Fetch-Dest: document" \
-H "Sec-Fetch-Mode: navigate" \
-H "Sec-Fetch-Site: none" \
-H "Sec-Fetch-User: ?1" \
-H "Upgrade-Insecure-Requests: 1" \
-H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36" \
--compressed \
https://www.b.biz/downloads/overview

```

- Example 6:

```bash

curl \
-H "accept:application/json" \
-H "accept-encoding:gzip, deflate" \
-H "accept-language:en-US" \
-H "authorization:Bearer xxxx" \
-H "content-length:2826" \
-H "content-type:application/json" \
-H "origin:null" \
-H "user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Electron/1.8.8 Safari/537.36" \
-H "x-devtools-request-id:17559.108" \
--compressed \
-X PUT \
-d '{"id":36903,"serial":"D3E86V003930","name":"xd4_home_odessa","concatUnitNameAndSerial":false,"description":"xd4_home_odessa","targetGroup":{"id":29654,"name":"Default"},"targetBrightWall":null,"targetBrightWallScreenNumber":null,"targetTimeZone":"MSK","screenColor":"RGB:000000","contentCheckPeriod":"SixHours","contentDownloadsStartTime":null,"contentDownloadsEndTime":null,"healthReportingPeriod":"Custom","healthReportingStartTime":null,"healthReportingEndTime":null,"networkSettings":{"hostname":"xd4_home_odessa","proxyServer":null,"proxyBypass":null,"timeServer":"http://t.b.com/","wired":{"useDHCP":true,"ipAddress":null,"subnetMask":null,"defaultGateway":null,"dnS1":null,"dnS2":null,"dnS3":null,"rateLimitInsideContentDownloadWindow":3048000,"rateLimitOutsideContentDownloadWindow":0,"rateLimitDuringInitialDownloads":3048000,"contentDownloadEnabled":true,"textFeedsDownloadEnabled":true,"mediaFeedsDownloadEnabled":true,"healthReportingEnabled":true,"logsUploadEnabled":true},"wireless":{"enabled":false,"ssid":"","passphrase":"","useDHCP":true,"ipAddress":null,"subnetMask":null,"defaultGateway":null,"dnS1":null,"dnS2":null,"dnS3":null,"rateLimitInsideContentDownloadWindow":0,"rateLimitOutsideContentDownloadWindow":null,"rateLimitDuringInitialDownloads":0,"contentDownloadEnabled":true,"textFeedsDownloadEnabled":true,"mediaFeedsDownloadEnabled":true,"healthReportingEnabled":true,"logsUploadEnabled":true},"wiredConnectionPriority":0,"wirelessConnectionPriority":1},"remoteSnapshotSettings":{"enabled":false,"captureInterval":"00:01:00","screenShotsCountLimit":1,"imageQuality":0,"screenOrientation":"Landscape"},"logsSettings":{"enableDiagnosticLog":true,"enableEventLog":true,"enablePlaybackLog":true,"enableStateLog":true,"enableVariableLog":true,"uploadAtBoot":false,"uploadTime":"22:06:00"},"diagnosticWebServerSettings":{"enabled":true,"password":"xxxx"},"localWebServerSettings":{"enabled":true,"userName":"test1","password":"","enableUpdateNotifications":true},"deviceLocation":{"gpsLatitude":null,"gpsLongitude":null},"forceReboot":false,"forceRecovery":false,"forceReformat":false,"forceLogUpload":false}' \
https://a.b.c/2019/03/REST/Devices/36903/

```
