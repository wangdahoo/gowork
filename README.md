# Gowork

> Setup `vscode` golang development envionment quickly.

## Prepare

- [gvm](https://github.com/moovweb/gvm)
- [vscode-go](https://github.com/Microsoft/vscode-go)

## Usage

```bash
npm i -g @wangdahoo/gowork
# create workspace
gowork create myproject --cwd ./ --golang go1.12

# ensure workspace
cd <path/to/project>
gowork ensure
```
