pipeline {
    agent { dockerfile true }
    stages {
        stage('build') {
            steps {
                sh './build.sh'
            }
        }
        stage('deploy') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: '088fd33b-7731-44ba-9570-34ba62d7c75d')]) {
                    sh './deploy.sh'
                }
            }
        }
    }
}
