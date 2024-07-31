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
	  cd /var/lib/jenkins/workspace/customermanagement
	  docker build -t customermanagement .
	  docker run -d -p 5000:8080 --name customermanagement customermanagement
	  docker image prune -f
	'''
	}
}
}
}
