# [WIP] serverless-image-resize

This project was created for study purposes. The main idea here is:
- Build a lambda function that is triggered everytime a new file is uploaded to an specifc bucket and if this file is an image then resize it.

![Flow](docs/images/serverless-image-resize-flow.png)

Other technologies was used in this project like:
- [Serverless Framework](https://www.serverless.com/) an easy way to configure AWS (or other cloud) resources for a serverless archtecture.
- I am using [aws-nodejs-typescript](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript) template for this project.
- [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions) to deploy a serverless project to an AWS account. You can see the workflow file [.github/workflows/sls-deploy.yaml](.github/workflows/sls-deploy.yaml).

### Prerequisites

This project have been developed using `Serverless Architecture` and to help us to deploy and operating the resources in to the Cloud we decided to use [Serverless Framework](https://serverless.com). For use of Serverless Framework we need to install `serverless cli` running the following command:

```bash
npm install -g serverless
```

### Deploy to AWS 

> I am using [sharp library](https://sharp.pixelplumbing.com/) to resize images and before follow this instructions to deploy the application to AWS you must read [sharp installation steps for Mac OS and Windows](https://sharp.pixelplumbing.com/install#aws-lambda).

After [configure your aws credentials](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-configure.html) just run the following command:

```bash
sls deploy --stage dev
```

As I've said above you can see a sample github actions workflow to deploy project to AWS after a push at branch master. The workflow file configuration is [.github/workflows/sls-deploy.yaml](.github/workflows/sls-deploy.yaml).

## Authors

* **[Murilo Amêndola](https://www.linkedin.com/in/muriloamendola/)** - <muriloamendola@gmail.com>

See also the list of [contributors](https://github.com/muriloamendola/graphql-serverless/contributors) who participated in this project.
