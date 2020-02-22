# Gowork ![golang version](https://img.shields.io/badge/go-1.12%2B-9cf.svg)

> Setup seperated golang development envionment quickly.

## Prepare
- [vscode-go](https://github.com/Microsoft/vscode-go) if use `vscode`

## Usage

```bash
npm i -g @wangdahoo/gowork
# create new project
gowork create myproject
cd myproject
./ge go mod tidy

# using this command after you git clone a project created by gowork, 
# to ensure your workspace right and link your project to GOPATH.
cd <path/to/project>
gowork ensure
```
