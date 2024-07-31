pipeline {

  agent any

  stages {
    stage('Checkout') {
      steps {
	checkout scm
      }
    }

    stage('Docker') {
      steps {
	sh '''
	  cd /var/lib/jenkins/workspace/Front-End
	  docker build -t customermanagement .
	  docker run -d -p 5000:80 --name customermanagement customermanagement
	  docker image prune -f
	'''
	}
}
}
}
