# setup-genesyscloud-archy

[![build-test](https://github.com/stsmdt/setup-genesyscloud-archy/actions/workflows/build-test.yml/badge.svg)](https://github.com/stsmdt/setup-genesyscloud-archy/actions/workflows/build-test.yml)

The `stsmdt/setup-genesyscloud-archy` action is a TypeScript action that sets up Genesyscloud Archy in your GitHub Actions workflow by:

- Downloading a specific version of Genesyscloud Archy and adding it to the `PATH`.

## Usage

See [action.yml](action.yml)

This action can be run on `ubuntu-latest`, `windows-latest` and `macos-latest` GitHub Actions runners.

A specific version of Genesyscloud or latest can be used.

```yaml
steps:
- uses: stsmdt/setup-genesyscloud-archy@v1
  with:
    archy-version: 2.7.0
```

```yaml
steps:
- uses: stsmdt/setup-genesyscloud-archy@v1
  with:
    archy-version: latest
```

## Inputs

The action supports the following inputs:

- `archy-version` - (required) - The version of Genesyscloud to install.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
