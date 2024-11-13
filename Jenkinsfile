def test_names = ['test1', 'test2', 'test3']

pipeline {
    // agent any

    agent {
        // kubernetes {
        //     yaml """
        //         apiVersion: v1
        //         kind: Pod
        //         metadata:
        //           labels:
        //             app: k6
        //         spec:
        //           containers:
        //           - name: k6
        //             image: loadimpact/k6
        //             command:
        //             - cat
        //             tty: true
        //     """
        // }

        // docker {
        //     image 'loadimpact/k6'
        //     args '-v /var/run/docker.sock:/var/run/docker.sock'
        // }

        // aws {
        //     region 'us-east-1'
        //     image 'loadimpact/k6'
        //     args '-v /var/run/docker.sock:/var/run/docker.sock'
        // }

        node {
            label 'master'
        }
    }

    options {
        ansiColor('xterm')
        timeout(time: 30, unit: 'MINUTES')
        timestamps({
            colorizeOutput(true)
        })
        // cleanWs()
        // buildDiscarder(logRotator(numToKeepStr: '5'))
        // skipStagesAfterUnstable()
        // disableConcurrentBuilds()
        // disableResume()
        // durabilityHint('PERFORMANCE_OPTIMIZED')
        // retry({
        //     retryCount = 3
        //     retryDelaySeconds = 30
        // })
        // skipDefaultCheckout()
        // throttleConcurrentBuilds(
        //     [
        //         count: 5,
        //         categories: [
        //             [$class: 'JobPropertyNameCategory', property: 'test_names']
        //         ]
        //     ]
        // )
        // throttle([count: 1, durationName: 'hour', userBoost: true])
        // throttle([count: 1, durationName: 'day', userBoost: true])
        // throttle([count: 1, durationName: 'week', userBoost: true])
        // throttle([count: 1, durationName: 'month', userBoost: true])
        // throttle([count: 1, durationName: 'year', userBoost: true])
        // throttle([count: 1, durationName: 'decade', userBoost: true])
        // throttle([count: 1, durationName: 'century', userBoost: true])
        // throttle([count: 1, durationName: 'millennium', userBoost: true])
        // throttle([count: 1, durationName: 'forever', userBoost: true])
        // throttle([count: 1, durationName: 'infinity', userBoost: true])
        // throttle([count: 1, durationName: 'unlimited', userBoost: true])
        // throttle([count: 1, durationName: 'never', userBoost: true])
        // throttle([count: 1, durationName: 'always', userBoost: true])
    }

    parameters {
        string(name: 'K6_API_TOKEN', defaultValue: '', description: 'K6 API Token')
        string(name: 'K6_CLOUD_PROJECT_ID', defaultValue: '', description: 'K6 Cloud Project ID')
        booleanParam(name: 'K6_DEBUG', defaultValue: false, description: 'K6 Debug')
        radio(name: 'K6_DEBUG', choices: ['true', 'false'], defaultValue: 'false', description: 'K6 Debug')
        choice(name: 'TEST_NAME', choices: test_names, defaultValue: 'test1', description: 'K6 Test Name')
    }

    environment {
        EMAIL_TO='7wK4V@example.com'
        EMAIL_FROM='7wK4V@example.com'
        REPLY_TO='7wK4V@example.com'
        APP_NAME='k6-test'
        WIKI_URL='https://github.com/7wK4V@example.com/k6-test'
        K6_API_TOKEN=credentials("K6_API_TOKEN")
        K6_CLOUD_PROJECT_ID=credentials("K6_CLOUD_PROJECT_ID")
        K6_DEBUG=credentials({
            id: 'K6_DEBUG',
            envVar: 'K6_DEBUG',
            defaultValue: 'false'
        })
    }

    tools {
        nodejs 'nodejs-16.13.0'
        jdk 'jdk-17.0.1'
        maven 'maven-3.8.1'
        gradle 'gradle-7.0'
        dotnet 'dotnet-6.0'
        go 'go-1.17.3'
        ruby 'ruby-2.7.2'
        python 'python3'
        docker 'docker-19.03.8'
        awscli 'awscli-1.19.7'
        terraform 'terraform-0.15.5'
        helm 'helm-3.5.4'
        kubectl 'kubectl-1.20.4'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                // checkout scm
                checkout scm [
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    credentialsId: '',
                    authentication: [$class: 'NoCredentialsBinding'],
                    doGenerateSubmoduleConfigurations: false,
                    submoduleCfg: [
                        [
                            $class: 'GitSubmoduleOption',
                            parentCredentials: false,
                            recursiveSubmodules: true,
                            trackingSubmodules: false
                        ]
                    ],
                    userRemoteConfigs: [[url: 'https://github.com/grafana/k6.git']]
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'k6']],
                    userRemoteConfigs: [[url: 'https://github.com/grafana/k6.git']]
                ]
                sh 'git submodule update --init --recursive'
                sh 'git clean -ffdx'
                sh 'git reset --hard origin/master'
                echo 'Completed Running K6 checkout!'
            }
        }

        stage('Build Description') {
            steps {
                buildDescription """SCRIPT NAME: ${SCRIPT_NAME}, BASE_URL: <a href="${BASE_URL}" target="_blank">Base Url</a>"""  
            }
        }

        stage('Build') {
            steps {
                docker withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                    sh 'sudo chmod +x setup_k6.sh'
                    sh 'sudo ./setup_k6.sh'
                }
                echo 'Running K6 build...'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Completed Running K6 build!'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'users/perftest', usernameVariable: 'K6_USER', passwordVariable: 'K6_SECRET')
                    // string(credentialsId: 'K6_API_TOKEN', variable: 'K6_API_TOKEN'),
                    // string(credentialsId: 'K6_CLOUD_PROJECT_ID', variable: 'K6_CLOUD_PROJECT_ID')
                ]) {
                    sh '''
                        set +e
                        k6 -e K6_USERNAME=${K6_USER} -e K6_PASSWORD=${K6_SECRET} run -e MY_HOSTNAME=test.k6.io --no-usage-report --vus 10 --duration 10s ./src/k6-official-site/basics--003.js
                        set -e
                    '''
                }
            }
        }

        stage('Performance Testing') {
            steps {
                echo 'Running K6 performance tests...'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                sh 'k6 login cloud --token ${K6_API_TOKEN}'
                sh 'k6 cloud loadtests/performance-test.js'
                echo 'Completed Running K6 performance tests!'
            }
        }
    }

    post {
        always {
           archiveArtifacts(artifacts: 'reports/*', allowEmptyArchive: true, onlyIfSuccessful: tru, defaultExcludes: false, followSymlinks: false, relativeToWorkspace: true)
           buildDescription """SCRIPT NAME: ${SCRIPT_NAME}, BASE_URL: <a href="${BASE_URL}" target="_blank">Base Url</a>, REPORT: <a href="https://k6.io/dashboard/${K6_CLOUD_PROJECT_ID}/tests" target="_blank">Report</a>"""
           sshPublisher(
               alwaysPublishFromMaster: true,
               continueOnError: false,
               failOnError: false, 
               publishers: [
                    sshPublisherDesc(
                        configName: 'ssh-server',
                        transfers: [
                            sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "${WIKI_URL}/${APP_NAME}/jenkins/${BUILD_NUMBER}",
                                remoteDirectorySDF: false,
                                sourceFiles: 'reports/*',
                                removePrefix: 'reports/',
                                remoteDirectory: '/tmp',
                                execCommand: 'ls -la /tmp',
                                execTimeout: 120000
                            )
                        ],
                        usePromoteTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )
           ])
           publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'K6 Report',
                reportTitles: 'K6 Report'
           ])
           sh "echo Build ${BUILD_NUMBER} completed"
        }

        failure {
            sendEmail(
                to: REPLY_TO,
                from: EMAIL_FROM,
                subject: "Build ${BUILD_NUMBER} failed",
                body: "Build ${BUILD_NUMBER} failed"
            )
        }

        unstable {

        }

        changed {
            reportStateChange(currentBuild.currentResult)
        }
    }
}

def reportStateChange(String state) {
    if (state == 'SUCCESS') {
        sendEmail(
            to: REPLY_TO,
            from: EMAIL_FROM,
            subject: "Build ${BUILD_NUMBER} completed",
            body: "Build ${BUILD_NUMBER} completed"
        )
    }

    sendEmail(
        to: REPLY_TO,
        from: EMAIL_FROM,
        subject: "Build ${BUILD_NUMBER} ${state}",
        body: "Build ${BUILD_NUMBER} ${state}"
    )
}

def sendEmail(Map args) {
    emailext(
        to: args.to,
        from: args.from,
        subject: args.subject,
        body: args.body
    )

    mail bcc: '',
        body: "Project: ${env.JOB_NAME} <br> Build Number: ${env.BUILD_NUMBER} <br> Build URL: ${env.BUILD_URL}",
        cc: '',
        from: args.from,
        replyTo: "${REPLY_TO}",
        subject: args.subject,
        to: args.to
        charset: 'UTF-8'
        mimeType: 'text/html''
}