# Nikto

Other alternatives: OWASP ZAP, wapiti, Arachni;

Config file location:

```text

/var/lib/nikto/nikto.conf.default
/etc/nikto.conf

```

Option to make Nikto more attempts during scanning:

```text

FAILURES=500

```

Basic usage: 

```text

nikto -h bs.com

```

Specify specific ports:

```text

nikto -h school1366.ru -p 22,25,2096,3306

```

Scan with HTTPS:

```text

nikto -h freecodecamp.org -ssl 

```

Output scan results to text file:

```text

nikto -h school1366.ru -output results.txt

```

Config file location:

```text

/var/lib/nikto/nikto.conf.default
/etc/nikto.conf

```

Предположим, что у нас есть некий список, состоящий из 4 сайтов (сами сайты перечислены в отдельном текстовом файле), которые необходимо сканировать каждый месяц в промежутке с 7 числа по 25. Сканирование необходимо начинать в 20:00 часов. Для этого откроем главный файл cron при помощи команды:

crontab -e

И в самом низу пропишем следующую строку:

00 20 7-25 * * nikto -h sites.txt -output /home/alex/report.html

Где sites.txt — файл, в котором уже присутствуют нужные сайты.

nikto -e 1 -h webscantest.com   - evasion mode

---------------------------------------------

metagoofil -d kali.org -t pdf,xls -l 200 -n 25 -f results.html

nikto -h <IP address or host name>
nikto -e 1 -h <IP address or host name> - stealth mode
nikto -h <IP address or host name> -o <filename>

parsero -u <website domain name>