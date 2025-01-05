# **Github Activity CLI**

A simple command-line interface (CLI) tool to check the most recent activity of an user in github in the cmd.

## **Features**

- Display last activity from an username in git hub.
- Delivers a different message according to the github event displayed.

## **Installation**

1. Clone the repository.

```bash
git clone https://github.com/07krW5Hnr5ghy/github-activity
cd github-activity
npm install -g .
```

## **Usage**

### **Display github username activity**

```bash
github-activity github-username
```

**Example**:

```bash
github-activity 07krW5Hnr5ghy
```

## **How It Works**

Make a http get request to fetch the last activity data for an user in github and format it into readable bullets into the command line.

## **Development**

### **File Structure**

```
github-activity/
├── bin/index.js   # Main CLI script
└── README.md     # Documentation
```

## project url

https://roadmap.sh/projects/github-user-activity
