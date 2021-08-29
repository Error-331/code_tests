

#
On Tv
go to apps
press 12345 quickly
turn on developer mode
enter ip of the machine on which project was being developed
restart tv by holding power button for 2 seconds
go to settings and find ip of the tv

on machine 
open remote devices manager
enter ip of tv (port 26101)
hit the switch to on in the list of remote devices



function handleKeydown(event) {
switch (event.keyCode) {
case tizen.tvinputdevice.getKey('MediaPlayPause').code: //10252
// Something you want to do
break;

    case tizen.tvinputdevice.getKey('ColorF0Red').code: //403
      // Something you want to do
    break;
...




    <tizen:privilege name="http://developer.samsung.com/privilege/network.public"/>
    <tizen:privilege name="http://tizen.org/privilege/internet"/>
    <tizen:privilege name='http://tizen.org/privilege/tv.inputdevice'/>
    <access origin="*" subdomains="true"></access>




<access origin="http://url_resource" subdomains="true"/>
or

<access origin="*" subdomains="true"/>



window > preferences - remove any validation rules for javascript




~/tizen-studio/tools/emulator/bin/em-cli launch -n T-samsung-6.0-x86

tizen build-web
tizen clean -- ~/workspace/BrightTizen/


--- https://developer.tizen.org/ko/forums/sdk-ide/cannot-build-wgt-web-project-using-cli?langswitch=ko


tizen certificate -a BrightTizenTest -p BrightTizenTest -f brighttizentestcert
tizen security-profiles add -n testprofile1 -a ~/cli-data/keystore/author/brighttizentestcert.p12 -p brighttizentest
tizen cli-config -g default.profiles.path=/home/sergei/tizen-studio-data/profile/profiles.xml
tizen package -type wgt --sign BrightTizenTest -- /home/sergei/workspace/BrightTizen/.buildResult/
https://docs.tizen.org/application/web/api/
