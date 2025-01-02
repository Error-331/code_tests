# Social network posting strategy

## "Moving parts"

1. Social media accounts;
2. Anti-detect browser;
3. VPN and/or proxies;
4. Automation tool;
5. Content generator;

Details:

- We need multiple social *media accounts* to be able to post content for multiple customers;
- We can "farm" (register new ones or just buy them) those accounts using special technique (please see "account_farming" folder for more info);
- Every such needed to be used through *anti-detect* browser (important) to minimize the risk of account being banned by the social network (please see "antidetect" folder for more info); 
- Every account should be used through VPN or proxy to make use of different IPs (in proper regions);
- We need to automate the whole process by means of the code (I think "Puppeteer" will be a great asset in this case);
- We definitely need to include "content generator" (AI model like "Stable Diffusion") in this process by means of API;

## Architecture

1. Use cloud service provider (GCP, AWS, Azure, etc. I prefer GCP);
2. Prepare a Docker image with NodeJS, Anti-detect browser and Puppeteer library;
3. Prepare code that will automate the posting strategy;
4. Host code on GitHub and prepare CI/CD using GitHub actions;

* more details soon

## Pitfalls 

- While performing different automated "scenarios" there might be an issue with "Captcha" - but this can be solved with "Captcha" solving services or AI model (need to investigate);