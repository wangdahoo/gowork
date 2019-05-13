# Gowork

> Setup `vscode` golang development envionment quickly.

## Prepare

- [vscode-go](https://github.com/Microsoft/vscode-go)

## Usage

```bash
npm i -g @wangdahoo/gowork
# create workspace
gowork create myproject --cwd ./

# using this command after you git clone a project created by gowork. to ensure your pkgset and link your project to GOPATH.
cd <path/to/project>
gowork ensure
```
