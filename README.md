# Gowork

> Setup `vscode` golang development envionment quickly.

## Prepare

- [gvm](https://github.com/moovweb/gvm)
- [vscode-go](https://github.com/Microsoft/vscode-go)
- [govendor(optional)](https://github.com/kardianos/govendor)

## Usage

```bash
npm i -g @wangdahoo/gowork
# create workspace
gowork create myproject --cwd ./ --golang go1.12

# using this command after you git clone a project created by gowork. to ensure your pkgset and link your project to GOPATH.
cd <path/to/project>
gowork ensure
```
