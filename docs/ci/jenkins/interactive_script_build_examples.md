# Build config examples

## Interactive / secure config build examples

### Laravel (php) with interactive input field for 'sudo' password

```jenkins

script
{
	env.jenkinsSudoPassword = ""
	env.jenkinsServerDir = "/var/www/auth_service_development/"
	env.jenkinsCurrentServerDir = env.jenkinsServerDir + "current/"
	env.jenkinsTempCurrentServerDir = env.jenkinsServerDir + "current@tmp/"
	env.jenkinsOldBuildServerDir = env.jenkinsServerDir + "old_build/"
}

pipeline {
	agent any

	stages {
		stage('Clone sources') {
            steps {
                git url: 'https://github.com/WebFuturistics/auth_service.git',
                credentialsId: '6e497651-d5f0-437b-9446-19163aa1b653'
            }
        }
       
		stage('Input Jenkins sudo password') {
         		steps {
                    script {
                        def jenkinsSudoPasswdInput = input(
                            id: 'userInputJenkinsSudoPassword', 
                            message: 'Please enter Jenkins "sudo" password', 
                            parameters: [
                                [$class: 'PasswordParameterDefinition', defaultValue: '', description: '"sudo" password', name: 'Password'],
                            ])
                            
                    		env.jenkinsSudoPassword = jenkinsSudoPasswdInput
                		}
         		    }
      		    }

      		    stage('Remove old build') {
                    steps {         
    				    sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S rm -rf ${env.jenkinsOldBuildServerDir}"
            		}
        	    }
        
              	stage('Move current build to old build folder'){
			        steps {  
     				    sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S mkdir -p ${env.jenkinsCurrentServerDir}"
    				    sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S mv -f ${env.jenkinsCurrentServerDir} ${env.jenkinsOldBuildServerDir} 2> /dev/null"
            		}
        	    }
        
                stage('Install vendor packages') {
            		steps {
                		sh "composer install"
            		}
        }
        
		stage('Copy build artifacts to server (current) folder') {
            steps {
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S mkdir -p ${env.jenkinsCurrentServerDir}"
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S cp -r ./* ${env.jenkinsCurrentServerDir}"

            }
        }
        
        stage('Copy .env file to buld (current) directory') {
            steps {
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S cp ${env.jenkinsServerDir}.env ${env.jenkinsCurrentServerDir}.env"
            }
        }
        
		stage('Temporary allow access to "current" directory') {
            steps {
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chown jenkins:jenkins ${env.jenkinsServerDir}"
  				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chown -R jenkins:jenkins ${env.jenkinsCurrentServerDir}"

 				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod 777 ${env.jenkinsServerDir}"
  				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod -R 777 ${env.jenkinsCurrentServerDir}"
            }
        }
        
		stage('Generate Laravel key') {
            steps {
                dir(env.jenkinsCurrentServerDir) {
                    sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S php artisan key:generate"
                }
            }
        }
        
		stage('Run Laravel migrations') {
            steps {
                dir(env.jenkinsCurrentServerDir) {
                    sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S php artisan migrate"
                }
            }
        }

		stage('Remove temporary directories') {
            steps {
                dir (env.jenkinsTempCurrentServerDir) {
                    deleteDir()
                }
            }
        }
     
		stage('Remove temporary access to "current" directory') {
            steps {
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod 770 ${env.jenkinsCurrentServerDir}"
            }
        }
        
		stage('Change ownership of server directory to "www-data"') {
            steps {
                sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chown -R www-data:www-data ${env.jenkinsServerDir}"
				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod -R o-rwx ${env.jenkinsServerDir}"
				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod -R u+rwx ${env.jenkinsServerDir}"
				sh "#!/bin/sh -e\n echo ${env.jenkinsSudoPassword} | sudo -S chmod -R g+rwx ${env.jenkinsServerDir}"
            }
        }

		stage('Clean workspace') {
			steps {
				deleteDir()
			}
		}
   	}
}

```