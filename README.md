# Application description

The application consists of two method of calculating Fibonacci numbers.
The application exposed two endpoints:

- url/fiboRecursive?n={N}: Calculate the Fibo number recursively.
- url/fiboIter?n={n}: Calculate the Fibo number using dynamic programming paradigm.

The above two services have a significant difference in term of complexity.

| endpoint                | complexity |
|-------------------------|------------|
| url/fiboRecursive?n={N} | o(2^n)     |
| url/fiboIter?n={n}      | o(n)       |



# Continuous integration && Continous delivery

The following schema shows the workflow of CI/CD.

![](https://lh4.googleusercontent.com/J3xtqRcGX_X127rv9a_6AwM7K07iWtEg0X4MxDtXTJKB1UoRV9uIY8Pq8xJlGf20mwV1m1ACu2LrWnZX-Ybq5nJT2bjBk3rpbEe2ie4f6ijUNhdZs5hliAc8orssALtiGiOvpEfJ)
# Github Workflow steps:

I used the github actions as a tool to create the CI/CD workflow.
The main steps of the workflow are:
- Build the docker image, using the Dockerfile
- Unit test:
  Running unit tests using the commande: make test.
- Push the image to DOCKER HUB:
  This step consists of pushing the latest docker image to the DOCKER HUB.
  Please make sure to set the tag as latest and to create two secrets for the username and password.
- Update kubernetes cluster with the new image:
  After pushing the new image, it's important to bring this change to the deployment.
  To do so, I create a lambda function that access to the MASTER NODE via SSH, and then write the following command:
  > kubectl rollout restart deployment deployment-v1

  This lambda is triggered by a GET method, which is triggered at the end of the github workflow.

  # Kubernetes
  Originally developed by Google, Kubernetes is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications.
  ### Kubernetes Architecture
![](https://platform9.com/wp-content/uploads/2019/05/kubernetes-constructs-concepts-architecture.jpg)
### Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-v1
spec:
  selector:
    matchLabels:
      app: deployment-hamza
  replicas: 6 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: deployment-hamza
    spec:
      containers:
        - name: hamza-image
          image: hamza2021/hamza-image:latest
          imagePullPolicy: "Always"
          ports:
            - containerPort: 3000
```
### Service to expose our Deployment
```yaml
kind: Service
apiVersion: v1
metadata:
  name: service-v1
spec:
  type: LoadBalancer
  selector:
    app: deployment-hamza
  ports:
    - nodePort: 30000
      port: 30001
      targetPort: 3000
```
### Deployment strategy : Rolling update
A rolling deployment slowly replaces instances of the previous version of an application with instances of the new version of the application. A rolling deployment typically waits for new pods to become ready via a readiness check before scaling down the old components. If a significant issue occurs, the rolling deployment can be aborted.
![](https://blog.itaysk.com/images/2017-11-20-deployment-strategies-defined_2.png)
### Monitoring / Alerts
To monitor our cluster , we will use prometheus / node-exporter / Grafana.
![](https://blog.stackpulse.com/wp-content/uploads/2020/09/image1.png)
-   Prometheus will scrape metrics from /metrics in each node
-   Grafana will connect to prometheus server to show dashboards
-   Alerts will be sent and configured through Alert Manager


  
        